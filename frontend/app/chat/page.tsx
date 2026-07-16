"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";
import Sidebar from "@/components/chat/Sidebar";
import WelcomeState from "@/components/chat/WelcomeState";
import MessageThread from "@/components/chat/MessageThread";
import ChatInput from "@/components/chat/ChatInput";
import { apiFetch } from "@/lib/api";
import { clearToken } from "@/lib/auth";
import type { Citation, Conversation, Message } from "@/components/chat/types";

interface CurrentUser {
  id: string;
  email: string;
  role: string;
}

type View = "welcome" | "conversation";
type PendingState = "loading" | "error" | null;

interface AskResponse {
  answer: string;
  citations: Citation[];
  answer_found: boolean;
}

function ChatShell() {
  const router = useRouter();
  const [view, setView] = useState<View>("welcome");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState<PendingState>(null);
  const [threadLoading, setThreadLoading] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);

  async function loadConversations() {
    try {
      const data = await apiFetch<Conversation[]>("/conversations");
      setConversations(data);
    } catch {
      // non-fatal: sidebar just stays empty if this fails
    }
  }

  async function loadUser() {
    try {
      const data = await apiFetch<CurrentUser>("/auth/me");
      setUser(data);
    } catch {
      // non-fatal: AuthGuard already ensures a token exists; a transient
      // failure here just leaves the sidebar chip blank until next mount
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    loadConversations();
    loadUser();
  }, []);

  function handleNewChat() {
    setView("welcome");
    setActiveConversationId(null);
    setMessages([]);
    setPending(null);
  }

  async function handleSelectConversation(id: string) {
    setActiveConversationId(id);
    setView("conversation");
    setPending(null);
    setThreadLoading(true);
    try {
      const data = await apiFetch<Message[]>(`/conversations/${id}`);
      setMessages(data);
    } catch {
      setMessages([]);
    } finally {
      setThreadLoading(false);
    }
  }

  async function handleSend(text: string) {
    if (pending === "loading") return;

    let convId = activeConversationId;
    const isNewConversation = !convId;

    if (isNewConversation) {
      try {
        const conv = await apiFetch<Conversation>("/conversations", { method: "POST" });
        convId = conv.id;
        setActiveConversationId(convId);
        setConversations((prev) => [conv, ...prev]);
        setView("conversation");
        setMessages([]);
      } catch {
        return;
      }
    }

    const userMessage: Message = {
      id: `local-user-${Date.now()}`,
      conversation_id: convId!,
      role: "user",
      content: text,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setPending("loading");

    try {
      const data = await apiFetch<AskResponse>(`/conversations/${convId}/ask`, {
        method: "POST",
        body: { question: text },
      });
      const assistantMessage: Message = {
        id: `local-assistant-${Date.now()}`,
        conversation_id: convId!,
        role: "assistant",
        content: data.answer,
        metadata: { citations: data.citations, answer_found: data.answer_found },
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setPending(null);
      if (isNewConversation) {
        loadConversations();
      }
    } catch {
      setPending("error");
    }
  }

  function handleLogout() {
    clearToken();
    router.push("/login");
  }

  async function handleDeleteConversation(id: string) {
    if (!window.confirm("Delete this conversation?")) return;
    try {
      await apiFetch<unknown>(`/conversations/${id}`, { method: "DELETE" });
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConversationId === id) {
        handleNewChat();
      }
    } catch {
      // non-fatal: conversation stays in the list if the delete call fails
    }
  }

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-bg p-[26px]">
      <div
        className="pointer-events-none absolute"
        style={{
          top: -240,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1000,
          height: 700,
          background:
            "radial-gradient(ellipse at center, rgba(var(--gold-rgb),0.12), transparent 68%)",
          filter: "blur(30px)",
        }}
      />

      <div
        className="relative flex h-full w-full overflow-hidden rounded-[22px]"
        style={{
          background: "#0A0F1B",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow:
            "0 0 60px rgba(var(--gold-rgb),0.08), 0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewChat={handleNewChat}
          onDeleteConversation={handleDeleteConversation}
          userEmail={user?.email ?? ""}
          onLogout={handleLogout}
        />

        <main className="relative flex flex-1 flex-col overflow-hidden">
          <div
            className="pointer-events-none absolute"
            style={{
              top: "15%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 760,
              height: 560,
              background:
                "radial-gradient(ellipse at center, rgba(var(--gold-rgb),0.09), transparent 68%)",
              filter: "blur(30px)",
            }}
          />

          {view === "welcome" ? (
            <WelcomeState onPromptSelect={handleSend} />
          ) : (
            <div className="relative flex flex-1 flex-col overflow-hidden">
              <div
                className="flex items-center px-8 py-4"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {activeConversation?.title ?? "New chat"}
                </span>
              </div>
              {threadLoading && messages.length === 0 ? (
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                    Loading…
                  </p>
                </div>
              ) : (
                <MessageThread messages={messages} pending={pending} />
              )}
            </div>
          )}

          <ChatInput onSend={handleSend} disabled={pending === "loading"} />
        </main>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <AuthGuard>
      <ChatShell />
    </AuthGuard>
  );
}

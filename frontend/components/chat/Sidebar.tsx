"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Conversation, ConversationGroup } from "./types";
import ConversationList from "./ConversationList";

const GROUP_ORDER: ConversationGroup[] = ["Today", "Yesterday", "Older"];

function groupByDate(conversations: Conversation[]): Record<ConversationGroup, Conversation[]> {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const groups: Record<ConversationGroup, Conversation[]> = {
    Today: [],
    Yesterday: [],
    Older: [],
  };

  for (const conv of conversations) {
    const created = new Date(conv.created_at);
    if (created >= startOfToday) groups.Today.push(conv);
    else if (created >= startOfYesterday) groups.Yesterday.push(conv);
    else groups.Older.push(conv);
  }

  return groups;
}

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  userEmail: string;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

function initialsFromEmail(email: string): string {
  const localPart = email.split("@")[0] ?? "";
  const segments = localPart.split(/[._\-+]/).filter(Boolean);
  if (segments.length >= 2) {
    return (segments[0][0] + segments[1][0]).toUpperCase();
  }
  return localPart.slice(0, 2).toUpperCase();
}

export default function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  userEmail,
  onLogout,
  isOpen,
  onClose,
}: SidebarProps) {
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "/") return;
      const target = e.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;
      if (isTyping) return;
      e.preventDefault();
      searchInputRef.current?.focus();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredConversations = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter((c) => (c.title ?? "New conversation").toLowerCase().includes(q));
  }, [conversations, query]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-shrink-0 flex-col transition-transform duration-300 ease-out lg:static lg:z-auto lg:translate-x-0 lg:transition-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "rgba(4,7,14,0.72)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(14px)",
        }}
      >
        {/* wordmark row */}
        <div className="flex items-center justify-between px-[18px] pt-5 pb-[14px]">
          <Link href="/" className="flex items-center gap-[10px]">
            <div
              className="font-heading flex h-6 w-6 items-center justify-center rounded-[7px] text-[13px] font-bold"
              style={{
                background:
                  "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-dark))",
                boxShadow: "0 0 14px rgba(var(--gold-rgb),0.5)",
                color: "#1a1200",
              }}
            >
              L
            </div>
            <span className="font-heading text-[17px] font-bold tracking-[-0.02em] text-white">
              Lexora
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="lex-icon-btn flex h-8 w-8 items-center justify-center rounded-lg lg:hidden"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

      {/* search */}
      <div className="px-[14px] pt-1 pb-3">
        <div
          className="flex items-center gap-[9px] rounded-[10px] px-3 py-[9px]"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="21" y1="21" x2="16.5" y2="16.5"></line>
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats…"
            className="lex-search-input flex-1 border-none bg-transparent text-[13px] text-white outline-none"
          />
          {!query && (
            <span
              className="rounded-[5px] px-[7px] py-[2px] text-[11px]"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              /
            </span>
          )}
        </div>
      </div>

      {/* new chat */}
      <div className="px-[14px] pb-4">
        <button
          type="button"
          onClick={onNewChat}
          className="lex-gold-btn flex w-full items-center justify-center gap-2 rounded-[11px] py-[11px] text-[13.5px] font-semibold"
          style={{
            background:
              "linear-gradient(145deg, var(--color-gold-light), var(--color-gold-mid))",
            color: "#1a1200",
            boxShadow:
              "0 4px 20px rgba(var(--gold-rgb),0.35), inset 0 1px 0 rgba(255,255,255,0.45)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Chat
        </button>
      </div>

      {/* conversation groups */}
      <div className="flex flex-1 flex-col gap-[18px] overflow-y-auto px-[10px]">
        {(() => {
          const grouped = groupByDate(filteredConversations);
          return GROUP_ORDER.map((group) => {
            const items = grouped[group];
            if (items.length === 0) return null;
            return (
              <ConversationList
                key={group}
                group={group}
                conversations={items}
                activeConversationId={activeConversationId}
                onSelectConversation={onSelectConversation}
                onDeleteConversation={onDeleteConversation}
              />
            );
          });
        })()}
        {query && filteredConversations.length === 0 && (
          <p className="px-[10px] text-[12.5px]" style={{ color: "rgba(255,255,255,0.35)" }}>
            No chats match &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>

      {/* user chip */}
      <div className="px-[14px] pt-3 pb-[14px]">
        <div
          className="flex items-center gap-[10px] rounded-[13px] px-3 py-[10px]"
          style={{
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
            style={{ background: "linear-gradient(145deg, #4A6EB4, #2C4470)" }}
          >
            {initialsFromEmail(userEmail)}
          </div>
          <span
            className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px]"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {userEmail}
          </span>
          <button
            type="button"
            aria-label="Log out"
            title="Log out"
            onClick={onLogout}
            className="lex-logout-btn flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-[7px]"
            style={{ background: "transparent", color: "rgba(255,150,150,0.6)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
      </aside>
    </>
  );
}

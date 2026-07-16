import type { Conversation, ConversationGroup } from "./types";

interface ConversationListProps {
  group: ConversationGroup;
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

export default function ConversationList({
  group,
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
}: ConversationListProps) {
  return (
    <div className="flex flex-col gap-[2px]">
      <span
        className="px-[10px] pb-[7px] text-[10.5px] font-medium tracking-[0.14em] uppercase"
        style={{ color: "rgba(255,255,255,0.32)" }}
      >
        {group}
      </span>
      {conversations.map((conv) => {
        const isActive = conv.id === activeConversationId;
        return (
          <div
            key={conv.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelectConversation(conv.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectConversation(conv.id);
              }
            }}
            className={`group flex cursor-pointer items-center gap-1 overflow-hidden rounded-[9px] py-[9px] pr-[6px] pl-[13px] text-[13px] ${isActive ? "" : "lex-sidebar-item"}`}
            style={
              isActive
                ? {
                    background: "rgba(var(--gold-rgb),0.09)",
                    color: "rgba(255,255,255,0.92)",
                    boxShadow: "inset 3px 0 0 var(--color-gold)",
                  }
                : { color: "rgba(255,255,255,0.62)" }
            }
          >
            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {conv.title ?? "New conversation"}
            </span>
            <button
              type="button"
              aria-label="Delete conversation"
              title="Delete conversation"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteConversation(conv.id);
              }}
              className="lex-delete-btn flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-[6px] opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: "transparent", color: "rgba(255,150,150,0.7)" }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}

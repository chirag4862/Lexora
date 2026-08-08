import type { Message } from "./types";
import MessageBubble from "./MessageBubble";
import AssistantMessage from "./AssistantMessage";
import PendingMessage from "./PendingMessage";

interface MessageThreadProps {
  messages: Message[];
  pending?: "loading" | "error" | null;
}

export default function MessageThread({ messages, pending }: MessageThreadProps) {
  return (
    <div className="flex-1 overflow-y-auto py-5 lg:py-9">
      <div className="mx-auto flex max-w-[720px] flex-col gap-6 px-4 sm:px-6 lg:gap-7 lg:px-8">
        {messages.map((message) =>
          message.role === "user" ? (
            <MessageBubble key={message.id} content={message.content} />
          ) : (
            <AssistantMessage key={message.id} message={message} />
          ),
        )}
        {pending && <PendingMessage status={pending} />}
      </div>
    </div>
  );
}

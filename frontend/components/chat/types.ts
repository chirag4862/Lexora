export type ConversationGroup = "Today" | "Yesterday" | "Older";

export interface Conversation {
  id: string;
  user_id: string;
  created_at: string;
  title: string | null;
}

export interface Citation {
  act: string;
  status: string;
  act_type: string;
  section: string;
}

export type MessageRole = "user" | "assistant";

export interface MessageMetadata {
  citations?: Citation[];
  answer_found?: boolean;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: MessageRole;
  content: string;
  metadata?: MessageMetadata | null;
  created_at: string;
}

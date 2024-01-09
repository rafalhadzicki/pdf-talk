import { ChatMessageRole } from '@/assets/constants/chatMessage';

export type UploadFileResponse = {
  sourceId: string;
};

export type ContentObj = {
  content: string;
};

export type Message = ContentObj & {
  role: ChatMessageRole;
};

export type Question = UploadFileResponse & {
  messages: Message[];
};

export type Prompt = {
  name: string;
  prompt: string;
};

export type SourcesToDelete = {
  sources: string[];
};

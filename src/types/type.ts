export interface storeType {
  user: any;
  currentChatId: number | null;
  chatHistory: chatHistoryType[];
  chatData: {parts: {text: string}[]; role: string}[];
  chatFontSize: number;
  autoRead: boolean;
}

export interface chatHistoryType {
  id: number;
  title: string;
  favourite: boolean;
  created_at: string;
  chats?: {parts: {text: string}[]; role: string}[];
}

export interface storeType {
  user: any;
  currentChatId: number | null;
  chatHistory: [];
  chatData: {parts: {text: string}[]; role: string}[];
  chatFontSize: number;
  autoRead: boolean;
}

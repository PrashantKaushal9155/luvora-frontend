export interface Message {
    id: string;
    senderUserId: string;
    content: string;
    isRead: boolean;
    createdAt: string;
}
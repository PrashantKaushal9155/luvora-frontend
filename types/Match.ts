export interface Match {
    matchId: string;
    userId: string;
    name: string;
    age: number;
    city: string;
    photoUrl: string | null;
    matchedAt: string;
    unreadMessages: number;
    lastMessage: string | null;
    lastMessagedAt: string | null;
}
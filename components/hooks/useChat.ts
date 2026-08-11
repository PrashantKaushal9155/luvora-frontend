import { getMessages, markMessagesAsRead } from "@/services/chatService";
import { signalRService } from "@/services/signalrService";
import { useAuthStore } from "@/store/authStore";
import { Message } from "@/types/Message";
import { getUserIdFromToken } from "@/utils/jwt";
import { useEffect, useState } from "react";

type UseChatProps = {
    matchId: string;
    receiverUserId: string;
};

export function useChat({ matchId, receiverUserId }: UseChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [messagesRead, setMessagesRead] = useState<boolean>(false);

    const token = useAuthStore((state) => state.accessToken);

    const currentUserId = token ? getUserIdFromToken(token) : "";

    useEffect(() => {
        initializeChat();

        return () => {
            cleanupChat();
        };
    }, []);

    const initializeChat = async () => {
        try {
            const history = await getMessages(matchId);

            setMessages(history);

            await markMessagesAsRead(matchId);
            await signalRService.messagesRead(matchId);

            await signalRService.startConnection();

            signalRService.onUserOnline((userId: string) => {
                if (userId === receiverUserId) {
                    setIsOnline(true);
                }
            });

            signalRService.onUserOffline((userId: string) => {
                if (userId === receiverUserId) {
                    setIsOnline(false);
                }
            });

            signalRService.onReceiveMessage((message: any) => {
                const newMessage: Message = {
                    id: crypto.randomUUID(),
                    senderUserId: message.senderUserId,
                    content: message.content,
                    isRead: false,
                    createdAt: message.createdAt,
                };

                console.log('Received:', message);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            signalRService.onUserTyping(() => {
                setIsTyping(true);

                setTimeout(() => {
                    setIsTyping(false);
                }, 3000);
            });

            signalRService.onMessagesRead(() => {
                setMessagesRead(true);
            });

            await signalRService.joinMatchRoom(matchId);

            const onlineStatus = await signalRService.checkUserOnline(receiverUserId);
            setIsOnline(onlineStatus);

        } catch (error) {
            console.error("Error initializing chat:", error);
        }
    };

    const cleanupChat = async () => {
        try {
            await signalRService.leaveMatchRoom(matchId);

            signalRService.removeReceiveMessage();
            signalRService.removeMessagesReadListener();
            signalRService.removeTyping();
            signalRService.removeOnlineListeners();
        } catch (error) {
            console.error("Error cleaning up chat:", error);
        }
    };

    const sendMessage = async (content: string) => {
        console.log("Sending message:", content);
        try {
            const localMessage = {
                id: Date.now().toString(),
                senderUserId: currentUserId,
                content,
                isRead: false,
                createdAt: new Date().toISOString(),
            };
            
            setMessages((prevMessages) => [...prevMessages, localMessage]);

            await signalRService.sendMessage({
                matchId,
                receiverUserId,
                content,
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return {
        messages,
        currentUserId,
        sendMessage,
        isTyping,
        isOnline,
        messagesRead,
    };
}
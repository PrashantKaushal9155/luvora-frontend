import { useAuthStore } from "@/store/authStore";
import * as signalR from "@microsoft/signalr";

class SignalRService {
    private connection: signalR.HubConnection | null = null;

    async startConnection() {
        if (this.connection) return this.connection;

        const token = useAuthStore.getState().accessToken;
        console.log("Starting SignalR connection with token:", token);

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("http://192.168.29.248:5220/chatHub", {
                accessTokenFactory: () => token ?? "",
            })
            .withAutomaticReconnect()
            .build();

            await this.connection.start();
            console.log("SignalR Connected.");
            this.connection.on("ReceiveMessage", (message) => {
                console.log("RAW SIGNALR:", message);
            });

            return this.connection;
    }

    async stopConnection() {
        if(this.connection) {
            await this.connection.stop();
            this.connection = null;
            console.log("SignalR Disconnected.");
        }
    }

    getConnection() {
        return this.connection;
    }

    async joinMatchRoom(matchId: string) {
        console.log("Joining match room:", matchId);
        await this.connection?.invoke("JoinMatchRoom", matchId);
    }

    async leaveMatchRoom(matchId: string) {
        console.log("Leaving match room:", matchId);
        await this.connection?.invoke("LeaveMatchRoom", matchId);
    }

    async sendMessage(payload: {
        matchId: string;
        receiverUserId: string;
        content: string;
    }) {
        await this.connection?.invoke("SendMessage", payload);
    }

    async typing(matchId: string) {
        await this.connection?.invoke("Typing", matchId);
    }

    onReceiveMessage(callback: (message: any) => void) {
        this.connection?.on("ReceiveMessage", callback);
    }

    onUserTyping(callback: () => void) {
        this.connection?.on("UserTyping", callback);
    }

    removeReceiveMessage() {
        this.connection?.off("ReceiveMessage");
    }

    removeTyping() {
        this.connection?.off("UserTyping");
    }

    async checkUserOnline(userId: string): Promise<boolean> {
        return await this.connection?.invoke("CheckUserOnline", userId) ?? false;
    }

    onUserOnline(callback: (userId: string) => void) {
        this.connection?.on("UserOnline", callback);
    }

    onUserOffline(callback: (userId: string) => void) {
        this.connection?.on("UserOffline", callback);
    }

    removeOnlineListeners() {
        this.connection?.off("UserOnline");
        this.connection?.off("UserOffline");
    }

    async messagesRead(matchId: string) {
        await this.connection?.invoke(
            "MessagesRead",
            matchId
        );
    }

    onMessagesRead(callback: () => void) {
        this.connection?.on(
            "MessagesRead",
            callback
        );
    }

    removeMessagesReadListener() {
        this.connection?.off("MessagesRead");
    }
}

export const signalRService = new SignalRService();
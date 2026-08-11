import ChatInput from "@/components/chat/ChatInput";
import MessageBubble from "@/components/chat/MessageBubble";
import { useChat } from "@/components/hooks/useChat";
import { signalRService } from "@/services/signalrService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Text, View } from "react-native";

export default function ChatScreen() {
  const { matchId, receiverUserId, name, photoUrl } = useLocalSearchParams();

  const flatListRef = useRef<FlatList>(null);

  const {
    messages,
    currentUserId,
    sendMessage,
    isTyping,
    isOnline,
    messagesRead,
  } = useChat({
    matchId: String(matchId),
    receiverUserId: String(receiverUserId),
  });

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      {/* Header */}

      <View
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          {name}
        </Text>

        <Text
          style={{
            color: isOnline ? "green" : "gray",
            marginTop: 4,
          }}
        >
          {isOnline ? "Online" : "Offline"}
        </Text>

        {isTyping && (
          <Text
            style={{
              color: "gray",
              marginTop: 4,
            }}
          >
            Typing...
          </Text>
        )}
      </View>

      { /* Messages List */ }

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 10,
        }}
        renderItem={({ item }) => (
          <MessageBubble
            content={item.content}
            isMine={item.senderUserId === currentUserId}
            isRead={item.senderUserId === currentUserId ? (item.isRead || messagesRead) : false}
          />
        )}
      />

      {/* Chat Input */}

      <ChatInput
        onSend={sendMessage}
        onTyping={() => signalRService.typing(String(matchId))}
      />
    </KeyboardAvoidingView>
  );
}
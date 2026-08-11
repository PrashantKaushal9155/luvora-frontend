import { Text, View } from "react-native";

type Props = {
  content: string;
  isMine: boolean;
  isRead?: boolean;
};

export default function MessageBubble({
  content,
  isMine,
  isRead,
}: Props) {
  return (
    <View
      style={{
        alignSelf: isMine
          ? "flex-end"
          : "flex-start",
        maxWidth: "80%",
        marginVertical: 4,
      }}
    >
      <View
        style={{
          backgroundColor: isMine
            ? "#DCF8C6"
            : "#ECECEC",
          padding: 10,
          borderRadius: 12,
        }}
      >
        <Text>{content}</Text>
      </View>

      {isMine && (
        <Text
          style={{
            alignSelf: "flex-end",
            fontSize: 12,
            color: "#777",
            marginTop: 2,
          }}
        >
          {isRead ? "✓✓" : "✓"}
        </Text>
      )}
    </View>
  );
}
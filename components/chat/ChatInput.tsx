import { useState } from "react";
import { TextInput, View } from "react-native";
import CustomButton from "../ui/CustomButton";

type Props = {
    onSend: (message: string) => void;
    onTyping?: () => void;
};

export default function ChatInput({ onSend, onTyping }: Props) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) return;

        console.log("Sending:", message);
        onSend(message);
        setMessage("");
    };

    return (
        <View
            style={{
                flexDirection: "row",
                padding: 10,
            }}
        >
            <TextInput
                value={message}
                onChangeText={(text) => {
                    setMessage(text);

                    onTyping?.();
                }}
                placeholder="Type a message..."
                style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    borderRadius: 20,
                    paddingHorizontal: 12,
                }}
            />

            <CustomButton
                title="Send"
                onPress={handleSend}
            />
        </View>
    );
}    
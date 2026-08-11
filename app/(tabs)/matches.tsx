import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { getMatches } from "../../services/matchService";
import { Match } from "../../types/Match";

export default function MatchesScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadMatches();
    }, [])
  );

  const loadMatches = async () => {
    try {
      const data = await getMatches();
      setMatches(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.matchId}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/chat/chatScreen",
              params: {
                matchId: item.matchId,
                receiverUserId: item.userId,
                name: item.name,
                photoUrl: item.photoUrl,
              },
            })
          }
        >
          <View
            style={{
              flexDirection: "row",
              padding: 15,
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: "#eee"
            }}
          >
            <Image
              source={{
                uri:
                  item.photoUrl ??
                  "https://via.placeholder.com/100"
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30
              }}
            />

            <View
              style={{
                flex: 1,
                marginLeft: 12
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16
                }}
              >
                {item.name}, {item.age}
              </Text>

              <Text>{item.city}</Text>

              <Text numberOfLines={1}>
                {item.lastMessage ??
                  "Start the conversation 👋"}
              </Text>
            </View>

            {item.unreadMessages > 0 && (
              <View
                style={{
                  backgroundColor: "red",
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 4
                }}
              >
                <Text style={{ color: "white" }}>
                  {item.unreadMessages}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={() => (
        <View
          style={{
            alignItems: "center",
            marginTop: 50
          }}
        >
        <Text>
            ❤️ No matches yet
            Keep swiping and start making connections.
        </Text>
        </View>
      )}
    />
  );
}
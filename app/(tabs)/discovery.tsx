import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    Image,
    Text,
    View,
} from "react-native";

import { getDiscoveryProfiles } from "@/services/discoveryProfilesService";
import { swipeProfile } from "@/services/swipeService";
import { DiscoveryProfile } from "@/types/DiscoveryProfile";

export default function DiscoveryScreen() {
  const [profiles, setProfiles] = useState<DiscoveryProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const data = await getDiscoveryProfiles();
      setProfiles(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (actionType: number) => {
    const profile = profiles[currentIndex];

    if (!profile) return;

    const result = await swipeProfile(
      profile.userId,
      actionType
    );

    if (result.isMatch) {
      Alert.alert(
        "🎉 It's a Match!",
        `You matched with ${profile.name}`
      );
    }

    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const profile = profiles[currentIndex];

  if (!profile) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No more profiles available.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 15 }}>
      <Image
        source={{
          uri:
            profile.primaryPhoto ??
            "https://via.placeholder.com/400",
        }}
        style={{
          width: "100%",
          height: 500,
          borderRadius: 15,
        }}
      />

      <View style={{ marginTop: 15 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          {profile.name}, {profile.age}
        </Text>

        <Text>{profile.occupation}</Text>

        <Text>{profile.city}</Text>

        <Text style={{ marginTop: 10 }}>
          {profile.bio}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <Button
          title="❌ Pass"
          onPress={() => handleSwipe(2)}
        />

        <Button
          title="❤️ Like"
          onPress={() => handleSwipe(1)}
        />
      </View>
    </View>
  );
}
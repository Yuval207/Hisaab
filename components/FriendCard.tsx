import React from "react";
import { Image, Text, View } from "react-native";
import { User } from "../types";

export default function FriendCard({ friend }: { friend: User }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginTop: 12,
      }}
    >
      <Image
        source={{ uri: friend.avatar || "https://via.placeholder.com/48" }}
        style={{ width: 48, height: 48, borderRadius: 24 }}
      />
      <View style={{ marginLeft: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{friend.name}</Text>
      </View>
    </View>
  );
}

import React from "react";
import { ScrollView, Text } from "react-native";
import FriendCard from "../../components/FriendCard";
import { useApp } from "../../context/AppContext";

export default function Friends() {
  const { groups } = useApp();
  const friends = Array.from(
    new Map(groups.flatMap((g) => g.members).map((m) => [m.id, m])).values()
  );

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#F7F7F8" }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Friends</Text>
      {friends.length === 0 ? (
        <Text style={{ marginTop: 24 }}>No friends yet.</Text>
      ) : (
        friends.map((f) => <FriendCard key={f.id} friend={f} />)
      )}
    </ScrollView>
  );
}

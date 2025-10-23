import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import GroupCard from "../../components/GroupCard";
import { useApp } from "../../context/AppContext";

export default function Groups() {
  const { groups } = useApp();
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#F7F7F8" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "700" }}>Groups</Text>

        {/* ✅ Pass mode param */}
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/group-details",
              params: { mode: "create" },
            })
          }
        >
          <Text style={{ color: "#007AFF" }}>Create</Text>
        </Pressable>
      </View>

      {groups.length === 0 ? (
        <Text style={{ marginTop: 24 }}>No groups yet. Create one.</Text>
      ) : (
        groups.map((g) => <GroupCard key={g.id} group={g} />)
      )}
    </ScrollView>
  );
}

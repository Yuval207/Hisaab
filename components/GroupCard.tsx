import React from "react";
import { Text, View } from "react-native";
import { Group } from "../types";

export default function GroupCard({ group }: { group: Group }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        marginTop: 12,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "700" }}>{group.name}</Text>
      <Text style={{ marginTop: 6, color: "#666" }}>
        {group.members.length} members
      </Text>
    </View>
  );
}

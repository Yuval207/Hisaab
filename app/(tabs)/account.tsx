import React from "react";
import { Image, Text, View } from "react-native";
import { useApp } from "../../context/AppContext";

export default function Account() {
  const { user } = useApp();

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        alignItems: "center",
        backgroundColor: "#F7F7F8",
      }}
    >
      <Image
        source={{ uri: user?.avatar || "https://via.placeholder.com/120" }}
        style={{ width: 120, height: 120, borderRadius: 60 }}
      />
      <Text style={{ marginTop: 16, fontSize: 20, fontWeight: "700" }}>
        {user?.name}
      </Text>
      <Text style={{ marginTop: 8, color: "#666" }}>
        Welcome to your Splitwise clone
      </Text>
    </View>
  );
}

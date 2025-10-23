import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import ExpenseCard from "../../components/ExpenseCard";
import { useApp } from "../../context/AppContext";

export default function Home() {
  const { expenses } = useApp();
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
        <Text style={{ fontSize: 22, fontWeight: "700" }}>Recent Expenses</Text>
        <Pressable onPress={() => router.push("/add-expense")}>
          <Text style={{ color: "#007AFF" }}>Add</Text>
        </Pressable>
      </View>

      {expenses.length === 0 ? (
        <Text style={{ marginTop: 24 }}>
          No expenses yet. Tap Add to create one.
        </Text>
      ) : (
        expenses
          .slice()
          .reverse()
          .map((e) => <ExpenseCard key={e.id} expense={e} />)
      )}
    </ScrollView>
  );
}

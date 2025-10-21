import React from "react";
import { ScrollView, Text, View } from "react-native";
import ExpenseCard from "../components/ExpenseCard";
import { useApp } from "../context/AppContext";

export default function GroupDetails() {
  const { groups } = useApp();
  const group = groups[0];

  if (!group) {
    return (
      <View style={{ flex: 1, padding: 16, backgroundColor: "#F7F7F8" }}>
        <Text>No group data. Create a group first.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#F7F7F8" }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>{group.name}</Text>
      {group.expenses.length === 0 ? (
        <Text style={{ marginTop: 16 }}>No expenses in this group.</Text>
      ) : (
        group.expenses.map((e) => <ExpenseCard key={e.id} expense={e} />)
      )}
    </ScrollView>
  );
}

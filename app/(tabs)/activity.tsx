import React from "react";
import { ScrollView, Text } from "react-native";
import ExpenseCard from "../../components/ExpenseCard";
import { useApp } from "../../context/AppContext";

export default function Activity() {
  const { expenses } = useApp();

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#F7F7F8" }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Activity</Text>
      {expenses.length === 0 ? (
        <Text style={{ marginTop: 24 }}>No activity yet.</Text>
      ) : (
        expenses
          .slice()
          .reverse()
          .map((e) => <ExpenseCard key={e.id} expense={e} />)
      )}
    </ScrollView>
  );
}

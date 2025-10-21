import React from "react";
import { Text, View } from "react-native";
import { Expense } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

export default function ExpenseCard({ expense }: { expense: Expense }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        marginTop: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        {expense.description}
      </Text>
      <Text style={{ marginTop: 8 }}>{formatCurrency(expense.amount)}</Text>
      <Text style={{ marginTop: 6, color: "#666", fontSize: 12 }}>
        {new Date(expense.date).toLocaleString()}
      </Text>
    </View>
  );
}

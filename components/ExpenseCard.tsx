import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput } from "react-native";
import { useApp } from "../context/AppContext";
import { Expense } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

export default function ExpenseCard({ expense }: { expense: Expense }) {
  const { updateExpense, user } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(expense.description);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [paidBy, setPaidBy] = useState(expense.paidBy);

  const [paidByList] = useState([
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Sara Lee",
  ]);

  const handleSave = () => {
    const amt = parseFloat(amount);
    if (!description || isNaN(amt) || amt <= 0) {
      Alert.alert("Validation", "Please enter valid description and amount");
      return;
    }

    const updatedExpense = {
      ...expense,
      description,
      amount: amt,
      paidBy,
    };

    updateExpense(expense.id, updatedExpense);
    Alert.alert("Updated", "Expense updated successfully");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setPaidBy(expense.paidBy);
    setIsEditing(false);
  };

  return (
    <Pressable
      onPress={() => setIsEditing(true)}
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
      {!isEditing ? (
        <>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {expense.description}
          </Text>
          <Text style={{ marginTop: 8 }}>{formatCurrency(expense.amount)}</Text>
          <Text style={{ marginTop: 6, color: "#666", fontSize: 12 }}>
            {new Date(expense.date).toLocaleString()}
          </Text>
          <Text style={{ marginTop: 6, color: "#666", fontSize: 12 }}>
            Paid By: {expense.paidBy}
          </Text>
          <Text style={{ marginTop: 8, color: "#007AFF", fontSize: 12 }}>
            Tap to edit
          </Text>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 16 }}>
            Edit Expense
          </Text>

          <Text style={{ marginBottom: 8 }}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              padding: 8,
              borderRadius: 8,
              marginBottom: 12,
            }}
          />

          <Text style={{ marginBottom: 8 }}>Amount (₹)</Text>
          <TextInput
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              padding: 8,
              borderRadius: 8,
              marginBottom: 12,
            }}
          />

          <Text style={{ marginBottom: 8 }}>Paid By</Text>
          <Picker
            selectedValue={paidBy}
            onValueChange={(itemValue) => setPaidBy(itemValue)}
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
              marginBottom: 16,
              backgroundColor: "#f0f0f0",
            }}
          >
            {paidByList.map((name) => (
              <Picker.Item key={name} label={name} value={name} />
            ))}
          </Picker>

          <Pressable
            onPress={handleSave}
            style={{
              backgroundColor: "#007AFF",
              padding: 12,
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Save Changes
            </Text>
          </Pressable>

          <Pressable
            onPress={handleCancel}
            style={{
              backgroundColor: "#ccc",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "#000",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              Cancel
            </Text>
          </Pressable>
        </>
      )}
    </Pressable>
  );
}

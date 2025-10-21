import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import uuid from "react-native-uuid";
import { useApp } from "../context/AppContext";

export default function AddExpense() {
  const { addExpense, user } = useApp();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(user!.name);

  const submit = () => {
    const amt = parseFloat(amount);
    if (!description || isNaN(amt) || amt <= 0) {
      Alert.alert("Validation", "Please enter valid description and amount");
      return;
    }

    const expense = {
      id: uuid.v4(),
      description,
      amount: amt,
      paidBy,
      date: new Date().toISOString(),
    };

    addExpense(expense);
    Alert.alert("Added", "Expense added successfully");
    setDescription("");
    setAmount("");
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#F7F7F8" }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Add Expense</Text>

      <Text style={{ marginTop: 16 }}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Lunch with friends"
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 8,
          borderRadius: 8,
          marginTop: 8,
        }}
      />

      <Text style={{ marginTop: 12 }}>Amount (₹)</Text>
      <TextInput
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="250"
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 8,
          borderRadius: 8,
          marginTop: 8,
        }}
      />

      <Text style={{ marginTop: 12 }}>Paid By</Text>
      <Picker
        selectedValue={paidBy}
        onValueChange={(itemValue) => setPaidBy(itemValue)}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 8,
          borderRadius: 8,
          marginTop: 8,
          backgroundColor: "#f0f0f0",
        }}
      >
        <Picker.Item label="John Doe" value="John Doe" />
        <Picker.Item label="Jane Smith" value="Jane Smith" />
        <Picker.Item label="Michael Johnson" value="Michael Johnson" />
        <Picker.Item label="Sara Lee" value="Sara Lee" />
      </Picker>

      <Pressable
        onPress={submit}
        style={{
          marginTop: 18,
          backgroundColor: "#007AFF",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Save</Text>
      </Pressable>
    </View>
  );
}

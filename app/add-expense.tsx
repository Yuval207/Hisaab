import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import uuid from "react-native-uuid";
import { useApp } from "../context/AppContext";

export default function AddExpense() {
  const { addExpense, user } = useApp();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(user?.name || "");
  const [paidByList] = useState([
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Sara Lee",
  ]);

  // 👇 New state for edit mode toggle
  const [isEditing, setIsEditing] = useState(false);

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
    setIsEditing(false); // close card after saving
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#F7F7F8" }}>
      {/* 👇 Entire Card is Pressable */}
      <Pressable
        onPress={() => setIsEditing(true)}
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 16,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        {!isEditing ? (
          <>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
              + Add Expense
            </Text>
            <Text style={{ color: "#666", marginTop: 8 }}>
              Tap to add a new expense
            </Text>
          </>
        ) : (
          <>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Add Expense</Text>

            <Text style={{ marginTop: 16 }}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
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
              placeholder="Enter amount"
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
                borderRadius: 8,
                marginTop: 8,
                backgroundColor: "#f0f0f0",
              }}
            >
              {paidByList.map((name) => (
                <Picker.Item key={name} label={name} value={name} />
              ))}
            </Picker>

            <Pressable
              onPress={submit}
              style={{
                marginTop: 20,
                backgroundColor: "#007AFF",
                padding: 12,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Save Expense
              </Text>
            </Pressable>

            {/* Cancel Button */}
            <Pressable
              onPress={() => setIsEditing(false)}
              style={{
                marginTop: 10,
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
    </View>
  );
}

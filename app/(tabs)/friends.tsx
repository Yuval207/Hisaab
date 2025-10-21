import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import FriendCard from "../../components/FriendCard";
import { useApp } from "../../context/AppContext";

export default function Friends() {
  const { groups, setGroups } = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const friends = Array.from(
    new Map(groups.flatMap((g) => g.members).map((m) => [m.id, m])).values()
  );

  const addFriend = () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Please enter a name.");
      return;
    }

    const newFriend = {
      id: uuid.v4(),
      name: name.trim(),
      avatar: "", // optionally ask avatar
    };

    // Add this friend to the first group (or create a group if none exists)
    if (groups.length > 0) {
      const updatedGroups = [...groups];
      updatedGroups[0].members.push(newFriend);
      setGroups(updatedGroups);
    } else {
      // If no group exists, create one
      setGroups([
        {
          id: uuid.v4(),
          name: "Default Group",
          members: [newFriend],
          expenses: [],
        },
      ]);
    }

    // Clear form and show success
    setName("");
    setEmail("");
    setPhone("");
    setModalVisible(false);
    Alert.alert("Success", `${name.trim()} has been added as a friend!`);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#F7F7F8" }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Friends</Text>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          marginTop: 16,
          backgroundColor: "#007AFF",
          padding: 16,
          borderRadius: 12,
          alignSelf: "flex-start",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
          + Add Friend
        </Text>
      </TouchableOpacity>

      <ScrollView style={{ marginTop: 16 }}>
        {friends.length === 0 ? (
          <Text>No friends yet.</Text>
        ) : (
          friends.map((f) => <FriendCard key={f.id} friend={f} />)
        )}
      </ScrollView>

      {/* Add Friend Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={resetForm}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 24,
              borderRadius: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginBottom: 20,
                textAlign: "center",
                color: "#333",
              }}
            >
              Add New Friend
            </Text>

            <TextInput
              placeholder="Full Name *"
              value={name}
              onChangeText={setName}
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                fontSize: 16,
                backgroundColor: "#f8f9fa",
              }}
              placeholderTextColor="#999"
            />

            <TextInput
              placeholder="Email (optional)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                fontSize: 16,
                backgroundColor: "#f8f9fa",
              }}
              placeholderTextColor="#999"
            />

            <TextInput
              placeholder="Phone Number (optional)"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 12,
                padding: 16,
                marginBottom: 24,
                fontSize: 16,
                backgroundColor: "#f8f9fa",
              }}
              placeholderTextColor="#999"
            />

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                onPress={addFriend}
                style={{
                  flex: 1,
                  backgroundColor: "#007AFF",
                  padding: 16,
                  borderRadius: 12,
                  shadowColor: "#007AFF",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Add Friend
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={resetForm}
                style={{
                  flex: 1,
                  backgroundColor: "#f8f9fa",
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#ddd",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#666",
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

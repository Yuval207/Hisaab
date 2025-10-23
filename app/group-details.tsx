import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import ExpenseCard from "../components/ExpenseCard";
import { useApp } from "../context/AppContext";

export default function GroupDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const mode = params?.mode;
  const { groups = [], users = [], createGroup } = useApp() as any;

  // Create mode state
  const [name, setName] = useState("");
  const [type, setType] = useState<"public" | "private">("public");
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [manualMembers, setManualMembers] = useState("");

  const toggleMember = (id: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    if (!name.trim()) return;

    const manualList = manualMembers
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const members =
      users && users.length > 0
        ? users
            .filter((u: any) => selectedMemberIds.includes(u.id))
            .map((u: any) => ({ id: u.id, name: u.name ?? u.email }))
        : manualList.map((m) => ({ id: m, name: m }));

    const newGroup = {
      id: Date.now().toString(),
      name: name.trim(),
      type,
      members,
      expenses: [],
    };

    if (typeof createGroup === "function") {
      createGroup(newGroup);
    } else {
      console.log("createGroup not found in context. newGroup:", newGroup);
    }

    router.back();
  };

  if (mode !== "create") {
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
          group.expenses.map((e: any) => <ExpenseCard key={e.id} expense={e} />)
        )}
      </ScrollView>
    );
  }

  // Create mode UI
  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>
        Create Group
      </Text>

      <Text style={{ marginBottom: 6 }}>Group name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter group name"
        style={{
          borderWidth: 1,
          borderColor: "#E2E2E2",
          padding: 10,
          borderRadius: 8,
          marginBottom: 16,
        }}
      />

      <Text style={{ marginBottom: 6 }}>Type of group</Text>
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <Pressable
          onPress={() => setType("public")}
          style={{
            padding: 10,
            borderRadius: 8,
            marginRight: 8,
            backgroundColor: type === "public" ? "#007AFF" : "#F1F1F1",
          }}
        >
          <Text style={{ color: type === "public" ? "#fff" : "#000" }}>
            Public
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setType("private")}
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: type === "private" ? "#007AFF" : "#F1F1F1",
          }}
        >
          <Text style={{ color: type === "private" ? "#fff" : "#000" }}>
            Private
          </Text>
        </Pressable>
      </View>

      <Text style={{ marginBottom: 6 }}>Members</Text>
      {users && users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => (
            <Pressable
              onPress={() => toggleMember(item.id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: "#F0F0F0",
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  marginRight: 12,
                  borderWidth: 1,
                  borderColor: "#CCC",
                  backgroundColor: selectedMemberIds.includes(item.id)
                    ? "#007AFF"
                    : "#fff",
                }}
              />
              <Text>{item.name ?? item.email ?? item.id}</Text>
            </Pressable>
          )}
        />
      ) : (
        <>
          <Text style={{ marginBottom: 6, color: "#666" }}>
            No users available. You can add members manually (comma separated).
          </Text>
          <TextInput
            value={manualMembers}
            onChangeText={setManualMembers}
            placeholder="e.g. alice@example.com, bob@example.com"
            style={{
              borderWidth: 1,
              borderColor: "#E2E2E2",
              padding: 10,
              borderRadius: 8,
              marginBottom: 16,
            }}
          />
        </>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 24,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            padding: 12,
            borderRadius: 8,
            backgroundColor: "#F1F1F1",
            flex: 1,
            marginRight: 8,
            alignItems: "center",
          }}
        >
          <Text>Cancel</Text>
        </Pressable>

        <Pressable
          onPress={handleSave}
          style={{
            padding: 12,
            borderRadius: 8,
            backgroundColor: "#007AFF",
            flex: 1,
            marginLeft: 8,
            alignItems: "center",
            opacity: name.trim() ? 1 : 0.6,
          }}
          disabled={!name.trim()}
        >
          <Text style={{ color: "#fff" }}>Save</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

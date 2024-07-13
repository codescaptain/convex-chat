import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";

type StateType = {
  icon: string;
  name: string;
  desc: string;
};

const Create = () => {
  const [state, setState] = useState<StateType>({
    icon: "",
    name: "",
    desc: "",
  });

  const router = useRouter();
  const startGroup = useMutation(api.groups.create);

  const onCreateGroup = async () => {
    console.log("Creating group", state);
    
    await startGroup({
      icon_url: state.icon,
      name: state.name,
      description: state.desc,
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.textInput}
        value={state.name}
        onChangeText={(name) => setState({ ...state, name })}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textInput}
        value={state.desc}
        onChangeText={(desc) => setState({ ...state, desc })}
      />

      <Text style={styles.label}>Icon</Text>
      <TextInput
        style={styles.textInput}
        value={state.icon}
        onChangeText={(icon) => setState({ ...state, icon })}
      />

      <TouchableOpacity onPress={onCreateGroup} style={styles.button}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
      <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F8F5EA",
  },
  label: {
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#EEA217",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#EEA217",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Create;

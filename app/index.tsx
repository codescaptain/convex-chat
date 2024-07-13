import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Link } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";
import DialogContainer from "react-native-dialog/lib/Container";

const Page = () => {
  const groups = useQuery(api.groups.get, {}) || [];
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem('user'); 
      if (!user) {
        setTimeout(() => {
          setVisible(true);
        }, 100);
      } else {
        setName(user);
      }
    };
    loadUser();
  }, []);
  

  const setUser = async () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    const userName = `${name}#${r}`;
    await AsyncStorage.setItem('user', userName);
    setName(userName);
    setVisible(false);
  };
  

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {groups.map((group) => (
          <Link
            asChild
            key={group._id}
            href={{
              pathname: "/(chat)/[chatid]",
              params: { chatid: group._id },
            }}
          >
            <TouchableOpacity style={styles.group}>
              <Image
                source={{ uri: group.icon_url }}
                style={{ width: 50, height: 50 }}
              />
              <View style={{flex: 1}}>
                <Text>{group.name}</Text>
                <Text style={{color: 'gray'}}>{group.description}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
      <DialogContainer visible={visible}>
        <Dialog.Title>Username Required</Dialog.Title>
        <Dialog.Description>Please enter your username</Dialog.Description>
        <Dialog.Input value={name} onChangeText={setName} />
        <Dialog.Button label="Save" onPress={setUser} />
      </DialogContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F8F5EA",
  },

  group: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "black",
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22
  },
});

export default Page;

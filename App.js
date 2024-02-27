import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [quote, setQuote] = useState("");

  const callAPI = async () => {
    try {
      const res = await fetch(
        `https://famous-quotes4.p.rapidapi.com/random?category=all&count=2`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "cda81dd18fmshe8228aff552fd6cp12532fjsnd3dcb68d2e8f",
            "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setQuote(data[0].text || "Failed to fetch quote");
    } catch (err) {
      console.log(err);
      setQuote("Failed to fetch quote");
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ title: "Home" }}>
          {(props) => <HomeScreen {...props} quote={quote} />}
        </Stack.Screen>
        <Stack.Screen name="Profile" options={{ title: "Profile" }}>
          {(props) => <ProfileScreen {...props} setQuote={setQuote} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation, quote }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ margin: 10}}>
        <Text>{quote}</Text>
      </View>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

const ProfileScreen = ({ navigation, setQuote }) => {
  const callAPIAndRedirect = async () => {
    try {
      const res = await fetch(
        `https://famous-quotes4.p.rapidapi.com/random?category=all&count=2`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'cda81dd18fmshe8228aff552fd6cp12532fjsnd3dcb68d2e8f',
            'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
          }
        }
      );
      const data = await res.json();
      console.log(data);
      setQuote(data[0].text || 'Failed to fetch quote');
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
      setQuote('Failed to fetch quote');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ marginBottom: 10 }}>
        <Button title="Get A Quote and Go Home" onPress={callAPIAndRedirect} />
      </View>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};


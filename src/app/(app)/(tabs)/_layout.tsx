import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import { Pressable, PressableProps } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 80,
          paddingTop: 5,
        },
        tabBarButton: (props) => (
          <Pressable
            {...(props as any)}
            android_ripple={{
              color: "rgba(0, 0, 0, 0.17)",
              borderless: false,
              radius: 30,
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          headerShown: false,
          title: "Exercises",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          headerShown: false,
          title: "Workout",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-sharp" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="active-workout"
        options={{
          headerShown: false,
          title: "Active Workout",
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clockcircle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

import "../global.css";
import { Slot } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "react-native";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'

// Tu clave pública de Clerk (reemplaza con tu clave real)
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  )
}

export default function Layout() {
  
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Slot />
    </ClerkProvider>
  );
}

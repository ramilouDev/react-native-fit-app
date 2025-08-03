import React, { useCallback, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";
import { View, Button, TouchableOpacity, Text, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
  useWarmUpBrowser();

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();

  const onPress = useCallback(async () => {
    try {
      console.log("🚀 Iniciando flujo de autenticación...");
      
      // Para desarrollo, usar el redirect URI apropiado
      const redirectUri = __DEV__ 
        ? AuthSession.makeRedirectUri() // Expo development
        : AuthSession.makeRedirectUri({ scheme: "fit-app" }); // Production
      
      console.log("📱 Redirect URI:", redirectUri);
      console.log("🔧 Environment:", __DEV__ ? "Development" : "Production");
      
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: redirectUri
        });
      
      console.log("✅ Flujo completado:", { createdSessionId, signIn, signUp });
      
      // If sign in was successful, set the active session
      if (createdSessionId) {
        console.log("🎉 Sesión creada exitosamente:", createdSessionId);
        await setActive!({ session: createdSessionId });
        console.log("✅ Sesión establecida como activa");
        
        // Force navigation to the authenticated area
        router.replace("/(app)/(tabs)/");
      } else {
        console.log("⚠️ No se creó sesión, verificando signIn/signUp...");
        
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        if (signIn) {
          console.log("🔐 SignIn disponible:", signIn);
          // Handle additional sign-in steps if needed
        }
        
        if (signUp) {
          console.log("📝 SignUp disponible:", signUp);
          // Handle additional sign-up steps if needed
        }
        
        Alert.alert(
          "Autenticación pendiente",
          "Se requieren pasos adicionales para completar la autenticación."
        );
      }
    } catch (err: any) {
      console.error("❌ Error en autenticación:", err);
      console.error("❌ Error detallado:", JSON.stringify(err, null, 2));
      
      Alert.alert(
        "Error de autenticación", 
        err.message || "Ocurrió un error durante la autenticación"
      );
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white border-2 border-gray-200 rounded-xl py-4 shadow-sm"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-center">
        <Ionicons name="logo-google" size={20} color="#EA4335" />
        <Text className="text-gray-500 font-semibold text-lg ml-3">
          Continue with Google
        </Text>
      </View>
    </TouchableOpacity>
  );
}

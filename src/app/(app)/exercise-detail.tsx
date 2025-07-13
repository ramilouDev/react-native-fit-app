import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ExerciseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text>Hola {id}</Text>
    </SafeAreaView>
  );
}

export default ExerciseDetail;

import { client, urlfor } from "@/lib/sanity/client";
import { Exercise } from "@/lib/sanity/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { defineQuery } from "groq";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDifficultyColor, getDifficultyText } from "../utils/exercise-utils";

const singleExerciseQuery = defineQuery(
  `*[_type == "exercise" && _id == $id][0]`
);

function ExerciseDetail() {
  const router = useRouter();
  const [exercise, setExercise] = useState<Exercise>(null);
  const [isLoading, setisLoading] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    fetchExercise();
  }, [id]);

  async function fetchExercise() {
    if (!id) return;
    setisLoading(true);
    try {
      const exerciseData = await client.fetch(singleExerciseQuery, { id });
      setExercise(exerciseData);
      console.log(exerciseData);
    } catch (error) {
      console.error("Error feching exercise", error);
    } finally {
      setisLoading(false);
    }
  }
  if (isLoading) {
    return;
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="absolute top-12 left-0 right-0 z-10 px-4">
        <TouchableOpacity
          className="w-10 h-10 bg-black/20 rounded-full items-center justify-center backdrop-blur-sm"
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="h-80 bg-white relative">
          {exercise?.Image ? (
            <Image
              source={{ uri: urlfor(exercise.Image?.asset?._ref).url() }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
              <Ionicons name="fitness" size={80} color="white" />
            </View>
          )}
          <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></View>
        </View>

        <View className="px-6 py-6">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 mr-4">
              <Text className="text-3xl font-bold text-gray-800 mb-2">
                {exercise?.name}
              </Text>
              <View
                className={`self-start px-4 py-2 rounded-full ${getDifficultyColor(
                  exercise?.difficulty
                )}`}
              >
                <Text className="text-sm font-semibold text-white">
                  {getDifficultyText(exercise?.difficulty)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ExerciseDetail;

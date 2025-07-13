import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Exercise } from "@/lib/sanity/types";
import { urlfor } from "@/lib/sanity/client";
import Ionicons from "@expo/vector-icons/Ionicons";

const getDifficultyColor = (difficulty: string) => {
  difficulty = difficulty.toLowerCase();
  switch (difficulty) {
    case "beginner":
      return "bg-green-500";
    case "intermediate":
      return "bg-yellow-500";
    case "advanced":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getDifficultyText = (difficulty: string) => {
  difficulty = difficulty.toLowerCase();
  switch (difficulty) {
    case "beginner":
      return "Beginner";
    case "intermediate":
      return "Intermediate";
    case "advanced":
      return "Advanced";
    default:
      return "Unknown";
  }
};

interface ExerciseCardProps {
  item: Exercise;
  onPress: () => void;
  showChevron?: boolean;
}

export default function ExerciseCard({
  item,
  onPress,
  showChevron = true,
}: ExerciseCardProps) {
  /* console.log(JSON.stringify(item, null, 2)) */
  return (
    <TouchableOpacity
      className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100"
      onPress={onPress}
    >
      <View className="flex-row p-6 items-center">
        <View className="w-20 h-20 bg-white rounded-xl mr-4 overflow-hidden flex">
          {item.Image ? (
            <Image
              source={{ uri: urlfor(item.Image?.asset?._ref).url() }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
              <Ionicons name="fitness" size={24} color="black" />
            </View>
          )}
        </View>

        <View className="flex-1 justify-between">
          <View>
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {item.name}
            </Text>
            <Text className="text-sm text-gray-900 mb-2" numberOfLines={2}>
              {item.description || "No description available"}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View
              className={`px-3 py-1 rounded-full ${getDifficultyColor(
                item.difficulty
              )}`}
            >
              <Text className="text-xs text-white font-semibold">
                {getDifficultyText(item.difficulty)}
              </Text>
            </View>
            {showChevron && (
              <TouchableOpacity className="p-2" onPress={onPress}>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

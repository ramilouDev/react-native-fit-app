import { Rule, defineField } from "sanity";

export default {
  name: "exercise",
  title: "Exercise",
  type: "document",
  icon: () => "🏃",
  fields: [
    defineField({
      name: "name",
      title: "Exercise Name",
      type: "string",
      description: "Enter the name of the exercise.",
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Provide a detailed description of the exercise.",
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      description: "Select the difficulty level: Beginner, Intermediate, or Advanced.",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "Image",
      title: "Exercise Image",
      type: "image",
      description: "Upload an icon representing the exercise.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "Enter a link to a video demonstration of the exercise.",
      validation: (Rule) => Rule.uri({
        allowRelative: false,
        scheme: ["http", "https"],
      }),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Indicates if the exercise is currently active.",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      difficulty: "difficulty",
      media: "Image",
    },
    prepare(selection: any) {
      const { title, difficulty, media } = selection;
      return {
        title: title,
        subtitle: difficulty
          ? `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`
          : undefined,
        media,
      };
    },
  },
};
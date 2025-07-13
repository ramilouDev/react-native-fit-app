import { Rule, defineField, defineArrayMember } from "sanity";

export default {
  name: "workout",
  title: "Workout",
  type: "document",
  icon: () => "🏋️",
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      description: "The Clerk user ID of the person who performed the workout.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      description: "The date and time when the workout was performed.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration (seconds)",
      type: "number",
      description: "Total duration of the workout in seconds.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "exercises",
      title: "Workout Exercise",
      type: "array",
      description: "List of exercises performed in this workout, each with its sets.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "exercise",
              title: "Exercise",
              type: "reference",
              to: [{ type: "exercise" }],
              description: "Reference to the exercise performed.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "sets",
              title: "Sets",
              type: "array",
              description: "Sets performed for this exercise.",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "reps",
                      title: "Repetitions",
                      type: "number",
                      description: "Number of repetitions performed.",
                      validation: (Rule) => Rule.required().min(1),
                    }),
                    defineField({
                      name: "weight",
                      title: "Weight",
                      type: "number",
                      description: "Weight used for the exercise.",
                      validation: (Rule) => Rule.required().min(0),
                    }),
                    defineField({
                      name: "weightUnit",
                      title: "Weight Unit",
                      type: "string",
                      description: "Unit of weight (lbs or kg).",
                      options: {
                        list: [
                          { title: "Pounds (lbs)", value: "lbs" },
                          { title: "Kilograms (kg)", value: "kg" },
                        ],
                        layout: "radio",
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      reps: "reps",
                      weight: "weight",
                      weightUnit: "weightUnit",
                    },
                    prepare(selection: any) {
                      const { reps, weight, weightUnit } = selection;
                      return {
                        title: `${reps} reps @ ${weight} ${weightUnit}`,
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "exercise.name",
              sets: "sets",
              difficulty: "exercise.difficulty",
            },
            prepare(selection: any) {
              const { title, sets, difficulty } = selection;
              const setCount = sets ? sets.length : 0;
              return {
                title: title || "Exercise",
                subtitle: `${setCount} set(s)${
                  difficulty
                    ? ` • ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`
                    : ""
                }`,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      date: "date",
      duration: "duration",
      exercises: "exercises",
    },
    prepare(selection: any) {
      const { date, duration, exercises } = selection;
      const exerciseCount = exercises ? exercises.length : 0;
      const minutes = duration ? Math.round(duration / 60) : 0;
      return {
        title: `Workout on ${
          date ? new Date(date).toLocaleDateString() : "Unknown date"
        }`,
        subtitle: `${minutes} min, ${exerciseCount} exercise(s)`,
      };
    },
  },
};
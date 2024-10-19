import { object, string, boolean, date, z } from "zod";

export const PriorityEnum = ["LOW", "MEDIUM", "HIGH"] as const;
export type PriorityType = typeof PriorityEnum[number];

export const taskSchema = object({
  title: string()
    .min(3, { message: "Title must be of minimum 3 characters" })
    .max(100, { message: "Title must be of maximum 100 characters" }),
  description: string()
    .min(3, { message: "Author must be of minimum 3 characters" })
    .max(30, { message: "Author must be of maximum 300 characters" }),
  isCompleted: boolean(),
  priority: z.enum(PriorityEnum, {
    message: "Priority must be low, medium, or high",
  }),
  dueDate: string().transform((str) => new Date(str)),
});

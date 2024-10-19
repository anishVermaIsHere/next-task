"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid";
import { TaskModel } from "@/shared/model/task.model";

type AppState = {
  task: TaskModel | null;
  tasks: TaskModel[];
  taskListForSearch: TaskModel[];
  addTask: (task: Omit<TaskModel, "id">) => void;
  deleteTask: (id: string) => void;
  searchTask: (query: string) => void;
  updateTask: (id: string, task: Partial<TaskModel>) => void;
  completeTask: (id: string)=>void;
  sortTasks: (value: string)=>void;
  clearTasks: () => void;
  setTask: (task: TaskModel | null)=>void,
};

const useTaskStore = create<AppState>()(
  persist(
    (set) => ({
      task: null,
      tasks: [],
      taskListForSearch: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: nanoid(),
              ...task,
            },
          ],
          taskListForSearch: [
            ...state.taskListForSearch,
            {
              id: nanoid(),
              ...task,
            },
          ],
        })),
      deleteTask: (id) =>
        set((state) => {
            const restTasks = state.tasks.filter((task) => task.id !== id);
            return {
                tasks: restTasks,
                taskListForSearch: restTasks,
            }
        }),

      updateTask: (id, data) =>
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  ...data,
                }
              : task
          );
          return { tasks: updatedTasks, taskListForSearch: updatedTasks };
        }),

      searchTask: (query) =>
        set((state) => {
          if (query) {
            const searchList = state.taskListForSearch.filter((item) => {
              return (
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())
              );
            });
            return { tasks: searchList };
          } else {
            return { tasks: state.taskListForSearch };
          }
        }),
    setTask: (task)=>set({ task }),
    completeTask: (taskId)=>set((state)=>({
        tasks: state.tasks.map((task) => task.id == taskId ? { ...task, isCompleted: !task.isCompleted }: task )
    })),
    sortTasks: (value) =>
        set((state) => ({
          tasks: state.tasks
            .sort((a, b) => {
                let prioritySeq = {};
                if(value === 'LOW'){
                    prioritySeq = { HIGH: 3, MEDIUM: 2, LOW: 1 };
                } else {
                    prioritySeq = { HIGH: 1, MEDIUM: 2, LOW: 3 };
                }
              return prioritySeq[a.priority] - prioritySeq[b.priority];
            }),
        })),
      clearTasks: () =>
        set(() => ({
          tasks: [],
          taskListForSearch: [],
        })),
    }),
    {
      name: "task_lists",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : "{}"
      ),
    }
  )
);

export default useTaskStore;

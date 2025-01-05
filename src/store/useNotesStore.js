import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNoteStore = create(
  persist(
    (set) => ({
      notes: [],
      addNote: (note) => {
        set((state) => ({
          notes: [...state.notes, note],
        }));
      },
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },
    }),
    {
      name: "notes-storage", // Persist to localStorage
    }
  )
);

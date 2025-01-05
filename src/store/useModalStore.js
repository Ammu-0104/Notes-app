// store/useModalStore.js
import { create } from "zustand";

const useModalStore = create((set) => ({
  modalIsOpen: false,
  selectedNote: null, // Track the selected note
  openModal: (note = null) => set({ modalIsOpen: true, selectedNote: note }),
  closeModal: () => set({ modalIsOpen: false, selectedNote: null }),
}));

export default useModalStore;

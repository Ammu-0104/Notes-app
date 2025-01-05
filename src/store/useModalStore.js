// store/useModalStore.js
import { create } from "zustand";

const useModalStore = create((set) => ({
  modalIsOpen: false,
  openModal: () => set({ modalIsOpen: true }),
  closeModal: () => set({ modalIsOpen: false }),
}));

export default useModalStore;

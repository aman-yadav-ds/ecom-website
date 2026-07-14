import { create } from 'zustand';

interface ModalState {
  isJoinModalOpen: boolean;
  openJoinModal: () => void;
  closeJoinModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isJoinModalOpen: false,
  openJoinModal: () => set({ isJoinModalOpen: true }),
  closeJoinModal: () => set({ isJoinModalOpen: false }),
}));

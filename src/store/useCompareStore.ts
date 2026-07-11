import { create } from 'zustand';

interface CompareState {
  selectedProductIds: string[];
  toggleProduct: (id: string) => void;
  removeProduct: (id: string) => void;
  clearAll: () => void;
}

export const useCompareStore = create<CompareState>((set) => ({
  selectedProductIds: [],
  toggleProduct: (id) =>
    set((state) => {
      const isSelected = state.selectedProductIds.includes(id);
      if (isSelected) {
        return {
          selectedProductIds: state.selectedProductIds.filter((pId) => pId !== id),
        };
      }
      
      if (state.selectedProductIds.length >= 3) {
        // We can't add more than 3 products. 
        // We could also show a toast here if we want to integrate sonner or react-hot-toast.
        return state;
      }

      return {
        selectedProductIds: [...state.selectedProductIds, id],
      };
    }),
  removeProduct: (id) =>
    set((state) => ({
      selectedProductIds: state.selectedProductIds.filter((pId) => pId !== id),
    })),
  clearAll: () => set({ selectedProductIds: [] }),
}));

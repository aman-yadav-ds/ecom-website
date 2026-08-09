import { create } from "zustand";

export interface RfqItem {
  productId: string;
  variantId?: string;
  name: string;
  coverImage?: string;
  quantity: number;
  moq?: string;
}

interface RfqStore {
  items: RfqItem[];
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  addItem: (item: {
    productId: string;
    variantId?: string;
    name: string;
    coverImage?: string;
    quantity?: number;
    moq?: string;
  }) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clear: () => void;
  totalItems: () => number;
}

export const useRfqStore = create<RfqStore>((set, get) => ({
  items: [],
  isOpen: false,

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (item) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );

      const addQty = item.quantity && item.quantity > 0 ? item.quantity : 1;

      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + addQty,
        };
        return { items: updated, isOpen: true };
      }

      return {
        items: [
          ...state.items,
          {
            productId: item.productId,
            variantId: item.variantId,
            name: item.name,
            coverImage: item.coverImage,
            quantity: addQty,
            moq: item.moq,
          },
        ],
        isOpen: true,
      };
    });
  },

  removeItem: (productId, variantId) => {
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      ),
    }));
  },

  updateQuantity: (productId, quantity, variantId) => {
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter(
              (item) => !(item.productId === productId && item.variantId === variantId)
            )
          : state.items.map((item) =>
              item.productId === productId && item.variantId === variantId
                ? { ...item, quantity }
                : item
            ),
    }));
  },

  clear: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));

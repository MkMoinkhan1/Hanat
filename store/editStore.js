import { create } from "zustand";

export const useUsersStore = create((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  editItem: (item) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === item.id ? item : i)),
    })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));

export const useServiceProvidersStore = create((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  editItem: (item) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === item.id ? item : i)),
    })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));

export const useFeedbackFormsStore = create((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));

export const useTicketsStore = create((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));    
export const useResourcesStore = create((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));    
export const useRoleManagementStore = create((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));    
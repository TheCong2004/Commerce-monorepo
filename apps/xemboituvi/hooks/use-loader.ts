import { create } from "zustand";

interface LoaderStore {
   isShown: boolean;
   isCompleted: boolean;
   show: () => void;
   hide: () => void;
   complete: () => void;
}

const useLoader = create<LoaderStore>((set) => ({
   isShown: true,
   isCompleted: false,
   show: () => set({ isShown: true }),
   hide: () => set({ isShown: false }),
   complete: () => set({ isCompleted: true, isShown: false }),
}));

export default useLoader;
import { create } from "zustand";


type AppState = {
    isFormOpen: boolean;      
    isEdit: boolean;
    setIsFormOpen: () => void; 
    setIsEdit: (value: boolean) => void;
};

const useCommonStore = create<AppState>((set) => ({
  isFormOpen: false,
  isEdit: false,
  setIsFormOpen: () =>
    set((state) => ({
      isFormOpen: !state.isFormOpen,
    })),
  setIsEdit: (value: boolean) => set({
    isEdit: value
  })
}));

export default useCommonStore;

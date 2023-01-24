import { create } from "zustand";
import { persist } from 'zustand/middleware';

const useStore = create(
    set => ({
        output: '',
        newOutput: (input) => set(state => ({ output: input }))
    })
)

export default useStore;
import create from "zustand";
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set, get) => ({
            output: null,
            newOutput: (input) => {
                set((state) => ({
                    output: `<p>${input}</p>`.replace('\n', '<br>')
                }))
            }
        })
    )
)

export default useStore;
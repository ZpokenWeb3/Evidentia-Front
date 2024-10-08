import { enableMapSet } from 'immer'
import { create, StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createUserSlice, UserSlice } from './user'

enableMapSet()

export interface AllSlices {
	user: UserSlice
}

export type SliceCreator<SliceInterface> = StateCreator<
	AllSlices,
	[['zustand/immer', never]],
	[],
	SliceInterface
>

export const initializeStore = () => {
	return immer((setState, getState: () => AllSlices, store) => ({
		user: createUserSlice()(setState, getState, store),
	}))
}

export const useStore = create<AllSlices>()(initializeStore())

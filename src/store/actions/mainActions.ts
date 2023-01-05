import { PayloadAction } from "@reduxjs/toolkit"
import { User as FirebaseUser } from "firebase/auth"
import { addCode } from "../../api/firebase"
import { IItemCode } from "../../services/types"
import { IStore } from "../redusers/main/types"

export type MainActions = {
	setUser: (state: IStore, payload: PayloadAction<FirebaseUser | null>) => void
	setLoading: (state: IStore, payload: PayloadAction<boolean>) => void
	setModal: (state: IStore, payload: PayloadAction<IItemCode | boolean>) => void
	setCodeBase: (state: IStore, payload: PayloadAction<IItemCode[]>) => void
	editeItem: (state: IStore, payload: PayloadAction<IItemCode>) => void
	copyCode: (state: IStore, payload: PayloadAction<number>) => void
	deleteCode: (state: IStore, payload: PayloadAction<number>) => void
	setFilterData: (state: IStore, payload: PayloadAction<IItemCode[]>) => void
}

export const mainActions: MainActions = {
	setUser: (state, { payload }) => {
		state.user = payload
	},
	setModal: (state, { payload }) => {
		state.modalOpen = payload
	},
	setLoading: (state, { payload }) => {
		state.loading = payload
	},
	setCodeBase: (state, { payload }) => {
		state.codeBase = payload

		if (state.user) {
			addCode(state.user, payload)
		}
		state.loading = false
	},
	editeItem: (state, { payload }) => {
		state.codeBase = state.codeBase.map((item: IItemCode) => {
			if (item.id === payload.id) {
				item.code = payload.code
				item.description = payload.description
				item.tags = payload.tags
				item.title = payload.title
			}
			return item
		})

		if (state.user) {
			addCode(state.user, state.codeBase)
		}
	},
	copyCode: (state, { payload }) => {
		state.codeBase = state.codeBase?.map((c: any) => {
			if (c.id === payload) {
				c.copy = c.copy + 1
			}
			return c
		})

		if (state.user && state.codeBase?.length) {
			addCode(state.user, state.codeBase)
		}
	},
	deleteCode: (state, { payload }) => {
		state.codeBase = state.codeBase?.filter((c: any) => c.id !== payload)

		if (state.user && state.codeBase) {
			addCode(state.user, state.codeBase)
		}
	},
	setFilterData: (state, { payload }) => {
		state.filterList = payload
	},
}

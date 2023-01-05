import { User as FirebaseUser } from "firebase/auth"
import { IItemCode } from "../../../services/types"

export type IStore = {
	user: FirebaseUser | null
	codeBase: IItemCode[] | any
	filterList: IItemCode[] | null | undefined
	loading: boolean
	modalOpen: IItemCode | boolean
}

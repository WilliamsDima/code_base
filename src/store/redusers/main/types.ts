import { User as FirebaseUser } from "firebase/auth";
import { IItemCode } from "../../../services/types";

export type IStore = {
    user: FirebaseUser | null
    codeBase: IItemCode[] | null | undefined
    filterList: IItemCode[] | null | undefined
}
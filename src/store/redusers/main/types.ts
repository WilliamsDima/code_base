import { User as FirebaseUser } from "firebase/auth";

export interface IStore {
    user: FirebaseUser | null
}
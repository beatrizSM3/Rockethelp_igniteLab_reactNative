import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type OrderDTO = {
    patrimony: string;
    created_at: FirebaseFirestoreTypes.Timestamp;
    description: string;
    solution?: string;
    status: boolean;
    closed_at?: FirebaseFirestoreTypes.Timestamp;

}
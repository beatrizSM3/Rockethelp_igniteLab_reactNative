import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'

export function firestoreDateFormat(timestamp: FirebaseFirestoreTypes.Timestamp): string {
   if(!timestamp) return ''

    const date = new Date(timestamp.toDate())
    const day = date.toLocaleDateString('pt-BR')

    const hour = date.toLocaleTimeString('pt-BR')

    return `${day} às ${hour}`
}
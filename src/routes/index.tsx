import {NavigationContainer} from '@react-navigation/native'
import auth , {FirebaseAuthTypes}from '@react-native-firebase/auth'
import { AppRoutes } from './app.routes'
import { useState, useEffect } from 'react'
import { Loading } from '../components/Loading'
import { SignIn } from '../screens/SignIn'

export function Routes() {

    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(
            response => {
                setUser(response)
                setLoading(false)
            }
        )
        return subscriber
    }, [])

    if (loading) {
        return <Loading/>
    }

    return(
        <NavigationContainer>
            {user ? <AppRoutes/> : <SignIn/>}
           
        </NavigationContainer>
    )
}
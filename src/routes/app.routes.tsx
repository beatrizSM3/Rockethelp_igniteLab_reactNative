import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Details } from '../screens/Details'
import { Home } from '../screens/Home'
import { Register } from '../screens/Register'
import { SignIn } from '../screens/SignIn'


const {Navigator, Screen} = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator screenOptions={{headerShown: false}}>
        <Screen name='home' component={Home}/>
        <Screen name='details' component={Details}/>
        <Screen name='new' component={Register}/>
        {/* <Screen name='SignIn' component={SignIn}/> */}
        </Navigator>
    )
}

import {Roboto_400Regular, Roboto_700Bold, useFonts} from '@expo-google-fonts/roboto'
import { NativeBaseProvider, StatusBar } from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { THEME } from './src/style/theme';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})

  return (

    <SafeAreaProvider >
      <NativeBaseProvider  theme={THEME}>
        <StatusBar barStyle='light-content' backgroundColor='transparent' translucent/>
        { fontsLoaded ?  <Routes /> : <Loading/>}
      </NativeBaseProvider>
    </SafeAreaProvider>

  );
}


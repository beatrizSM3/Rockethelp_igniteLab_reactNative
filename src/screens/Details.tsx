import { useRoute } from "@react-navigation/native";
import { VStack } from "native-base";
import { Header } from "../components/Header";


type routesParams = {
    orderId: string;
}


export function Details() {

    const route = useRoute()

    const {orderId} = route.params as routesParams

    return (
        <VStack flex={1} bg="gray.700">
            <Header title="Detalhes" />
        </VStack>
    )
}
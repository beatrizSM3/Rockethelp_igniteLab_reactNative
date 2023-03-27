import firestore, { firebase} from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CloseIcon, HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { OrderProps } from "../components/Orders";
import { OrderDTO } from "../DTOs/OrderDTO";
import { firestoreDateFormat } from "../utils/firestoreDateFormat";
import { CircleWavyCheck, DesktopTower, Hourglass, Clipboard } from "phosphor-react-native";
import { CardDetails } from "../components/CardDetails";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { AlertComponent } from "../components/Alert";


type routesParams = {
    orderId: string;
}

type OrderDetails = OrderProps & {
    description: string;
    solution: string;
    closed: string;
   
}


export function Details() {

    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [solution, setSolution] = useState<string>('')
    const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)
    const navigation = useNavigation()
    const route = useRoute()

    const {colors} = useTheme()

    const {orderId} = route.params as routesParams

    async function getOrderDetails() {
        const ordersRef = firebase.firestore().collection<OrderDTO>( 'orders')

        const queryData = await ordersRef.doc(orderId).get().then(doc => {
            const {patrimony, description, created_at, status, solution, closed_at} = doc.data()
            console.log(doc.data())

            setOrder({
                id: doc.id,
                patrimony,
                description,
                when: firestoreDateFormat(created_at),
                status,
                solution,
                closed: closed_at? firestoreDateFormat(closed_at): null
            })
            setIsLoading(false)
        })

    }

    function handleOrderClose() {

        if (!solution) {
            setShow(!show)
            return

        }

        setIsLoading(true)
        const ordersRef = firebase.firestore().collection<OrderDTO>( 'orders')

        ordersRef.doc(orderId).update({
            status: false,
            solution,
            closed_at: firestore.FieldValue.serverTimestamp()
        }).then(() => {
            // setOrder({
            //     ...order,
            //     status: false,
            //     closed: firestoreDateFormat(new Date())
            // })
            setSolution('')
            setIsLoading(false)
            navigation.goBack()
        }).catch(err => {
            console.log(err)
        })

       
    }

    useEffect(() => {

        getOrderDetails()

    }, [])

    if(isLoading) {
        return <Loading/>
    }

    return (
        <VStack flex={1} bg="gray.700">
 
            <Header title="Detalhes" />
            <HStack bg="gray.500" justifyContent="center" p={4}>


                           
{show && (
                  <AlertComponent 
                  w="100%" 
                  zIndex={1} 
                  position="absolute" 
               
                  message="Digite a solução" 
                  setShow={setShow} 
                  show={show} 
                  status={"error"}
                  icon={<CloseIcon size="3" />}
                  
                  />
            )}



                {
                    !order.status ? <CircleWavyCheck size={22} color={colors.green[300]}/>: <Hourglass size={22} color={colors.secondary[700]}/>
                }

                <Text
                    fontSize="sm"
                    color={order.status ? colors.secondary[700]: colors.green[300]}
                    ml={2}
                    textTransform="uppercase"

                >
                    {order.status ? 'Em andamento': 'Finalizado'}
                </Text>

              

            </HStack>
            <ScrollView mx={5} showsVerticalScrollIndicator={false}>
                <CardDetails 
                title="equipamento"
                description={`Patrimônio: ${order.patrimony}`}
                icon={DesktopTower}
              
                />

<CardDetails 
                title="descrição"
                description={order.description}
                icon={Clipboard}
                footer={`Registrado em ${order.when}`}
               
                />

                        
        <CardDetails 
                        title="solução do problema"
                
                        icon={CircleWavyCheck}
                        description={order.solution}
                    footer={order.closed && `Encerrado em ${order.closed}`}
                        >
                           { 
                           order.status && <Input  placeholder="Descrição da solução"
                            onChangeText={setSolution}
                            h={24}
                            textAlignVertical="top"
                            multiline
                            value={solution}

                            >
                            </Input>
}
        </CardDetails>
            </ScrollView>

            {
                order.status && <Button title="Encerrar solicitação" m={5} onPress={handleOrderClose} isLoading={isLoading}></Button>
            }

        </VStack>
    )
}
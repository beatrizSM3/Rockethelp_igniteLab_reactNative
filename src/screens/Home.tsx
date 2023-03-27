import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center, CloseIcon} from "native-base"
import auth from "@react-native-firebase/auth"
import firestore, { firebase } from "@react-native-firebase/firestore"
import { ChatTeardropText, SignOut } from "phosphor-react-native"
import { useEffect, useState } from "react"
import Logo from "../assets/logo_secondary.svg"
import { Filter } from "../components/Filter"
import { Order, OrderProps } from "../components/Orders"
import { Button } from "../components/Button"
import { useNavigation } from "@react-navigation/native"
import { AlertComponent } from "../components/Alert"
import { firestoreDateFormat } from "../utils/firestoreDateFormat"
import { Loading } from "../components/Loading"

export function Home() {

   
    const [isLoading, setIsLoading] = useState(true)
    const [show, setShow] = useState(false)
    const [statusSeleted, setStatusSelected] = useState<boolean>(true)
    const [orders, setOrders] = useState<OrderProps[]>([
       
    ])
    const { colors } = useTheme()
    const navigation = useNavigation()

    async function getOrdersFirestore() {

        const ordersRef = firebase.firestore().collection( 'orders')

        const queryData = await ordersRef.where('status', '==', statusSeleted? true: false  ).onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => {
               const {patrimony, description, created_at, status} = doc.data()
               console.log(doc.data())

                return {
                    id: doc.id,
                    patrimony,
                    description,
                    when: firestoreDateFormat(created_at),
                    status
                }
            })
            setOrders(data)
            setIsLoading(false)
        
            
        })

       

        return queryData
    }

    useEffect(() => {
        setIsLoading(true)


        getOrdersFirestore()
       
    },[statusSeleted])


  

    function handleOpenNewOrder() {
        navigation.navigate('new')
    }

    function handleOpenDetails(orderId: string) {
        navigation.navigate('details', {orderId})
    }

    function handleLogout() {
        auth().signOut().catch(error => {


            console.log(error)
            setShow(!show)
        
            return 
        }
            
      
        )
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.700" pb={6}>

            {show && (
                  <AlertComponent 
                  w="100%" 
                  zIndex={1} 
                  position="absolute" 
                  top="50%" 
                  bottom="50%"
                  message="Error ao sair" 
                  setShow={setShow} 
                  show={show} 
                  status={"error"}
                  icon={<CloseIcon size="3" />}
                  
                  />
            )}

           <HStack
             w="full"
             justifyContent="space-between"
             alignItems="center"
             bg="gray.600"
             pt={12}
             pb={5}
             px={6}>
                <Logo />
                <IconButton
                    icon={<SignOut size={26} color={colors.gray[300]} />}
                    onPress={handleLogout}
                />

            </HStack>

            <VStack flex={1} px={8} w="full">
                <HStack mt={8} mb={4} justifyContent="space-between" alignItems="center" >
                    <Heading color="gray.100">
                       Solicitações
                    </Heading>
                    <Text color="gray.200" ml={4}>
                        {orders.length}
                    </Text>
                </HStack>

                <HStack space={3} mb={8}>
                    <Filter
                        title="Em andamento"
                        type="open"
                        onPress={() => setStatusSelected(true)}
                        isActive={statusSeleted === true}

                    />

                    <Filter
                        title="Finalizados"
                        type="closed"
                        onPress={() => setStatusSelected(false)}
                        isActive={statusSeleted === false}
                    />

                </HStack>

               { isLoading? <Loading/>: <FlatList
                    data={orders}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <Order data={item} onPress={()=> handleOpenDetails(item.id)}/>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 100}}
                    ListEmptyComponent={()=> (
                        <Center>
                            <ChatTeardropText color={colors.gray[300]} size={40}/>
                            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                                Você ainda não possui {'\n'} solicitações
                                {statusSeleted ? 'em andamento' : 'finalizadas'}
                            </Text>
                        </Center>
                    )}
                    
                />
                }

                <Button title="Nova solicitação" onPress={handleOpenNewOrder} />
            </VStack>



        </VStack>
    )
}
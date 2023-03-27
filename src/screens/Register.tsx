import { CloseIcon, VStack } from "native-base";
import { useState } from "react";
import { AlertComponent } from "../components/Alert";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from "@react-navigation/native";



export function Register() {

    const [show, setShow] = useState(false)
    const [alertType, setAlertType] = useState({
        type: '',
        message: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [description, setDescription] = useState('')
    const [patrimony, setPatrimony] = useState('')

    const navigation = useNavigation()



    function handleNewOrderRegister() {
        if (!patrimony || !description) {
            setShow(!show)
            setAlertType({type: 'error', message: 'Preencha todos os campos'})
            return 
        }
        setIsLoading(true)

        firestore()
        .collection('orders')
        .add({
            patrimony,
            description,
            status: true,
            created_at: firestore.FieldValue.serverTimestamp(),

        })
        .then(()=>{
            setIsLoading(false)
            setAlertType({type: 'success', message: 'Solicitação cadastrada com sucesso'})
            setShow(!show)
            setDescription('')
            setPatrimony('')
        
            // navigation.goBack() se voltar o alert de sucesso não aparece devido a velocidade
        })
        .catch((error)=>{
            setIsLoading(false)
            setAlertType({type: 'error', message: 'Erro ao cadastrar solicitação'})
            setShow(!show)
            console.log(error)
        })
    }

    return(
        <VStack flex={1} p={6} bg="gray.600">




                <Header title="Nova solicitação"/>

                <Input
                placeholder="Número do patrimônio"
                mt={4}
                onChangeText={setPatrimony}
                value={patrimony}
                />

                                
                {show && (
                    <AlertComponent 
                      w="100%" 
                      zIndex={1} 
                      position="absolute" 
                      alignSelf="center"
                      top="20%" 
                
                      message={alertType.message}
                      setShow={setShow} 
                      show={show} 
                      status={alertType.type}
                      icon={<CloseIcon size="3" />}
                      
                      />
                )}

                <Input
                placeholder="Descrição do problema"
                mt={5}
                flex={1}
                multiline
                textAlignVertical="top"
                onChangeText={setDescription}
                value={description}
                />

                <Button
                title="Cadastrar"
                mt={5}
                isLoading={isLoading}
                onPress={handleNewOrderRegister}
                />
        </VStack>
    )
}
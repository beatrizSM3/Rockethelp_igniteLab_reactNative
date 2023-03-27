import { VStack, Heading, Icon, useTheme, Alert as AlertNativeBase, HStack, CloseIcon, IconButton, Text } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import Logo from "../assets/logo_primary.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AlertComponent } from "../components/Alert";


export function SignIn() {

    const [errorMessage, setErrorMessage] = useState("")
    const [email, setEmail] = useState("")
   
    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [password, setPassword] = useState("")

    const { colors } = useTheme()

    async function handleSignIn() {
       if (!email || !password) {   
        setErrorMessage("Insira E-mail e senha válidos")
          setShow(!show)
          return 
       }
       setIsLoading(true)


     
       await auth().signInWithEmailAndPassword(email, password)
       .then((response) => {


       })
       
       .catch(error => {
        // console.log("testeeeeeeee")

            
            setIsLoading(false)
            // setErrorMessage (error.message.split("]")[1])

            switch (error.code) {
                case "auth/invalid-email":
                    setErrorMessage("E-mail inválido")
                    break;
                case "auth/user-disabled":
                    setErrorMessage("Usuário desativado")
                    break;
                case "auth/user-not-found":
                    setErrorMessage("E-mail ou senha inválida")
                    break;
                case "auth/wrong-password":
                    setErrorMessage("E-mail ou senha inválida")
                    break;
                default:
                    setErrorMessage("Erro ao realizar login")
            }
          
            




            setShow(!show)

           
         

           
       })
      
       
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>

                    {show && (

                        <AlertComponent 
                            w="100%" 
                            zIndex={1} 
                            position="absolute" 
                            top="50%" 
                            bottom="50%"
                            message={errorMessage} 
                            setShow={setShow} 
                            show={show} 
                            status={"error"}
                            icon={<CloseIcon size="3" />}

                        />

                    )}

           
            <Logo />
            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Acesse sua conta
            </Heading>

          

            <Input
                placeholder="E-mail"
                mb={4}
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4}
                />}
                onChangeText={setEmail}
            />



            <Input
                placeholder="Senha"
                secureTextEntry mb={8}
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />}
                    ml={4}
                />}
                onChangeText={setPassword}
            />

            <Button title="Entrar" w="full" onPress={()=> handleSignIn()} isLoading={isLoading}/>

        </VStack>
    )
}
import { VStack, Alert as AlertNativeBase, HStack, CloseIcon, IconButton, Text, IAlertProps } from "native-base";

type AlertProps = IAlertProps & {
    show: boolean;
    status: "error" | "warning" | "info" | "success"| string;
    message?: string;
    setShow: (value: boolean) => void;
    icon?: JSX.Element;
}


export function AlertComponent({show, status, message="Insira E-mail e senha válidos", setShow,icon, ...rest}: AlertProps) {

    return (
        <AlertNativeBase  status={status} {...rest} >
            <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                <AlertNativeBase.Icon mt="1" />
                <Text fontSize="sm" color="gray.800">
                   {message}
                </Text>
                </HStack>
                <IconButton variant="unstyled" _focus={{
            borderWidth: 0
            }} icon={icon} _icon={{
            color: "gray.600"
            }} onPress={() => setShow(!show)}/>
            </HStack>
        </VStack>
        
      </AlertNativeBase>
    )
}
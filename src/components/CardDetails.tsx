import { Box, HStack, Text, useTheme, VStack } from "native-base";
import { IconProps} from "phosphor-react-native";


type OrderDetails = {
    title: string;
    description?: string;
    footer?: string;
    icon: React.ElementType<IconProps>;
    children?: React.ReactNode;
}

export function CardDetails({icon: Icon, title, children, description, footer=null}: OrderDetails) {

    const {colors} = useTheme()
    return(
        <VStack bg="gray.600" p={5} mt={5} rounded="sm">
            <HStack  alignItems="center" mb={4}>
                <Icon color={colors.primary[700]} size={24} />
                <Text ml={2} fontSize="sm" color="gray.300" textTransform="uppercase">{title}</Text>

            </HStack>

            {
                description && <Text fontSize="md" color="gray.100" mb={4}>{description}</Text>
            }

            {children}

            {
                !!footer && <Box borderTopWidth={1} borderTopColor="gray.400" mt={3}>
                   
                    <Text mt={3} color="gray.300" fontSize="sm">
                        {footer}
                    </Text>
                    </Box>
            }

        </VStack>
    )
}
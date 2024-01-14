import {
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import SignInLayout from "../components/layout/signinLayout";
import LoginForm from "../components/login/LoginForm";

export default function LoginPage() {
  return (
    <>
      <SignInLayout>
        <VStack w="full" borderRadius={"1rem"} bgColor={"white"} spacing={"5"}>
          <Flex w="full" justify={"start"} flexDir="column">
            <Text
              as="h1"
              fontWeight={500}
              fontSize={"1.4rem"}
              color="black"
              my=".5rem"
            >
              Log in to Trello
            </Text>
          </Flex>
          <LoginForm />
        </VStack>
      </SignInLayout>
    </>
  );
}

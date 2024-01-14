import { useState } from "react";

import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { LoginService } from "../../service/login";
import { LoginState } from "../../types/app.constants";
import { ROUTES } from "../../utils/app.constants";

interface Props {}
const LoginForm = (props: Props) => {
    const toast = useToast();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const [show, setShow] = useState<boolean>(false);
    const handleClick = () => setShow(!show);
    const [isLoading, setIsLoading] = useState(false);
  
    const loginHandler = (values: any) => {
      try {
        setIsLoading(true);
  
        LoginService.onUserLogin(values as LoginState);
        toast({
          title: "Signed Up Succussfully",
          status: "success",
          duration: 1000,
          isClosable: true,
          id: 'success'
        });
  
        window.location.href = ROUTES.BASE_PATH;
      } catch (error: any) {
        toast({
          position: "top",
          title: error?.message,
          status: "error",
          variant: "left-accent",
          isClosable: true,
          id: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };
  return (
    <form
            style={{ width: "100%", height: "100%" }}
            onSubmit={handleSubmit(loginHandler)}
          >
            <Flex w="full" marginY={["2", "5", "5"]} flexDir={"column"}>
              <Input
                focusBorderColor="none"
                size={["sm", "md"]}
                autoComplete="email"
                {...register("email", {
                  required: "Please enter valid email",
                })}
                id="email"
                placeholder={"Enter email address"}
              />
              {errors?.email?.message && (
                <Text className="error-message" as="p" fontSize={"0.8rem"} color="red">
                  {errors?.email?.message as any}
                </Text>
              )}
            </Flex>

            <Flex w="full" marginY={["2", "5", "5"]} flexDir={"column"}>
              <InputGroup size={["sm", "md"]}>
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Please enter valid Password",
                  })}
                  id="password"
                />
                <InputRightElement width={["3rem", "4.5rem"]}>
                  <Button h="1.75rem" size={["xs", "sm"]} onClick={handleClick}>
                    {!show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors?.password?.message && (
                <Text className="error-message" as="p" fontSize={"0.8rem"} color="red">
                  {errors?.password?.message as any}
                </Text>
              )}
            </Flex>
            <Flex
              w="full"
              mt={["7", "5", "5"]}
              justify={"space-between"}
              align="center"
            >
              <Button
                isDisabled={isLoading}
                isLoading={isLoading}
                border="1px solid #4475d9"
                type="submit"
                size={["sm", "md"]}
              >
                Submit
              </Button>

              <Text
                as="a"
                href="/signup"
                fontSize={["0.8rem", "0.8rem", "0.8rem", "0.8rem", "0.9rem"]}
                fontWeight="500"
                color="#4475d9"
              >
                Create a new account
              </Text>
            </Flex>
          </form>
  )
}
export default LoginForm
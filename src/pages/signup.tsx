import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useBoolean,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { UserDataType } from "../types/app.constants";
import { SignupService } from "../service/signup";
import { useNavigate } from "react-router-dom";
import SignInLayout from "../components/layout/signinLayout";
import { ROUTES } from "../utils/app.constants";

export default function SignUp() {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password", ""); // Get the value of password field
  const [show, setShow] = useBoolean();
  const [isLoading, setIsLoading] = useState(false);

  const signUpHandleSubmit = async (values: UserDataType | any) => {
    try {
      setIsLoading(true);
      SignupService.onUserSignUp({ ...values, id: uuidv4() } as UserDataType);
      toast({
        position: "top",
        title: "Account created.",
        description:
          "We've created your account. Redirecting you to login page in 3 seconds ",
        status: "success",
        duration: 2500,
        isClosable: true,
        id: "success",
      });

      setTimeout(() => {
        window.location.href = ROUTES.LOGIN;
      }, 3000);
    } catch (err: any) {
      toast({
        position: "top",
        title: "User already exist with same email",
        status: "error",
        variant: "left-accent",
        isClosable: true,
        id: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  console.log({errors, message : errors?.confirmPassword?.message})
  return (
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
            Sign Up
          </Text>
          <Text as="h4" color="black">
            Fill in the fields below to sign into your account
          </Text>
        </Flex>

        <form
          style={{ width: "100%", height: "100%" }}
          onSubmit={handleSubmit(signUpHandleSubmit)}
        >
          <Flex marginY={["2", "5", "5"]} w="full" flexDir={"column"}>
            <Input
              focusBorderColor="none"
              size={["sm", "md"]}
              {...register("name", {
                required: "Please enter valid username",
                minLength: 3,
                maxLength: 80,
              })}
              placeholder={"Enter Username"}
              autoComplete="off"
              id="username"
            />
            {errors?.name?.message && (
              <Text
                as="p"
                className="error-message"
                fontSize={"0.8rem"}
                color="red"
              >
                {errors?.name?.message as any}
              </Text>
            )}
          </Flex>

          <Flex marginY={["2", "5", "5"]} w="full" flexDir={"column"}>
            <Input
              focusBorderColor="none"
              size={["sm", "md"]}
              {...register("email", {
                required: "Please enter valid email",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder={"Enter Email"}
              autoComplete="off"
              id="email"
            />
            {errors?.email?.message && (
              <Text
                as="p"
                className="error-message"
                fontSize={"0.8rem"}
                color="red"
              >
                {errors?.email?.message as any}
              </Text>
            )}
          </Flex>

          <Flex marginY={["2", "5", "5"]} w="full" flexDir={"column"}>
            <InputGroup size={["sm", "md"]}>
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                autoComplete="off"
                placeholder="Create Password"
                {...register("password", {
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
                id="password"
              />
              <InputRightElement width={["3rem", "4.5rem"]}>
                <Button
                  h="1.75rem"
                  size={["xs", "sm"]}
                  onClick={setShow.toggle}
                >
                  {!show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors?.password?.message && (
              <Text
                as="p"
                className="error-message"
                fontSize={"0.8rem"}
                color="red"
              >
                {errors?.password?.message as any}
              </Text>
            )}
          </Flex>
          <Flex marginY={["2", "5", "5"]} w="full" flexDir={"column"}>
            <InputGroup size={["sm", "md"]}>
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                autoComplete="off"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Password doesn't match",
                  minLength: { value: 8, message: "Too short" },
                  validate: (value) =>{
                    console.log({ value, password, validate : value === password })
                    return value === password || 'Passwords do not match';
                  },
                })}
                id="confirmPassword"
              />
              <InputRightElement width={["3rem", "4.5rem"]}>
                <Button
                  h="1.75rem"
                  size={["xs", "sm"]}
                  onClick={setShow.toggle}
                >
                  {!show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors?.confirmPassword?.message && (
              <Text
                as="p"
                className="error-message"
                fontSize={"0.8rem"}
                color="red"
              >
                {errors?.confirmPassword?.message as any}
              </Text>
            )}
          </Flex>
          <Flex
            mt={["7", "5", "5"]}
            w="full"
            justify={"space-between"}
            align="center"
          >
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              border="1px solid #4475d9"
              type="submit"
              size={["sm", "md"]}
            >
              Sign Up
            </Button>

            <Text
              as="a"
              href="/login"
              fontSize={["0.8rem", "0.8rem", "0.8rem", "0.8rem", "0.9rem"]}
              fontWeight="500"
              color="#4475d9"
            >
              Already have an account?
            </Text>
          </Flex>
        </form>
      </VStack>
    </SignInLayout>
  );
}

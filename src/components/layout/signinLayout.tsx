import {
    Box,
    Flex,
    Image,
  } from "@chakra-ui/react";

import TrelloLogo from "../../assets/trello-logo.svg";
import LeftSideImg from "../../assets/signin-left-img.svg";
import RightSideImg from "../../assets/signin-right-img.svg";
import { FC } from "react";

interface LayoutProps  {
    children: React.ReactNode
}

const SignInLayout : FC<LayoutProps> = ({ children }) => {
    return <Box w="100vw" h="100vh">
      <Box display="flex">
        <Image
          height="30px"
          ml="auto"
          mr="auto"
          my="40px"
          src={TrelloLogo}
          display="inline-block"
          alt="brand logo"
        />
      </Box>
      <Flex
        alignItems="center"
        flexDirection={["column", "column", "row", "row"]}
        justifyContent="center"
      >
        <Image
          position="absolute"
          bottom="5%"
          left="5%"
          src={LeftSideImg}
          alt=" team work illustration"
          width={[0, "25%"]}
        />
        <Image
          position="absolute"
          bottom="5%"
          right="5%"
          src={RightSideImg}
          alt="work together illustration"
          width={[0, "25%"]}
          borderRadius="3px"
        />
        <Box
          p={["20px 25px","25px 40px"]}
          width={["80%", "60%", "45%", "25%"]}
          borderRadius="3px"
          bg="white"
          boxShadow="rgb(0 0 0 / 10%) 0 0 10px"
        >
          <Box
            textAlign="center"
            color="#5E6C84"
            mt="5"
            mb="25"
            fontSize={["10px", "10px", "15px", "15px"]}
            fontWeight="semibold"
            lineHeight="normal"
          >
            {children}
          </Box>
          <Box my={4} textAlign="left"></Box>
        </Box>
      </Flex>
    </Box>
}

export default SignInLayout;
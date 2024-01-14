import { Flex, Image, Text } from "@chakra-ui/react";

interface SideBannerProps {
    imgUrl?: string
}

const SideBanner = (props: SideBannerProps) => {
  return (
    <>
      <Flex
        minW="8rem"
        bgColor={"white"}
        h="full"
        display={["none", "none", "none", "flex", "flex"]}
        align="center"
        justify="center"
        width="full"
        flexDir={"column"}
      >
        <Text
          as="h1"
          fontSize={"3rem"}
          fontWeight="600"
          color="#4475d9"
          my=".5rem"
        >
          Let's Chat
        </Text>
        <Flex w="70%" height={"70%"} align="center" justify={"center"}>
          <Image
            src={props.imgUrl || ""}
            alt="Login"
            objectFit={"contain"}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default SideBanner;

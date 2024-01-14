import {
  Image,
  Flex,
  Button,
  HStack,
  chakra,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  Link,
} from "@chakra-ui/react";
import {
  useAppDispatch as useDisptach,
  useAppSelector as useSelector,
} from "../../store/hook";
import { unauthorized } from "../../store/app.slice";
import TrelloLogo from "../../assets/trello-logo.svg";
import { ROUTES } from "../../utils/app.constants";

interface HeaderProps {
  heading?: string;
  logoUrl?: string;
  isBoardHeader?: boolean;
  backgroundColor?: string;
}
export default function Header({
  heading,
  logoUrl,
  isBoardHeader,
  backgroundColor
}: HeaderProps) {
  const disptach = useDisptach();
  const user = useSelector((state) => state.appReducer.user);
  const logoutClickHandler = () => {
    disptach(unauthorized());
  };

  const redirectToBoards = () => {
    window.location.href = ROUTES.DASHBOARD;
  }

  const renderButtons = () => {
    if (user) {
      return (
        <>
          <Text as="p" color={backgroundColor ? 'white' : 'unset'}  marginRight={"1rem"} fontSize={"1rem"}>
            {user?.name}
          </Text>
          <Menu size="xs">
            <MenuButton mr="5px">
              <Avatar
                size="sm"
                name={user?.name}
                color="white"
                src="https://bit.ly/tioluwani-kolawole"
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logoutClickHandler}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </>
      );
    }

    return (
      <>
        <Button
          fontSize="20"
          color="brand"
          variant="link"
          float="right"
          mr="2"
          pr="2"
        >
          <Link href="/login">Log in</Link>
        </Button>
        <Button fontSize="md" colorScheme="green" color="white" m="4">
          <Link href="/signup">Sign up</Link>
        </Button>
      </>
    );
  };
  return (
    <chakra.header
      backgroundColor={`${backgroundColor} !important`}
      pos={"fixed"}
      top={0}
      id="header"
      h="65px"
      w={"full"}
      zIndex={2}
      borderWidth={"1px"}
      borderStyle={"solid"}
      _after={{
        backgroundColor: '#1d2125'
      }}
      _before={{
        backgroundColor: '#1d2125'
      }}
      style={{
        borderImage:
          "linear-gradient(90deg,rgba(192,204,218,.1),rgba(192,204,218,.6) 50.38%,rgba(192,204,218,.1)) 100% 1",
      }}
    >
      <Flex
        w="full"
        h="full"
        px="6"
        align="center"
        justify="space-between"
        backgroundColor={`${backgroundColor ? backgroundColor : "#fff"} !important`}
      >
        <Flex h={"2rem"} align={'center'}>
          <Button as='a' href="/" _hover={{}} _focus={{}} _active={{}} border={'none'} boxShadow={'2px black'} h={"full"} variant={'outline'}>
            <Image src={logoUrl ? logoUrl : TrelloLogo} h={"1.2rem"} alt="logo" />
          </Button>
          {isBoardHeader && (
            <Button onClick={redirectToBoards} ml="0.8rem" h={"full"}>
              Boards
            </Button>
          )}
        </Flex>
        {heading && <Heading fontSize={'1.4rem'} color={backgroundColor ? 'white' : 'unset'} >{heading}</Heading>}
        <HStack>{renderButtons()}</HStack>
      </Flex>
    </chakra.header>
  );
}

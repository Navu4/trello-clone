import { FC, lazy, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Input,
  ModalOverlay,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  AiOutlineDelete,
  AiOutlineClose,
  AiOutlineLaptop,
  AiOutlineCheck,
} from "react-icons/ai";
import { GrTextAlignFull } from "react-icons/gr";
import { AiOutlineDown } from "react-icons/ai";
import {
  CardDataType,
  Label,
} from "../../../../types/app.constants";
import CardLabel from "./card-labels-menu";
import { useAppSelector } from "../../../../store/hook";
import { deleteCard, updateCard } from "../../../../store/app.slice";

const Editor = lazy(() => import("../../../editor"));

type Props = {
  onClose: () => void;
  isOpen: boolean;
  card: CardDataType;
};

const CardDetailsModal: FC<Props> = ({ onClose, isOpen, card }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(card?.title);
  const users = useAppSelector((state) => state.appReducer.allUsersData);
  const [description, setDescription] = useState(card?.description);
  const [assigned, assignUser] = useState<string | null>(
    card?.assignee || null
  );
  const [label, setLabel] = useState<Label[]>([]);

  const handleCardDelete = async () => {
    await dispatch(deleteCard({ cardId: card.id }));

    onClose();
  };

  const handleSaveClick = async () => {
    await dispatch(
      updateCard({
        card: {
          id: card.id,
          title,
          description,
          columnId: card.columnId,
          assignee: assigned || null,
          label,
          sequence: card.sequence,
        },
      })
    );
    onClose();
  };

  const handleClick = async (userId: string) => {
    assignUser(userId);

    const data: CardDataType = {
      ...card,
      assignee: userId,
    };

    await dispatch(updateCard({ card: data }));
  };

  const assignToMenu = () => {
    return (
      <Menu>
        <MenuButton as={Button} size="xs" rightIcon={<AiOutlineDown />}>
          Assign To
        </MenuButton>
        <MenuList>
          {users?.map((user, index) => (
            <MenuItem key={index} onClick={() => handleClick(user.id)}>
              {user.name}
            </MenuItem>
          ))}
          <MenuItem onClick={() => handleClick("")}>Unassign</MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <>
      <Modal size="xl" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW="64rem">
          <ModalBody>
            {label &&
              label.map((l, idx) => (
                <Badge key={idx} mt="0.4rem" ml="0.4rem" bg={l.color} color="white">
                  {l.text}
                </Badge>
              ))}
            <Flex align={'center'} marginTop="1rem">
              <AiOutlineLaptop />
              <Input
                name="title"
                size="sm"
                marginLeft="1rem"
                value={title}
                fontWeight="bold"
                onChange={(e: any) => setTitle(e.target.value)}
                placeholder="Card title"
              />
            </Flex>
            <Box display="flex">
              <Box width="100%" marginTop="2rem">
                <Flex align={'center'} fontWeight="bold">
                  <GrTextAlignFull />
                  <Text marginLeft="1rem">Description</Text>
                </Flex>
                <Box
                  marginLeft="1.5rem"
                  marginTop="1.5rem"
                  minHeight="200px"
                  width="90%"
                >
                  <Editor
                    style={{ height: "10rem" }}
                    description={description}
                    setDescription={setDescription}
                  />
                </Box>
              </Box>
              <Box display="flex" flexDirection="column">
                <CardLabel id={card.id} labels={label} setLabel={setLabel} />
                {assignToMenu()}
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              mr="0.5rem"
              onClick={handleSaveClick}
              loadingText="Updating"
            >
              <AiOutlineCheck /> Save
            </Button>
            <Button
              size="sm"
              mr="0.5rem"
              onClick={onClose}
              loadingText="Updating"
            >
              <AiOutlineClose /> Close
            </Button>
            <Button
              size="sm"
              marginRight="1rem"
              onClick={handleCardDelete}
              loadingText="Deleting"
              bg="red.500"
              color="white"
              _hover={{
                backgroundColor: "red.600",
              }}
            >
              <AiOutlineDelete />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardDetailsModal;

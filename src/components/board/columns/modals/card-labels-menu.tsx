import React, { FC } from "react";
import {
  Button,
  Text,
  Box,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MdLabelOutline } from "react-icons/md";
import { Label } from "../../../../types/app.constants";

type IProps = {
  id: string;
  labels: Label[];
  setLabel: React.Dispatch<React.SetStateAction<Label[]>>;
};

const cardLabels = [
  {
    text: "performance",
    color: "#0079bf",
  },
  {
    text: "bug",
    color: "#eb5a46",
  },
  {
    text: "feature",
    color: "#61bd4f",
  },
  {
    text: "information",
    color: "#ff9f1a",
  },
  {
    text: "warning",
    color: "#f2d600",
  },
];

const CardLabel: FC<IProps> = ({ setLabel, labels }) => {
  const handleClick = (label: Label) => setLabel((prev) => [...prev, label]);

  return (
    <Box marginTop="2rem" flexDirection="column" width="20%">
      <Text as="samp" whiteSpace="nowrap">
        ADD TO CARD
      </Text>
      <List spacing={3} p="5px">
        <ListItem>
          <Menu size="xs">
            <MenuButton
              leftIcon={<MdLabelOutline />}
              size="xs"
              whiteSpace="nowrap"
              as={Button}
            >
              Labels
            </MenuButton>
            <MenuList padding="5px">
              {cardLabels.map((item, index) => (
                <MenuItem
                  color={item.color}
                  marginBottom="5px"
                  key={index}
                  isDisabled={
                    labels.find((lb) => lb.text == item.text) ? true : false
                  }
                  onClick={() => handleClick(item)}
                >
                  <Box minH="20px">{item.text}</Box>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </ListItem>
      </List>
    </Box>
  );
};

export default CardLabel;

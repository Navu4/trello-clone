import { FC } from 'react';
import { Box, Button } from '@chakra-ui/react';

type AddColumnButtonProps = {
  addColumn: () => void;
};

const AddColumnButton: FC<AddColumnButtonProps> = ({ addColumn }) => {
  return (
    <Box
      rounded="lg"
      height="auto"
      width="272px"
      display="flex"
      flexDirection="column"
      mt="10px"
      mx="10px">
      <Button
        size="sm"
        my="10px"
        mx="5px"
        backgroundColor="primary"
        color="black"
        onClick={addColumn}
        loadingText="Adding column">
        + Add a Column
      </Button>
    </Box>
  );
};

export default AddColumnButton;

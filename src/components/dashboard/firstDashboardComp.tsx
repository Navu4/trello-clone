import {
  Button,
  Flex,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { getBase64 } from "../../utils";
import { useAppDispatch as useDispatch } from "../../store/hook";
import { updateProjectInfo } from "../../store/app.slice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/app.constants";

export const DashboardIntroSection = ({
  onSubmitHandler,
}: {
  onSubmitHandler: () => void;
}) => (
  <>
    <Text data-title="create-board-title" width={"full"} as={"h1"} fontSize={"2rem"}>
      Welcome to Trello!
    </Text>
    <Text as="p" fontSize={"1rem"}>
      We're glad you made it. Let's start organizing your projects so you can
      get things done.
    </Text>
    <Button data-btn="create-board-btn" onClick={onSubmitHandler}>Build your first board</Button>
  </>
);

export const DashboardFirstInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imgBase64, setImg] = useState<string | null>(null);

  const handleNextClick = (values: any) => {
    if (step == 0 || step == 1) {
      setStep((prev) => prev + 1);
    } else {
      dispatch(
        updateProjectInfo({ ...values, img: imgBase64, compeleted: true })
      );
      navigate(ROUTES.DASHBOARD);
    }
  };

  const onImageUpload = async (event: any) => {
    if (!inputRef.current) {
      return;
    }
    var fileName = inputRef.current.value;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
      getBase64(event.target.files[0]).then((file: any) => setImg(file));
    } else {
      toast({
        title: "Only jpg/jpeg and png files are allowed!",
        status: "error",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

  const onUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <>
      <Text data-title="first-board-title" width={"full"} as={"h1"} fontSize={"2rem"}>
        It all starts with the board
      </Text>
      <Text as="p" fontSize={"1rem"}>
        A board is where work happens in Trello. You'll find your cards, lists,
        due dates, and more to keep you organized and on track.
      </Text>

      <form
        style={{ width: "100%", height: "100%" }}
        onSubmit={handleSubmit(handleNextClick)}
      >
        {step === 0 && (
          <Flex marginY={"5"} w="full" flexDir={"column"}>
            <Text as={"p"} marginY={"2"}>
              Enter a board name
            </Text>
            <Input
              focusBorderColor="whitesmoke"
              size="md"
              {...register("name", {
                required: "Please enter valid boardname",
                minLength: 3,
                maxLength: 80,
              })}
              placeholder={"e.g., My Nav Board"}
              id="board-name"
            />
            {errors?.name?.message && (
              <Text className="error-message" as="p" fontSize={"0.8rem"} color="red">
                {errors?.name?.message as any}
              </Text>
            )}
          </Flex>
        )}

        {step === 1 && (
          <Flex marginY={"5"} w="full" flexDir={"column"}>
            <Text as={"p"} marginY={"2"}>
              Enter a board description
            </Text>
            <Textarea
              focusBorderColor="whitesmoke"
              size="md"
              {...register("description", {
                required: "Please enter valide project description",
              })}
              placeholder={
                "Project is web application for financial project..."
              }
              fontSize={"1rem"}
              resize={"none"}
              id="boardDescription"
            />
            {errors?.description?.message && (
              <Text className="error-message" as="p" fontSize={"0.8rem"} color="red">
                {errors?.description?.message as any}
              </Text>
            )}
          </Flex>
        )}

        {step === 2 && (
          <Flex marginY={"5"} w="full" flexDir={"column"}>
            <Text as={"p"} marginY={"2"}>
              Please upload project cover image
            </Text>
            <Input
              ref={inputRef}
              type="file"
              display={"none"}
              onChange={onImageUpload}
              accept="image/*"
            />
            <Flex
              h={"3rem"}
              width={"full"}
              border={imgBase64 ? "" : "1px dashed white"}
              justify={"center"}
              align={"center"}
              cursor={"pointer"}
              onClick={imgBase64 ? () => {} : onUploadClick}
            >
              {imgBase64 ? inputRef.current?.value : "Upload Cover Image"}
            </Flex>
          </Flex>
        )}
        <Flex w="full" justify={"space-between"}>
          <Button
            data-btn="next-step-btn"
            type="submit"
            isDisabled={step === 2 ? (imgBase64 ? false : true) : false}
          >
            Next
          </Button>
          {step === 2 && (
            <Button
              data-btn="skip-step-btn"
              type="submit"
              variant="outline"
              color={"white"}
              _hover={{}}
              _active={{}}
            >
              Skip
            </Button>
          )}
        </Flex>
      </form>
    </>
  );
};

export const ProjectListInformation = () => {
  return <></>;
};

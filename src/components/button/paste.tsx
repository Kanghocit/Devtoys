import React from "react";
import Button from "./index";
import { FaRegPaste } from "react-icons/fa6";
import { handlePaste } from "@/utils/numberUtils";

const ButtonPaste = ({
  setInputText,
}: {
  setInputText: (text: string) => void;
}) => {
  return (
    <div>
      <Button
        icon={<FaRegPaste />}
        onClick={() => handlePaste(setInputText)}
      >
        Paste
      </Button>
    </div>
  );
};

export default ButtonPaste;

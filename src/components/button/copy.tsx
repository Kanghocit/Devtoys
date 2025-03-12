
import Button from "./index";
import { LuCopy } from "react-icons/lu";
import { handleCopy } from "@/utils/numberUtils";

const ButtonCopy = ({ input }: { input: string }) => {
  return (
    <Button icon={<LuCopy />} onClick={() => handleCopy(input)}>
      Copy
    </Button>
  );
};

export default ButtonCopy;

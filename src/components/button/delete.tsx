import React from "react";
import Button from "./index";
import { MdClear } from "react-icons/md";

const ButtonDelete = ({
  setClearText,
}: {
  setClearText: (text: string) => void;
}) => {
  return <Button icon={<MdClear />} onClick={() => setClearText("")} />;
};

export default ButtonDelete;

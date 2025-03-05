import React from "react";
import { IoMdAlert } from "react-icons/io";
import Button from "./button";
import Link from "next/link";

const Suggest = () => {
  return (
    <div className="flex justify-between gap-2 border-1 border-gray-300 rounded-md p-1 max-w-[2085px] ms-2">
      <div className="flex items-center gap-2 text-sm">
        <IoMdAlert className="text-blue-400" />
        <p className="font-bold ">Not finding what you&apos;re looking for?</p>
        <span>Open a feature request on Github</span>
      </div>
      <Button className="text-sm m-0">
        <Link href="https://github.com/devtoys-io/devtoys/issues">
          Suggest an ideal
        </Link>
      </Button>
    </div>
  );
};

export default Suggest;

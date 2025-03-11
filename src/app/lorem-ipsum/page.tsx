import Header from "@/common/Header";
import React from "react";

const LoremIpsum = () => {
  return (
    <div className="flex flex-col rounded-2xl p-2">
      <Header title="Lorem Ipsum" />
      <p className="text-xs ms-2">Configuration</p>
    </div>
  );
};

export default LoremIpsum;

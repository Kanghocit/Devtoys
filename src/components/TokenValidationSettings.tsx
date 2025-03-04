import React from "react";

import { BsPatchCheck } from "react-icons/bs";
import Switch from "./switch";
import CustomCard from "./Card/CusCard";
import Input from "./input";

const TokenValidationSettings = ({ item }: { item: Object }) => {
  return (
    <CustomCard
      title={item.name}
      icon={<BsPatchCheck />}
      subTitle={item.detail}
    >
      <Switch valueTrue="On" valueFalse="Off" />
    </CustomCard>
  );
};

export default TokenValidationSettings;

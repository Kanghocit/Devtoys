import Header from "@/common/Header";

import ConfigCard from "@/components/Card/configCard";
import { LiaExchangeAltSolid } from "react-icons/lia";

const LoremIpsum = () => {
  return (
    <div className="flex flex-col rounded-2xl p-2">
      <Header title="Lorem Ipsum" />
      <p className="text-xs ms-2">Configuration</p>
      <ConfigCard
        title="Conversion"
        icon={<LiaExchangeAltSolid />}
        subTitle="Select which conversion you want to use"
        type="switch"
        trueValue="Encode"
        falseValue="Decode"
      />
      <ConfigCard
        title="Number of paragraphs"
        icon={<LiaExchangeAltSolid />}
        subTitle="Select how many paragraphs you want to generate"
        type="input"
      />
      <ConfigCard
        title="Number of words"
        icon={<LiaExchangeAltSolid />}
        subTitle="Select how many words you want to generate"
        type="select"
        options={["10", "20", "30", "40", "50"]}
      />
      
    </div>
  );
};

export default LoremIpsum;

import { characters } from "../constants";
import { HandlerType } from "../types";
import CustomCard from "@/components/card/CustomCard";
import Switch from "@/components/switch";
import { LiaExchangeAltSolid } from "react-icons/lia";
import clsx from "clsx";

interface PasswordOptionsProps {
  isOpen: boolean;
  handlers: HandlerType;
  excluded: string;
}

export const PasswordOptions = ({
  isOpen,
  handlers,
  excluded,
}: PasswordOptionsProps) => {
  return (
    <div
      className={clsx(
        "space-y-2 transition-all duration-300 ease-out",
        isOpen
          ? "max-h-[500px] opacity-100 transform translate-y-0"
          : "max-h-0 opacity-0 transform -translate-y-4 overflow-hidden"
      )}
    >
      {characters.map((character, index) => (
        <div
          key={character.name}
          className={clsx(
            "transform transition-all duration-300",
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
            `delay-[${index * 100}ms]`
          )}
        >
          <CustomCard
            title={character.name}
            subTitle={character.detail}
            icon={<LiaExchangeAltSolid />}
          >
            {character.type === "string" ? (
              <input
                type="text"
                placeholder="Characters to exclude"
                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none"
                value={excluded}
                onChange={(e) => handlers.setExcluded(e.target.value)}
              />
            ) : (
              <Switch
                valueTrue="On"
                valueFalse="Off"
                onToggle={() => {
                  const handler =
                    handlers[character.handler as keyof typeof handlers];
                  if (typeof handler === "function") {
                    (handler as (value: React.SetStateAction<boolean>) => void)(
                      (prev) => !prev
                    );
                  }
                }}
              />
            )}
          </CustomCard>
        </div>
      ))}
    </div>
  );
};

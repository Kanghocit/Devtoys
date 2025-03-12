import clsx from "clsx";

type CustomCardProps = React.ComponentPropsWithoutRef<"div"> & {
  title: string;
  subTitle?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const CustomCard: React.FC<CustomCardProps> = ({
  className,
  title,
  subTitle,
  icon,
  children,
  ...rest
}) => {
  const customCardClass = clsx(
    "flex justify-between bg-white m-2 p-2 rounded-md shadow-md",
    className
  );
  return (
    <div className={customCardClass} {...rest}>
      <div className="flex">
        <div className="flex items-center justify-center text-2xl">{icon}</div>
        <div className="flex flex-col gap-1 justify-center">
          <p className="text-sm ms-2 justify-center items-center">{title}</p>
          <p className="text-[10px] text-gray-500  ms-2 justify-center items-center">
            {subTitle}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default CustomCard;

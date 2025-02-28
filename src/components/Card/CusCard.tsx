import clsx from "clsx";

type CustomCardProps = React.ComponentPropsWithoutRef<"div"> & {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const CustomCard: React.FC<CustomCardProps> = ({
  className,
  title,
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
        <div className="text-2xl">{icon}</div>

        <p className="text-sm ms-2 justify-center items-center">{title}</p>
      </div>
      {children}
    </div>
  );
};

export default CustomCard;

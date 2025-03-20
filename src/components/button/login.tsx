
import { IoMdLogIn } from "react-icons/io";
import Button from ".";
import Link from "next/link";

const login = () => {
  return (
    <Link href="/api/auth/login">
      <Button icon={<IoMdLogIn />} />
    </Link>
  );
};

export default login;

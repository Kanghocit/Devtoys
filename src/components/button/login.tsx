import Link from "next/link";
import Button from ".";

const login = () => {
  return (
    <Link href="/api/auth/login" className="flex items-center justify-center">
      <Button
        variant="custom"
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-3 py-2 rounded-md text-lg font-bold hover:scale-105 transition-all duration-300"
      >
        Login
      </Button>
    </Link>
  );
};

export default login;

"use client";
import Button from "@/components/button";
import { useState } from "react";
import { LuStar } from "react-icons/lu";

const Header = ({ title }: { title: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div className="flex justify-between">
      <p className="font-bold text-2xl m-2">{title}</p>
      <div className="flex items-center gap-2">
        <Button icon={<LuStar />} onClick={handleFavorite}>
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </Button>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchInput = () => {
  return (
    <div className="w-11/12 relative">
      <input
        type="text"
        placeholder="Type to search for tools..."
        className="w-full p-2 ms-3 h-8 rounded-md border border-gray-300 border-b-2 border-b-gray-800 px-3 relative "
      />
      <IoIosSearch className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
    </div>
  );
};

export default SearchInput;

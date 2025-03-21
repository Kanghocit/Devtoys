import React from "react";

const cheatSheetValues = [
  { syntax: "$", description: "Root object or array" },
  {
    syntax: "@",
    description:
      "Used for filter expressions. Refers to the current node for further processing.",
  },
  { syntax: "object.property", description: "Dot-notated child" },
  { syntax: "['object'].['property']", description: "Bracket-notated child" },
  {
    syntax: "..property",
    description:
      "Performs a deep scan for the specified property in all available objects",
  },
  {
    syntax: "*",
    description:
      "Wildcard. Selects all elements in an object or array, regardless of their names or indexes",
  },
  {
    syntax: "[n]",
    description: "Selects the n-th element from an array. Indexes start from 0",
  },
  {
    syntax: "[n1,n2]",
    description: "Selects n1 and n2 array items. Returns a list",
  },
  { syntax: "[start:end:step]", description: "Array slice operator" },
  {
    syntax: "?(expression)",
    description:
      "Selects all elements in an object or array that match the specified boolean expression. Returns a list",
  },
  { syntax: "(expression)", description: "Script expression" },
];

const CheatSheet = () => {
  return (
    <div className="overflow-x-auto ps-2 text-[13px] ">
      <table className="min-w-full border border-gray-300 rounded-md">
        {/* Table Head */}
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-1 text-left">Syntax</th>
            <th className="border px-4 py-1 text-left">Description</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {cheatSheetValues.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border px-4 py-1">{item.syntax}</td>
              <td className="border px-4 py-1">{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheatSheet;

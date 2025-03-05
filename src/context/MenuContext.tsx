"use client";
import { createContext, useContext } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { BsFiletypeJson } from "react-icons/bs";
import { CiCalendarDate, CiDatabase, CiSettings } from "react-icons/ci";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoIosAlarm } from "react-icons/io";
import { IoText } from "react-icons/io5";
import { LuBinary } from "react-icons/lu";
import {
  MdFormatIndentIncrease,
  MdManageAccounts,
  MdOutlineNumbers,
} from "react-icons/md";
import { RiAiGenerateText, RiHome2Line } from "react-icons/ri";
import { SiConvertio, SiYaml } from "react-icons/si";

const menus = [{ name: "All Tools", icon: <RiHome2Line />, href: "/" }];

const subMenus = [
  // { name: "", icon: <RxHamburgerMenu /> },
  // { name: "Click to search", icon: <IoIosSearch /> },
  // { name: "All Tools", icon: <RiHome2Line /> },
  {
    name: "Converters",
    icon: <LuBinary />,
    children: [
      {
        name: "Cron parser",
        icon: <IoIosAlarm />,
        detail: "Parse cron data",
        href: "converters/cron-parser",
        isDone: true,
      },
      {
        name: "Date",
        icon: <CiCalendarDate />,
        detail: "Convert date data",
        href: "converters/date-convert",
        isDone: true,
      },
      {
        name: "JSON > Table",
        icon: <CiDatabase />,
        detail: "Convert JSON data to table",
        href: "converters/json-to-table",
        isDone: true,
      },
      {
        name: "JSON <> YAML",
        icon: <SiYaml />,
        detail: "Convert JSON data to YAML data",
        href: "converters/json-to-yaml",
        isDone: true,
      },
      {
        name: "Number Base",
        icon: <MdOutlineNumbers />,
        detail: "Convert number from one base to another",
        href: "converters/number-base",
        isDone: true,
      },
    ],
  },
  {
    name: "Encoders / Decoders",
    icon: <SiConvertio />,
    children: [
      {
        name: "Base64 Image",
        icon: <IoIosAlarm />,
        detail: "Encode and decode Base64 image data",
        href: "/codec/base64-image",
        isDone: false,
      },
      {
        name: "Base64 Text",
        icon: <CiCalendarDate />,
        detail: " Encode and decode Base64 text data",
        href: "/codec/base64-text",
        isDone: true,
      },
      {
        name: "Certificate",
        icon: <CiDatabase />,
        detail: "Encode and decode Certificate data",
        href: "/codec/certificate",
        isDone: false,
      },
      {
        name: "Gzip",
        icon: <SiYaml />,
        detail: "Encode and decode Gzip data",
        href: "/codec/gzip",
        isDone: true,
      },
      {
        name: "HTML",
        icon: <MdOutlineNumbers />,
        detail: "Encode and decode HTML data",
        href: "/codec/html-text",
        isDone: true,
      },
      {
        name: "JWT",
        icon: <MdOutlineNumbers />,
        detail: "Encode and decode JWT data",
        href: "/codec/jwt",
        isDone: true,
      },
      {
        name: "QR Code",
        icon: <MdOutlineNumbers />,
        detail: "Encode and decode QR Code data",
        href: "/codec/qrcode",
        isDone: false,
      },
      {
        name: "URL",
        icon: <MdOutlineNumbers />,
        detail: "Encode and decode URL data",
        href: "/codec/url",
        isDone: true,
      },
    ],
  },
  {
    name: "Formatters",
    icon: <MdFormatIndentIncrease />,
    children: [
      {
        name: "JSON",
        icon: <BsFiletypeJson />,
        detail: "Format JSON data",
        href: "/jsonformatter",
        isDone: false,
      },
      {
        name: "SQL",
        icon: <BsFiletypeJson />,
        detail: "Format SQL data",
        href: "/sqlformatter",
        isDone: false,
      },
      {
        name: "XML",
        icon: <BsFiletypeJson />,
        detail: "Format XML data",
        href: "/xmlformatter",
        isDone: false,
      },
    ],
  },
  {
    name: "Generators",
    icon: <RiAiGenerateText />,
    children: [
      {
        name: "Hash / Checksum",
        icon: <BsFiletypeJson />,
        detail: "Generate Hash / Checksum data",
        href: "/hashchecksum",
        isDone: false,
      },
      {
        name: "Lorem Ipsum",
        icon: <BsFiletypeJson />,
        detail: "Generate Lorem Ipsum data",
        href: "/loremipsum",
        isDone: false,
      },
      {
        name: "Password",
        icon: <BsFiletypeJson />,
        detail: "Generate Password data",
        href: "/password",
        isDone: false,
      },
      {
        name: "UUID",
        icon: <BsFiletypeJson />,
        detail: "Generate UUID data",
        href: "/uuid",
        isDone: false,
      },
    ],
  },
  {
    name: "Graphic",
    icon: <AiOutlinePicture />,
    children: [
      {
        name: "Image Resizer",
        icon: <BsFiletypeJson />,
        detail: "Resize image data",
        href: "/image-resizer",
        isDone: false,
      },
      {
        name: "Color Converter",
        icon: <BsFiletypeJson />,
        detail: "Convert color data",
        href: "/color-converter",
        isDone: false,
      },
    ],
  },
  {
    name: "Testers",
    icon: <FaRegCircleCheck />,
    children: [
      {
        name: "JSONPath",
        icon: <BsFiletypeJson />,
        detail: "Test JSONPath data",
        href: "/jsonpath",
        isDone: false,
      },
      {
        name: "RegEx",
        icon: <BsFiletypeJson />,
        detail: "Test RegEx data",
        href: "/regex",
        isDone: false,
      },
      {
        name: "XML",
        icon: <BsFiletypeJson />,
        detail: "Test XML data",
        href: "/xml",
        isDone: false,
      },
    ],
  },
  {
    name: "Text",
    icon: <IoText />,
    children: [
      {
        name: "Escape / Unescape",
        icon: <BsFiletypeJson />,
        detail: "Escape / Unescape text data",
        href: "/escape-unescape",
        isDone: false,
      },
      {
        name: "List Compare",
        icon: <BsFiletypeJson />,
        detail: "Compare list data",
        href: "/listcompare",
        isDone: false,
      },
      {
        name: "Markdown Preview",
        icon: <BsFiletypeJson />,
        detail: "Preview Markdown data",
        href: "/markdownpreview",
        isDone: false,
      },
      {
        name: "Analyze & Utilities",
        icon: <BsFiletypeJson />,
        detail: "Analyze and utilities text data",
        href: "/analyzeutilities",
        isDone: false,
      },
      {
        name: "Compare",
        icon: <BsFiletypeJson />,
        detail: "Compare text data",
        href: "/compare",
        isDone: false,
      },
    ],
  },
];

const footerMenus = [
  {
    name: "Manage extensions",
    icon: <MdManageAccounts />,
    detail: "Add and manage third-party extensions in DevToys",
    href: "/extensions",
    isDone: true,
  },
  {
    name: "Settings",
    icon: <CiSettings />,
    detail: "Customize DevToys look & feel",
    href: "/settings",
    isDone: true,
  },
];

const MenuContext = createContext({
  menus,
  subMenus,
  footerMenus,
});

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MenuContext.Provider value={{ menus, subMenus, footerMenus }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  return useContext(MenuContext);
};

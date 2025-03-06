import { AiOutlinePicture } from "react-icons/ai";
import { BsFiletypeJson } from "react-icons/bs";
import { CiCalendarDate, CiDatabase, CiSettings } from "react-icons/ci";
import { FaQrcode, FaHtml5, FaListUl } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoIosAlarm } from "react-icons/io";
import { IoText } from "react-icons/io5";
import { LuBinary } from "react-icons/lu";
import { VscJson, VscTextSize } from "react-icons/vsc";
import { SiJsonwebtokens, SiConvertio, SiYaml } from "react-icons/si";
import { TbHexagonNumber5Filled } from "react-icons/tb";
import {
  MdFormatIndentIncrease,
  MdManageAccounts,
  MdOutlineNumbers,
} from "react-icons/md";
import { RiAiGenerateText, RiHome2Line } from "react-icons/ri";

// Định nghĩa kiểu dữ liệu cho menu items
export interface MenuItem {
  name: string;
  icon?: React.ReactNode;
  href?: string;
  detail?: string;
  isDone?: boolean;
  children?: {
    name: string;
    icon: React.ReactNode;
    detail: string;
    href: string;
    isDone: boolean;
  }[];
}

// Menu chính
export const menus: MenuItem[] = [
  { name: "All Tools", icon: <RiHome2Line />, href: "/" },
];

// Submenus
export const subMenus: MenuItem[] = [
  {
    name: "Converters",
    icon: <LuBinary />,
    children: [
      {
        name: "Cron parser",
        icon: <IoIosAlarm />,
        detail: "Parse cron data",
        href: "cron-parser",
        isDone: true,
      },
      {
        name: "Date",
        icon: <CiCalendarDate />,
        detail: "Convert date data",
        href: "date-convert",
        isDone: true,
      },
      {
        name: "JSON > Table",
        icon: <CiDatabase />,
        detail: "Convert JSON data to table",
        href: "json-to-table",
        isDone: true,
      },
      {
        name: "JSON <> YAML",
        icon: <SiYaml />,
        detail: "Convert JSON data to YAML data",
        href: "json-to-yaml",
        isDone: true,
      },
      {
        name: "Number Base",
        icon: <TbHexagonNumber5Filled />,
        detail: "Convert number from one base to another",
        href: "number-base",
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
        href: "base64-image",
        isDone: true,
      },
      {
        name: "Base64 Text",
        icon: <CiCalendarDate />,
        detail: " Encode and decode Base64 text data",
        href: "base64-text",
        isDone: true,
      },
      {
        name: "Certificate",
        icon: <CiDatabase />,
        detail: "Encode and decode Certificate data",
        href: "certificate",
        isDone: false,
      },
      {
        name: "Gzip",
        icon: <SiYaml />,
        detail: "Encode and decode Gzip data",
        href: "gzip",
        isDone: true,
      },
      {
        name: "HTML",
        icon: <FaHtml5 />,
        detail: "Encode and decode HTML data",
        href: "html-text",
        isDone: true,
      },
      {
        name: "JWT",
        icon: <SiJsonwebtokens />,
        detail: "Encode and decode JWT data",
        href: "jwt",
        isDone: true,
      },
      {
        name: "QR Code",
        icon: <FaQrcode />,
        detail: "Encode and decode QR Code data",
        href: "qr-code",
        isDone: true,
      },
      {
        name: "URL",
        icon: <MdOutlineNumbers />,
        detail: "Encode and decode URL data",
        href: "url",
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
        icon: <VscJson />,
        detail: "Format JSON data",
        href: "/json-formatter",
        isDone: true,
      },
      {
        name: "SQL",
        icon: <BsFiletypeJson />,
        detail: "Format SQL data",
        href: "/sql-formatter",
        isDone: false,
      },
      {
        name: "XML",
        icon: <BsFiletypeJson />,
        detail: "Format XML data",
        href: "/xml-formatter",
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
        icon: <VscTextSize />,
        detail: "Escape / Unescape text data",
        href: "/escape-unescape",
        isDone: true,
      },
      {
        name: "List Comparer",
        icon: <FaListUl />,
        detail: "Compare list data",
        href: "/list-comparer",
        isDone: true,
      },
      {
        name: "Markdown Preview",
        icon: <BsFiletypeJson />,
        detail: "Preview Markdown data",
        href: "/markdown-preview",
        isDone: true,
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
        isDone: true,
      },
    ],
  },
];

// Footer menus
export const footerMenus: MenuItem[] = [
  {
    name: "Manage extensions",
    icon: <MdManageAccounts />,
    detail: "Manage third-party extensions",
    href: "/extensions",
    isDone: true,
  },
  {
    name: "Settings",
    icon: <CiSettings />,
    detail: "Customize settings",
    href: "/settings",
    isDone: true,
  },
];

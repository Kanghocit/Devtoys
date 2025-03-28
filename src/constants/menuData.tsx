import { AiOutlinePicture } from "react-icons/ai";
// import { BsFiletypeJson } from "react-icons/bs";
import { CiCalendarDate, CiDatabase, CiSettings } from "react-icons/ci";
import { FaQrcode, FaHtml5, FaListUl, FaMoneyBill } from "react-icons/fa";
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
import { TbBrandMysql } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";
import { TbJson } from "react-icons/tb";
import { TbFileTypeXml } from "react-icons/tb";
import { LuCodeXml } from "react-icons/lu";
import { FaEyeSlash } from "react-icons/fa";
import { RiImage2Line } from "react-icons/ri";
import { FaKey } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { FaFingerprint } from "react-icons/fa";
import { BsMarkdownFill } from "react-icons/bs";
import { AiOutlineFileText } from "react-icons/ai";
import { MdMoreHoriz } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaShieldVirus } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { TiWeatherCloudy } from "react-icons/ti";

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
  { name: "All Tools", icon: <RiHome2Line />, href: "/home" },
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
        href: "json-formatter",
        isDone: true,
      },
      {
        name: "SQL",
        icon: <TbBrandMysql />,
        detail: "Format SQL data",
        href: "sql-formatter",
        isDone: true,
      },
      {
        name: "XML",
        icon: <LuCodeXml />,
        detail: "Format XML data",
        href: "xml-formatter",
        isDone: true,
      },
    ],
  },
  {
    name: "Generators",
    icon: <RiAiGenerateText />,
    children: [
      {
        name: "Hash / Checksum",
        icon: <FaFingerprint />,
        detail: "Generate Hash / Checksum data",
        href: "hash-checksum",
        isDone: true,
      },
      {
        name: "Lorem Ipsum",
        icon: <FiFileText />,
        detail: "Generate Lorem Ipsum data",
        href: "lorem-ipsum",
        isDone: true,
      },
      {
        name: "Password",
        icon: <RiLockPasswordFill />,
        detail: "Generate Password data",
        href: "password",
        isDone: true,
      },
      {
        name: "UUID",
        icon: <FaKey />,
        detail: "Generate UUID data",
        href: "uuid",
        isDone: true,
      },
    ],
  },
  {
    name: "Graphic",
    icon: <AiOutlinePicture />,
    children: [
      {
        name: "Image Converter",
        icon: <RiImage2Line />,
        detail: "Convert image data",
        href: "image-converter",
        isDone: false,
      },
      {
        name: "Color Blindness Simulator",
        icon: <FaEyeSlash />,
        detail: "Simulate color blindness",
        href: "color-blindness",
        isDone: true,
      },
    ],
  },
  {
    name: "Testers",
    icon: <FaRegCircleCheck />,
    children: [
      {
        name: "JSONPath",
        icon: <TbJson />,
        detail: "Test JSONPath data",
        href: "jsonpath-tester",
        isDone: true,
      },
      // {
      //   name: "Regex",
      //   icon: <BsFiletypeJson />,
      //   detail: "Test Regex data",
      //   href: "regex-tester",
      //   isDone: false,
      // },
      {
        name: "XML",
        icon: <TbFileTypeXml />,
        detail: "Test XML data",
        href: "xml-tester",
        isDone: true,
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
        href: "escape-unescape",
        isDone: true,
      },
      {
        name: "List Comparer",
        icon: <FaListUl />,
        detail: "Compare list data",
        href: "list-comparer",
        isDone: true,
      },
      {
        name: "Markdown Preview",
        icon: <BsMarkdownFill />,
        detail: "Preview Markdown data",
        href: "markdown-preview",
        isDone: true,
      },
      {
        name: "Analyze & Utilities",
        icon: <AiOutlineFileText />,
        detail: "Analyze and utilities text data",
        href: "text-analyzer",
        isDone: true,
      },
      // {
      //   name: "Compare",
      //   icon: <BsFiletypeJson />,
      //   detail: "Compare text data",
      //   href: "compare",
      //   isDone: true,
      // },
    ],
  },
  {
    name: "APIs Tools",
    icon: <MdMoreHoriz />,
    children: [
      {
        name: "Currency Change",
        icon: <FaMoneyBill />,
        detail: "Convert currency data",
        href: "currency-change",
        isDone: true,
      },
      {
        name: "Ip geo Location",
        icon: <CiLocationOn />,
        detail: "Ip geo Location text data",
        href: "ip-geo-location",
        isDone: true,
      },
      {
        name: "Scan virus",
        icon: <FaShieldVirus />,
        detail: "Scan virus to protect your computer",
        href: "scan-virus",
        isDone: true,
      },
      {
        name: "Crypto Currency Exchange",
        icon: <TbPigMoney />,
        detail: "Convert crypto currency data",
        href: "crypto-exchange",
        isDone: true,
      },
      {
        name: "Weather",
        icon: <TiWeatherCloudy />,
        detail: "Get weather data",
        href: "weather",
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
    href: "extensions",
    isDone: true,
  },
  {
    name: "Settings",
    icon: <CiSettings />,
    detail: "Customize settings",
    href: "settings",
    isDone: true,
  },
];

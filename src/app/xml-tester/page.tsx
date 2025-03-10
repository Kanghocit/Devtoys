"use client";
import React, { useState, useRef, useEffect } from "react";
import Header from "@/common/Header";
import { MdClear } from "react-icons/md";
import { MdFilePresent } from "react-icons/md";
import Button from "@/components/button";
import { BiPaste } from "react-icons/bi";
import Textarea from "@/components/textarea";
import { RiErrorWarningFill } from "react-icons/ri";
import toast from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";

const XmlTester = () => {
  const [xml, setXml] = useState("");
  const [xsd, setXsd] = useState("");
  const [result, setResult] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const xmlFileRef = useRef<HTMLInputElement>(null);
  const xsdFileRef = useRef<HTMLInputElement>(null);

  const handlePaste = async (target: "xml" | "xsd") => {
    try {
      const text = await navigator.clipboard.readText();
      if (target === "xml") {
        setXml(text);
      } else {
        setXsd(text);
      }
      toast.success("Pasted successfully");
    } catch (error) {
      console.error("Error pasting from clipboard:", error);
      toast.error("Failed to paste from clipboard");
    }
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    target: "xml" | "xsd"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (target === "xml") {
          setXml(content);
        } else {
          setXsd(content);
        }
        toast.success(`${file.name} loaded successfully`);
      };
      reader.onerror = () => {
        toast.error(`Failed to read ${file.name}`);
      };
      reader.readAsText(file);
    }
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} copied to clipboard`);
    } catch (err) {
      console.error("Error copying to clipboard:", err);
      toast.error("Failed to copy to clipboard");
    }
  };

  const validateDataTypes = (element: Element, schema: Document) => {
    const errors: string[] = [];
    const elementName = element.tagName;

    // Find corresponding element in schema
    const schemaElement = schema.querySelector(
      `element[name="${elementName}"]`
    );
    if (!schemaElement) return [];

    // Check attributes
    Array.from(element.attributes).forEach((attr) => {
      const attrSchema = schema.querySelector(`attribute[name="${attr.name}"]`);
      if (attrSchema) {
        const type = attrSchema.getAttribute("type");
        if (type === "xs:integer" || type === "xsd:integer") {
          if (!/^-?\d+$/.test(attr.value)) {
            errors.push(
              `Attribute "${attr.name}" must be an integer, got "${attr.value}"`
            );
          }
        }
        // Add more type checks as needed
      }
    });

    // Check child elements
    Array.from(element.children).forEach((child) => {
      errors.push(...validateDataTypes(child, schema));
    });

    return errors;
  };

  const validateXml = () => {
    if (!xml.trim()) {
      setResult("");
      return;
    }

    setIsValidating(true);
    try {
      // Check XML well-formedness
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "application/xml");
      const parserError = xmlDoc.querySelector("parsererror");

      if (parserError) {
        setResult("❌ Invalid XML format: ");
        return;
      }

      // If XSD is provided, validate against it
      if (xsd.trim()) {
        const xsdDoc = parser.parseFromString(xsd, "application/xml");
        const xsdError = xsdDoc.querySelector("parsererror");

        if (xsdError) {
          setResult("❌ Invalid XSD format");
          return;
        }

        // Validate data types
        const typeErrors = validateDataTypes(xmlDoc.documentElement, xsdDoc);
        if (typeErrors.length > 0) {
          setResult("❌ Data type validation errors" + typeErrors.join("\n"));
          return;
        }

        setResult("✅ XML is valid and all data types match the XSD schema");
      } else {
        setResult("✅ XML is well-formed (Add XSD schema for type validation)");
      }
    } catch (error) {
      if (error instanceof Error) {
        setResult("❌ Error");
      } else {
        setResult("❌ An unknown error occurred");
      }
    } finally {
      setIsValidating(false);
    }
  };

  // Auto-validate after input changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateXml();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [xml, xsd]);

  return (
    <div
      className="flex flex-col rounded-2xl h-full p-2"
      suppressHydrationWarning
    >
      <Header title="XML / XSD Tester" />
      <div className="grid grid-cols-2 mx-2">
        {/* Left */}
        <div className="flex flex-col gap-2">
          <div className="flex m-2 justify-between items-center">
            <p className="text-xs">XSD (Optional - Currently not supported)</p>
            <div className="flex gap-2">
              <Button icon={<BiPaste />} onClick={() => handlePaste("xsd")}>
                Paste
              </Button>
              <input
                type="file"
                ref={xsdFileRef}
                className="hidden"
                onChange={(e) => handleFileUpload(e, "xsd")}
                accept=".xsd"
              />
              <Button
                icon={<MdFilePresent />}
                onClick={() => xsdFileRef.current?.click()}
              />
              <Button
                icon={<MdClear />}
                onClick={() => {
                  setXsd("");
                  toast.success("XSD cleared");
                }}
              />
              <Button
                icon={<MdContentCopy />}
                onClick={() => handleCopy(xsd, "XSD")}
              >
                Copy
              </Button>
            </div>
          </div>
          <div className="min-h-[calc(100vh-140px)] border-1 ms-2 border-gray-300 rounded-md">
            <Textarea
              kind="hide"
              value={xsd}
              onChange={(e) => setXsd(e.target.value)}
              autoFocus
              placeholder="Enter your XSD here to validate the XML..."
            />
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col gap-2">
          <div className="flex m-2 justify-between items-center">
            <p className="text-xs">XML</p>
            <div className="flex gap-2">
              <Button icon={<BiPaste />} onClick={() => handlePaste("xml")}>
                Paste
              </Button>
              <input
                type="file"
                ref={xmlFileRef}
                className="hidden"
                onChange={(e) => handleFileUpload(e, "xml")}
                accept=".xml"
              />
              <Button
                icon={<MdFilePresent />}
                onClick={() => xmlFileRef.current?.click()}
              />
              <Button
                icon={<MdClear />}
                onClick={() => {
                  setXml("");
                  toast.success("XML cleared");
                }}
              />
              <Button
                icon={<MdContentCopy />}
                onClick={() => handleCopy(xml, "XML")}
              >
                Copy
              </Button>
            </div>
          </div>
          <div className="min-h-[calc(100vh-140px)] border-1 ms-2 border-gray-300 rounded-md">
            <Textarea
              kind="hide"
              value={xml}
              onChange={(e) => setXml(e.target.value)}
              placeholder="Enter your XML here to check if it is well-formed..."
            />
          </div>
        </div>
      </div>
      {result && (
        <div
          className={`flex items-center gap-2 m-2 p-2 ms-4 border-1 rounded-md ${
            result.includes("❌")
              ? "border-red-300 bg-red-50"
              : result.includes("✅")
              ? "border-green-300 bg-green-50"
              : "border-gray-300"
          }`}
        >
          <RiErrorWarningFill
            className={
              result.includes("❌")
                ? "text-red-500"
                : result.includes("✅")
                ? "text-green-500"
                : "text-gray-500"
            }
          />
          <pre
            className={`whitespace-pre-wrap ${
              result.includes("❌")
                ? "text-red-700"
                : result.includes("✅")
                ? "text-green-700"
                : "text-gray-700"
            }`}
          >
            {isValidating ? "Validating..." : result}
          </pre>
        </div>
      )}
    </div>
  );
};

export default XmlTester;

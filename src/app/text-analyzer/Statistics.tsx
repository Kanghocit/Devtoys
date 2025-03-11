import Button from "@/components/button";
import { IoIosResize } from "react-icons/io";

interface StatisticsProps {
  text: string;
}

const Statistics = ({ text }: StatisticsProps) => {
  // Calculate statistics
  const characters = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.trim() ? text.trim().split("\n").length : 0;
  const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;

  // Count bytes
  const bytes = new Blob([text]).size;

  // Count specific characters
  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const numbers = (text.match(/[0-9]/g) || []).length;
  const punctuation = (text.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g) || []).length;
  const spaces = (text.match(/\s/g) || []).length;

  // // Calculate reading time (average reading speed: 200 words per minute)
  // const readingTimeMinutes = Math.ceil(words / 200);

  // // Calculate speaking time (average speaking speed: 130 words per minute)
  // const speakingTimeMinutes = Math.ceil(words / 130);

  return (
    <div className="flex flex-col gap-2 px-4">
      <div className="flex items-center justify-between">
        <p className="text-xs">Statistics</p>
        <Button icon={<IoIosResize />} />
      </div>

      <div className="border-1 border-gray-300 rounded-md p-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-md font-bold">Selection</h1>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Length</p>
            <p className="text-sm font-medium">{characters}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Characters</p>
            <p className="text-sm font-medium">{characters}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Words</p>
            <p className="text-sm font-medium">{words}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Lines</p>
            <p className="text-sm font-medium">{lines}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Paragraphs</p>
            <p className="text-sm font-medium">{paragraphs}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Bytes</p>
            <p className="text-sm font-medium">{bytes}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Letters</p>
            <p className="text-sm font-medium">{letters}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Numbers</p>
            <p className="text-sm font-medium">{numbers}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Punctuation</p>
            <p className="text-sm font-medium">{punctuation}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Spaces</p>
            <p className="text-sm font-medium">{spaces}</p>
          </div>
          {/* <div className="flex justify-between">
            <p className="text-xs text-gray-500">Reading time</p>
            <p className="text-sm font-medium">{readingTimeMinutes} min</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Speaking time</p>
            <p className="text-sm font-medium">{speakingTimeMinutes} min</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Statistics;

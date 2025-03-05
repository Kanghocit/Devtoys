import MainContent from "@/components/MainContent";
import Suggest from "@/components/Suggest";
export default function Home() {
  return (
    <>
      <div className="mx-2 bg-white p-2 rounded-tl-lg h-full">
        <div className="border-t-2 border-l-2 border-gray-300 shadow-md shadow-gray-100  rounded-2xl ps-10 pt-10 h-full">
          <MainContent />
          <Suggest />
        </div>
      </div>
    </>
  );
}

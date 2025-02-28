import MainContent from "@/components/MainContent";
import Suggest from "@/components/Suggest";
export default function Home() {
  return (
    <>
      <div className=" m-2 bg-white p-2 rounded-tl-lg  h-full">
        <MainContent />
        <Suggest />
      </div>
    </>
  );
}

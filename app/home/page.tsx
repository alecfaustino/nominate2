import LeftCol from "@/components/home/LeftCol";
import MiddleCol from "@/components/home/MiddleCol";
import RightCol from "@/components/home/RightCol";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 items-center">
      <LeftCol />
      <MiddleCol />
      <RightCol />
    </div>
  );
}

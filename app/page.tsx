import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full h-[80vh] min-h-[400px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden">
      <Image
        src="/landing.jpg"
        fill
        className="-z-50 object-cover"
        style={{ objectFit: "cover" }}
        priority
        alt="landing image of a plate with a leaf on top"
      />
      <div className="flex items-center justify-center h-full">
        <div className="bg-gray-400/60 p-4 rounded-lg">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 text-center">
            Welcome to NOMinate
          </h1>
          <h2 className="text-center">Find your next meal</h2>
          <div className="flex justify-evenly p-8">
            <Button variant="secondary" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

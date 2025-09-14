import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/landing.jpg"
        fill
        style={{ objectFit: "cover" }}
        priority
        alt="landing image of a plate with a leaf on top"
      />
    </div>
  );
}

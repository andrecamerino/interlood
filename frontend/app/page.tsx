import JoinRoom from "@/components/JoinRoom";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>INTERLOOD</h1>
      <Link className="hover:cursor-pointer hover:underline" href={"/wavelength"}>Wavelength</Link>
      <JoinRoom />
      {/* TODO: Add Join room and Create room buttons that useRouter to new page with slug [...] */}
    </div>
  );
}

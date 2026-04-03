import Room from "@/components/Room";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>INTERLOOD</h1>
      <Link className="hover:cursor-pointer hover:underline" href={"/wavelength"}>Wavelength</Link>
      <Room />
    </div>
  );
}

import { LoginDesktop } from "@/Components/LoginDesktop";
import '@/app/global.css'
import Image from "next/image";

export default function Home() {
  return (
    <main className="background">
      <LoginDesktop />
    </main>
  );
}

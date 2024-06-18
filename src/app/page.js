import { LoginDesktop } from "@/Components/LoginDesktop";
import '@/app/global.css'
import Image from "next/image";
require('dotenv').config()

export default function Home() {
  return (
    <main className="background">
      <LoginDesktop />
    </main>
  );
}

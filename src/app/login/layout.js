import { AuthContextProvider } from "@/Contexts/AuthContext";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function LoginLayout({ children }) {
    return (
        <main className={inter.className}>
            {children}
        </main>
    )
}
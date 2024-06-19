import { Inter } from "next/font/google";
import 'bulma/css/bulma.min.css'
import 'bulma-list/css/bulma-list.css'
import 'bulma-quickview/dist/css/bulma-quickview.min.css'
import 'bulma-quickview/dist/js/bulma-quickview.min.js'
import 'bulma-pageloader/dist/css/bulma-pageloader.min.css'
import 'bulma-spacing/css/bulma-spacing.min.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login con NextJS",
  description: "Login con verificacion de usuarios registrados",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

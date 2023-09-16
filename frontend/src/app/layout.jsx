import "../styles/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";
import Footer from "../components/footer/Footer";
import NewChat from "../components/newChat/NewChat";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body className={inter.className}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ flex: "1" }}>
            <NewChat />
          </div>
          <div style={{ flex: "4" }}>{children}</div>
        </div>
        <Footer />
        <Script />
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import Menu from "@/components/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Linkster - Get Connect People",
  description: "Crowdfunding platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <div>
            <div className="min-h-screen z-0 relative h-full w-full bg-black text-white">
              <div className="absolute -z-10 bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
              <div className="flex flex-col md:flex-row">
                <div className="hidden md:block">
                  <Menu flexing={"row"} />
                </div>

                <div className="w-full">
                  <Navbar />
                  {children}
                </div>
                <div className="md:hidden">
                  <Menu flexing={"col"} />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}

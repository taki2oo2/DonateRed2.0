import Navbar from "@/components/navigation/Navbar";
import { ReactNode } from "react";
import Footer from "@/components/Footer";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="top-0">
        <Navbar />
      </header>
      {children}
      <footer>
        <Footer />
      </footer>
    </>
  )
};

export default RootLayout;

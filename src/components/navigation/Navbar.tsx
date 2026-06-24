import NavbarLinks from "./NavbarLinks";
import MyButton from "../MyButton";
import Logo from "@/components/navigation/Logo";

const Navbar = () => {
  
  return (
    <nav className="flex h-16.25 w-full  mx-auto items-center justify-between border border-[#E4E4E7] dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm rounded-sm">
      <Logo/>
      <div className="flex items-center justify-center gap-6">
        <NavbarLinks/>
      </div>
      <div className="mr-8">
        <MyButton disabled = {false}  className ="pt-5 pb-5 pr-4 pl-4 color-red text-white hover:!bg-[#FB2C36] hover:!text-white hover:shadow-lg hover:shadow-red-500/30">Get Started</MyButton>
      </div>
    </nav>
  );
};

export default Navbar;

import Logo from "@/components/navigation/Logo"

const Footer = () => {
  return (
    <div className="bottom-0 sticky  w-full h-23.25 flex items-center bg-[#FEF2F2] dark:bg-gray-900/80 justify-between backdrop-blur-md ">
      <div className="ml-20">
      <Logo/>
      </div>
      <span>
        <p className="text-center text-gray-500 mr-140">
          © {new Date().getFullYear()} Blood Connect. Saving lives, together.
        </p>
      </span>
    </div>
  )
}

export default Footer
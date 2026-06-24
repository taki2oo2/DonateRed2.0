import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  className?: string;
};

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`ml-8 ${className}`}>
      <Link className="flex items-center gap-3" href="/">
        <div className="color-red h-9 w-9 rounded-lg flex items-center justify-center">
          <Image
            src="/drop.svg"
            alt="Blood Drop"
            width={30}
            height={30}
          />
        </div>

        <span className="text-xl font-semibold text-black dark:text-white">
          Donate Red
        </span>
      </Link>
    </div>
  )
}

export default Logo;

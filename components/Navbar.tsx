import Image from "next/image";
import img from "@/app/Assets/logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="w-auto py-5 px-8 flex justify-between items-center">
        <Link href={"/"}>
          <div className="flex items-center space-x-4 cursor-pointer">
            <Image
              src={img}
              width={30}
              height={30}
              alt="TrustNet AI Logo"
              className="h-8 rounded-lg"
            />
            <span className="bg-linear-to-r from-white to-sky-300 bg-clip-text text-transparent text-2xl font-bold text-shadow-blue-300 hidden sm:inline-block">
              {" "}
              TrustNet AI
            </span>
          </div>
        </Link>
        <ConnectButton />
      </nav>
      <hr className="text-gray-600 mb-12" />
    </>
  );
};

export default Navbar;

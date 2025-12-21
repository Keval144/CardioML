import Image from "next/image";
import { Montserrat } from "next/font/google";

const mon = Montserrat({
  subsets: ["cyrillic"],
  weight: ["600"],
});

function Logo() {
  return (
    <>
      <Image src="/CardioML.png" alt="logo" width={30} height={30} />
      <span className={`text-2xl ${mon.className}`}>CardioML</span>
    </>
  );
}

export default Logo;

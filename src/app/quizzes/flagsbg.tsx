import Image from "next/image";
import Flags from "../../../public/flags-background.jpg";

export default function FlagsBG() {
  return (
    <Image
      alt="A background image of a capital city"
      src={Flags}
      placeholder="blur"
      quality={100}
      fill
      sizes="w-full"
      style={{
        objectFit: "cover",
        objectPosition: "center"
      }}
    />
  );
}

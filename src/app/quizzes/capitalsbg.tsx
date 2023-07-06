import Image from "next/image";
import Capitals from "../../../public/capital-background.jpg";

export default function CapitalsBG() {
  return (
    <Image
      alt="A background image of a capital city"
      src={Capitals}
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

import GithubIcon from "./icons/github";
import LinkedInIcon from "./icons/linkedin";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-2 border-t py-4 md:py-6">
      <p className="text-sm md:text-base">
        Built by{" "}
        <a className="cursor-pointer font-bold" href="https://github.com/Dana-Hong" target="_blank">
          Dana Hong
        </a>{" "}
        - 2023
      </p>
      <div className="flex gap-5">
        <GithubIcon className="h-5 w-5 md:h-6 md:w-6" />
        <LinkedInIcon className="h-5 w-5 md:h-6 md:w-6" />
      </div>
    </footer>
  );
}

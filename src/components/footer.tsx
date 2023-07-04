import GithubIcon from "./icons/github";
import LinkedInIcon from "./icons/linkedin";

export default function Footer() {
    return (
      <footer className="flex flex-col gap-2 items-center justify-center py-4">
        <p className="text-sm">Built by <a className="cursor-pointer font-bold" href="https://github.com/Dana-Hong" target="_blank">Dana Hong</a> - 2023</p>
        <div className="flex gap-5">
          <GithubIcon className="w-5 h-5" />
          <LinkedInIcon className="w-5 h-5" />
        </div>
      </footer>
    )
}
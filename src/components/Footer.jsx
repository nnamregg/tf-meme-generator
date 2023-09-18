import { Typography } from "@material-tailwind/react";
import { AiFillGithub, AiFillGitlab, AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="mt-12 w-full bg-black/20 p-8">
      <div className="mx-auto flex flex-row flex-wrap items-center justify-center gap-x-12 gap-y-6 text-center md:justify-between lg:max-w-6xl">
        <div className="flex">
          <img
            src="/img/troll-face-sm.png"
            alt="memeplex-logo"
            className="mr-4 w-10"
          />
          <Typography
            variant="h3"
            color="blue-gray"
            className="cursor-none select-none hover:text-memeplex-900"
          >
            memeplex
          </Typography>
        </div>
        <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
          <Typography
            as="a"
            href="#"
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            <AiFillGithub className="h-5 w-5" />
          </Typography>

          <Typography
            as="a"
            href="#"
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            <AiFillGitlab className="h-5 w-5" />
          </Typography>

          <Typography
            as="a"
            href="#"
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            <AiFillLinkedin className="h-5 w-5" />
          </Typography>
        </div>
      </div>
      <hr className="mx-auto my-8 border-gray-900 lg:max-w-6xl" />
      <Typography
        color="blue-gray"
        className="cursor-not-allowed select-none text-center text-sm font-normal"
      >
        &copy; 2023 nmg
      </Typography>
    </footer>
  );
}

export default function Header() {
  return (
    <header className="w-full select-none py-3 text-center">
      <img
        src="/img/troll-face-lg.png"
        alt="memeplex logo"
        className="mx-auto mb-2 mt-8 block w-28 hover:animate-pulse md:w-32"
      />
      <h2 className="text-4xl font-medium">memeplex &copy;</h2>
      <p className="mt-2 text-xs">
        by{" "}
        <strong className="text-pink-400 transition-colors hover:text-transparent">
          nmg
        </strong>
      </p>
    </header>
  );
}

export default function Header() {
  return (
    <header className="w-full text-center py-3 select-none">
      <img src="/troll-face.png" className="block mx-auto mt-8 hover:animate-pulse" />
      <h2 className="text-4xl font-medium">memeplex &copy;</h2>
      <p className="mt-2 text-xs">
        by{" "}
        <strong className="text-pink-400 hover:text-transparent transition-colors">
          nmg
        </strong>
      </p>
    </header>
  );
}

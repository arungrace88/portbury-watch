import Link from "next/link";

export default function Header() {
  return (
    <div className="flex gap-6 p-4 border-b">
      <Link href="/">Home</Link>
      <Link href="/search">Search</Link>
      <Link href="/portbury-watch">Portbury Watch</Link>
    </div>
  );
}

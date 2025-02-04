import Link from "next/link";

export default function Footer() {
  return (
    <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6 p-6  text-white">
      <div className="w-full text-center mt-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} DA VE P. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

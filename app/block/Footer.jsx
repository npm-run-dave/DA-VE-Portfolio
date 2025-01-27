import Link from "next/link";

export default function Footer() {
  const myLocation =
    "https://www.google.com/maps/place/Canjulao,+Lapu-Lapu+City,+Cebu/@10.2878849,123.9322562,16z/data=!3m1!4b1!4m6!3m5!1s0x33a99986352e5ba1:0xd07b40adbd217233!8m2!3d10.2889273!4d123.9373697!16s%2Fg%2F1tks3w91?entry=ttu&g_ep=EgoyMDI1MDEwMi4wIKXMDSoASAFQAw%3D%3D";

  return (
    <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6 p-6  text-white">
      <div className="text-center">
        <p className="text-md">
          <strong>Email:</strong>{" "}
          <Link
            href="mailto:ryandavedonos@gmail.com"
            className="text-indigo-500 hover:underline"
          >
            ryandavedonos@gmail.com
          </Link>
        </p>
        <p className="text-md">
          <strong>Phone:</strong>{" "}
          <span className="text-indigo-500">03453453453453</span>
        </p>
        <p className="text-md">
          <strong>Location:</strong>{" "}
          <Link
            href={myLocation}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:underline"
          >
            Canjulao, Lapu-Lapu City, Cebu
          </Link>
        </p>
      </div>

      <div className="w-full text-center mt-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} DA VE P. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

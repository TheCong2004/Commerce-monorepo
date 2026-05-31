import { Github, Linkedin, Twitter, Dribbble, Moon } from "lucide-react";

export default function BlogNavbar() {
  return (
    <nav
      className="relative w-full px-6 py-6
                 flex flex-col gap-6
                 lg:flex-row lg:items-center lg:justify-between lg:gap-0"
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full border border-gray-300 overflow-hidden ring-1 ring-offset-2 ring-gray-100">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4ihx9W5IGRxnBv81pzb9HZhE1ht_iCcppQQ&s"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Right: Social */}
      <div className="flex items-center gap-4">
        <a className="text-[#0077b5] hover:scale-110 transition">
          <Linkedin size={22} fill="currentColor" />
        </a>
        <a className="text-[#1DA1F2] hover:scale-110 transition">
          <Twitter size={22} fill="currentColor" />
        </a>
        <a className="text-black hover:scale-110 transition">
          <Github size={22} fill="currentColor" />
        </a>
        <a className="text-[#ea4c89] hover:scale-110 transition">
          <Dribbble size={22} />
        </a>
      </div>
    </nav>
  );
}

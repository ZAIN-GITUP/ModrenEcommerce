import Link from "next/link";
import React from "react";

function Button({ text, link }: { text: string; link: string }) {
  return (
    <Link
      className="text-theme-color py-3 px-4 border border-theme-color rounded bg-transparent text-sm font-mono outline-none hover:bg-lightest-navy focus:bg-lightest-navy"
      href={link}
    >
      {text}
    </Link>
  );
}

export default Button;

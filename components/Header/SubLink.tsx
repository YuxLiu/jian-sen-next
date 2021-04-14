import React, { ReactNode } from "react";
import cn from "classnames";
import { useRouter } from "next/router";

export default function SubLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  const router = useRouter();
  const selected = router.pathname.includes(href);
  return (
    <a
      className="flex flex-col justify-between items-center w-auto h-7"
      onClick={() => router.push(href)}
    >
      <span
        className={cn(
          {
            " font-bold text-black": selected,
            "text-warmGray-600": !selected,
          },
          "hover:font-bold hover:text-black"
        )}
      >
        {children}
      </span>
      {selected && (
        <svg
          width="5"
          height="4"
          viewBox="0 0 5 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="2.5" cy="2" r="2" fill="black" />
        </svg>
      )}
    </a>
  );
}

"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandList } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { IUser } from "./PostDetail";
import { User } from "next-auth";
import Image from "next/image";
import { useCurrentUser } from "../hook/useCurrentUser";

export function MyCombo({ user }: { user: User }) {
  const [open, setOpen] = React.useState(false);
  const email = user?.email as string;
  const {
    user: userData,
    isLoading: isUserLoading,
    isError,
  } = useCurrentUser(email);
  const id = userData?.id;
  const frameworks = [
    {
      href: `/${id}/posts`,
      label: "나의 글",
    },
    {
      href: "/setting",
      label: "설정",
    },
    {
      href: "/write",
      label: "새 글 작성",
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" role="combobox" aria-expanded={open}>
          <Image
            src={userData?.image ? userData.image : "/noImage.jpg"}
            alt="이미지"
            width={20}
            height={20}
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              <div className="flex flex-col text-center ">
                {frameworks.map((framework) => {
                  if (framework.label === "새 글 작성") {
                    return (
                      <Link
                        href={framework.href}
                        key={framework.label}
                        className="block md:hidden cursor-pointer border-b hover:bg-gray-300 text-primary"
                      >
                        {framework.label}
                      </Link>
                    );
                  } else
                    return (
                      <Link
                        href={framework.href}
                        key={framework.label}
                        className="cursor-pointer border-b hover:bg-gray-400 py-2"
                      >
                        {framework.label}
                      </Link>
                    );
                })}
                <button
                  onClick={() => signOut({ redirectTo: "/" })}
                  className="block md:hidden  rounded-2xl  py-2 hover:bg-secondary cursor-pointer transition-all duration-200"
                >
                  로그아웃
                </button>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

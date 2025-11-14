"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import image from "@/public/nextImage.png";
import Image from "next/image";
import Link from "next/link";

const frameworks = [
  {
    href: "/posts",
    label: "나의 글",
  },
  {
    href: "/setting",
    label: "설정",
  },
];

export function MyCombo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          className="hover:bg-white"
          aria-expanded={open}
        >
          <Image
            src={image}
            alt="image"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              <div className="flex flex-col text-center ">
                {frameworks.map((framework) => (
                  <Link
                    href={framework.href}
                    key={framework.label}
                    className="cursor-pointer border-b hover:bg-gray-100 py-2"
                  >
                    {framework.label}
                  </Link>
                ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const NAV = {
  posts: { label: "글" },
  about: { label: "소개" },
} as const;

export default function Tabs() {
  return (
    <nav className="flex justify-center items-center">
      <ul className="flex text-xl gap-8">
        {Object.entries(NAV).map(([key, v]) => (
          <li
            key={key}
            className="relative pb-1 cursor-pointer
                       after:content-[''] after:absolute after:left-0 after:bottom-0
                       after:h-0.5 after:w-0 after:bg-current
                       after:transition-all after:duration-300 hover:after:w-full"
          >
            {v.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

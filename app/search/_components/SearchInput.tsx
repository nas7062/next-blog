import { Search } from "lucide-react";

export default function SearchInput({ q }: { q: string }) {
  return (
    <form
      action="/search"
      method="GET"
      className="flex items-center justify-center"
    >
      <input
        type="search"
        name="q"
        className="text-4xl outline-none min-w-60"
        placeholder="검색어 입력"
        defaultValue={q}
      />

      <button type="submit" aria-label="검색" className="ml-2">
        <Search className="w-10 h-10" />
      </button>
    </form>
  );
}

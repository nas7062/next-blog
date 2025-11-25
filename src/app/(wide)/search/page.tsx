import SearchInput from "./_components/SearchInput";
import SearchResultList from "../../_components/SearchPostList";
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q: raw } = await searchParams;
  const q = Array.isArray(raw) ? raw[0] : raw ?? "";

  return (
    <main className="flex flex-col justify-center mx-auto  gap-8">
      <SearchInput q={q} />
      <SearchResultList q={q} />
    </main>
  );
}

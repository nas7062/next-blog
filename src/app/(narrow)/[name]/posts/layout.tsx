export default function PostsLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <main className="flex">
      <div className="w-56">{sidebar}</div>
      <div className="flex-1">{children}</div>
    </main>
  );
}

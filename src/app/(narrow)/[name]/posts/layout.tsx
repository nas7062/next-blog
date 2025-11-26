export default function PostsLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <main className="flex mx-auto">
      <div className="min-w-40 hidden lg:block">{sidebar}</div>
      <div className="flex-1">{children}</div>
    </main>
  );
}

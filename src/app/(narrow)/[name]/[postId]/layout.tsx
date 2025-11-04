export default function SinglePostLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <main className="flex bg-white min-h-screen">
      <div className="w-42">{sidebar}</div>
      <div className="flex-1">{children}</div>
    </main>
  );
}

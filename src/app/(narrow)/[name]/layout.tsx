export default function NarrowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen  lg:max-w-[60%] mx-auto px-6 py-12">
      {children}
    </main>
  );
}

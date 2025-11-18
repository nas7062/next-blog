export default function WideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full max-w-[80%] mx-auto flex-col items-center justify-center  py-16 px-8  sm:items-center">
      {children}
    </main>
  );
}

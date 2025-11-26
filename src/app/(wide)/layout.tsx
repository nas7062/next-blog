export default function WideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full max-w-full lg:max-w-[80%] mx-auto flex-col items-start justify-center  py-16 px-2 lg:px-8  sm:items-center">
      {children}
    </main>
  );
}

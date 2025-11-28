export default function WideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen min-w-full lg:max-w-[80%] mx-auto flex-col items-center justify-center  py-16 px-2 lg:px-8">
      {children}
    </main>
  );
}

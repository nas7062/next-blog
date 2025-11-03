export default function WideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full max-w-[80%] flex-col items-center justify-between py-16 px-8 bg-white dark:bg-black sm:items-start">
      {children}
    </main>
  );
}

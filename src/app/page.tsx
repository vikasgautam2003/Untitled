import Phase1Test from "@/components/Phase1Test";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
     
        <Phase1Test />
      </div>
    </main>
  );
}
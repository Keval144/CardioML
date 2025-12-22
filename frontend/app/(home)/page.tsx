import HeartBeat from "@/components/hero/heartbeat";
import Title from "@/components/hero/title";
import Working from "@/components/hero/working";

export default function Home() {
  return (
    <>
      <Title />
      <HeartBeat />
      <Working />
      <div className="text-muted-foreground mx-auto flex max-w-5xl items-center justify-center p-8 text-center text-[9px] font-bold tracking-[0.2em] uppercase">
        Secure • Encrypted • Research Purpose Only
      </div>
    </>
  );
}

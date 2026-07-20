import { Hero } from "@/features/hero";
import { Principles } from "@/features/principles";
import { Timeline } from "@/features/timeline";
import { Rizen } from "@/features/rizen";
import { Footer } from "@/features/footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Principles />
      <Timeline />
      <Rizen />
      <Footer />
    </>
  );
}

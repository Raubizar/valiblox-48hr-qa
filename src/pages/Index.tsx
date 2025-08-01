import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PainSolution } from "@/components/PainSolution";
import { Process } from "@/components/Process";
import { Reports } from "@/components/Reports";
import { ValueProposition } from "@/components/ValueProposition";
import { Trust } from "@/components/Trust";
import { CTA } from "@/components/CTA";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <PainSolution />
      <Process />
      <Reports />
      <ValueProposition />
      <Trust />
      <CTA />
    </main>
  );
};

export default Index;

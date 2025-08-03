import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhyQAMatters } from "@/components/WhyQAMatters";
import { SimpleProcess } from "@/components/SimpleProcess";
import { PainSolution } from "@/components/PainSolution";
import { Process } from "@/components/Process";
import { Reports } from "@/components/Reports";
import { ValueProposition } from "@/components/ValueProposition";
import { Trust } from "@/components/Trust";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <WhyQAMatters />
      <SimpleProcess />
      <PainSolution />
      <Process />
      <Reports />
      <ValueProposition />
      <Trust />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;

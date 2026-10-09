import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DecorativeCircles from "@/components/landing/DecorativeCircles";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-primary py-16 sm:py-20">
      <DecorativeCircles variant="cta" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to complete your registration?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
            Create your account, upload your documents, and track every approval from one dashboard.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/student-register")}
            className="gap-2"
          >
            Start registration
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/student-login")}
            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            Log in
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

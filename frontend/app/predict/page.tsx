"use client";

import Link from "next/link";
import { ArrowLeft, Activity, ShieldCheck } from "lucide-react";
import { Button } from "@/components/shadcn-ui/button";
import { Badge } from "@/components/shadcn-ui/badge";
import PredictForm from "./predict-form";

export default function PredictPage() {
  return (

    <div className="bg-background flex min-h-screen flex-col">
      <div className="animate-in fade-in mx-auto w-full max-w-6xl flex-1 p-4 pt-17 duration-700">
       
        <div className="mt-6 flex items-center justify-between border-b pb-3 md:mt-12">
          <Button variant="ghost" size="sm" asChild className="group gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back To Home
            </Link>
          </Button>

          <Badge
            variant="outline"
            className="flex items-center gap-1.5 px-3 py-1"
          >
            <Activity className="text-primary h-3.5 w-3.5" />
            <span className="font-medium">Gradient Classifier</span>
          </Badge>
        </div>

        <main className="flex flex-col items-center justify-center py-10 md:py-16">
          <div className="w-full">
            <PredictForm />
          </div>

          {/* Enhanced Legal Note */}
          <p className="text-muted-foreground mt-8 text-center text-[11px]">
            By using this tool, you acknowledge that you have read and agreed to
            our{" "}
            <Link
              href="/disclaimer"
              className="decoration-primary/30 hover:text-foreground hover:decoration-primary font-semibold underline underline-offset-4 transition-colors"
            >
              Medical Disclaimer
            </Link>
            .
          </p>
        </main>
        
        <div className="mt-auto border-t py-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
            <p className="text-muted-foreground flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase">
              <ShieldCheck className="h-3 w-3 text-blue-500" />
              Secure • Encrypted • Research Purpose Only
            </p>
            <p className="text-[10px] italic opacity-50">
              Consult a medical professional for clinical diagnosis.
            </p>
          </div>
        </div>
      </div>


    </div>
  );
}

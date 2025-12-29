"use client";

import { ResponsivePie } from "@nivo/pie";
import {
  AlertTriangle,
  ArrowLeft,
  Activity,
  TrendingUp,
  Stethoscope,
  Salad,
  Calendar,
  HeartPulse,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { Button } from "@/components/shadcn-ui/button";
import { Badge } from "@/components/shadcn-ui/badge";
import { useRouter } from "next/navigation";

interface PredictionResultProps {
  prediction: {
    is_cardio: number;
    probability: string;
    status: string;
  };
  onReset: () => void;
}

export default function PredictionResult({
  prediction,
  onReset,
}: PredictionResultProps) {
  const percentage = parseFloat(prediction.probability.replace("%", ""));
  const router = useRouter();

  const isHigh = percentage >= 70;
  const isMedium = percentage >= 40 && percentage < 70;
  const isLow = percentage < 40;

  const COLORS = {
    HIGH: "#ef4444",
    MEDIUM: "#f59e0b",
    LOW: "#10b981",
    TRACK: "#e7e7e7",
  };

  const getActiveColor = () => {
    if (isHigh) return COLORS.HIGH;
    if (isMedium) return COLORS.MEDIUM;
    if (isLow) return COLORS.LOW;
    return COLORS.TRACK;
  };

  const chartData = [
    {
      id: "High Risk",
      value: percentage,
      color: getActiveColor(),
    },
    {
      id: "Low Risk",
      value: 100 - percentage,
      color: COLORS.TRACK,
    },
  ];

  const handleResetNavigation = () => {
    onReset();
    router.push("/predict");
  };

  return (
    <div className="animate-in fade-in mx-auto max-w-6xl space-y-8 p-6 duration-700">
      {/* Navigation */}
      <div className="flex items-center justify-between border-b pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResetNavigation}
          className="group gap-2"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          New Assessment
        </Button>
        <Badge variant="outline" className="bg-background">
          <Activity className="text-primary mr-1 h-3 w-3" />
          Gradient Classifier
        </Badge>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* LEFT SECTION: Main Chart and Recommendations */}
        <div className="space-y-6 lg:col-span-8">
          <Card className="border-border/50 bg-card/50 overflow-hidden shadow-sm">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="relative h-[350px] w-full max-w-[450px]">
                <ResponsivePie
                  data={chartData}
                  innerRadius={0.88}
                  padAngle={0}
                  cornerRadius={0}
                  colors={{ datum: "data.color" }}
                  enableArcLinkLabels={false}
                  enableArcLabels={false}
                  isInteractive={false}
                />
                {/* Center Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-8xl leading-none font-black tracking-tighter">
                    {Math.round(percentage)}
                    <span className="text-muted-foreground text-3xl font-light">
                      %
                    </span>
                  </span>
                  <Badge
                    variant="outline"
                    className="mt-4 px-4 py-1 text-[10px] font-bold tracking-[0.2em] uppercase"
                    style={{
                      color: getActiveColor(),
                      borderColor: getActiveColor(),
                    }}
                  >
                    {isHigh
                      ? "Critical Risk"
                      : isMedium
                        ? "Elevated Risk"
                        : "Minimal Risk"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendation Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="bg-muted/30 border-none shadow-none">
              <CardContent className="flex flex-col gap-2 p-5">
                <Salad className="text-muted-foreground h-4 w-4" />
                <h4 className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  Lifestyle
                </h4>
                <p className="text-xs leading-relaxed font-medium">
                  {isHigh
                    ? "Strict Sodium <1.5g/day."
                    : isMedium
                      ? "150m Cardio/week."
                      : "Maintain Fiber intake."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 border-none shadow-none">
              <CardContent className="flex flex-col gap-2 p-5">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <h4 className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  Frequency
                </h4>
                <p className="text-xs leading-relaxed font-medium">
                  {isHigh
                    ? "Daily BP monitoring."
                    : isMedium
                      ? "Weekly BP checks."
                      : "Annual Screenings."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 border-none shadow-none">
              <CardContent className="flex flex-col gap-2 p-5">
                <TrendingUp className="text-muted-foreground h-4 w-4" />
                <h4 className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  AI Insight
                </h4>
                <p className="text-xs leading-relaxed font-medium">
                  Accuracy:{" "}
                  <span className="text-primary font-bold">73.4%</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* RIGHT SECTION: Conclusion Column */}
        <div className="space-y-4 lg:col-span-4">
          <Card
            className={`border-none shadow-xl ${
              isHigh
                ? "bg-destructive text-destructive-foreground"
                : isMedium
                  ? "bg-amber-500 text-white"
                  : "bg-primary text-primary-foreground"
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 opacity-80">
                <HeartPulse className="h-4 w-4" />
                <CardTitle className="text-[10px] font-bold tracking-[0.2em] uppercase">
                  Conclusion
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <h2 className="text-3xl leading-tight font-bold tracking-tight">
                {isHigh
                  ? "CVD Probability High."
                  : isMedium
                    ? "CVD Signs Detected."
                    : "CVD Risk is Low."}
              </h2>
              <p className="text-sm leading-relaxed font-medium opacity-90">
                {isHigh
                  ? "Significant clinical markers detected. Consult a cardiologist immediately."
                  : isMedium
                    ? "Emerging indicators suggest a potential condition. Schedule a specialist screening."
                    : "Metrics are within normal ranges. You likely do not have cardiovascular disease."}
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              {/* Plain Text Status Indicator */}
              <div className="mx-auto w-40 cursor-default rounded-3xl bg-white p-3 text-center text-[13px] font-bold tracking-tighter text-black uppercase shadow-[0_4px_0_0_rgba(0,0,0,0.05)] ring-1 ring-slate-200">
                {isHigh
                  ? "High Chance CVD Suspected"
                  : isMedium
                    ? "Mild CVD Suspected"
                    : "No CVD Suspected"}
              </div>
            </CardFooter>
          </Card>

          <Card className="darK:border bg-slate-900/80 shadow-lg dark:bg-slate-800/30">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3 text-blue-400">
                <Stethoscope className="h-5 w-5" />
                <h3 className="text-xs font-bold tracking-widest uppercase">
                  Guidance
                </h3>
              </div>
              <ul className="space-y-4 text-[11px] font-medium text-slate-400">
                <li className="flex gap-3">
                  <span className="font-bold text-blue-500">•</span>
                  Keep Systolic BP below 130 mmHg.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-500">•</span>
                  Monitor LDL levels via bloodwork.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="text-muted-foreground flex flex-col items-center justify-between gap-4 border-t pt-8 text-[9px] font-bold tracking-[0.2em] uppercase md:flex-row">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-3 w-3" />
          Research Only • Non-Diagnostic AI
        </div>
        <div className="italic">CVD ML-Model v1.0.2</div>
      </footer>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { Progress } from "@/components/shadcn-ui/progress";
import { Button } from "@/components/shadcn-ui/button";
import { ArrowLeft, AlertCircle, InfoIcon } from "lucide-react";
import Link from "next/link";
import ConfusionMatrix from "@/components/charts/confusion-matrix";
import KFold from "@/components/charts/kfold";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn-ui/tooltip";

async function getModelInfo() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

    const res = await fetch(`${API_URL}/model-info`, {
      headers: {
        "x-api-key": API_KEY, // Sending your secret key
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 24 * 60 * 60, // Cache for 24 hours
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return { data: await res.json(), error: false };
  } catch (err) {
    console.error("Failed to fetch model info:", err);
    return { data: null, error: true };
  }
}

export default async function ModelInfo() {
  const { data: modelInfo, error } = await getModelInfo();

  return (
    <div className="animate-in fade-in mx-auto flex min-h-screen max-w-6xl flex-col px-4 pt-17 duration-700">
      <div className="mt-12 flex w-full items-center justify-between border-b pb-3">
        <Button variant="ghost" size="sm" asChild className="group gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back To Home
          </Link>
        </Button>
      </div>
      <main className="flex flex-1 flex-col items-center pt-10">
        {error ? (
          <div className="bg-card flex flex-col items-center gap-4 rounded-2xl border p-10">
            <AlertCircle className="h-24 w-24 text-yellow-300" />
            <h2 className="text-3xl font-bold">Failed to fetch model info</h2>
            <p className="text-muted-foreground text-center text-sm">
              Please try Again Later
            </p>
          </div>
        ) : (
          <div className="w-full space-y-10 pb-10">
            {/* Header */}
            <div className="space-y-1 text-center sm:space-y-2">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                {modelInfo.model.name}
              </h2>
              <p className="text-muted-foreground text-sm">
                this model includes the following hyperparameters and evaluation
                metrics.
                <br />
                Trained using {modelInfo.model.library},
              </p>
            </div>

            {/* Top cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Model */}
              <Card>
                <CardHeader>
                  <CardTitle>Model</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <Row label="Algorithm" value={modelInfo.model.name} />
                  <Row label="Library" value={modelInfo.model.library} />
                  <Row
                    label="Trained At"
                    value={formatDate(modelInfo.model.trained_at)}
                  />
                  <Row
                    label="Feature Count"
                    value={modelInfo.features?.names?.length ?? 0}
                  />
                </CardContent>
              </Card>

              {/* Hyperparameters */}
              <Card>
                <CardHeader>
                  <CardTitle>Hyperparameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <Row
                    label="Estimators"
                    value={modelInfo.hyperparameters.n_estimators}
                  />
                  <Row
                    label="Learning Rate"
                    value={modelInfo.hyperparameters.learning_rate}
                  />
                  <Row
                    label="Max Depth"
                    value={modelInfo.hyperparameters.max_depth}
                  />
                  <Row
                    label="Min Samples / Leaf"
                    value={modelInfo.hyperparameters.min_samples_leaf}
                  />
                  
                </CardContent>
              </Card>

              {/* Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Metric label="Accuracy" value={modelInfo.metrics.accuracy} />
                  <Metric label="F1 Score" value={modelInfo.metrics.f1} />
                  <Metric label="ROC AUC" value={modelInfo.metrics.roc_auc} />
                </CardContent>
              </Card>
            </div>

            {/* Feature importance */}
            <Card>
              <CardHeader>
                <CardTitle>Top Feature Importance</CardTitle>
                <CardDescription>
                  Features contributing most to predictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {modelInfo.features.names
                  .map((name: string, i: number) => ({
                    name,
                    value: modelInfo.features.importances[i],
                  }))
                  .sort((a: any, b: any) => b.value - a.value)
                  .map(({ name, value }: { name: string; value: number }) => (
                    <FeatureBar key={name} name={name} value={value} />
                  ))}
              </CardContent>
            </Card>

            <ConfusionMatrix
              yTrue={modelInfo.predictions_sample.y_true}
              yPred={modelInfo.predictions_sample.y_pred}
            />

            <KFold accuracies={modelInfo.metrics.kfold} />

            {/* Optional video */}
            <Card>
              <CardHeader>
                <CardTitle>Gradient Boosting Explained</CardTitle>
                <CardDescription>
                  A cool video where I learned Gradient Boosting Classification.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video overflow-hidden rounded-xl border">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/jxuNLH5dXCs?si=6dprQ2HFsrrcA9dB"
                    title="Gradient Boosting Classifier"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  const METRIC_EXPLANATIONS: Record<string, string> = {
    Accuracy:
      "The percentage of total predictions that were correct (TP + TN) / Total.",
    "F1 Score":
      "The harmonic mean of precision and recall. Best for imbalanced datasets as it accounts for false positives and negatives.",
    "ROC AUC":
      "Area Under the Receiver Operating Characteristic Curve. It measures the model's ability to distinguish between classes (1.0 is perfect).",
    Precision: "Of all predicted positives, how many were actually positive?",
    Recall:
      "Of all actual positives, how many did the model identify correctly?",
  };
  const explanation =
    METRIC_EXPLANATIONS[label] || "Performance metric for this model.";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="text-muted-foreground flex items-center gap-1.5 font-medium">
          <span>{label}</span>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help opacity-70 transition-opacity hover:opacity-100">
                  <InfoIcon className="h-3.5 w-3.5" />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-popover text-popover-foreground max-w-[200px] border p-2 text-xs leading-relaxed shadow-md"
              >
                {explanation}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="font-mono font-semibold">
          {(value * 100).toFixed(1)}%
        </span>
      </div>
      <Progress value={value * 100} className="h-2" />
    </div>
  );
}

function FeatureBar({ name, value }: { name: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{name}</span>
        <span>{(value * 100).toFixed(1)}%</span>
      </div>
      <Progress value={value * 100} />
    </div>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

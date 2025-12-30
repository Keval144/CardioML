import { Button } from "@/components/shadcn-ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/shadcn-ui/card";
import { Badge } from "@/components/shadcn-ui/badge";


async function getDataInsight() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

    const res = await fetch(`${API_URL}/data-insight`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      next: { revalidate: 24 * 60 * 60 },
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return { data: await res.json(), error: false };
  } catch (err) {
    console.error("Failed to fetch data insight:", err);
    return { data: null, error: true };
  }
}

export default async function DataInsight() {
  const { data, error } = await getDataInsight();

  if (error || !data) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-6">
        <div className="bg-card flex flex-col items-center gap-4 rounded-2xl border p-10">
          <AlertCircle className="h-24 w-24 text-yellow-300" />
          <h2 className="text-3xl font-bold">Failed to fetch data insight</h2>
          <p className="text-muted-foreground text-center text-sm">
            Please try Again Later
          </p>
        </div>
      </div>
    );
  }

  const { size, data_quality, models, collumns, factors } = data;

  return (
    <div className="animate-in fade-in mx-auto min-h-screen max-w-6xl p-3 px-4 pt-17 duration-700">
      <div className="mt-12 flex w-full items-center justify-between border-b pb-3">
        <Button variant="ghost" size="sm" asChild className="group gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back To Home
          </Link>
        </Button>
      </div>

      {/* Page header */}
      <header className="mb-8 space-y-2 pt-10 text-center">
        <h1 className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
          Data Insights
        </h1>
        <p className="text-muted-foreground text-sm">
          Key trends, patterns and model summary generated from the dataset.{" "}
          <br />
          These insights are for research and educational use only.
        </p>
      </header>

      <main className="space-y-8">
        <section>
          <span className="text-xl font-semibold">Data Source</span>
          <p className="text-muted-foreground leading-relaxed">
            {" "}
            The dataset is sourced from{" "}
            <Link
              href="https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset"
              className="text-blue-500 visited:text-purple-500"
              target="_blank"
            >
              {" "}
              Kaggle{" "}
            </Link>{" "}
            . Initially containing{" "}
            <span className="text-foreground font-medium">
              {" "}
              {size.prevshape[0].toLocaleString()}{" "}
            </span>{" "}
            records, data cleaning removed{" "}
            <span className="text-foreground font-medium">
              {" "}
              {data_quality.rows_removed.toLocaleString()}{" "}
            </span>{" "}
            entries ({data_quality.rows_removed_percent}%), resulting in a final
            dataset of{" "}
            <span className="text-foreground font-medium">
              {" "}
              {size.aftershape[0].toLocaleString()}{" "}
            </span>{" "}
            records.{" "}
          </p>
        </section>
        {/* Compact overview row */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <InfoCard
            title="Raw records"
            subtitle={`Before cleaning`}
            value={size.prevshape[0].toLocaleString()}
          />
          <InfoCard
            title="Rows removed"
            subtitle={`${data_quality.rows_removed_percent}%`}
            value={data_quality.rows_removed.toLocaleString()}
          />
          <InfoCard
            title="Final records"
            subtitle={`Used for training`}
            value={size.aftershape[0].toLocaleString()}
          />
        </section>

        {/* Unified dataset + what-is-CVD */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Understanding CVD</CardTitle>
              <CardDescription>
                What CVD is, how it affects life and how the model helps.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Cardiovascular disease (CVD) is an umbrella term for conditions
                that affect the heart and blood vessels — including coronary
                artery disease, heart attack and stroke. Lifestyle, metabolic
                health (blood pressure, cholesterol, glucose), and age are
                common drivers.
              </p>

              <ul className="space-y-2">
                <li className="text-muted-foreground text-sm">
                  • Impact: reduces physical capacity, increases long-term care
                  needs, and raises risk of sudden events.
                </li>
                <li className="text-muted-foreground text-sm">
                  • Prevention: early detection of risk factors (BP,
                  cholesterol, BMI, glucose, activity) decreases long-term risk.
                </li>
                <li className="text-muted-foreground text-sm">
                  • Model role: the ML model identifies patterns in historical
                  clinical data to estimate risk probabilities — useful for
                  screening and research, not a diagnosis.
                </li>
              </ul>

              <CardFooter className="text-muted-foreground pt-4 text-sm">
                Predictions are for research/educational use. Consult healthcare
                professionals for medical decisions.
              </CardFooter>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ideal ranges</CardTitle>
              <CardDescription>Common healthy targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Range label="Blood Pressure" value="~120 / 80 mmHg" />
                <Range label="Cholesterol (Total)" value="< 200 mg/dL" />
                <Range label="Fasting Glucose" value="70–99 mg/dL" />
                <Range label="BMI" value="18.5–24.9" />
                <Range label="Resting Heart Rate" value="60–100 bpm" />
                <Range label="Activity" value="≥ 150 min/week" />
              </div>
              <CardFooter className="text-muted-foreground pt-4 text-xs">
                Values outside these ranges can increase cardiovascular risk
                when combined.
              </CardFooter>
            </CardContent>
          </Card>
        </section>

        {/* Models + metrics */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Model Performance</CardTitle>
              <CardDescription>Cross-validation accuracy (avg)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Metric name="Gradient Boosting" value={models.gbc} />
              <Metric name="Decision Tree" value={models.dtc} />
              <Metric name="Logistic Regression" value={models.lrc} />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Top Correlated Factors</CardTitle>
              <CardDescription>
                Features most associated with target
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {factors
                  .slice()
                  .sort(
                    (a: any, b: any) =>
                      Math.abs(b.correlation) - Math.abs(a.correlation),
                  )
                  .slice(0, 12)
                  .map((f: any) => (
                    <Badge
                      key={f.feature}
                      className="rounded-md"
                      variant="default"
                    >
                      {f.feature}: {Number(f.correlation).toFixed(2)}
                    </Badge>
                  ))}
              </div>

              <CardFooter className="text-muted-foreground pt-4 text-sm">
                Correlation ranges from -1 (strong negative) to +1 (strong
                positive). Values near 0 indicate little linear relationship.
              </CardFooter>
            </CardContent>
          </Card>
        </section>

        {/* Heatmap */}
        <section className="pb-8">
          <Card>
            <CardHeader>
              <CardTitle>Feature Correlation Heatmap</CardTitle>
              <CardDescription>
                Visual representation of pairwise relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border">
                <Image
                  src="/heatmap.png"
                  alt="Feature correlation heatmap"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <p className="text-muted-foreground mt-3 text-sm">
                Darker shades = stronger correlation. Use alongside feature
                importance for model interpretation.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

/* Small presentational components */
function InfoCard({
  title,
  subtitle,
  value,
}: {
  title: string;
  subtitle: string;
  value: string | number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
        <CardDescription className="text-xs">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-foreground text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}

function Range({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border p-3">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="text-foreground mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}

function Metric({ name, value }: { name: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-md border p-3">
      <div>
        <p className="text-muted-foreground text-sm">{name}</p>
        <p className="text-muted-foreground text-xs">Cross-val avg</p>
      </div>
      <div className="text-right">
        <p className="text-foreground text-lg font-semibold">{value}%</p>
      </div>
    </div>
  );
}

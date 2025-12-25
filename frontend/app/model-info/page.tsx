import { Button } from "@/components/shadcn-ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

async function getModelInfo() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/model-info`, {
      next: { revalidate: 24 * 60 * 60 },
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
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pt-16">
      <div className="flex w-full items-center justify-between border-b pb-3 md:mt-12">
        <Button variant="ghost" size="sm" asChild className="group gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back To Home
          </Link>
        </Button>
      </div>

      <main className="flex flex-1 flex-col items-center justify-center py-20">
        {error ? (
          <div className="bg-card flex flex-col items-center gap-4 rounded-2xl border p-10">
            <AlertCircle className="h-24 w-24 text-yellow-300" />
            <h2 className="text-3xl font-bold">Failed to fetch model info</h2>
            <p className="text-muted-foreground text-center text-sm">
              Please try Again Later
            </p>
          </div>
        ) : (
          <div className="flex max-w-xl flex-col gap-2 text-center">
            <h2 className="text-2xl font-semibold">Model Information</h2>
            <p>Name: {modelInfo.model.name}</p>
            <p>Library: {modelInfo.model.library}</p>
            <p>Trained at: {modelInfo.model.trained_at}</p>
            <p>Estimators: {modelInfo.model.n_estimators}</p>
            <p>Learning rate: {modelInfo.model.learning_rate}</p>
            <p>Max depth: {modelInfo.model.max_depth}</p>
          </div>
        )}
      </main>
    </div>
  );
}

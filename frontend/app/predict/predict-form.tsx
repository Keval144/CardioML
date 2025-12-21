"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/shadcn-ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn-ui/radio-group";
import { Separator } from "@/components/shadcn-ui/separator";

const formSchema = z
  .object({
    age: z.coerce
      .number()
      .min(18, "Age must be at least 18")
      .max(120, "Age must be less than 120"),
    height: z.coerce
      .number()
      .min(100, "Height must be at least 100 cm")
      .max(250, "Height must be less than 250 cm"),
    weight: z.coerce
      .number()
      .min(30, "Weight must be at least 30 kg")
      .max(300, "Weight must be less than 300 kg"),
    gender: z.coerce
      .number()
      .pipe(z.union([z.literal(1), z.literal(2)], "Please select a gender")),
    ap_hi: z.coerce
      .number()
      .min(60, "Systolic BP must be at least 60")
      .max(250, "Systolic BP must be less than 250"),
    ap_lo: z.coerce
      .number()
      .min(40, "Diastolic BP must be at least 40")
      .max(150, "Diastolic BP must be less than 150"),
    cholesterol: z.coerce
      .number()
      .pipe(
        z.union(
          [z.literal(1), z.literal(2), z.literal(3)],
          "Selection required",
        ),
      ),
    gluc: z.coerce
      .number()
      .pipe(
        z.union(
          [z.literal(1), z.literal(2), z.literal(3)],
          "Selection required",
        ),
      ),
    smoke: z.boolean().default(false),
    alco: z.boolean().default(false),
    active: z.boolean().default(false),
  })
  .refine((data) => data.ap_hi > data.ap_lo, {
    message: "Systolic BP must be greater than Diastolic BP",
    path: ["ap_hi"],
  });

type FormData = z.infer<typeof formSchema>;

export default function HealthPredictionForm() {
  const form = useForm<FormData>({
    // Type assertion to Resolver<FormData> fixes the coerce/unknown mismatch
    resolver: zodResolver(formSchema) as Resolver<FormData>,
    mode: "onBlur",
    defaultValues: {
      age: "" as unknown as number,
      height: "" as unknown as number,
      weight: "" as unknown as number,
      ap_hi: "" as unknown as number,
      ap_lo: "" as unknown as number,
      gender: undefined, // undefined triggers the union error message
      cholesterol: 1,
      gluc: 1,
      smoke: false,
      alco: false,
      active: false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form data submitted (numeric values):", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card dark:bg-card mx-4 w-full max-w-full space-y-8 rounded-xl p-4 shadow-md sm:mx-auto sm:max-w-md sm:p-8 md:max-w-3xl lg:max-w-5xl dark:border"
      >
        <div className="space-y-4">
          <h1 className="text-center text-3xl font-semibold md:text-left">
            Predict CVD
          </h1>
          <h2 className="text-xl font-semibold">Simple Information</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormDescription>
                    Please enter your age in years.
                  </FormDescription>
                  <FormControl>
                    <Input type="number" placeholder="Years" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Height */}
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormDescription>
                    Measured in centimeters (cm) without shoes.
                  </FormDescription>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 175" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormDescription>Measured in kilograms (kg).</FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 70.5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender Select - Handled as number */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormDescription>Biological sex at birth.</FormDescription>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value ? field.value.toString() : ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Female</SelectItem>
                      <SelectItem value="2">Male</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Medical Examination</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="ap_hi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Systolic Blood Pressure</FormLabel>
                  <FormDescription>
                    Pressure in your arteries when your heart beats.(Upper
                    Reading of Machine)
                  </FormDescription>
                  <FormControl>
                    <Input type="number" placeholder="ap_high" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ap_lo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diastolic Blood Pressure</FormLabel>
                  <FormDescription>
                    Pressure in your arteries when your heart rests between
                    beats.(Lower Readings of Machine)
                  </FormDescription>
                  <FormControl>
                    <Input type="number" placeholder="ap_low" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Cholesterol and Glucose Radios - Handled as numbers */}
          {["cholesterol", "gluc"].map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name as "cholesterol" | "gluc"}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="capitalize">
                    {name === "gluc" ? "Glucose" : name}
                  </FormLabel>

                  <FormDescription>
                    {name === "cholesterol"
                      ? "Total cholesterol level from your latest blood work."
                      : "Blood sugar level measured during your last checkup."}
                  </FormDescription>

                  <FormControl>
                    <RadioGroup
                      onValueChange={(val) => field.onChange(Number(val))}
                      value={field.value?.toString()}
                      className="flex flex-col gap-4 sm:flex-row"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="1" id={`${name}-1`} />
                        <label htmlFor={`${name}-1`}>Normal</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="2" id={`${name}-2`} />
                        <label htmlFor={`${name}-2`}>Above Normal</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="3" id={`${name}-3`} />
                        <label htmlFor={`${name}-3`}>Well Above Normal</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Lifestyle Factors</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {["smoke", "alco", "active"].map((name) => (
              <FormField
                key={name}
                control={form.control}
                name={name as "smoke" | "alco" | "active"}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="capitalize">
                      {name === "alco" ? "Alcohol" : name}
                    </FormLabel>

                    <FormDescription>
                      {name === "smoke" &&
                        "Do you currently smoke tobacco products?"}
                      {name === "alco" &&
                        "Do you consume alcohol on a regular basis?"}
                      {name === "active" &&
                        "Do you maintain a regular physical exercise routine?"}
                    </FormDescription>

                    <FormControl>
                      <RadioGroup
                        value={field.value ? "yes" : "no"}
                        onValueChange={(v) => field.onChange(v === "yes")}
                        className="flex gap-4"
                      >
                        <div className="flex items-center gap-1">
                          <RadioGroupItem value="yes" id={`${name}-y`} />
                          <label htmlFor={`${name}-y`}>Yes</label>
                        </div>
                        <div className="flex items-center gap-1">
                          <RadioGroupItem value="no" id={`${name}-n`} />
                          <label htmlFor={`${name}-n`}>No</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full text-lg">
          Predict Cardiovascular Risk
        </Button>
      </form>
    </Form>
  );
}

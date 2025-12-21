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

// Zod schema
const formSchema = z
  .object({
    age: z
      .number({ error: "Age is required" })
      .min(18, { message: "Age must be at least 18" })
      .max(120, { message: "Age must be less than 120" }),
    height: z
      .number({ error: "Height is required" })
      .min(100, { message: "Height must be at least 100 cm" })
      .max(250, { message: "Height must be less than 250 cm" }),
    weight: z
      .number({ error: "Weight is required" })
      .min(30, { message: "Weight must be at least 30 kg" })
      .max(300, { message: "Weight must be less than 300 kg" }),
    gender: z.enum(["0", "1"] as const),
    ap_hi: z
      .number({ error: "Systolic BP is required" })
      .min(60, { message: "Systolic BP must be at least 60" })
      .max(250, { message: "Systolic BP must be less than 250" }),
    ap_lo: z
      .number({ error: "Diastolic BP is required" })
      .min(40, { message: "Diastolic BP must be at least 40" })
      .max(150, { message: "Diastolic BP must be less than 150" }),
    cholesterol: z.enum(["1", "2", "3"] as const),
    gluc: z.enum(["1", "2", "3"] as const),
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
    resolver: zodResolver(formSchema) as unknown as Resolver<FormData>,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card dark:bg-card mx-4 w-full max-w-full space-y-8 rounded-xl p-4 shadow-md sm:mx-auto sm:max-w-md sm:p-8 md:max-w-3xl lg:max-w-5xl dark:border"
      >
        {/* Personal Information */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">Predict CVD</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Age */}
            <FormField
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Age must be between 18 and 120 years.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Height */}
            <FormField
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter height"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter height in centimeters (100-250 cm).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Weight */}
            <FormField
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter weight"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter weight in kilograms (30-300 kg).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Female</SelectItem>
                      <SelectItem value="1">Male</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="my-6" />

        {/* Examination Features */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Examination Features</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Systolic BP */}
            <FormField
              name="ap_hi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Systolic BP</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Systolic BP" {...field} />
                  </FormControl>
                  <FormDescription>
                    The top number in your blood pressure reading.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Diastolic BP */}
            <FormField
              name="ap_lo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diastolic BP</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Diastolic BP"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The bottom number in your blood pressure reading.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Cholesterol */}
          <FormField
            name="cholesterol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cholesterol</FormLabel>
                <FormDescription>
                  Select your cholesterol level.
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="1" id="chol-1" />
                      <label htmlFor="chol-1">Normal</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="2" id="chol-2" />
                      <label htmlFor="chol-2">Above Normal</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="3" id="chol-3" />
                      <label htmlFor="chol-3">Well Above Normal</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Glucose */}
          <FormField
            name="gluc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Glucose</FormLabel>
                <FormDescription>Select your glucose level.</FormDescription>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="1" id="gluc-1" />
                      <label htmlFor="gluc-1">Normal</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="2" id="gluc-2" />
                      <label htmlFor="gluc-2">Above Normal</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="3" id="gluc-3" />
                      <label htmlFor="gluc-3">Well Above Normal</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-6" />

        {/* Lifestyle Features */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Lifestyle Features</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {["smoke", "alco", "active"].map((fieldName) => (
              <FormField
                key={fieldName}
                name={fieldName as keyof FormData}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{fieldName}</FormLabel>
                    <FormDescription>
                      {fieldName === "smoke"
                        ? "Do you currently smoke?"
                        : fieldName === "alco"
                          ? "Do you consume alcohol?"
                          : "Are you physically active?"}
                    </FormDescription>
                    <FormControl>
                      <RadioGroup
                        value={field.value ? "yes" : "no"}
                        onValueChange={(val) => field.onChange(val === "yes")}
                        className="flex gap-4"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="yes" id={`${fieldName}-yes`} />
                          <label htmlFor={`${fieldName}-yes`}>Yes</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="no" id={`${fieldName}-no`} />
                          <label htmlFor={`${fieldName}-no`}>No</label>
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

        <Button type="submit" className="w-full">
          Predict CVD
        </Button>
      </form>
    </Form>
  );
}

"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Activity,
  ShieldAlert,
  ClipboardList,
  Users,
  FileText,
  ChevronRight,
  ChevronLeft,
  Phone,
  MapPin,
  Droplets,
  Loader2
} from "lucide-react";

import { cn } from "@/lib/utils";
import { DonorEligibilitySchema } from "@/lib/validations";
import { registerAsDonor } from "@/actions/user.action";
import MyButton from "@/components/MyButton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import Search from "@/components/search/Search";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

type DonorEligibilityFormValues = z.infer<typeof DonorEligibilitySchema>;

const STEPS = [
  { id: 1, name: "Basic Eligibility", icon: ClipboardList },
  { id: 2, name: "Chronic Illnesses", icon: ShieldAlert },
  { id: 3, name: "Medical History", icon: Activity },
  { id: 4, name: "Female Donors Section", icon: Users },
  { id: 5, name: "Donor Contact & Privacy", icon: Phone },
  { id: 6, name: "Final Terms", icon: FileText },
];

const MEDICAL_CONDITIONS = [
  { id: "diabetes", label: "Diabetes" },
  { id: "cancer", label: "Cancer" },
  { id: "tb", label: "Tuberculosis (TB)" },
  { id: "asthma", label: "Bronchial asthma" },
  { id: "liver", label: "Liver disease" },
  { id: "kidney", label: "Kidney disease" },
  { id: "clotting", label: "Blood clotting" },
  { id: "heart", label: "Heart disease" },
  { id: "hiv", label: "HIV / AIDS" },
  { id: "epilepsy", label: "Epilepsy" },
  { id: "none", label: "None of the above" },
];

export const DonorEligibilityForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<DonorEligibilityFormValues>({
    resolver: zodResolver(DonorEligibilitySchema),
    mode: "onChange",
    defaultValues: {
      ageEligible: undefined,
      weightEligible: undefined,
      chronicIllness: undefined,
      medicalConditions: [],
      pregnantOrRecent: "na",
      breastfeeding: "na",
      consentSharePhone: undefined,
      consentEmergency: undefined,
      contactnumber: "",
      city: "",
      bloodGroup: undefined,
      agreeTerms: false,
    },
  });

  const { control, handleSubmit, formState: { errors, isValid }, trigger, getValues, setValue } = form;

  const handleNext = async () => {
    // Validate fields in the current step before proceeding
    let fieldsToValidate: Array<keyof DonorEligibilityFormValues> = [];

    if (currentStep === 1) {
      fieldsToValidate = ["ageEligible", "weightEligible"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["chronicIllness"];
    } else if (currentStep === 3) {
      fieldsToValidate = ["medicalConditions"];
    } else if (currentStep === 4) {
      fieldsToValidate = ["pregnantOrRecent", "breastfeeding"];
    } else if (currentStep === 5) {
      fieldsToValidate = ["consentSharePhone", "consentEmergency", "contactnumber", "city", "bloodGroup"];
    }

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    } else {
      toast.error("Please complete the required fields correctly in this step.");
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConditionChange = (
    checked: boolean,
    conditionValue: string,
    currentValues: string[]
  ) => {
    if (conditionValue === "none") {
      if (checked) {
        setValue("medicalConditions", ["none"], { shouldValidate: true });
      } else {
        setValue("medicalConditions", [], { shouldValidate: true });
      }
    } else {
      if (checked) {
        const nextValues = currentValues.filter((v) => v !== "none");
        setValue("medicalConditions", [...nextValues, conditionValue], { shouldValidate: true });
      } else {
        setValue("medicalConditions", currentValues.filter((v) => v !== conditionValue), { shouldValidate: true });
      }
    }
  };

  const onSubmit = async (data: DonorEligibilityFormValues) => {
    if (!user) {
      toast.error("You must be logged in to register as a donor.");
      return;
    }

    // Evaluate eligibility criteria
    const isEligible =
      data.ageEligible === "yes" &&
      data.weightEligible === "yes" &&
      data.chronicIllness === "no" &&
      data.medicalConditions.length === 1 &&
      data.medicalConditions.includes("none") &&
      data.pregnantOrRecent !== "yes" &&
      data.breastfeeding !== "yes" &&
      data.consentSharePhone === "yes" &&
      data.consentEmergency === "yes";

    if (!isEligible) {
      toast.error("Based on your answers, you are not eligible to register as a donor.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await registerAsDonor({
        clerkid: user?.id || "",
        fullname: user?.fullName || user?.username || "Donor",
        email: user?.primaryEmailAddress?.emailAddress || "",
        contactno: data.contactnumber,
        city: data.city,
        bloodGroup: data.bloodGroup,
        eligibility: {
          ageEligible: data.ageEligible,
          weightEligible: data.weightEligible,
          chronicIllness: data.chronicIllness,
          medicalConditions: data.medicalConditions,
          pregnantOrRecent: data.pregnantOrRecent,
          breastfeeding: data.breastfeeding,
          consentSharePhone: data.consentSharePhone,
          consentEmergency: data.consentEmergency,
        }
      });

      if (res.success) {
        toast.success("Congratulations! You have registered successfully as a donor.");
        router.push("/donate");
      } else {
        toast.error(res.error?.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ActiveIcon = STEPS[currentStep - 1].icon;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Title & Subtitle */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Donor Registration
        </h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto font-medium">
          Saving lives through precision donation. Please complete the following eligibility assessment to register securely as a vital medical resource.
        </p>
      </div>

      {/* Progress Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs md:text-sm font-semibold">
          <span className="text-[#FB2C36]">Step {currentStep} of 6</span>
          <span className="text-zinc-400">{STEPS[currentStep - 1].name}</span>
        </div>
        <div className="w-full h-2 bg-zinc-800/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FB2C36] transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content Card */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative overflow-visible bg-zinc-950/40 border border-zinc-800/70 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 before:absolute before:inset-0 before:backdrop-blur-xl before:rounded-2xl before:-z-10">

          {/* Card Header */}
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-4 mb-6">
            <span className="p-2.5 bg-[#FB2C36]/10 text-[#FB2C36] rounded-xl flex items-center justify-center">
              <ActiveIcon className="size-5 md:size-6" />
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white">
              {currentStep}. {STEPS[currentStep - 1].name}
            </h2>
          </div>

          {/* STEP 1: Basic Eligibility */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <Controller
                name="ageEligible"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-3">
                    <FieldLabel className="text-sm md:text-base font-semibold text-zinc-300">
                      Are you between 18 and 65 years old?
                    </FieldLabel>
                    <div className="flex gap-4">
                      {["yes", "no"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => field.onChange(opt)}
                          className={cn(
                            "flex-1 py-3 px-6 rounded-xl border font-bold text-center transition-all",
                            field.value === opt
                              ? "bg-[#FB2C36]/10 border-[#FB2C36] text-[#FB2C36] ring-2 ring-[#FB2C36]/20"
                              : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-300"
                          )}
                        >
                          {opt === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="weightEligible"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-3">
                    <FieldLabel className="text-sm md:text-base font-semibold text-zinc-300">
                      Do you weigh at least 45kg?
                    </FieldLabel>
                    <div className="flex gap-4">
                      {["yes", "no"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => field.onChange(opt)}
                          className={cn(
                            "flex-1 py-3 px-6 rounded-xl border font-bold text-center transition-all",
                            field.value === opt
                              ? "bg-[#FB2C36]/10 border-[#FB2C36] text-[#FB2C36] ring-2 ring-[#FB2C36]/20"
                              : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-300"
                          )}
                        >
                          {opt === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                    )}
                  </Field>
                )}
              />
            </div>
          )}

          {/* STEP 2: Chronic Illnesses */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Controller
                name="chronicIllness"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-3">
                    <FieldLabel className="text-sm md:text-base font-semibold text-zinc-300">
                      Do you suffer from any chronic illnesses?
                    </FieldLabel>
                    <div className="flex gap-4">
                      {["yes", "no"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => field.onChange(opt)}
                          className={cn(
                            "flex-1 py-3 px-6 rounded-xl border font-bold text-center transition-all",
                            field.value === opt
                              ? "bg-[#FB2C36]/10 border-[#FB2C36] text-[#FB2C36] ring-2 ring-[#FB2C36]/20"
                              : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-300"
                          )}
                        >
                          {opt === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                    )}
                  </Field>
                )}
              />
            </div>
          )}

          {/* STEP 3: Medical History */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <p className="text-zinc-400 text-sm mb-4">
                Please select any conditions you currently have or have experienced in the past.
              </p>
              <Controller
                name="medicalConditions"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {MEDICAL_CONDITIONS.map((cond) => {
                        const isChecked = field.value?.includes(cond.id) || false;
                        return (
                          <div
                            key={cond.id}
                            onClick={() => handleConditionChange(!isChecked, cond.id, field.value || [])}
                            className={cn(
                              "flex items-center gap-3 p-4 rounded-xl border cursor-pointer select-none transition-all",
                              isChecked
                                ? "bg-[#FB2C36]/10 border-[#FB2C36] text-white"
                                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-300"
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="size-4 shrink-0 accent-[#FB2C36] rounded border-zinc-700 bg-zinc-900"
                            />
                            <span className="text-sm font-semibold">{cond.label}</span>
                          </div>
                        );
                      })}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                    )}
                  </Field>
                )}
              />
            </div>
          )}

          {/* STEP 4: Female Donors Section */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <p className="text-zinc-400 text-sm mb-4">
                If applicable, please answer the following questions.
              </p>
              <Controller
                name="pregnantOrRecent"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-3">
                    <FieldLabel className="text-sm md:text-base font-semibold text-zinc-300">
                      Are you currently pregnant or have you been pregnant in the last 6 months?
                    </FieldLabel>
                    <div className="flex gap-3">
                      {["yes", "no", "na"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => field.onChange(opt)}
                          className={cn(
                            "flex-1 py-3 px-4 rounded-xl border font-bold text-center capitalize transition-all",
                            field.value === opt
                              ? "bg-[#FB2C36]/10 border-[#FB2C36] text-[#FB2C36] ring-2 ring-[#FB2C36]/20"
                              : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-300"
                          )}
                        >
                          {opt === "na" ? "N/A" : opt}
                        </button>
                      ))}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="breastfeeding"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-3">
                    <FieldLabel className="text-sm md:text-base font-semibold text-zinc-300">
                      Are you currently breastfeeding?
                    </FieldLabel>
                    <div className="flex gap-3">
                      {["yes", "no", "na"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => field.onChange(opt)}
                          className={cn(
                            "flex-1 py-3 px-4 rounded-xl border font-bold text-center capitalize transition-all",
                            field.value === opt
                              ? "bg-[#FB2C36]/10 border-[#FB2C36] text-[#FB2C36] ring-2 ring-[#FB2C36]/20"
                              : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-300"
                          )}
                        >
                          {opt === "na" ? "N/A" : opt}
                        </button>
                      ))}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                    )}
                  </Field>
                )}
              />
            </div>
          )}

          {/* STEP 5: Donor Contact & Privacy */}
          {currentStep === 5 && (
            <div className="space-y-6">

              <Controller
                name="consentSharePhone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-3">
                    <FieldLabel className="text-sm md:text-base font-semibold text-zinc-300">
                      Do you consent to share your phone number with matched recipients or hospitals?
                    </FieldLabel>
                    <div className="flex gap-4">
                      {["yes", "no"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => field.onChange(opt)}
                          className={cn(
                            "flex-1 py-3 px-6 rounded-xl border font-bold text-center transition-all",
                            field.value === opt
                              ? "bg-[#FB2C36]/10 border-[#FB2C36] text-[#FB2C36] ring-2 ring-[#FB2C36]/20"
                              : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-300"
                          )}
                        >
                          {opt === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="consentEmergency"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-3">
                    <FieldLabel className="text-sm md:text-base font-semibold text-zinc-300">
                      Are you available to be contacted in emergency situations?
                    </FieldLabel>
                    <div className="flex gap-4">
                      {["yes", "no"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => field.onChange(opt)}
                          className={cn(
                            "flex-1 py-3 px-6 rounded-xl border font-bold text-center transition-all",
                            field.value === opt
                              ? "bg-[#FB2C36]/10 border-[#FB2C36] text-[#FB2C36] ring-2 ring-[#FB2C36]/20"
                              : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-300"
                          )}
                        >
                          {opt === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                    )}
                  </Field>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-zinc-800/60 pt-6">

                {/* Contact Number Field */}
                <Controller
                  name="contactnumber"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field className="flex flex-col gap-1.5" data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-sm font-medium text-zinc-300" htmlFor={field.name}>
                        Contact Number
                      </FieldLabel>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-zinc-500">
                          <Phone className="size-4" />
                        </span>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your phone number"
                          type="tel"
                          required
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/30 h-10 rounded-lg"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                      )}
                    </Field>
                  )}
                />

                {/* City Autocomplete Field */}
                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field className="flex flex-col gap-1.5" data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-sm font-medium text-zinc-300" htmlFor={field.name}>
                        City
                      </FieldLabel>
                      <div className="flex w-full">
                        <Search
                          placeholder="Search your city"
                          value={field.value}
                          onSelectAddress={field.onChange}
                          disableUrlUpdate
                          icon={<MapPin className="size-4" />}
                          inputClassName="h-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/30 rounded-lg"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Blood Type Select Field */}
              <Controller
                name="bloodGroup"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-1.5 border-t border-zinc-800/60 pt-6" data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-medium text-zinc-300" htmlFor={field.name}>
                      Blood Group
                    </FieldLabel>
                    <div className="relative flex items-center w-full">
                      <span className="absolute left-3 text-zinc-500 z-10">
                        <Droplets className="size-4" />
                      </span>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full h-10 pl-10 pr-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-zinc-500 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/30 transition-all cursor-pointer">
                          <SelectValue placeholder="Select your blood group" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-950 border border-zinc-800">
                          <SelectGroup>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                    )}
                  </Field>
                )}
              />

            </div>
          )}

          {/* STEP 6: Final Terms */}
          {currentStep === 6 && (
            <div className="space-y-6">

              {/* Important Information Panel */}
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 space-y-4">
                <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="size-4 text-[#FB2C36]" />
                  Important Information
                </h3>
                <ul className="text-xs md:text-sm text-zinc-400 space-y-2.5 list-disc pl-5 leading-relaxed">
                  <li>I declare that all information provided is accurate and true to the best of my knowledge.</li>
                  <li>I understand the risks and benefits associated with blood donation.</li>
                  <li>I consent to the testing of my blood for infectious diseases.</li>
                </ul>
              </div>

              {/* Agreement Checkbox */}
              <Controller
                name="agreeTerms"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none text-zinc-300">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="size-4 mt-1 accent-[#FB2C36] rounded border-zinc-700 bg-zinc-900"
                      />
                      <span className="text-xs md:text-sm leading-relaxed font-semibold">
                        I have read and agree to the Important Information and terms of donation.
                      </span>
                    </label>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                    )}
                  </Field>
                )}
              />

            </div>
          )}

        </div>

        {/* Navigation Buttons footer */}
        <div className="flex justify-between items-center gap-4">
          {currentStep > 1 ? (
            <MyButton
              type="button"
              variant="outline"
              onClick={handleBack}
              className="py-6 px-6 font-bold border-zinc-800 text-zinc-400 hover:bg-zinc-900/40 hover:text-white rounded-xl flex items-center gap-2"
            >
              <ChevronLeft className="size-4" />
              Back
            </MyButton>
          ) : (
            <div />
          )}

          {currentStep < 6 ? (
            <MyButton
              type="button"
              onClick={handleNext}
              className="py-6 px-6 font-bold bg-[#FB2C36] hover:bg-[#D92029] text-white rounded-xl flex items-center gap-2"
            >
              Next
              <ChevronRight className="size-4" />
            </MyButton>
          ) : (
            <MyButton
              type="submit"
              disabled={isSubmitting}
              className="py-6 px-8 font-bold bg-[#FB2C36] hover:bg-[#D92029] text-white rounded-xl flex items-center gap-2 shadow-lg shadow-red-650/10"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  Register as a Donor
                </>
              )}
            </MyButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default DonorEligibilityForm;

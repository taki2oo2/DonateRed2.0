"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Pencil, X, Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Autocompletesearch } from "@/components/search/Search";

import { UpdateOtherDetailsSchema } from "@/lib/validations";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MyButton from "@/components/MyButton";
import { updateOtherDetails } from "@/actions/user.action";

type OtherDetailsFormValues = z.infer<typeof UpdateOtherDetailsSchema>;

interface OtherDetailsFormProps {
  initialCity: string;
  initialContactNo: string;
  initialBloodGroup: string;
}

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;

export default function OtherDetailsForm({
  initialCity,
  initialContactNo,
  initialBloodGroup,
}: OtherDetailsFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<OtherDetailsFormValues>({
    resolver: zodResolver(UpdateOtherDetailsSchema as any),
    defaultValues: {
      city: initialCity || "",
      contactno: initialContactNo || "",
      bloodGroup: (initialBloodGroup as any) || "O-",
    },
  });

  const { control, handleSubmit, reset } = form;

  const handleCancel = () => {
    reset({
      city: initialCity || "",
      contactno: initialContactNo || "",
      bloodGroup: (initialBloodGroup as any) || "O-",
    });
    setIsEditing(false);
  };

  const onSubmit = async (values: OtherDetailsFormValues) => {
    if (!isEditing) return;

    startTransition(async () => {
      try {
        const res = await updateOtherDetails({
          city: values.city.trim(),
          contactno: values.contactno.trim(),
          bloodGroup: values.bloodGroup,
        });

        if (res.success) {
          toast.success("Other details updated successfully.");
          setIsEditing(false);
          router.refresh();
        } else {
          toast.error(res.error?.message || "Failed to update details.");
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <div className="bg-[#12141a]/95 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Other Details
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/50 text-zinc-300 transition-all cursor-pointer"
          >
            {isEditing ? (
              <>
                <X className="w-3.5 h-3.5 text-zinc-400" />
                Cancel
              </>
            ) : (
              <>
                <Pencil className="w-3.5 h-3.5 text-zinc-400" />
                Edit
              </>
            )}
          </button>
          <Info className="w-4 h-4 text-zinc-400" />
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* City / Location */}
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error} className="space-y-1.5">
                <FieldLabel
                  htmlFor="city"
                  className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold"
                >
                  City / Location
                </FieldLabel>
                {isEditing ? (
                  <Autocompletesearch
                    placeholder="Search for your city"
                    icon={<MapPin className="size-4" />}
                    value={field.value}
                    onSelectAddress={(address) => field.onChange(address)}
                    disableUrlUpdate
                    inputClassName="h-10 bg-[#181a22]/80 border-zinc-800/70 text-zinc-200 text-sm rounded-lg focus-visible:border-zinc-600"
                  />
                ) : (
                  <div className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 font-medium">
                    {field.value || "Not specified"}
                  </div>
                )}
                {fieldState.error && (
                  <FieldError className="text-xs text-red-400">
                    {fieldState.error.message}
                  </FieldError>
                )}
              </Field>
            )}
          />

          {/* Contact Number */}
          <Controller
            name="contactno"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error} className="space-y-1.5">
                <FieldLabel
                  htmlFor="contactno"
                  className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold"
                >
                  Contact Number
                </FieldLabel>
                <Input
                  {...field}
                  id="contactno"
                  disabled={!isEditing || isPending}
                  placeholder="Enter contact number"
                  className="w-full bg-[#181a22]/80 border-zinc-800/70 text-zinc-200 text-sm h-10 rounded-lg focus-visible:border-zinc-600 disabled:opacity-80 disabled:cursor-not-allowed disabled:bg-[#181a22]/50"
                />
                {fieldState.error && (
                  <FieldError className="text-xs text-red-400">
                    {fieldState.error.message}
                  </FieldError>
                )}
              </Field>
            )}
          />

          {/* Blood Group */}
          <div className="sm:col-span-2">
            <Controller
              name="bloodGroup"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error} className="space-y-1.5">
                  <FieldLabel
                    htmlFor="bloodGroup"
                    className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold"
                  >
                    Blood Group
                  </FieldLabel>
                  {isEditing ? (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isPending}
                    >
                      <SelectTrigger
                        id="bloodGroup"
                        className="w-full bg-[#181a22]/80 border-zinc-800/70 text-zinc-200 text-sm h-10 rounded-lg focus-visible:border-zinc-600"
                      >
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#181a22] border-zinc-800 text-zinc-200">
                        {BLOOD_GROUPS.map((bg) => (
                          <SelectItem key={bg} value={bg}>
                            {bg} ({bg.includes("-") ? "Negative" : "Positive"})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="w-full bg-[#181a22]/80 border border-zinc-800/70 rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 font-medium">
                      {field.value
                        ? `${field.value} (${field.value.includes("-") ? "Negative" : "Positive"})`
                        : "Not specified"}
                    </div>
                  )}
                  {fieldState.error && (
                    <FieldError className="text-xs text-red-400">
                      {fieldState.error.message}
                    </FieldError>
                  )}
                </Field>
              )}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <MyButton
            type="submit"
            disabled={!isEditing || isPending}
            className="bg-[#FB2C36] hover:bg-[#e02630] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all shadow-md shadow-red-950/40 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Other Details"
            )}
          </MyButton>
        </div>
      </form>
    </div>
  );
}

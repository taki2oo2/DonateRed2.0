"use client";

import * as z from "zod";
import {
  ForgotPasswordFormSchema,
  ResetPasswordConfirmFormSchema,
} from "@/lib/validations";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, FieldGroup, FieldLabel, Field } from "../ui/field";
import { Input } from "../ui/input";
import MyButton from "@/components/MyButton";
import {
  Mail,
  KeyRound,
  Lock,
  Loader2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  RotateCw,
  Info,
} from "lucide-react";
import { useSignIn, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import ROUTES from "@/constants/routes";

type ForgotPasswordValues = z.infer<typeof ForgotPasswordFormSchema>;
type ResetConfirmValues = z.infer<typeof ResetPasswordConfirmFormSchema>;

const ForgotPasswordForm = () => {
  const { signIn, fetchStatus } = useSignIn();
  const { setActive } = useClerk();
  const router = useRouter();

  const [step, setStep] = useState<"request" | "verify">("request");
  const [userEmail, setUserEmail] = useState<string>("");
  const [clerkError, setClerkError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // Step 1: Email Form
  const emailForm = useForm<ForgotPasswordValues>({
    resolver: zodResolver(ForgotPasswordFormSchema as any),
    defaultValues: {
      email: "",
    },
  });

  // Step 2: Code & New Password Form
  const resetForm = useForm<ResetConfirmValues>({
    resolver: zodResolver(ResetPasswordConfirmFormSchema as any),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle Step 1: Send verification code
  const handleSendCode = async (data: ForgotPasswordValues) => {
    setClerkError("");
    setIsSubmitting(true);

    try {
      // 1. Initialize sign-in attempt with user's email
      const { error: createError } = await signIn.create({
        identifier: data.email.trim(),
      });

      if (createError) {
        setClerkError(
          createError.message ||
            "Unable to find an account with this email address.",
        );
        setIsSubmitting(false);
        return;
      }

      // 2. Request password reset email code
      const { error: sendCodeError } =
        await signIn.resetPasswordEmailCode.sendCode();

      if (sendCodeError) {
        setClerkError(
          sendCodeError.message ||
            "Failed to send reset code. Please try again.",
        );
        setIsSubmitting(false);
        return;
      }

      setUserEmail(data.email.trim());
      resetForm.reset();
      setStep("verify");
      toast.success("Verification code sent to your email!");
    } catch (err: any) {
      setClerkError(
        err?.message ||
          "Something went wrong while sending the verification code.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Step 2: Verify code & submit new password
  const handleResetPassword = async (data: ResetConfirmValues) => {
    setClerkError("");
    setIsSubmitting(true);

    try {
      // 1. Verify the 6-digit code
      const { error: verifyError } =
        await signIn.resetPasswordEmailCode.verifyCode({
          code: data.code.trim(),
        });

      if (verifyError) {
        setClerkError(
          verifyError.message || "Invalid or expired verification code.",
        );
        setIsSubmitting(false);
        return;
      }

      // 2. Submit the new password
      const { error: submitError } =
        await signIn.resetPasswordEmailCode.submitPassword({
          password: data.password,
        });

      if (submitError) {
        setClerkError(
          submitError.message ||
            "Failed to set new password. Please try again.",
        );
        setIsSubmitting(false);
        return;
      }

      // 3. Finalize session if complete
      if (signIn.status === "complete") {
        if (signIn.createdSessionId && setActive) {
          await setActive({ session: signIn.createdSessionId });
          toast.success("Password reset successfully! Welcome back.");
          router.push("/");
        } else {
          await signIn.finalize({
            navigate: ({ decorateUrl }) => {
              const url = decorateUrl("/");
              if (url.startsWith("http")) {
                window.location.href = url;
              } else {
                router.push(url);
              }
            },
          });
        }
      } else {
        toast.success(
          "Password reset successfully! Please sign in with your new password.",
        );
        router.push(ROUTES.GET_STARTED);
      }
    } catch (err: any) {
      setClerkError(
        err?.message || "Failed to reset password. Please check your details.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend code handler
  const handleResendCode = async () => {
    setClerkError("");
    setIsResending(true);

    try {
      const { error } = await signIn.resetPasswordEmailCode.sendCode();
      if (error) {
        setClerkError(error.message || "Failed to resend verification code.");
      } else {
        toast.success("New verification code sent to your email!");
      }
    } catch (err: any) {
      setClerkError(err?.message || "Failed to resend code.");
    } finally {
      setIsResending(false);
    }
  };

  const isLoading = isSubmitting || fetchStatus === "fetching";

  return (
    <div className="space-y-4">
      {/* Error Callout */}
      {clerkError && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-medium leading-relaxed flex items-start gap-2.5 animate-in fade-in duration-200">
          <div className="size-4 shrink-0 mt-0.5 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-[10px]">
            !
          </div>
          <span>{clerkError}</span>
        </div>
      )}

      {step === "request" ? (
        /* ============ STEP 1: ENTER EMAIL ============ */
        <form
          onSubmit={emailForm.handleSubmit(handleSendCode)}
          className="space-y-4"
        >
          {/* Instructions banner */}
          <div className="p-3.5 rounded-xl border border-white/8 bg-white/[0.02] text-zinc-300 text-xs leading-relaxed flex items-start gap-3">
            <span className="p-1 rounded-md bg-[#FB2C36]/10 text-[#FB2C36] shrink-0 mt-0.5">
              <Info className="size-3.5" />
            </span>
            <span>
              Enter your registered email address below. We&apos;ll send you a
              6-digit verification code to securely reset your password.
            </span>
          </div>

          <FieldGroup className="gap-4 flex flex-col pt-1">
            <Controller
              name="email"
              control={emailForm.control}
              render={({ field, fieldState }) => (
                <Field
                  className="flex flex-col gap-1.5"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel
                    className="text-sm font-medium text-zinc-300"
                    htmlFor={field.name}
                  >
                    Email Address
                  </FieldLabel>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-zinc-500">
                      <Mail className="size-4" />
                    </span>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="name@example.com"
                      type="email"
                      autoComplete="email"
                      required
                      className="pl-10.5 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/30 h-11 rounded-lg text-sm"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs text-red-500 mt-1"
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <MyButton
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 h-11 bg-[#FB2C36] hover:bg-[#E7000B] text-white font-medium rounded-lg shadow-[0_10px_25px_-12px_rgba(251,44,54,0.8)] transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Sending Code...
              </>
            ) : (
              <>
                Send Verification Code
                <ArrowRight className="size-4" />
              </>
            )}
          </MyButton>

          <div className="pt-2 text-center">
            <Link
              href={ROUTES.GET_STARTED}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition hover:text-[#FB2C36]"
            >
              <ArrowLeft className="size-3.5" />
              Remember your password? Sign in
            </Link>
          </div>
        </form>
      ) : (
        /* ============ STEP 2: VERIFY CODE & NEW PASSWORD ============ */
        <form
          onSubmit={resetForm.handleSubmit(handleResetPassword)}
          className="space-y-4"
        >
          {/* Success / Info Dispatch Banner */}
          <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 text-xs leading-relaxed flex items-start gap-3">
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
              <CheckCircle2 className="size-3.5" />
            </span>
            <div className="space-y-1">
              <p>
                Verification code dispatched to{" "}
                <strong className="font-semibold text-white">
                  {userEmail}
                </strong>
                .
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending || isLoading}
                  className="inline-flex items-center gap-1 text-[11px] text-[#FB2C36] transition hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RotateCw
                    className={`size-3 ${isResending ? "animate-spin" : ""}`}
                  />
                  {isResending ? "Sending..." : "Resend code"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setClerkError("");
                    setStep("request");
                  }}
                  className="text-[11px] text-zinc-400 hover:text-white underline underline-offset-2 transition"
                >
                  Change email address
                </button>
              </div>
            </div>
          </div>

          <FieldGroup className="gap-3.5 flex flex-col pt-1">
            {/* 6-Digit Code */}
            <Controller
              name="code"
              control={resetForm.control}
              render={({ field, fieldState }) => (
                <Field
                  className="flex flex-col gap-1.5"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel
                    className="text-sm font-medium text-zinc-300"
                    htmlFor={field.name}
                  >
                    Verification code
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    value={field.value ?? ""}
                    onChange={(event) =>
                      resetForm.setValue(
                        "code",
                        event.target.value.replace(/\D/g, "").slice(0, 6),
                        { shouldDirty: true },
                      )
                    }
                    aria-invalid={fieldState.invalid}
                    autoComplete="one-time-code"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    type="text"
                    className="h-11 bg-white/5 border-white/10 px-3 font-mono text-sm tracking-wider text-white placeholder:text-zinc-500 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/30 rounded-lg"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="mt-1 text-xs text-red-500"
                    />
                  )}
                </Field>
              )}
            />

            {/* New Password */}
            <Controller
              name="password"
              control={resetForm.control}
              render={({ field, fieldState }) => (
                <Field
                  className="flex flex-col gap-1.5"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel
                    className="text-sm font-medium text-zinc-300"
                    htmlFor={field.name}
                  >
                    New Password
                  </FieldLabel>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-zinc-500">
                      <Lock className="size-4" />
                    </span>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="At least 6 characters"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="pl-10.5 pr-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/30 h-11 rounded-lg text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 text-zinc-500 hover:text-zinc-300 transition"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs text-red-500 mt-1"
                    />
                  )}
                </Field>
              )}
            />

            {/* Confirm New Password */}
            <Controller
              name="confirmPassword"
              control={resetForm.control}
              render={({ field, fieldState }) => (
                <Field
                  className="flex flex-col gap-1.5"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel
                    className="text-sm font-medium text-zinc-300"
                    htmlFor={field.name}
                  >
                    Confirm New Password
                  </FieldLabel>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-zinc-500">
                      <Lock className="size-4" />
                    </span>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Re-enter your password"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="pl-10.5 pr-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/30 h-11 rounded-lg text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 text-zinc-500 hover:text-zinc-300 transition"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs text-red-500 mt-1"
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <MyButton
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 h-11 bg-[#FB2C36] hover:bg-[#E7000B] text-white font-medium rounded-lg shadow-[0_10px_25px_-12px_rgba(251,44,54,0.8)] transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Resetting
                Password...
              </>
            ) : (
              "Reset Password & Sign In"
            )}
          </MyButton>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                setClerkError("");
                setStep("request");
              }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition hover:text-zinc-200"
            >
              <ArrowLeft className="size-3.5" />
              Use a different email address
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;

'use client'

import * as z from "zod"
import { SignupFormSchema } from "@/lib/validations"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, FieldGroup, FieldLabel, Field } from "../ui/field"
import { Input } from "../ui/input"
import MyButton from "@/components/MyButton"
import { User, Mail, Phone, Lock, KeyRound, ArrowLeft, Loader2 } from "lucide-react"
import { useSignUp, useClerk } from "@clerk/nextjs"
import { useState } from "react"
import { useRouter } from "next/navigation"

type SignupFormValues = z.infer<typeof SignupFormSchema>

type SignupStep = "form" | "email"

const Signup = () => {
  const { signUp, fetchStatus } = useSignUp()
  const { setActive } = useClerk()
  const router = useRouter()

  const [step, setStep] = useState<SignupStep>("form")
  const [clerkError, setClerkError] = useState<string>("")
  const [emailCode, setEmailCode] = useState("")
  const [userEmail, setUserEmail] = useState("")

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema as any),
    defaultValues: {
      fullname: "",
      email: "",
      contactnumber: "",
      password: "",
    },
  })

  const handleFormSubmit = async (data: SignupFormValues) => {
    setClerkError("")
    setUserEmail(data.email)

    const nameParts = data.fullname.trim().split(" ")
    const firstName = nameParts[0] || data.fullname
    const lastName = nameParts.slice(1).join(" ") || undefined

    const { error } = await signUp.password({
      emailAddress: data.email,
      password: data.password,
      firstName,
      lastName,
      unsafeMetadata: {
        contactnumber: data.contactnumber,
      },
    })

    if (error) {
      setClerkError(error.message || "Failed to create account. Please check your details.")
      return
    }

    const { error: sendEmailErr } = await signUp.verifications.sendEmailCode()
    if (sendEmailErr) {
      setClerkError(sendEmailErr.message || "Failed to send email verification code.")
      return
    }

    setStep("email")
  }

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setClerkError("")

    if (!emailCode.trim()) {
      setClerkError("Please enter the verification code sent to your email.")
      return
    }

    const { error } = await signUp.verifications.verifyEmailCode({ code: emailCode.trim() })

    if (error) {
      setClerkError(error.message || "Invalid email verification code.")
      return
    }

    
    if (signUp.status === "complete") {
      if (signUp.createdSessionId && setActive) {
        await setActive({ session: signUp.createdSessionId })
        router.push("/")
      } else {
        await signUp.finalize({
          navigate: ({ decorateUrl }) => {
            const url = decorateUrl("/")
            if (url.startsWith("http")) {
              window.location.href = url
            } else {
              router.push(url)
            }
          },
        })
      }
    } else {
      setClerkError(`Account status: ${signUp.status}. Unverified fields: ${signUp.unverifiedFields.join(", ")}`)
    }
  }

  const handleResendEmailCode = async () => {
    setClerkError("")
    const { error } = await signUp.verifications.sendEmailCode()
    if (error) {
      setClerkError(error.message || "Failed to resend email code.")
    }
  }

  const isLoading = fetchStatus === "fetching"

  return (
    <div className="space-y-4">
      {clerkError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-medium leading-relaxed">
          {clerkError}
        </div>
      )}

      {step === "form" && (
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
          <FieldGroup className="gap-4 flex flex-col">
            <Controller
              name="fullname"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex flex-col gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-medium text-zinc-300" htmlFor={field.name}>
                    Full Name
                  </FieldLabel>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-zinc-500">
                      <User className="size-4" />
                    </span>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Please Enter Your Full Name"
                      type="text"
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

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex flex-col gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-medium text-zinc-300" htmlFor={field.name}>
                    Email Address
                  </FieldLabel>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-zinc-500">
                      <Mail className="size-4" />
                    </span>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Please Enter Your Email Address"
                      type="email"
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

            <Controller
              name="contactnumber"
              control={form.control}
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
                      placeholder="Please Enter Your Contact Number"
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

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex flex-col gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-medium text-zinc-300" htmlFor={field.name}>
                    Password
                  </FieldLabel>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-zinc-500">
                      <Lock className="size-4" />
                    </span>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Please Enter Your Password"
                      type="password"
                      required
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/30 h-10 rounded-lg"
                    />
                  </div>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-400 bg-white/5 p-3 rounded-lg border border-white/5 leading-relaxed">
                    <span className="flex items-center gap-1.5">🔒 6–64 characters</span>
                    <span className="flex items-center gap-1.5">🔠 Uppercase letter (A–Z)</span>
                    <span className="flex items-center gap-1.5">🔡 Lowercase letter (a–z)</span>
                    <span className="flex items-center gap-1.5">🔢 At least one number</span>
                    <span className="flex items-center gap-1.5">✨ Special char (!@#$...)</span>
                    <span className="flex items-center gap-1.5">🚫 No spaces</span>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <MyButton
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 h-11 bg-[#FB2C36] hover:bg-[#E7000B] text-white font-medium rounded-lg shadow-[0_10px_25px_-12px_rgba(251,44,54,0.8)] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </MyButton>
          <div id="clerk-captcha" />
        </form>
      )}

      {step === "email" && (
        <form onSubmit={handleVerifyEmail} className="space-y-4">
          <div className="text-center space-y-1 mb-2">
            <h3 className="text-lg font-semibold text-white">Verify Your Email</h3>
            <p className="text-xs text-zinc-400">
              We sent a 6-digit verification code to <span className="text-white font-medium">{userEmail}</span>
            </p>
          </div>

          <Field className="flex flex-col gap-1.5">
            <FieldLabel className="text-sm font-medium text-zinc-300">
              Email Verification Code
            </FieldLabel>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-zinc-500">
                <KeyRound className="size-4" />
              </span>
              <Input
                value={emailCode}
                onChange={(e) => setEmailCode(e.target.value)}
                placeholder="Enter 6-digit code"
                type="text"
                required
                maxLength={6}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/30 h-10 rounded-lg text-center tracking-widest text-base"
              />
            </div>
          </Field>

          <MyButton
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 h-11 bg-[#FB2C36] hover:bg-[#E7000B] text-white font-medium rounded-lg shadow-[0_10px_25px_-12px_rgba(251,44,54,0.8)] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Verifying...
              </>
            ) : (
              "Verify Email & Complete Sign Up"
            )}
          </MyButton>

          <div className="flex items-center justify-between text-xs text-zinc-400 pt-2">
            <button
              type="button"
              onClick={() => setStep("form")}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-3.5" /> Back
            </button>
            <button
              type="button"
              onClick={handleResendEmailCode}
              disabled={isLoading}
              className="text-[#FB2C36] hover:underline"
            >
              Resend Code
            </button>
          </div>
          <div id="clerk-captcha" />
        </form>
      )}
    </div>
  )
}

export default Signup
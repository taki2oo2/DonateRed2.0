'use client'

import * as z from "zod"
import { SigninFormSchema } from "@/lib/validations"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, FieldGroup, FieldLabel, Field } from "../ui/field"
import { Input } from "../ui/input"
import MyButton from "@/components/MyButton"
import { Mail, Lock, KeyRound, Loader2 } from "lucide-react"
import { useSignIn } from "@clerk/nextjs"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type SigninFormValues = z.infer<typeof SigninFormSchema>
type SigninStep = "password" | "clientTrust"

const Signin = () => {
    const { signIn, fetchStatus } = useSignIn()
    const router = useRouter()
    const [clerkError, setClerkError] = useState<string>("")
    const [step, setStep] = useState<SigninStep>("password")
    const [verificationCode, setVerificationCode] = useState("")

    const form = useForm<SigninFormValues>({
        resolver: zodResolver(SigninFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const completeSignIn = async () => {
        await signIn.finalize({
            navigate: ({ decorateUrl }) => {
                toast.success("Welcome back! Signed in successfully.")

                const url = decorateUrl("/")
                if (url.startsWith("http")) {
                    window.location.href = url
                } else {
                    router.push(url)
                }
            },
        })
    }

    const onSubmit = async (data: SigninFormValues) => {
        setClerkError("")
        const { error } = await signIn.password({
            identifier: data.email,
            password: data.password,
        })

        if (error) {
            setClerkError(error.message || "Failed to sign in. Please check your credentials.")
            return
        }

        if (signIn.status === "needs_client_trust") {
            const { error: sendCodeError } = await signIn.mfa.sendEmailCode()

            if (sendCodeError) {
                setClerkError(sendCodeError.message || "We could not send a verification code. Please try again.")
                return
            }

            setStep("clientTrust")
            return
        }

        if (signIn.status === "complete") {
            await completeSignIn()
        }
    }

    const verifyClientTrust = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setClerkError("")

        const code = verificationCode.trim()
        if (!code) {
            setClerkError("Enter the verification code sent to your email.")
            return
        }

        const { error } = await signIn.mfa.verifyEmailCode({ code })
        if (error) {
            setClerkError(error.message || "That verification code is invalid or has expired.")
            return
        }

        if (signIn.status === "complete") {
            await completeSignIn()
        }
    }

    const isLoading = fetchStatus === "fetching"

    if (step === "clientTrust") {
        return (
            <form onSubmit={verifyClientTrust} className="space-y-4">
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-white">Verify This Device</h3>
                    <p className="text-xs leading-5 text-zinc-400">
                        Enter the verification code sent to your email to finish signing in.
                    </p>
                </div>

                {clerkError && (
                    <div role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs font-medium leading-relaxed text-red-400">
                        {clerkError}
                    </div>
                )}

                <Field className="flex flex-col gap-1.5">
                    <FieldLabel className="text-sm font-medium text-zinc-300" htmlFor="verification-code">
                        Verification Code
                    </FieldLabel>
                    <div className="relative flex items-center">
                        <span className="absolute left-3 text-zinc-500" aria-hidden="true">
                            <KeyRound className="size-4" />
                        </span>
                        <Input
                            id="verification-code"
                            name="verification-code"
                            value={verificationCode}
                            onChange={(event) => setVerificationCode(event.target.value)}
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            spellCheck={false}
                            required
                            className="h-10 rounded-lg border-white/10 bg-white/5 pl-10 text-center text-base tracking-widest text-white placeholder:text-zinc-500 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/30"
                        />
                    </div>
                </Field>

                <MyButton
                    type="submit"
                    disabled={isLoading}
                    className="mt-6 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FB2C36] font-medium text-white shadow-[0_10px_25px_-12px_rgba(251,44,54,0.8)] transition-all hover:bg-[#E7000B]"
                >
                    {isLoading ? <><Loader2 className="size-4 animate-spin" /> Verifying…</> : "Verify & Sign In"}
                </MyButton>
            </form>
        )
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {clerkError && (
                <div role="alert" className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-medium leading-relaxed">
                    {clerkError}
                </div>
            )}

            <FieldGroup className="gap-4 flex flex-col">
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field className="flex flex-col gap-1.5" data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-sm font-medium text-zinc-300" htmlFor={field.name}>
                                Email Address
                            </FieldLabel>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-zinc-500" aria-hidden="true">
                                    <Mail className="size-4" />
                                </span>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Please Enter Your Email Address"
                                    type="email"
                                    autoComplete="email"
                                    spellCheck={false}
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
                                <span className="absolute left-3 text-zinc-500" aria-hidden="true">
                                    <Lock className="size-4" />
                                </span>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Please Enter Your Password"
                                    type="password"
                                    autoComplete="current-password"
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
            </FieldGroup>

            <MyButton
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 h-11 bg-[#FB2C36] hover:bg-[#E7000B] text-white font-medium rounded-lg shadow-[0_10px_25px_-12px_rgba(251,44,54,0.8)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="size-4 animate-spin" /> Signing In…
                    </>
                ) : (
                    "Sign In"
                )}
            </MyButton>
        </form>
    )
}

export default Signin

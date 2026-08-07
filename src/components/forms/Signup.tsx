import * as z from "zod"
import { SignupFormSchema } from "@/lib/validations"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, FieldGroup, FieldLabel, Field } from "../ui/field"
import { Input } from "../ui/input"
import MyButton from "@/components/MyButton"
import { User, Mail, Phone, Lock } from "lucide-react"

type SignupFormValues = z.infer<typeof SignupFormSchema>

const Signup = () => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema as any),
    defaultValues: {
      fullname: "",
      email: "",
      contactnumber: "",
      password: "",
    },
  })

  const onSubmit = (data: SignupFormValues) => {
    console.log("Form submitted successfully:", data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        className="w-full mt-6 h-11 bg-[#FB2C36] hover:bg-[#E7000B] text-white font-medium rounded-lg shadow-[0_10px_25px_-12px_rgba(251,44,54,0.8)] transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        Create Account
      </MyButton>
    </form>
  )
}

export default Signup
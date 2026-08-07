'use client'

import { useState, useTransition, useRef, useMemo } from "react"
import * as z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { MapPin, UploadCloud, Play, X, ChevronDown, Calendar as CalendarIcon } from "lucide-react"

import { PostCampFormSchema } from "@/lib/validations"
import { FieldError, FieldGroup, FieldLabel, Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import MyButton from "@/components/MyButton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type PostCampFormValues = z.infer<typeof PostCampFormSchema>

interface DatePickerTimeProps {
    dateLabel: string
    timeLabel: string
    dateValue: string
    timeValue: string
    onDateChange: (value: string) => void
    onTimeChange: (value: string) => void
    dateError?: string
    timeError?: string
}

function DatePickerTime({
    dateLabel,
    timeLabel,
    dateValue,
    timeValue,
    onDateChange,
    onTimeChange,
    dateError,
    timeError,
}: DatePickerTimeProps) {
    const [open, setOpen] = useState(false)

    // Convert ISO YYYY-MM-DD string to Date object
    const selectedDate = useMemo(() => {
        if (!dateValue) return undefined
        const [y, m, d] = dateValue.split("-").map(Number)
        return new Date(y, m - 1, d)
    }, [dateValue])

    return (
        <FieldGroup className="flex-row gap-3">
            {/* DATE PICKER WITH POPOVER */}
            <Field className="flex-1 flex flex-col gap-1.5">
                <FieldLabel className="text-[11px] font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase">
                    {dateLabel}
                </FieldLabel>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            type="button"
                            className="h-11 w-full justify-between font-normal bg-zinc-100/70 dark:bg-white/[0.03] border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-zinc-200/60 dark:hover:bg-white/5 rounded-lg text-sm px-3 transition-colors"
                        >
                            <div className="flex items-center gap-2 overflow-hidden">
                                <CalendarIcon className="size-4 text-zinc-400 shrink-0" />
                                <span className={selectedDate ? "text-zinc-900 dark:text-white truncate" : "text-zinc-400 dark:text-zinc-500 truncate"}>
                                    {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                                </span>
                            </div>
                            <ChevronDown className="size-4 text-zinc-400 shrink-0" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0 bg-white dark:bg-[#0E0E12] border-zinc-200 dark:border-white/10 shadow-xl" align="start">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            captionLayout="dropdown"
                            defaultMonth={selectedDate}
                            onSelect={(date) => {
                                if (date) {
                                    const y = date.getFullYear()
                                    const m = String(date.getMonth() + 1).padStart(2, "0")
                                    const d = String(date.getDate()).padStart(2, "0")
                                    onDateChange(`${y}-${m}-${d}`)
                                } else {
                                    onDateChange("")
                                }
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
                {dateError && <p className="text-xs text-red-500 mt-1">{dateError}</p>}
            </Field>

            {/* TIME INPUT FIELD */}
            <Field className="w-36 flex flex-col gap-1.5">
                <FieldLabel className="text-[11px] font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase">
                    {timeLabel}
                </FieldLabel>
                <Input
                    type="time"
                    step="1"
                    value={timeValue || "10:30:00"}
                    onChange={(e) => onTimeChange(e.target.value)}
                    className="h-11 w-full bg-zinc-100/70 dark:bg-white/[0.03] border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/20 dark:focus-visible:ring-[#FB2C36]/30 rounded-lg text-sm px-3 [color-scheme:light] dark:[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
                {timeError && <p className="text-xs text-red-500 mt-1">{timeError}</p>}
            </Field>
        </FieldGroup>
    )
}

const PostCampPage = () => {
    const [isPending, startTransition] = useTransition()
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const form = useForm<PostCampFormValues>({
        resolver: zodResolver(PostCampFormSchema as any),
        defaultValues: {
            camptitle: "",
            organizername: "",
            city: "",
            description: "",
            locationlink: "",
            startdate: "",
            enddate: "",
            starttime: "10:30:00",
            endtime: "18:00:00",
            imageurl: "",
        }
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
            form.setValue("imageurl", url, { shouldValidate: true })
        }
    }

    const removeBanner = () => {
        setPreviewUrl(null)
        form.setValue("imageurl", "", { shouldValidate: true })
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const onSubmit = (data: PostCampFormValues) => {
        startTransition(() => {
            console.log("Camp form submitted successfully:", data)
            alert("Blood Donation Camp Published Successfully!")
        })
    }

    return (
        <main className="relative min-h-screen bg-zinc-50 dark:bg-[#050508] text-zinc-900 dark:text-white flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-x-hidden selection:bg-[#FB2C36]/20 selection:text-[#FB2C36] dark:selection:bg-[#FB2C36]/30 dark:selection:text-white transition-colors duration-300">
            {/* Ambient Background Glows & Lighting */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Top Center Primary Crimson Aura */}
                <div className="absolute -top-44 left-1/2 -translate-x-1/2 size-[700px] rounded-full bg-[#FB2C36]/10 dark:bg-[#FB2C36]/15 blur-[150px]" />
                {/* Bottom Right Secondary Warm Aura */}
                <div className="absolute -bottom-36 -right-36 size-[550px] rounded-full bg-[#FB2C36]/8 dark:bg-[#FB2C36]/10 blur-[140px]" />
                {/* Top Left Subtle Ambient Glow */}
                <div className="absolute top-1/3 -left-36 size-[450px] rounded-full bg-[#FB2C36]/4 dark:bg-[#FB2C36]/5 blur-[120px]" />
                {/* Top Beam Gradient */}
                <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#FB2C36]/8 via-[#FB2C36]/2 dark:from-[#FB2C36]/10 dark:via-[#FB2C36]/2 to-transparent" />
            </div>

            {/* Subtle Grid Pattern Overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-25 dark:opacity-15"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }}
            />

            <Card className="relative z-10 w-full max-w-3xl bg-white/90 dark:bg-[#0A0A0E]/90 border border-zinc-200/80 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_-10px_rgba(251,44,54,0.12)] backdrop-blur-2xl p-6 sm:p-10 overflow-hidden before:absolute before:top-0 before:inset-x-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#FB2C36] before:to-transparent transition-colors duration-300">
                <CardHeader className="p-0 mb-8 space-y-1.5">
                    <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                        Post a New Blood Donation Camp
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        Organize a community event to save lives. Fill out the details below to publish your camp to the LifeStream network.
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FieldGroup className="space-y-6">

                            {/* ROW 1: CAMP TITLE & ORGANIZER NAME */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* CAMP TITLE */}
                                <Controller
                                    name="camptitle"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field className="flex flex-col gap-1.5" data-invalid={fieldState.invalid}>
                                            <FieldLabel className="text-[11px] font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase">
                                                CAMP TITLE
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                aria-invalid={fieldState.invalid}
                                                placeholder="e.g., City Center Blood Drive"
                                                type="text"
                                                className="h-11 bg-zinc-100/70 dark:bg-white/[0.03] border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/20 dark:focus-visible:ring-[#FB2C36]/30 rounded-lg text-sm px-4 transition-all hover:border-zinc-300 dark:hover:border-white/20"
                                            />
                                            {fieldState.invalid && fieldState.error?.message && (
                                                <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* ORGANIZER NAME */}
                                <Controller
                                    name="organizername"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field className="flex flex-col gap-1.5" data-invalid={fieldState.invalid}>
                                            <FieldLabel className="text-[11px] font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase">
                                                ORGANIZER NAME
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Organization or Individual Name"
                                                type="text"
                                                className="h-11 bg-zinc-100/70 dark:bg-white/[0.03] border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/20 dark:focus-visible:ring-[#FB2C36]/30 rounded-lg text-sm px-4 transition-all hover:border-zinc-300 dark:hover:border-white/20"
                                            />
                                            {fieldState.invalid && fieldState.error?.message && (
                                                <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>

                            {/* ROW 2: CITY */}
                            <Controller
                                name="city"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field className="flex flex-col gap-1.5" data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-[11px] font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase">
                                            CITY
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="e.g., Seattle, WA"
                                            type="text"
                                            className="h-11 bg-zinc-100/70 dark:bg-white/[0.03] border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/20 dark:focus-visible:ring-[#FB2C36]/30 rounded-lg text-sm px-4 transition-all hover:border-zinc-300 dark:hover:border-white/20"
                                        />
                                        {fieldState.invalid && fieldState.error?.message && (
                                            <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* ROW 3: DESCRIPTION */}
                            <Controller
                                name="description"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field className="flex flex-col gap-1.5" data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-[11px] font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase">
                                            DESCRIPTION
                                        </FieldLabel>
                                        <Textarea
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Provide details about the camp, requirements, and what donors should expect..."
                                            className="min-h-[110px] bg-zinc-100/70 dark:bg-white/[0.03] border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/20 dark:focus-visible:ring-[#FB2C36]/30 rounded-lg text-sm p-4 resize-none transition-all hover:border-zinc-300 dark:hover:border-white/20"
                                        />
                                        {fieldState.invalid && fieldState.error?.message && (
                                            <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* ROW 4: GOOGLE MAP LOCATION LINK */}
                            <Controller
                                name="locationlink"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field className="flex flex-col gap-1.5" data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-[11px] font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase">
                                            GOOGLE MAP LOCATION LINK
                                        </FieldLabel>
                                        <div className="relative flex items-center">
                                            <MapPin className="absolute left-3.5 size-4.5 text-zinc-400 pointer-events-none" />
                                            <Input
                                                {...field}
                                                id={field.name}
                                                aria-invalid={fieldState.invalid}
                                                placeholder="https://maps.google.com/..."
                                                type="url"
                                                className="pl-11 h-11 bg-zinc-100/70 dark:bg-white/[0.03] border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:border-[#FB2C36] focus-visible:ring-[#FB2C36]/20 dark:focus-visible:ring-[#FB2C36]/30 rounded-lg text-sm transition-all hover:border-zinc-300 dark:hover:border-white/20"
                                            />
                                        </div>
                                        {fieldState.invalid && fieldState.error?.message && (
                                            <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* ROW 5: START & END DATE/TIME PICKERS */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* START DATE & START TIME */}
                                <Controller
                                    name="startdate"
                                    control={form.control}
                                    render={({ field: startdateField, fieldState: startdateState }) => (
                                        <Controller
                                            name="starttime"
                                            control={form.control}
                                            render={({ field: starttimeField, fieldState: starttimeState }) => (
                                                <DatePickerTime
                                                    dateLabel="Start Date"
                                                    timeLabel="Start Time"
                                                    dateValue={startdateField.value}
                                                    timeValue={starttimeField.value}
                                                    onDateChange={startdateField.onChange}
                                                    onTimeChange={starttimeField.onChange}
                                                    dateError={startdateState.error?.message}
                                                    timeError={starttimeState.error?.message}
                                                />
                                            )}
                                        />
                                    )}
                                />

                                {/* END DATE & END TIME */}
                                <Controller
                                    name="enddate"
                                    control={form.control}
                                    render={({ field: enddateField, fieldState: enddateState }) => (
                                        <Controller
                                            name="endtime"
                                            control={form.control}
                                            render={({ field: endtimeField, fieldState: endtimeState }) => (
                                                <DatePickerTime
                                                    dateLabel="End Date"
                                                    timeLabel="End Time"
                                                    dateValue={enddateField.value}
                                                    timeValue={endtimeField.value}
                                                    onDateChange={enddateField.onChange}
                                                    onTimeChange={endtimeField.onChange}
                                                    dateError={enddateState.error?.message}
                                                    timeError={endtimeState.error?.message}
                                                />
                                            )}
                                        />
                                    )}
                                />
                            </div>

                            {/* ROW 6: UPLOAD CAMP BANNER */}
                            <Controller
                                name="imageurl"
                                control={form.control}
                                render={({ fieldState }) => (
                                    <Field className="flex flex-col gap-1.5" data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-[11px] font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase">
                                            UPLOAD CAMP BANNER
                                        </FieldLabel>

                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />

                                        {previewUrl ? (
                                            <div className="relative rounded-xl border border-zinc-200 dark:border-white/10 overflow-hidden group max-h-56 bg-zinc-100 dark:bg-black/40 flex items-center justify-center p-2">
                                                <img src={previewUrl} alt="Camp Banner Preview" className="max-h-52 object-cover rounded-lg" />
                                                <button
                                                    type="button"
                                                    onClick={removeBanner}
                                                    className="absolute top-3 right-3 bg-red-600/80 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors backdrop-blur-sm cursor-pointer shadow-md"
                                                >
                                                    <X className="size-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => fileInputRef.current?.click()}
                                                className="border-2 border-dashed border-zinc-300/80 dark:border-white/10 hover:border-[#FB2C36]/60 dark:hover:border-[#FB2C36]/50 bg-zinc-50/50 dark:bg-white/[0.01] hover:bg-zinc-100/50 dark:hover:bg-white/[0.03] rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                                            >
                                                <div className="size-11 rounded-full bg-[#FB2C36]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                    <UploadCloud className="size-5 text-[#FB2C36]" />
                                                </div>
                                                <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                                                    <span className="text-[#FB2C36] font-semibold hover:underline">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-zinc-500 mt-1">
                                                    PNG, JPG, GIF up to 5MB
                                                </p>
                                            </div>
                                        )}

                                        {fieldState.invalid && fieldState.error?.message && (
                                            <FieldError errors={[fieldState.error]} className="text-xs text-red-500 mt-1" />
                                        )}
                                    </Field>
                                )}
                            />

                        </FieldGroup>

                        {/* FOOTER ACTIONS */}
                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-zinc-200/80 dark:border-white/5 mt-8">
                            <button
                                type="button"
                                onClick={() => {
                                    form.reset()
                                    setPreviewUrl(null)
                                }}
                                className="px-5 py-2.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <MyButton
                                type="submit"
                                disabled={isPending}
                                className="bg-[#FB2C36] hover:bg-[#E7000B] active:scale-[0.98] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-[0_8px_20px_-6px_rgba(251,44,54,0.4)] dark:shadow-[0_8px_20px_-6px_rgba(251,44,54,0.6)] transition-all cursor-pointer flex items-center gap-2"
                            >
                                <span>Publish Camp</span>
                                <Play className="size-3 fill-current ml-0.5" />
                            </MyButton>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}

export default PostCampPage
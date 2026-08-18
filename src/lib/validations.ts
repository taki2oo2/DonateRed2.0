import * as z from "zod"

export const SignupFormSchema = z.object({

    fullname: z.string()
        .min(1, { message: "Name is required." })
        .max(50, { message: "Name cannot exceed 50 characters." }),

    email: z
        .email({
            pattern: z.regexes.email,
            message: "Plese provide a valid email address.",
        })
        .min(1, { message: "Email is Required" }),

    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." })
        .max(64, { message: "Password cannot exceed 64 characters." })
        .regex(/[A-Z]/, { message: "Must contain an uppercase letter." })
        .regex(/[a-z]/, { message: "Must contain a lowercase letter." })
        .regex(/[0-9]/, { message: "Must contain a number." })
        .regex(/[^A-Za-z0-9]/, { message: "Must contain a special character." })
        .regex(/^\S*$/, { message: "Password cannot contain spaces." }),

})

export const SigninFormSchema = z.object({
    email: z
        .email({
            pattern: z.regexes.email,
            message: "Plese provide a valid email address.",
        })
        .min(1, { message: "Email is Required" }),

    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." })
        .max(64, { message: "Password cannot exceed 64 characters." })
        .regex(/[A-Z]/, { message: "Must contain an uppercase letter." })
        .regex(/[a-z]/, { message: "Must contain a lowercase letter." })
        .regex(/[0-9]/, { message: "Must contain a number." })
        .regex(/[^A-Za-z0-9]/, { message: "Must contain a special character." })
        .regex(/^\S*$/, { message: "Password cannot contain spaces." }),
});


export const PostCampFormSchema = z
    .object({
        camptitle: z
            .string()
            .min(1, { message: "Camp title is required." })
            .max(25, { message: "Camp title cannot exceed 25 characters." }),

        organizername: z
            .string()
            .min(1, { message: "Organizer name is required." })
            .max(25, { message: "Organizer name cannot exceed 25 characters." }),

        city: z
            .string()
            .min(1, { message: "City is required." })
            .max(25, { message: "City cannot exceed 25 characters." }),

        description: z
            .string()
            .min(1, { message: "Description is required." })
            .max(250, { message: "Description cannot exceed 250 characters." }),

        locationlink: z.url({
            hostname: /^maps\.app\.goo\.gl$/,
            message: "Please provide a valid Google Maps location.",
        }),

        startdate: z.iso.date({
            message: "Please select a valid start date.",
        }),

        enddate: z.iso.date({
            message: "Please select a valid end date.",
        }),

        starttime: z.iso.time({
            message: "Please select a valid start time.",
        }),

        endtime: z.iso.time({
            message: "Please select a valid end time.",
        }),

        image: z.instanceof(File, {
            message: "Please upload a valid camp banner.",
        }),
    })
    .superRefine((data, ctx) => {
        // End date cannot be before start date
        if (data.enddate < data.startdate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["enddate"],
                message: "End date cannot be before the start date.",
            });
        }

        // If both dates are the same, end time must be after start time
        if (
            data.startdate === data.enddate &&
            data.endtime <= data.starttime
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["endtime"],
                message: "End time must be after the start time.",
            });
        }
    });


export const UserValidationSchema = z.object({
    clerkid: z.string().min(1, { message: "Clerk ID is required." }),
    fullname: z.string()
        .min(1, { message: "Name is required." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    email: z
        .email({
            pattern: z.regexes.email,
            message: "Plese provide a valid email address.",
        })
        .min(1, { message: "Email is Required" }),
    contactno: z.string()
        .regex(/^(\+?[1-9]\d{6,14}|[6-9]\d{9})$/, "Enter a valid phone number (e.g. 9876543210 or +919876543210)")
        .optional(),
    city: z.string()
        .min(1, { message: "City is required." })
        .max(100, { message: "City cannot exceed 100 characters." })
        .optional(),
    isDonar: z.boolean().default(false),
})

export const DonorEligibilitySchema = z.object({
    ageEligible: z.enum(["yes", "no"], {
        message: "Please select an answer for age eligibility.",
    }),
    weightEligible: z.enum(["yes", "no"], {
        message: "Please select an answer for weight eligibility.",
    }),
    chronicIllness: z.enum(["yes", "no"], {
        message: "Please select an answer for chronic illnesses.",
    }),
    medicalConditions: z.array(z.string()).min(1, {
        message: "Please select at least one condition or select 'None of the above'.",
    }),
    pregnantOrRecent: z.enum(["yes", "no", "na"], {
        message: "Please select an answer for pregnancy status.",
    }),
    breastfeeding: z.enum(["yes", "no", "na"], {
        message: "Please select an answer for breastfeeding status.",
    }),
    consentSharePhone: z.enum(["yes", "no"], {
        message: "Please select an answer for phone number sharing consent.",
    }),
    consentEmergency: z.enum(["yes", "no"], {
        message: "Please select an answer for emergency availability.",
    }),
    contactnumber: z.string()
        .regex(/^(\+?[1-9]\d{6,14}|[6-9]\d{9})$/, "Enter a valid phone number (e.g. 9876543210 or +919876543210)"),
    city: z.string()
        .min(1, { message: "City is required." })
        .max(100, { message: "City cannot exceed 100 characters." }),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        message: "Please select your blood group.",
    }),
    agreeTerms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms of donation to proceed.",
    }),
});

export const RegisterDonorValidationSchema = z.object({
    clerkid: z.string().optional(),

    fullname: z.string()
        .min(1, { message: "Name is required." })
        .max(50, { message: "Name cannot exceed 50 characters." }),

    email: z
        .email({
            pattern: z.regexes.email,
            message: "Plese provide a valid email address.",
        })
        .min(1, { message: "Email is Required" }),

    contactno: z.string()
        .min(1, { message: "Contact number is required." })
        .regex(/^(\+?[1-9]\d{6,14}|[6-9]\d{9})$/, { message: "Enter a valid phone number (e.g. 9876543210 or +919876543210)" }),

    city: z.string()
        .min(1, { message: "City is required." })
        .max(100, { message: "City cannot exceed 100 characters." }),

    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        message: "Please select a blood group.",
    }),

    eligibility: z.object({
        ageEligible: z.enum(["yes", "no"], {
            message: "Please select an answer for age eligibility.",
        }),
        weightEligible: z.enum(["yes", "no"], {
            message: "Please select an answer for weight eligibility.",
        }),
        chronicIllness: z.enum(["yes", "no"], {
            message: "Please select an answer for chronic illnesses.",
        }),
        medicalConditions: z.array(z.string()).min(1, {
            message: "Please select at least one condition or select 'None of the above'.",
        }),
        pregnantOrRecent: z.enum(["yes", "no", "na"], {
            message: "Please select an answer for pregnancy status.",
        }),
        breastfeeding: z.enum(["yes", "no", "na"], {
            message: "Please select an answer for breastfeeding status.",
        }),
        consentSharePhone: z.enum(["yes", "no"], {
            message: "Please select an answer for phone number sharing consent.",
        }),
        consentEmergency: z.enum(["yes", "no"], {
            message: "Please select an answer for emergency availability.",
        }),
    })
});

export const changeDonorSchema = z.object({
    isDonar: z.boolean().default(false)
})


export const paginationSearchSchema = z.object({
    page: z.number().int().positive().default(1),
    pageSize: z.number().int().positive().default(10),
})


export const GetCampsSchmea = paginationSearchSchema.extend({
    city: z.string().min(1, { message: "City Input is Required" })
});

export const GetDonorsSchema = paginationSearchSchema.extend({
    city: z.string().min(1, { message: "City Input is Required" }),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        message: "Please select a blood group.",
    }),
});


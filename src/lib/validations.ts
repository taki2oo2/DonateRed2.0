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

        imageurl: z.url({
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
    isDonar: z.boolean().default(false),
})
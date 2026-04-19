import {z} from "zod";

export type ResidentType = "OWNER" | "TENANT";

export type Resident = {
    flatNo: string,
    residentName?: string,
    email: string,
    sqft: number,
    ownerName?: string,
    ownerEmail?: string,
    type: ResidentType
}

export const residentSchema = z.object({
    flatNo: z.string().min(1, "Flat no is required"),
    residentName: z.string(),
    email: z.email("Invalid email"),
    sqft: z.number().min(1, "Sqft must be greater than 0"),
    ownerName: z.string().optional(),
    ownerEmail: z.string().optional(),
    type: z.enum(["OWNER", "TENANT"]),
}).superRefine((data, ctx) => {
    if (data.type === "TENANT") {
        if (!data.ownerName?.trim()) {
            ctx.addIssue({
                code: "custom",
                message: "Owner name is required for tenants",
                path: ["ownerName"],
            });
        }
        if (!data.ownerEmail?.trim()) {
            ctx.addIssue({
                code: "custom",
                message: "Owner email is required for tenants",
                path: ["ownerEmail"],
            });
        } else if (!z.email().safeParse(data.ownerEmail).success) {
            ctx.addIssue({
                code: "custom",
                message: "Invalid owner email",
                path: ["ownerEmail"],
            });
        }
    }
});

export type ResidentSchema = z.infer<typeof residentSchema>;
export const defaultResidentSchemaValue: ResidentSchema = {
    flatNo: "",
    residentName: "",
    email: "",
    sqft: 1,
    ownerName: "",
    ownerEmail: "",
    type: "OWNER"
};
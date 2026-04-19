import {defaultResidentSchemaValue, type Resident, residentSchema, type ResidentSchema} from "@/models/resident.ts";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PersonStanding} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {TextSeparator} from "@/components/ui/text-seperator.tsx";

type ResidentAction = "ADD" | "EDIT";

type ResidentDialogProps = {
    residentAction: ResidentAction,
    resident?: Resident,
    onSubmit: (resident: ResidentSchema) => void
};

export default function ResidentDialog(residentDialogProps: ResidentDialogProps) {
    const residentForm = useForm<ResidentSchema>({
        resolver: zodResolver(residentSchema),
        defaultValues: residentDialogProps.resident ?? defaultResidentSchemaValue,
        mode: "onSubmit"
    });
    const residentType = residentForm.watch('type');
    return (
        <Dialog onOpenChange={(open) => {
            if (!open) {
                residentForm.reset();
            }
        }}>
            <DialogTrigger asChild>
                <Button
                    className="bg-blue-700 hover:bg-blue-800 hover:cursor-pointer dark:hover:bg-blue-600 dark:text-white">
                    <PersonStanding/> Add New Resident
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Add New Resident</DialogTitle>
                    <DialogDescription>Fill in the resident information</DialogDescription>
                </DialogHeader>
                <Separator/>
                <form id="resident-form"
                      onSubmit={residentForm.handleSubmit(residentDialogProps.onSubmit)}
                      className="flex-1 overflow-y-auto pr-2 scroll-smooth">
                    <FieldGroup>
                        <div className="flex flex-row justify-between w-full gap-2 p-2">
                            <Controller
                                name="flatNo"
                                control={residentForm.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Flat Number</FieldLabel>
                                        <Input {...field} id="flat-no" aria-invalid={fieldState.invalid}
                                               placeholder="e.g. A-105" autoCapitalize="off"/>
                                        {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                                    </Field>
                                )}/>
                            <Controller
                                name="sqft"
                                control={residentForm.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Square Feet</FieldLabel>
                                        <Input {...field} id="flat-no" aria-invalid={fieldState.invalid}
                                               placeholder="1500" autoCapitalize="off" type="number"
                                               onChange={(e) => {
                                                   const value = e.target.value;
                                                   field.onChange(value === "" ? undefined : Number(value));
                                               }}
                                        />
                                        {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                                    </Field>
                                )}/>
                            <Controller
                                name="type"
                                control={residentForm.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid} className="flex-1">
                                        <FieldLabel>Resident Type</FieldLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="OWNER">Owner</SelectItem>
                                                <SelectItem value="TENANT">Tenant</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
                            />
                        </div>
                        <TextSeparator label="Resident Information" mode="left"/>
                        <Controller
                            name="residentName"
                            control={residentForm.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Resident Name</FieldLabel>
                                    <Input
                                        {...field}
                                        placeholder="Owner name"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="email"
                            control={residentForm.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Resident's Email address</FieldLabel>
                                    <Input
                                        {...field}
                                        placeholder="Owner's email address"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />
                        {residentType === "TENANT" && (
                            <>
                                <TextSeparator label="Owner Information" mode="left"/>
                                <Controller
                                    name="ownerName"
                                    control={residentForm.control}
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Owner Name</FieldLabel>
                                            <Input
                                                {...field}
                                                placeholder="Owner name"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]}/>
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="ownerEmail"
                                    control={residentForm.control}
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Owner's Email address</FieldLabel>
                                            <Input
                                                {...field}
                                                placeholder="Owner's email address"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]}/>
                                            )}
                                        </Field>
                                    )}
                                />
                            </>
                        )}
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="hover:cursor-pointer">Close</Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        form="resident-form"
                        className="bg-blue-700 hover:bg-blue-800 hover:cursor-pointer dark:hover:bg-blue-600 dark:text-white">
                        Save Resident
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}
"use client";

import * as z from "zod";

import { Color } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";


const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/,{
        message: 'String must be a valid hex code',
    }),
});

type ColorFormValues = z.infer<typeof formSchema>;

interface ColorFormProps{
    initialData: Color  | null;
}



export const ColorForm: React.FC<ColorFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit color": "Create color";
    const description = initialData ? "Edit a color": "Add a new color";
    const toastMessage = initialData ? "Color has been updated": "Color has been created";
    const action = initialData ? "Save Changes": "Create";


    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    });

    const onSubmit = async (data: ColorFormValues)=>{
        try {
            setLoading(true);
            if(initialData){ // if we already have a color
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
            }else {
                await axios.post(`/api/${params.storeId}/colors`, data);
            }
            router.refresh(); // why?
            router.push(`/${params.storeId}/colors`); // initialdata kontrolü yapılarak edit yapılıyorsa o color sayfasında kalabilir veya colors sayfasına yönlendirebilir.
            toast.success(toastMessage)
        } catch (error) {
            toast.error("Something went wrong.");
        } finally{
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
            router.refresh(); // why again ? 
            router.push(`/${params.storeId}/colors`); // I may put it last because success alert comes after routing to root ("/")
            toast.success("Color has been deleted.")
        } catch (error) {
            toast.error("Make sure you removed all products using this color.")
        } finally{
            setLoading(false);
            setOpen(false);
        }
        
    }

    return (

        <>
            <AlertModal
                isOpen = {open}
                onClose={()=>setOpen(false)}
                onConfirm={onDelete}
                loading = {loading}
            
            />
            <div className="flex items-center justify-between">
            <Heading
                title={title}
                description = {description}
            />
            { initialData && (
            <Button
                disabled={loading}
                variant = "destructive"
                size="sm"
                onClick = {() => setOpen(true)}
            >
                <Trash className="h4 w-4" />
            </Button>
            )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Color name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Value
                                    </FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input disabled={loading} placeholder="Color value" {...field}/>
                                            <div
                                                className="border p-4 rounded-full"
                                                style={{backgroundColor: field.value}}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
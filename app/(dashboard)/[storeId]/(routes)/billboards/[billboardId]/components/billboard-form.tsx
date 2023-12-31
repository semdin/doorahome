"use client";

import * as z from "zod";

import { Billboard } from "@prisma/client";
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
import ImageUpload from "@/components/ui/image-upload";

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";


const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps{
    initialData: Billboard  | null;
}



export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit billboard": "Create billboard";
    const description = initialData ? "Edit a billboard": "Add a new billboard";
    const toastMessage = initialData ? "Billboard has been updated": "Billboard has been created";
    const action = initialData ? "Save Changes": "Create";


    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    });

    const onSubmit = async (data: BillboardFormValues)=>{
        try {
            setLoading(true);
            if(initialData){ // if we already have a billboard
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
            }else {
                await axios.post(`/api/${params.storeId}/billboards`, data);
            }
            router.refresh(); // why?
            router.push(`/${params.storeId}/billboards`); // initialdata kontrolü yapılarak edit yapılıyorsa o billboard sayfasında kalabilir veya billboards sayfasına yönlendirebilir.
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
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh(); // why again ? 
            router.push(`/${params.storeId}/billboards`); // I may put it last because success alert comes after routing to root ("/")
            toast.success("Billboard has been deleted.")
        } catch (error) {
            toast.error("Make sure you removed all categories using this billboard.")
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
                <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Background Image
                                    </FormLabel>
                                    <FormControl>
                                        <ImageUpload 
                                            value = {field.value ? [field.value]: []}
                                            disabled={loading}
                                            onChange={(url)=> field.onChange(url)}
                                            onRemove={()=> field.onChange("")}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Label
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard label" {...field}/>
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
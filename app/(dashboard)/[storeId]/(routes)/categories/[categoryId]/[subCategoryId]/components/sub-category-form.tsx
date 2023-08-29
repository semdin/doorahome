"use client";

import * as z from "zod";

import { Billboard, Category } from "@prisma/client";
import { Plus, Trash } from "lucide-react";
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
import { 
    Select, 
    SelectTrigger, 
    SelectValue, 
    SelectContent, 
    SelectItem
} from "@/components/ui/select";


const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1),
});

type SubCategoryFormValues = z.infer<typeof formSchema>;

interface SubCategoryFormProps{
    billboards:  Billboard[];
    initialData: Category[]  | null;
}



export const SubCategoryForm: React.FC<SubCategoryFormProps> = ({
    initialData,
    billboards
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = "Create sub category";
    const description = "Add a new sub category";
    const toastMessage = "Sub category has been created";
    const action = "Create";


    const form = useForm<SubCategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            billboardId: ''
        }
    });

    const onSubmit = async (data: SubCategoryFormValues)=>{
        try {
            setLoading(true);
            await axios.post(`/api/${params.storeId}/categories/${params.categoryId}`, data);
            router.refresh(); // why?
            router.push(`/${params.storeId}/categories/${params.categoryId}`); // initialdata kontrolü yapılarak edit yapılıyorsa o billboard sayfasında kalabilir veya billboards sayfasına yönlendirebilir.
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
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}/${params.subCategoryId}`)
            router.refresh(); // why again ? 
            router.push(`/${params.storeId}/categories`); // I may put it last because success alert comes after routing to root ("/")
            toast.success("Sub category has been deleted.")
        } catch (error) {
            toast.error("Make sure you removed all products using this category.")
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
                                        <Input disabled={loading} placeholder="Sub category name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Billboard
                                    </FormLabel>
                                    <Select 
                                        disabled={loading} 
                                        onValueChange={field.onChange} 
                                        value={field.value} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue 
                                                    defaultValue={field.value}
                                                    placeholder="Select a billboard"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard)=> (
                                                <SelectItem
                                                    key={billboard.id}
                                                    value={billboard.id}
                                                >
                                                    {billboard.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
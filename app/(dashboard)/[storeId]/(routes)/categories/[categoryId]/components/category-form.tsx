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

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps{
    billboards:  Billboard[];
    initialData: Category  | null;
}



export const CategoryForm: React.FC<CategoryFormProps> = ({
    initialData,
    billboards
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit category": "Create category";
    const description = initialData ? "Edit a category": "Add a new category";
    const toastMessage = initialData ? "Category has been updated": "Category has been created";
    const action = initialData ? "Save Changes": "Create";


    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            billboardId: ''
        }
    });

    const onSubmit = async (data: CategoryFormValues)=>{
        try {
            setLoading(true);
            if(initialData){ // if we already have a billboard
                await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data);
            }else {
                await axios.post(`/api/${params.storeId}/categories`, data);
            }
            router.refresh(); // why?
            router.push(`/${params.storeId}/categories`); // initialdata kontrolü yapılarak edit yapılıyorsa o billboard sayfasında kalabilir veya billboards sayfasına yönlendirebilir.
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
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
            router.refresh(); // why again ? 
            router.push(`/${params.storeId}/categories`); // I may put it last because success alert comes after routing to root ("/")
            toast.success("Category has been deleted.")
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
                                        <Input disabled={loading} placeholder="Category name" {...field}/>
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
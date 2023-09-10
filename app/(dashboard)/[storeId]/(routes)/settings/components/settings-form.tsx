"use client";

import * as z from "zod";

import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { Textarea } from "@/components/ui/textarea"




interface SettingsFormProps{
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1),
    siteLink: z.string().min(1),
    cardName: z.string().min(1),
    card1Title: z.string().min(1),
    card1Description: z.string().min(1),
    card2Title: z.string().min(1),
    card2Description: z.string().min(1),
    card3Title: z.string().min(1),
    card3Description: z.string().min(1),
    fLogoUrl: z.string().min(1),
    fRes1Title: z.string().min(1),
    fRes1Link: z.string().min(1),
    fRes2Title: z.string().min(1),
    fRes2Link: z.string().min(1),
    facebookUrl: z.string().min(1),
    instagramUrl: z.string().min(1),
    twitterUrl: z.string().min(1),
    privacyPolicy: z.string().min(1),
    termsAndConditions: z.string().min(1),
    contactUsDescription: z.string().min(1),
    contactUsCard1Descrition: z.string().min(1),
    contactUsCard1Email: z.string().min(1),
    contactUsCard2Descrition: z.string().min(1),
    contactUsCard2Phone: z.string().min(1),
    aboutUsDescription: z.string().min(1),
    aboutUsPhotoUrl: z.string().min(1),
    aboutUsOurStory: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;


export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async (data: SettingsFormValues)=>{
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();
            toast.success("Store has been updated.")
        } catch (error) {
            toast.error("Something went wrong.");
        } finally{
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh();
            router.push("/"); // I may put it last because success alert comes after routing to root ("/")
            toast.success("Store has been deleted.")
        } catch (error) {
            toast.error("Make sure you removed all products and categories first.")
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
                title="Settings"
                description = "Manage store preferences"
            />
            <Button
                disabled={loading}
                variant = "destructive"
                size="sm"
                onClick = {() => setOpen(true)}
            >
                <Trash className="h4 w-4" />
            </Button>
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="siteLink"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Website Link
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="www.example.com" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        </div>
                        <div>
                        <Separator/>
                        </div>
                        <Heading 
                        title="Homepage Card Settings"
                        description = "Manage store preferences"
                        />
                        <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="cardName"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Card Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Card name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="card1Title"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Card 1 Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Card 1 Title" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="card1Description"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Card 1 Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea disabled={loading} placeholder="Card 1 Description" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="card2Title"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Card 2 Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Card 2 Title" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="card2Description"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Card 2 Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea disabled={loading} placeholder="Card 2 Description" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="card3Title"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Card 3 Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Card 3 Title" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="card3Description"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Card 3 Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea disabled={loading} placeholder="Card 3 Description" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        </div>
                        <div>
                        <Separator/>
                        </div>
                        <Heading 
                        title="Footer Settings"
                        description = "Manage store preferences"
                        />
                        <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="fLogoUrl"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Footer Logo Url
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="www.doorahome.com/images/logo.png" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fRes1Title"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Footer Resource 1 Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="doorahome" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fRes1Link"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Footer Resource 1 Link 
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="www.doorahome.com" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fRes2Title"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Footer Resource 2 Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="doorahome" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fRes2Link"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Footer Resource 2 Link 
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="www.doorahome.com" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="facebookUrl"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Facebook Url 
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="www.facebook.com" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="instagramUrl"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Instagram Url
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="www.instagram.com" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="twitterUrl"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        X Url
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="www.x.com" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="privacyPolicy"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Privacy Policy Link
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="www.privacypolicy.com" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="termsAndConditions"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Privacy Policy Link
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="www.termsandconditions.com" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        </div>
                        <div>
                        <Separator/>
                        </div>
                        <Heading 
                        title="Contact Us Settings"
                        description = "Manage store preferences"
                        />
                        <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="contactUsDescription"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Contact Us Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea disabled={loading} placeholder="Contact us description" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactUsCard1Descrition"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Contact Us Card 1 Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea disabled={loading} placeholder="Contact us card 1 description" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactUsCard1Email"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Contact Us Card 1 Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="email" disabled={loading} placeholder="mail@example.com" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactUsCard2Descrition"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Contact Us Card 2 Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea disabled={loading} placeholder="Contact us card 2 description" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactUsCard2Phone"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Contact Us Card 2 Phone
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="+1 (865) 438-4050" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        </div>
                        <div>
                        <Separator/>
                        </div>
                        <Heading 
                        title="About Us Settings"
                        description = "Manage store preferences"
                        />
                        <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="aboutUsDescription"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        About Us Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea disabled={loading} placeholder="About Us Description" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="aboutUsPhotoUrl"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        About Us Photo Url
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="www.doorahome.com/images/about-us.png" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="aboutUsOurStory"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        About Us Our Story
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea disabled={loading} placeholder="About Us Our Story" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator/>
            <ApiAlert 
                title="NEXT_PUBLIC_API_URL" 
                description={`${origin}/api/${params.storeId}`}
                variant="public"
            />
        </>
    );
};
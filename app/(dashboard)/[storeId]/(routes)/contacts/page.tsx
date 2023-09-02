import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ContactClient } from "./components/client";
import { ContactColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const ContactsPage = async ({
    params
}: {
    params:{storeId: string}
}) => {
    const contacts = await prismadb.contact.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedContacts: ContactColumn[] = contacts.map((item)=> ({
        id: item.id,
        email: item.email,
        title: item.title,
        message: item.message,
        createdAt: format (item.createdAt, "MMMM do, yyyy")
    }));


    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
            <ContactClient data= {formattedContacts}/>
            </div>
        </div> 
    );
}
 
export default ContactsPage;
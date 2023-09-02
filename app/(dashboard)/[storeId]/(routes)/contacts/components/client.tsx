"use client";

import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ContactColumn, columns } from "./columns";



interface ContactClientProps{
    data: ContactColumn[]
}


export const ContactClient: React.FC<ContactClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
        <Heading
            title={`Contacts (${data.length})`}
            description="Check your contacts from your customers"
        />
        <Separator/>
        <DataTable 
            searchKey="products"
            columns={columns}
            data={data}
        />
        </>
    );
};


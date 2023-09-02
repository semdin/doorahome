import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
  }

export async function POST(
    req:Request,
    {params}: {params:{storeId: string}}
) {
    try {
        const body = await req.json();

        const {email, title, message} = body;


        if(!email){
            return new NextResponse("Email is required", {status: 400});
        }

        if(!title){
            return new NextResponse("Title is required", {status: 400});
        }

        if(!message){
            return new NextResponse("Message is required", {status: 400});
        }

        const contact = await prismadb.contact.create({
            data: {
                email,
                title,
                message,
                storeId: params.storeId
            }
        });

        return NextResponse.json(contact);

    } catch (error) {
        console.log('[CONTACT_POST]', error);
        return new NextResponse("Internal error", {status:500});
    }
}


export async function GET(
    req:Request,
    {params}: {params:{storeId: string}}
) {
    try {

        if(!params.storeId){
            return new NextResponse("Store id is required",{status: 400});
        }


        const contacts = await prismadb.contact.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(contacts);

    } catch (error) {
        console.log('[CONTACTS_GET]', error);
        return new NextResponse("Internal error", {status:500});
    }
}
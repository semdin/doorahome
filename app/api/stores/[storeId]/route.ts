import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params}: {params:{storeId: string}}
) {
    try {
        const {userId} = auth();
        const body = await req.json();

        const {
            name,
            siteLink,
            cardName,
            card1Title,
            card1Description,
            card2Title,
            card2Description,
            card3Title,
            card3Description,
            fLogoUrl,
            fRes1Title,
            fRes1Link,
            fRes2Title,
            fRes2Link,
            facebookUrl,
            instagramUrl,
            twitterUrl,
            privacyPolicy,
            termsAndConditions,
            contactUsDescription,
            contactUsCard1Descrition,
            contactUsCard1Email,
            contactUsCard2Descrition,
            contactUsCard2Phone,
            aboutUsDescription,
            aboutUsPhotoUrl,
            aboutUsOurStory,
        } = body;

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if(!name){
            return new NextResponse("Name is required", {status: 400});
        }

        if(!params.storeId){
            return new NextResponse("Store id is required",{status: 400});
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name,
                siteLink,
                cardName,
                card1Title,
                card1Description,
                card2Title,
                card2Description,
                card3Title,
                card3Description,
                fLogoUrl,
                fRes1Title,
                fRes1Link,
                fRes2Title,
                fRes2Link,
                facebookUrl,
                instagramUrl,
                twitterUrl,
                privacyPolicy,
                termsAndConditions,
                contactUsDescription,
                contactUsCard1Descrition,
                contactUsCard1Email,
                contactUsCard2Descrition,
                contactUsCard2Phone,
                aboutUsDescription,
                aboutUsPhotoUrl,
                aboutUsOurStory,
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORE_PATCH]', error);
        return new NextResponse("Internal error", {status:500});
    }
}


export async function DELETE(
    req:Request,
    {params}: {params:{storeId: string}}
) {
    try {
        const {userId} = auth();


        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401});
        }


        if(!params.storeId){
            return new NextResponse("Store id is required",{status: 400});
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORE_DELETE]', error);
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

        const storeSettings = await prismadb.store.findUnique({
            where: {
                id: params.storeId,
            }
        });

        return NextResponse.json(storeSettings);

    } catch (error) {
        console.log('[storeSettings_GET]', error);
        return new NextResponse("Internal error", {status:500});
    }
}

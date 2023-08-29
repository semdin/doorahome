import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./components/category-form";
import { CategoryColumn } from "./components/columns";
import { CategoryClient } from "./components/client";

const CategoryPage = async ({
    params
}: {
    params: {categoryId: string, storeId: string}
}) => {
    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId
        }
    });

    const subCategories = await prismadb.category.findMany({
        where: {
            parentCategoryId: params.categoryId
        },
        include: {
            billboard: true,
            parentCategory: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })

    



    const formattedCategories: CategoryColumn[] = subCategories.map((item)=> ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        parentId: item.parentCategory?.name || "main",
        createdAt: format (item.createdAt, "MMMM do, yyyy")
    }));

    const isThereCategory = !!category;


    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
             <CategoryForm 
                billboards = {billboards}
                initialData={category}
             />   
            </div>

            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data= {formattedCategories} isThereCategory={isThereCategory}/>
            </div>
        </div>

     );
}
 
export default CategoryPage;
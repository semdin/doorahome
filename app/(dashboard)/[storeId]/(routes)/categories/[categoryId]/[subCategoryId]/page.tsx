import prismadb from "@/lib/prismadb";
import { SubCategoryForm } from "./components/sub-category-form";

const SubCategoryPage = async ({
    params
}: {
    params: {categoryId: string, storeId: string}
}) => {
    const subCategories = await prismadb.category.findMany({
        where: {
            parentCategoryId: params.categoryId
        }
    });

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
             <SubCategoryForm 
                billboards = {billboards}
                initialData={subCategories}
             />   
            </div>
        </div>
     );
}
 
export default SubCategoryPage;

import Category, { type ICategory } from '../../models/Category.js';
import type { HydratedDocument } from 'mongoose';
import appError from "../../utils/appError.js";
import httpStatus from "../../types/httpStatus.js";
import generateSlug from "../../utils/slug.js";
interface CreateCategoryInput{
    name :string;
    image?:string;
    parentId?:string | null;
}

interface UpdateCategoryInput {
    name ?: string;
    image ?: string;
    isActive ?: boolean;
}

interface CategoryTreeNode {
    id :string ;
    name : string ;
    image : string | null;
    depth :number ;
    slug : string ;
    children : CategoryTreeNode[] ;
}
// helper

const createUniqueSlug = async (name : string) : Promise<string> =>{
    let slug = generateSlug(name);
    
    let isExisting = await Category.exists({ slug });

    if(!isExisting) return slug;

    let count = 1 ;
    let base = slug;

    while(isExisting){
        slug = `${base}-${count}`;
        isExisting = await Category.exists({ slug });
        count++;
    }
    
    return slug;
}


const buildCategoryTree = (
  categories: HydratedDocument<ICategory>[],
  parent: string | null = null,
): CategoryTreeNode[] => {
    return categories
    .filter((cat) => (cat.parentId ? cat.parentId.toString() : null) === parent)
    .map((cat) => ({
      id:       cat._id.toString(),
      name:     cat.name,
      slug:     cat.slug,
      image:    cat.image,
      depth:    cat.depth,
      children: buildCategoryTree(categories, cat.id),
    }));
}

export const createCategory = async (input : CreateCategoryInput) =>{
    const {name ,image , parentId} = input;

    const slug = await createUniqueSlug(name);

    let depth = 0;

    if(parentId) {
        const parentCategory = await Category.findById(parentId);
        if (parentCategory) {
            depth = parentCategory.depth + 1;
        }
        else{
            throw new appError(404 , "Parent category not found" , httpStatus.NOT_FOUND);
        }
    }

    const category = await Category.create({
    name,
    slug,
    parentId: parentId ?? null,
    image: image ?? null,
    depth,
  });
 
  return category;

}

export const getAllCategories = async () => {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    return buildCategoryTree(categories);
};

export const getCategoryBySlug = async (slug : string) => {
    const category = await Category.findOne({ slug, isActive: true });
    if(!category) throw new appError(404 , "Category not found" , httpStatus.NOT_FOUND);

    const categories = await Category.find({
      isActive: true,
      parentId: category._id,
    }).sort({ name: 1 });
    return {category , children : categories} ;
}

export const updateCategory = async (categoryId : string , input : UpdateCategoryInput) => {
    const category = await Category.findById(categoryId);
    if(!category) throw new appError(404 , "Category not found" , httpStatus.NOT_FOUND);

    let slug : string  = category.slug ;
    if(input.name && input.name != category.name)
        slug = await createUniqueSlug(input.name);

    category.set({ ...input, slug });
    await category.save();

    return category;

}

export const deleteCategory = async (categoryId : string) => {
    const category = await Category.findById(categoryId);
    if(!category) throw new appError(404 , "Category not found" , httpStatus.NOT_FOUND);

    const childrenCount = await Category.countDocuments({ parentId: category._id });
    if(childrenCount > 0)
        throw new appError(400 ,       'Cannot delete a category that has subcategories. Delete or move them first.', httpStatus.FORBIDDEN);

    await category.deleteOne();
}

import {Request , Response , NextFunction} from 'express'

import Category from "../../models/pg/Category.js";
import catchAsync from "../../middlewares/catchAsync.js";
import * as categoriesService from './Categories.service.js';
import {  sendCreated , sendSucess , sendNoContent} from '../../utils/apiResponse.js';

export const  createCategory = catchAsync( async (req : Request , res : Response , next : NextFunction) =>{
    const category = await  categoriesService.createCategory(req.body);
    return sendCreated(res, category, 'Category created successfully');
});

export const getAllCategories = catchAsync(async (req : Request , res : Response , next : NextFunction) =>{
    const categories = await categoriesService.getAllCategories();
    return sendSucess(res , categories , "Category tree fetched");
});

export const getCategoryBySlug = catchAsync( async (req : Request , res : Response , next : NextFunction) =>{
    const slug = req.params.slug as string ;
    console.log(slug);
    const categories = await categoriesService.getCategoryBySlug(slug);
    return sendSucess(res , categories , "Category  fetched"); 
})

export const updateCategory = catchAsync( async (req : Request , res : Response , next : NextFunction) =>{
    const categoryId = req.params.categoryId as string ;
    const category = await categoriesService.updateCategory(categoryId , req.body);
    return sendSucess(res , category , "'Category updated successfully'");
})

export const deleteCategory = catchAsync (async (req : Request , res : Response , next : NextFunction) => {
    const categoryId = req.params.categoryId as string ;
    const category = await categoriesService.deleteCategory(categoryId);
    return sendNoContent(res)
})
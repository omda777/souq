import Router from 'express'

import * as categoryController from './Categories.controller.js'
import validate from '../../middlewares/Validate.js';
import {createCategorySchema , updateCategorySchema} from './Categories.validation.js'

const router = Router();

router.get(
    '/' , 
    categoryController.getAllCategories
);

router.get(
    '/:slug' , 
    categoryController.getCategoryBySlug
);

router.post(
    '/' , 
    validate(createCategorySchema , "body") , 
    categoryController.createCategory
);

router.put(
    '/:categoryId', 
    validate(updateCategorySchema , "body") , 
    categoryController.updateCategory
);

router.delete(
    '/:categoryId' , 
    categoryController.deleteCategory
);

export default router;
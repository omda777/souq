import Router from 'express'

import * as categoryController from './Categories.controller.js'
import Category from '../../models/pg/Category.js';


const router = Router();

router.post('/' ,categoryController.createCategory);

router.get('/' , categoryController.getAllCategories);

router.get('/:slug' , categoryController.getCategoryBySlug);

router.put('/:categoryId', categoryController.updateCategory);

router.delete('/:categoryId' , categoryController.deleteCategory);

export default router;
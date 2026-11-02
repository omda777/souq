import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, 'Category name must be at least 2 characters')
    .max(100, 'Category name must be at most 100 characters'),
  parentId: z
    .string()
    .regex(/^[a-f\\d]{24}$/i, 'Parent ID must be a valid MongoDB ObjectId')
    .nullable()
    .optional(),
  image: z.string().url('Image must be a valid URL').optional(),
});

export const updateCategorySchema = z
  .object({
    name: z.string().min(2).max(100).optional(),
    image: z.string().url('Image must be a valid URL').optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Provide at least one field to update',
  });


export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

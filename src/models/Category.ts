import { model, Schema, Types } from 'mongoose';

export interface ICategory {
  name: string;
  slug: string;
  image: string | null;
  isActive: boolean;
  depth: number;
  parentId: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 120,
    },
    image: {
      type: String,
      default: null,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    depth: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

categorySchema.index({ parentId: 1, isActive: 1, name: 1 });

export default model<ICategory>('Category', categorySchema);

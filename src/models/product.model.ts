import { model, Schema, Model, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    manufacturer: string;
    stockQuantity: number;
    createDate: Date;
    updatedDate: Date;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    manufacturer: { type: String, required: true },
    stockQuantity: { type: Number, required: true },
    createDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
});

export const ProductModel: Model<IProduct> = model<IProduct>('products', ProductSchema);
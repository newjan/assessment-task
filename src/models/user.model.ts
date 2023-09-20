import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    address: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const UserModel: Model<IUser> = model<IUser>('users', UserSchema);
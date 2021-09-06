import mongoose from "../datasource/database";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            set: (v: any) => bcrypt.hashSync(v, bcrypt.genSaltSync()),
        }
    },
    { timestamps: true}
);

export default mongoose.model('user', UserSchema )

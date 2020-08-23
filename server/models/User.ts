import { createSchema, Type, typedModel } from "ts-mongoose";
import getAvatar from "../utils/getAvatar";

const UserSchema = createSchema(
  {
    email: Type.string({ required: true, unique: true }),
    username: Type.string({ required: true }),
    password: Type.string({ required: true }),
    contacts: Type.array({ default: [] }).of(Type.string({ unique: true })),
    date: Type.date({ default: Date.now as any }),
    avatar: Type.string({ default: getAvatar() }),
    isAdmin: Type.boolean({ default: false }),
    unreadMessages: Type.array({ default: [] }).of({}),
    // for general use of the app
    temporaryMessages: Type.array({ dafault: [] }).of({}),
  },
  { timestamps: { createdAt: true } }
);

const User = typedModel("User", UserSchema);

export default User;

import { createSchema, Type, typedModel } from "ts-mongoose";

const icons = [
  "https://maxcdn.icons8.com/Share/icon/ios7/Cinema/anonymous_mask1600.png",
  "https://image.flaticon.com/icons/png/512/99/99618.png",
  "https://maxcdn.icons8.com/Share/icon/Dusk_Wired/Cinema/anonymous_mask1600.png",
];

const UserSchema = createSchema(
  {
    email: Type.string({ required: true, unique: true }),
    username: Type.string({ required: true }),
    password: Type.string({ required: true }),
    contacts: Type.array().of({
      id: Type.string({ required: true, unique: true, default: [] }),
    }),
    date: Type.date({ default: Date.now as any }),
    avatar: Type.string({ default: icons[Math.random()] }),
  },
  { timestamps: { createdAt: true } }
);

const User = typedModel("User", UserSchema);

export default User;

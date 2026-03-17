import * as z from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;


const formSchemaBase = z.object({
  username: z.string().min(1, "Kullanıcı adı zorunlu"),
  firstName: z.string().min(1, "İsim zorunlu"),
  lastName: z.string().min(1, "Soyisim zorunlu"),
  email: z.string().min(1, "E-posta zorunlu").email("Geçerli e-posta girin"),
  password: z
    .string()
    .min(8, "En az 8 karakter içermeli")
    .regex(passwordRegex, "Şifre büyük/küçük harf, sayı ve özel karakter içermelidir"),
  confirmPassword: z.string(),
});


const formSchema = formSchemaBase.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  }
);


export const signInSchema = formSchemaBase.pick({
  username: true,
  password: true,
});

export default formSchema;
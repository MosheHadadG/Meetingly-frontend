import * as yup from "yup";
const FILE_SIZE = 5000000;

export const userSchemaPersonalInfo = yup.object().shape({
  firstName: yup.string().required("הזן שם פרטי"),
  lastName: yup.string().required("הזן שם משפחה"),
  birthday: yup.string().required("הזן תאריך לידה"),
  city: yup.string().required("הזן את העיר שלך"),
  gender: yup.string().required("בחר מין"),
});

export const userSchemaUploadAvatar = yup.object().shape({
  avatarFile: yup
    .mixed()
    .required("העלה תמונת פרופיל")
    .test(
      "fileSize",
      "גודל התמונה צריך להיות עד 5MB",
      (value) => value && value.size <= FILE_SIZE
    ),
});

export const userSchemaSignUpInfo = yup.object().shape({
  username: yup
    .string()
    .min(6, "שם משתמש חייב להכיל לפחות 6 תווים")
    .required("הזן שם משתמש"),
  email: yup.string().email("הזן כתובת אימייל תקינה").required("הזן אימייל"),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref("email"), null], "כתובות המייל שהזנת אינן תואמות")
    .required("לצורך אימות, הזן את כתובת האימייל שנית"),
  password: yup
    .string()
    .min(6, "הזן סיסמה חזקה (6 תווים ומעלה)")
    .required("הזן סיסמה התשמש אותך לכניסה לחשבונך"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "הסיסמאות שהזנת אינן תואמות")
    .required("הזן סיסמה בשנית לצורך אימות"),
});

export const userSchemaVerifyEmail = yup.object().shape({
  otpCode: yup.string().length(4, "קוד אימות מכיל 4 תווים").required("הזן קוד אימות"),
});

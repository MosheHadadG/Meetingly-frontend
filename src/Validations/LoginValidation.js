import * as yup from "yup";

export const userLoginSchema = yup.object().shape({
  email: yup.string().email("הזן כתובת אימייל תקינה").required("הזן אימייל"),
  password: yup.string().required("הזן סיסמה"),
});

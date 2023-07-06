import * as yup from "yup";

const FILE_SIZE = 1000000;

export const editProfileAvatarSchema = yup.object().shape({
  avatarFile: yup
    .mixed()
    .required("העלה תמונת פרופיל")
    .test(
      "fileSize",
      "גודל התמונה צריך להיות עד 1MB",
      (value) => value && value.size <= FILE_SIZE
    ),
});

export const editProfileBioSchema = yup.object().shape({
  bio: yup.string().max(200, "ביוגרפיה צריך להכיל מקסימום 200 תווים"),
});

// export const editProfileDetailsSchema = yup.object().shape({
//   location: yup.object().shape({
//     name: yup.string().required("הזן את מיקום האירוע"),
//     coordinates: yup.array().min(2, "בחר מיקום מהרשימה").required(),
//   }),
//   date: yup
//     .date()
//     .min(today, "תאריך זה בעבר, הזן תאריך תחילת אירוע עתידי")
//     .required("הזן את תאריך האירוע"),
//   timeStart: yup
//     .string()
//     .required("הזן את שעת תחילת האירוע")
//     .test("past-time", "שעה זאת בעבר, הזן שעת תחילת אירוע עתידית", function (value) {
//       if (this.parent.date) {
//         const { date } = this.parent;
//         return (
//           new Date(`${dayjs(date).format("YYYY-MM-DD")}T${value}`).getTime() >
//           new Date().getTime()
//         );
//       } else {
//         return true;
//       }
//     }),
//   timeEnd: yup
//     .string()
//     .required("הזן את שעת סיום האירוע")
//     .test(
//       "is-greater",
//       "שעת סיום האירוע צריכה להיות אחרי שעת תחילת האירוע",
//       function (value) {
//         if (this.parent.timeStart) {
//           const { timeStart } = this.parent;

//           return moment(value, "HH:mm").isSameOrAfter(moment(timeStart, "HH:mm"));
//         } else {
//           return true;
//         }
//       }
//     ),
// });

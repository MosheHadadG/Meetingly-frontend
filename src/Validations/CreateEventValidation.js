import dayjs from "dayjs";
import moment from "moment";
import * as yup from "yup";

const FILE_SIZE = 1000000;
const today = new Date();
today.setHours(0, 0, 0, 0);

export const createEventSchema = yup.object().shape({
  coverImgFile: yup
    .mixed()
    .required("העלה תמונת נושא")
    .test(
      "fileSize",
      "גודל התמונה צריך להיות עד 1MB",
      (value) => value && value.size <= FILE_SIZE
    ),
  coverImgSrc: yup.string().required("שמור את תמונת הנושא"),
  title: yup
    .string()
    .min(2, "שם האירוע צריך להכיל מינימום 2 תווים")
    .max(25, "שם האירוע יכול להכיל מקסימום 25 תווים")
    .required("הזן את שם האירוע"),
  location: yup.object().shape({
    name: yup.string().required("הזן את מיקום האירוע"),
    coordinates: yup.array().min(2, "בחר מיקום מהרשימה").required(),
  }),
  date: yup
    .date()
    .min(today, "תאריך זה בעבר, הזן תאריך תחילת אירוע עתידי")
    .required("הזן את תאריך האירוע"),
  timeStart: yup
    .string()
    .required("הזן את שעת תחילת האירוע")
    .test("past-time", "שעה זאת בעבר, הזן שעת תחילת אירוע עתידית", function (value) {
      if (this.parent.date) {
        const { date } = this.parent;
        return (
          new Date(`${dayjs(date).format("YYYY-MM-DD")}T${value}`).getTime() >
          new Date().getTime()
        );
      } else {
        return true;
      }
    }),
  timeEnd: yup
    .string()
    .required("הזן את שעת סיום האירוע")
    .test(
      "is-greater",
      "שעת סיום האירוע צריכה להיות אחרי שעת תחילת האירוע",
      function (value) {
        if (this.parent.timeStart) {
          const { timeStart } = this.parent;

          return moment(value, "HH:mm").isSameOrAfter(moment(timeStart, "HH:mm"));
        } else {
          return true;
        }
      }
    ),
  description: yup
    .string()
    .min(6, "תיאור האירוע צריך להכיל מינימום 6 תווים")
    .max(100, "פרטי האירוע יכול להכיל מקסימום 100 תווים")
    .required("הזן את פרטי האירוע"),
  type: yup.string().required("בחר תחום עניין"),
  privacy: yup.string().required("ציין את פרטיות האירוע"),
});

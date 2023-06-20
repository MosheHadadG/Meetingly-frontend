import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Input/Button/Button";
import Input from "../../../components/Input/Input/Input";
import { useFormik } from "formik";
import * as S from "./CreateEventForm.styled";
import ErrorParagraph from "../../../components/Input/ErrorParagraph/ErrorParagraph";
import { createEventSchema } from "../../../Validations/CreateEventValidation";
import TextArea from "../../../components/Input/TextArea/TextArea";
import { INTERESTS_LIST } from "../../InterestsPage/utils/utils";
import Select from "../../../components/Input/Select/Select";
import EventPrivacy from "./components/EventPrivacy/EventPrivacy";
import { useCreateEventMutation } from "../../../redux/slices/apiSlices/eventsApiSlice";
import Spinner from "../../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { snackBarContext } from "../../../services/contexts/SnackBar";
import dayjs from "dayjs";
import UploadEventCoverImg from "./components/UploadEventCoverImg/UploadEventCoverImg";
import EventPlace from "./components/EventPlace/EventPlace";

function CreateEventForm() {
  const {
    values: createEventForm,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      location: {
        name: "",
        coordinates: [],
      },
      title: "",
      date: "",
      timeStart: "",
      timeEnd: "",
      description: "",
      type: "",
      privacy: "",
      coverImgFile: null,
      coverImgSrc: "",
      // imageSrc: "",
    },
    validationSchema: createEventSchema,
    onSubmit,
  });

  const [createEvent, { isLoading }] = useCreateEventMutation();
  const { openSnackBar } = useContext(snackBarContext);
  const [errMsg, setErrMsg] = useState();
  const navigate = useNavigate();
  const [optionsInterests, setOptionsInterests] = useState([
    { value: "Default", label: "תחום האירוע", disabled: true },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function onSubmit() {
    const { date, timeStart, coverImgFile } = createEventForm;
    const eventDate = new Date(date);
    eventDate.setHours(timeStart.substring(0, 2), timeStart.substring(3, 5));

    const createEventDataToServer = {
      ...createEventForm,
      date: eventDate,
    };
    delete createEventDataToServer.coverImgFile;

    try {
      const event = await createEvent(createEventDataToServer).unwrap();
      openSnackBar("success", `יצרת בהצלחה את האירוע "${event.title}"`);
      navigate(`/events/${event.type}/${event._id}`);
    } catch (err) {
      if (err.status === 400) {
        openSnackBar("error", err.data.error);
      } else {
        openSnackBar("error", "תקלה בשרתים שלנו");
      }
    }
  }

  const interestListToOptions = () => {
    return INTERESTS_LIST.map((interest) => {
      return { value: interest.type, label: interest.name };
    });
  };

  useEffect(() => {
    setOptionsInterests([...optionsInterests, ...interestListToOptions()]);
  }, []);

  const { title, placeName, date, timeStart, timeEnd, description, type } =
    createEventForm;
  return isLoading ? (
    <Spinner />
  ) : (
    <S.CreateEventForm onSubmit={handleSubmit}>
      <UploadEventCoverImg
        formState={createEventForm}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
      />
      <S.CreateEventFormInputs>
        <Input
          type="text"
          placeHolder="שם האירוע"
          name="title"
          // boxShadow
          value={title}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.title && touched.title}
        />
        {errors.title && touched.title && <ErrorParagraph text={errors.title} />}

        <EventPlace
          formState={createEventForm}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
        />

        <Input
          type="text"
          placeHolder="תאריך"
          name="date"
          // boxShadow
          onFocus={(e) => (e.target.type = "date")}
          value={date}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.date && touched.date}
        />
        {errors.date && touched.date && <ErrorParagraph text={errors.date} />}
        <S.TimeInputs>
          <S.TimeInput>
            <Input
              width="95%"
              fontSize="1.2rem"
              type="text"
              placeHolder="שעת התחלה"
              name="timeStart"
              // boxShadow
              onFocus={(e) => (e.target.type = "time")}
              value={timeStart}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.timeStart && touched.timeStart}
            />
            {errors.timeStart && touched.timeStart && (
              <ErrorParagraph text={errors.timeStart} />
            )}
          </S.TimeInput>
          <S.TimeInput>
            <Input
              width="95%"
              fontSize="1.2rem"
              type="text"
              placeHolder="שעת סיום"
              name="timeEnd"
              // boxShadow
              onFocus={(e) => (e.target.type = "time")}
              value={timeEnd}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.timeEnd && touched.timeEnd}
            />
            {errors.timeEnd && touched.timeEnd && (
              <ErrorParagraph text={errors.timeEnd} />
            )}
          </S.TimeInput>
        </S.TimeInputs>

        <TextArea
          placeHolder="תיאור האירוע"
          name="description"
          // boxShadow
          value={description}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.description && touched.description}
        />
        {errors.description && touched.description && (
          <ErrorParagraph text={errors.description} />
        )}

        <Select
          handleChange={handleChange}
          handleBlur={handleBlur}
          name="type"
          width="100%"
          defaultValue="Default"
          options={optionsInterests}
          error={errors.type && touched.type}
        />
        {errors.type && touched.type && <ErrorParagraph text={errors.type} />}

        <EventPrivacy
          formState={createEventForm}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />

        {errMsg && <ErrorParagraph text={errMsg} />}

        <S.ButtonContainer>
          <Button
            text="צור אירוע"
            color="var(--color-primary-purple)"
            type="submit"
            boxShadow
          />
        </S.ButtonContainer>
      </S.CreateEventFormInputs>
    </S.CreateEventForm>
  );
}

export default CreateEventForm;

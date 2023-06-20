import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as S from "./EditEventDetails.styled";
import Spinner from "../../../../../../../../components/Spinner/Spinner";
import UploadEventCoverImg from "../../../../../../../CreateEventPage/CreateEventForm/components/UploadEventCoverImg/UploadEventCoverImg";
import { useUpdateEventMutation } from "../../../../../../../../redux/slices/apiSlices/eventsApiSlice";
import Input from "../../../../../../../../components/Input/Input/Input";
import ErrorParagraph from "../../../../../../../../components/Input/ErrorParagraph/ErrorParagraph";
import EventPrivacy from "../../../../../../../CreateEventPage/CreateEventForm/components/EventPrivacy/EventPrivacy";
import dayjs from "dayjs";
import EventPlace from "../../../../../../../CreateEventPage/CreateEventForm/components/EventPlace/EventPlace";
import Button from "../../../../../../../../components/Input/Button/Button";
// import { snackBarContext } from "../../../../../../../../services/contexts/snackBar";
import { editEventDetailsSchema } from "../../../../../../../../Validations/EditEventValidation";
import { snackBarContext } from "../../../../../../../../services/contexts/SnackBar";
function EditEventDetails({ event, closeSubDialog }) {
  const {
    values: EditEventDetailsForm,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      date: event.date,
      timeStart: event.timeStart,
      timeEnd: event.timeEnd,
      privacy: event.privacy,
      location: {
        name: event.location.name,
        coordinates: event.location.coordinates,
      },
    },
    validationSchema: editEventDetailsSchema,
    onSubmit,
  });

  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const { openSnackBar } = useContext(snackBarContext);

  async function onSubmit() {
    try {
      console.log(EditEventDetailsForm);

      const eventUpdated = await updateEvent({
        updatedForm: EditEventDetailsForm,
        eventId: event._id,
      }).unwrap();

      openSnackBar("success", `השינויים נשמרו`);
      closeSubDialog();
      // navigate(`/events/${event.type}/${event._id}`);
    } catch (err) {
      console.log(err);
      //   if (err.status === 400) {
      //     openSnackBar("error", err.data.error);
      //   } else {
      //     openSnackBar("error", "תקלה בשרתים שלנו");
      //   }
      // }
    }
  }

  return (
    <S.EditEventDetailsForm onSubmit={handleSubmit}>
      <S.EditEventDetailsFormInputs>
        <EventPrivacy
          formState={EditEventDetailsForm}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
        <EventPlace
          formState={EditEventDetailsForm}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          touched={touched}
          errors={errors}
        />

        <Input
          type="date"
          placeHolder="תאריך"
          name="date"
          // boxShadow
          // onFocus={(e) => (e.target.type = "date")}

          value={dayjs(EditEventDetailsForm.date).format("YYYY-MM-DD")}
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
              type="time"
              placeHolder="שעת התחלה"
              name="timeStart"
              // boxShadow
              // onFocus={(e) => (e.target.type = "time")}
              value={EditEventDetailsForm.timeStart}
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
              type="time"
              placeHolder="שעת סיום"
              name="timeEnd"
              // boxShadow
              // onFocus={(e) => (e.target.type = "time")}
              value={EditEventDetailsForm.timeEnd}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.timeEnd && touched.timeEnd}
            />
            {errors.timeEnd && touched.timeEnd && (
              <ErrorParagraph text={errors.timeEnd} />
            )}
          </S.TimeInput>
        </S.TimeInputs>
        <S.ButtonContainer>
          <Button
            text="שמור שינויים"
            color="var(--color-primary-purple)"
            type="submit"
            // boxShadow
          />
        </S.ButtonContainer>
      </S.EditEventDetailsFormInputs>
    </S.EditEventDetailsForm>
  );

  // );
}

export default EditEventDetails;

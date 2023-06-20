import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as S from "./EditEventCover.styled";
import Spinner from "../../../../../../../../components/Spinner/Spinner";
import UploadEventCoverImg from "../../../../../../../CreateEventPage/CreateEventForm/components/UploadEventCoverImg/UploadEventCoverImg";
import { useUpdateEventMutation } from "../../../../../../../../redux/slices/apiSlices/eventsApiSlice";
import { editEventCoverSchema } from "../../../../../../../../Validations/EditEventValidation";
import { snackBarContext } from "../../../../../../../../services/contexts/SnackBar";

function EditEventCover({ event, closeSubDialog }) {
  const {
    values: editEventCoverForm,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      coverImgFile: null,
      coverImgSrc: event.imageSrc,
    },
    validationSchema: editEventCoverSchema,
    onSubmit,
  });

  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const { openSnackBar } = useContext(snackBarContext);
  async function onSubmit({ coverImgSrc }) {
    const editEventCoverDataToServer = {
      imageSrc: coverImgSrc ? coverImgSrc : editEventCoverForm.coverImgSrc,
    };

    try {
      const eventUpdated = await updateEvent({
        updatedForm: editEventCoverDataToServer,
        eventId: event._id,
      }).unwrap();
      openSnackBar("success", `השינויים נשמרו`);
      closeSubDialog();
      // openSnackBar("success", `יצרת בהצלחה את האירוע "${event.title}"`);
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
    <S.EditEventCoverForm onSubmit={handleSubmit}>
      <UploadEventCoverImg
        formState={editEventCoverForm}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
        submitButtonSave={true}
        handleSubmit={onSubmit}
      />
    </S.EditEventCoverForm>
  );

  // );
}

export default EditEventCover;

import React, { useContext } from "react";
import TextArea from "../../../../../../../../components/Input/TextArea/TextArea";
import * as S from "./EditEventDescription.styled";
import { useFormik } from "formik";
import Button from "../../../../../../../../components/Input/Button/Button";
import ErrorParagraph from "../../../../../../../../components/Input/ErrorParagraph/ErrorParagraph";
import { useUpdateEventMutation } from "../../../../../../../../redux/slices/apiSlices/eventsApiSlice";
import { snackBarContext } from "../../../../../../../../services/contexts/SnackBar";

function EditEventDescription({ event, closeSubDialog }) {
  const {
    values: EditEventDescriptionForm,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      description: event.description,
    },
    // validationSchema: editEventDetailsSchema,
    onSubmit,
  });

  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const { openSnackBar } = useContext(snackBarContext);

  async function onSubmit() {
    console.log(EditEventDescriptionForm);

    try {
      const eventUpdated = await updateEvent({
        updatedForm: EditEventDescriptionForm,
        eventId: event._id,
      }).unwrap();
      openSnackBar("success", `השינויים נשמרו`);
      closeSubDialog();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <S.EditEventDescriptionForm onSubmit={handleSubmit}>
      <S.EditEventDescriptionFormInputs>
        <TextArea
          placeHolder="תיאור האירוע"
          name="description"
          // boxShadow
          value={EditEventDescriptionForm.description}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.description && touched.description}
        />
        {errors.description && touched.description && (
          <ErrorParagraph text={errors.description} />
        )}

        <S.ButtonContainer>
          <Button
            text="שמור שינויים"
            color="var(--color-primary-purple)"
            type="submit"
            // boxShadow
          />
        </S.ButtonContainer>
      </S.EditEventDescriptionFormInputs>
    </S.EditEventDescriptionForm>
  );
}

export default EditEventDescription;

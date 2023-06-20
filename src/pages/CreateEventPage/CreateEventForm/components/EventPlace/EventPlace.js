import React, { useEffect } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import ErrorParagraph from "../../../../../components/Input/ErrorParagraph/ErrorParagraph";
import Input from "../../../../../components/Input/Input/Input";

function EventPlace({
  formState,
  handleChange,
  handleBlur,
  setFieldValue,
  errors,
  touched,
}) {
  const { ref: autoCompleteRef } = usePlacesWidget({
    apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&region=il`,
    onPlaceSelected: (place) => {
      setFieldValue("location.name", place.formatted_address);
      setFieldValue("location.coordinates", [
        place.geometry.location.lng(),
        place.geometry.location.lat(),
      ]);
    },
    options: {
      types: ["geocode"],
      componentRestrictions: { country: "il" },
    },
  });

  return (
    <>
      <Input
        type="text"
        placeHolder="מיקום"
        name="location.name"
        // boxShadow
        inputRef={autoCompleteRef}
        value={formState.location.name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.location && errors.location}
      />
      {errors.location && touched.location && (
        <ErrorParagraph
          text={errors.location.name ? errors.location.name : errors.location.coordinates}
        />
      )}
    </>
  );
}

export default EventPlace;

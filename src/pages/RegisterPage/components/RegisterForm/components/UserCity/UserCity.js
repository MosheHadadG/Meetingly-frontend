import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import ErrorParagraph from "../../../../../../components/Input/ErrorParagraph/ErrorParagraph";
import Input from "../../../../../../components/Input/Input/Input";

function UserCity({ city, handleChange, handleBlur, setFieldValue, errors, touched }) {
  const { ref: autoCompleteRef } = usePlacesWidget({
    apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&region=il`,
    onPlaceSelected: (place) => {
      setFieldValue("city", place.formatted_address);
      setFieldValue("cityCoordinates", {
        lng: place.geometry.location.lng(),
        lat: place.geometry.location.lat(),
      });
    },
    options: {
      types: ["(cities)"],
      componentRestrictions: { country: "il" },
    },
  });

  return (
    <>
      <Input
        type="text"
        placeHolder="עיר"
        name="city"
        boxShadow
        inputRef={autoCompleteRef}
        value={city}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.city && touched.city}
      />
      {errors.city && touched.city && <ErrorParagraph text={errors.city} />}
    </>
  );
}

export default UserCity;

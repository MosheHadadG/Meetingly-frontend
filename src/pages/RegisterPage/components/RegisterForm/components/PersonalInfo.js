import React from "react";
import ErrorParagraph from "../../../../../components/Input/ErrorParagraph/ErrorParagraph";
import Input from "../../../../../components/Input/Input/Input";
import Select from "../../../../../components/Input/Select/Select";
import { usePlacesWidget } from "react-google-autocomplete";
import UploadAvatar from "./UploadAvatar/UploadAvatar";
import UserCity from "./UserCity/UserCity";
// import Select from "react-select";

function PersonalInfo({
  registerForm,
  handleChange,
  handleBlur,
  setFieldValue,
  errors,
  touched,
}) {
  const { firstName, lastName, birthday, city } = registerForm;
  const optionsGender = [
    { value: "Default", label: "מין", disabled: true },
    { value: "MALE", label: "זכר" },
    { value: "FEMALE", label: "נקבה" },
  ];

  console.log(registerForm);

  // const { ref: autoCompleteRef } = usePlacesWidget({
  //   apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&region=il`,
  //   onPlaceSelected: (place) => {
  //     setFieldValue("city", place.formatted_address);
  //     setFieldValue("cityCoordinates", {
  //       lng: place.geometry.location.lng(),
  //       lat: place.geometry.location.lat(),
  //     });
  //   },
  //   options: {
  //     types: ["(cities)"],
  //     componentRestrictions: { country: "il" },
  //   },
  // });

  return (
    <>
      <Input
        type="text"
        placeHolder="שם פרטי"
        name="firstName"
        value={firstName}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.firstName && touched.firstName}
      />
      {errors.firstName && touched.firstName && (
        <ErrorParagraph text={errors.firstName} />
      )}

      <Input
        type="text"
        placeHolder="שם משפחה"
        name="lastName"
        value={lastName}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.lastName && touched.lastName}
      />
      {errors.lastName && touched.lastName && <ErrorParagraph text={errors.lastName} />}

      <Input
        type="text"
        placeHolder="תאריך לידה"
        name="birthday"
        value={birthday}
        handleChange={handleChange}
        handleBlur={handleBlur}
        onFocus={(e) => (e.target.type = "date")}
        error={errors.birthday && touched.birthday}
      />
      {errors.birthday && touched.birthday && <ErrorParagraph text={errors.birthday} />}

      <UserCity
        city={city}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
      />

      {/* <Input
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
      {errors.city && touched.city && <ErrorParagraph text={errors.city} />} */}

      <Select
        handleChange={handleChange}
        handleBlur={handleBlur}
        name="gender"
        width="60%"
        defaultValue="Default"
        options={optionsGender}
        error={errors.gender && touched.gender}
      />
      {errors.gender && touched.gender && <ErrorParagraph text={errors.gender} />}
    </>
  );
}

export default PersonalInfo;

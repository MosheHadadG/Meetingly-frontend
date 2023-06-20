import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import PublicIcon from "@mui/icons-material/Public";
import GroupIcon from "@mui/icons-material/Group";

import "./EventPrivacy.css";
import * as S from "./EventPrivacy.styled";
import ErrorParagraph from "../../../../../components/Input/ErrorParagraph/ErrorParagraph";
function EventPrivacy({ formState, handleChange, handleBlur, touched, errors }) {
  return (
    <S.Container>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: "1.1rem" }}>
          פרטיות האירוע
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="privacy"
          onChange={handleChange}
          onBlur={handleBlur}
          value={formState.privacy}
        >
          <S.PrivacyLabelWrapper>
            <FormControlLabel
              style={{ display: "flex", alignItems: "center" }}
              value="public"
              control={<Radio />}
              label={<PublicIcon sx={{ color: "var(--color-primary-purple)" }} />}
            />
            <S.PrivacyLabelSpan>
              <S.PrivacyLabelParagraph>ציבורי</S.PrivacyLabelParagraph>
            </S.PrivacyLabelSpan>
          </S.PrivacyLabelWrapper>
          <S.PrivacyLabelWrapper>
            <FormControlLabel
              style={{ display: "flex" }}
              value="private"
              control={<Radio />}
              label={<GroupIcon sx={{ color: "var(--color-primary-purple)" }} />}
            />
            <S.PrivacyLabelSpan>
              <S.PrivacyLabelParagraph>פרטי</S.PrivacyLabelParagraph>
            </S.PrivacyLabelSpan>
          </S.PrivacyLabelWrapper>
        </RadioGroup>
      </FormControl>
      {errors.privacy && touched.privacy && <ErrorParagraph text={errors.privacy} />}
    </S.Container>
  );
}

export default EventPrivacy;

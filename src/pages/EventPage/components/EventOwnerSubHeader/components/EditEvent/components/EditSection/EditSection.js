import React from "react";
import Button from "../../../../../../../../components/Input/Button/Button";
import EventDetails from "../../../../../EventDetails/EventDetails";
import * as S from "./EditSection.styled";

function EditSection({ title, content, handleClick }) {
  return (
    <S.Container>
      <S.EditSectionHeader>
        <S.EditSectionTitle>{title}</S.EditSectionTitle>
        {/* <Button
          width="60px"
          height="30px"
          text="ערוך"
          color="var(--color-primary-purple)"
          fontSize="1rem"
          type="button"
        /> */}
        <S.EditSectionButton onClick={handleClick}>ערוך</S.EditSectionButton>
      </S.EditSectionHeader>
      <S.EditSectionContent>{content}</S.EditSectionContent>
    </S.Container>
  );
}

export default EditSection;

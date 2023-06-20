import React from "react";
import { useSelector } from "react-redux";
import Button from "../../components/Input/Button/Button";
import Input from "../../components/Input/Input/Input";
import { selectIsDesktop } from "../../redux/slices/uiSlice";
import CreateEventForm from "./CreateEventForm/CreateEventForm";
import * as S from "./CreateEventPage.styled";

function CreateEventPage() {
  const isDesktop = useSelector(selectIsDesktop);
  return (
    <S.Container isDesktop={isDesktop}>
      {/* <S.CreateEventTitle>איזה אירוע בא לך ליזום?</S.CreateEventTitle> */}
      <CreateEventForm />
    </S.Container>
  );
}

export default CreateEventPage;

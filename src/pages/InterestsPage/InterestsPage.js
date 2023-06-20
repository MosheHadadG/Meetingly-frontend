import React, { useEffect, useState } from "react";
import Button from "../../components/Input/Button/Button";
import ErrorParagraph from "../../components/Input/ErrorParagraph/ErrorParagraph";
import Paragraph from "../../components/Input/Paragraph/Paragraph";

import * as S from "./InterestsPage.styled";
import { INTERESTS_LIST } from "./utils/utils";
import { useSelector } from "react-redux";
import { selectCurrentUser, setUpdatedUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../../redux/slices/apiSlices/authApiSlice";
import { setUserEventsTypeWithPage } from "../../redux/slices/eventsSlice";
import { selectIsDesktop } from "../../redux/slices/uiSlice";

function InterestsPage() {
  const user = useSelector(selectCurrentUser);
  const [interestsUserList, setInterestsUserList] = useState([...user.interests]);
  const [errorSave, setErrorSave] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDesktop = useSelector(selectIsDesktop);

  const handleClickInterest = (interest) => {
    if (isInterestExistInUserList(interest)) {
      const updetedInterestsUserList = interestsUserList.filter(
        (interestUser) => interestUser.type !== interest.type
      );
      setInterestsUserList(updetedInterestsUserList);
    } else {
      setInterestsUserList([...interestsUserList, interest]);
    }
  };

  function isInterestExistInUserList(interest) {
    const isInterestExist = interestsUserList.find((interestUserList) => {
      return interestUserList.type === interest.type;
    });
    return isInterestExist;
  }

  const saveInterestsUserList = async () => {
    if (interestsUserList.length < 1) return setErrorSave(true);
    setErrorSave(false);
    const interestsUpdated = { interests: [...interestsUserList] };
    try {
      const userData = await updateUser(interestsUpdated).unwrap();
      dispatch(setUpdatedUser(userData));
      dispatch(setUserEventsTypeWithPage({}));
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const renderInterestsList = INTERESTS_LIST.map((interest, idx) => {
    return (
      <S.InterestItem
        clicked={isInterestExistInUserList(interest)}
        key={idx}
        onClick={() => handleClickInterest(interest)}
      >
        {interest.icon}
        <S.InterestTitleSpan>
          <S.InterestTitleParagraph>{interest.name}</S.InterestTitleParagraph>
        </S.InterestTitleSpan>
      </S.InterestItem>
    );
  });

  return (
    <S.Container isDesktop={isDesktop}>
      <S.TitleInterests>אני בקטע של...</S.TitleInterests>
      <S.InterestsContainer>{renderInterestsList}</S.InterestsContainer>
      {errorSave && (
        <ErrorParagraph textAlign="center" text="עלייך לבחור לפחות תחום עניין אחד" />
      )}
      <S.InterestPageFooter>
        <Button
          text="שמור"
          color="var(--color-primary-purple)"
          width={"60%"}
          handleClick={saveInterestsUserList}
        />
      </S.InterestPageFooter>
    </S.Container>
  );
}

export default InterestsPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useCreateChatMutation } from "../../../../../../redux/slices/apiSlices/chatApiSlice";
import { CHAT } from "../../../../../../routes/CONSTANTS";
import * as S from "./CreatePrivateChat.styled";

function CreatePrivateChat({ userProfile }) {
  const [createChat, { isLoading }] = useCreateChatMutation();
  const navigate = useNavigate();

  const handleCreateChat = async () => {
    console.log(userProfile);

    try {
      const chat = await createChat({ receiverUsername: userProfile.username }).unwrap();
      navigate(CHAT);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <S.CreateChatButton onClick={handleCreateChat}>התחל שיחה</S.CreateChatButton>
    </>
  );
}

export default CreatePrivateChat;

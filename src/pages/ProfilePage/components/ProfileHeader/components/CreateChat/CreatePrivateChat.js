import React from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../../../components/Spinner/Spinner";
import { useCreateChatMutation } from "../../../../../../redux/slices/apiSlices/chatApiSlice";
import { CHAT } from "../../../../../../routes/CONSTANTS";
import * as S from "./CreatePrivateChat.styled";

function CreatePrivateChat({ userProfile }) {
  const [createChat, { isLoading }] = useCreateChatMutation();
  const navigate = useNavigate();

  const handleCreateChat = async () => {
    try {
      const chatData = await createChat({
        receiverUsername: userProfile.username,
      }).unwrap();
      if (chatData.status === "success") {
        navigate(CHAT, { state: { currentChat: chatData.result } });
      } else if (chatData.status === "chatExist") {
        navigate(CHAT, { state: { currentChat: chatData.result[0] } });
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <S.CreateChatButton onClick={handleCreateChat}>התחל שיחה</S.CreateChatButton>;
}

export default CreatePrivateChat;
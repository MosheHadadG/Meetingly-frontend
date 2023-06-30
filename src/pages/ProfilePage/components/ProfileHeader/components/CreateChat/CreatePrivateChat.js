import React from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../../../components/Spinner/Spinner";
import { useCreatePrivateChatMutation } from "../../../../../../redux/slices/apiSlices/chatApiSlice";
import { CHAT } from "../../../../../../routes/CONSTANTS";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import * as S from "./CreatePrivateChat.styled";

function CreatePrivateChat({ isDesktop, userProfile }) {
  const [createPrivateChat, { isLoading }] = useCreatePrivateChatMutation();
  const navigate = useNavigate();

  const handleCreateChat = async () => {
    try {
      const chatData = await createPrivateChat({
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

  return (
    <S.CreateChatButton isDesktop={isDesktop} onClick={handleCreateChat}>
      <S.CreateChatSpan>שלח הודעה</S.CreateChatSpan>
      <MessageOutlinedIcon sx={{ fontSize: "1.3rem" }} />
    </S.CreateChatButton>
  );
}

export default CreatePrivateChat;

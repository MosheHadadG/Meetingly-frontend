import React from "react";
import { useGetUserByUsernameQuery } from "../../../../../../redux/slices/apiSlices/authApiSlice";
import * as S from "../../../Conversation/Conversation.styled";
import { Container } from "./ChatHeader.styled";
import { Avatar } from "@mui/material";
import Spinner from "../../../../../../components/Spinner/Spinner";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import { selectIsDesktop } from "../../../../../../redux/slices/uiSlice";
import { selectOnlineUsers } from "../../../../../../redux/slices/authSlice";
import {
  selectCurrentChatUserData,
  selectCurrentUserData,
} from "../../../../../../redux/slices/chatSlice";

function ChatHeader({ chat, userLoggedIn, setChatBoxOpen }) {
  // const {
  //   data: userData,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetUserByUsernameQuery(
  //   chat.members.find((username) => username !== userLoggedIn.username)
  // );
  const isDesktop = useSelector(selectIsDesktop);
  const onlineUsers = useSelector(selectOnlineUsers);
  const userData = useSelector(selectCurrentChatUserData);

  const isOnline = (userData) => {
    return onlineUsers.find((onlineUser) => onlineUser.userId === userData._id);
  };

  // const renderChatHeader = () => {
  //   if (isLoading) {
  //     return <Spinner />;
  //   } else if (isSuccess) {
  //     return (
  //       <Container>
  //         <S.Conversation>
  //           {!isDesktop && (
  //             <div onClick={() => setChatBoxOpen(null)}>
  //               <ArrowForwardIosIcon />
  //             </div>
  //           )}
  //           <S.UserContainer>
  //             <S.AvatarContainer>
  //               {isOnline(userData) && <S.OnlineDot />}
  //               <Avatar
  //                 alt={userData.username}
  //                 src={userData.avatar}
  //                 sx={{ width: 56, height: 56 }}
  //               />
  //             </S.AvatarContainer>
  //             <S.NameContainer>
  //               <S.UserFullName>{`${userData.firstName} ${userData.lastName}`}</S.UserFullName>
  //             </S.NameContainer>
  //           </S.UserContainer>
  //         </S.Conversation>
  //       </Container>
  //     );
  //   } else if (isError) {
  //     console.log(error);
  //   }
  // };

  return (
    <Container>
      <S.Conversation>
        {!isDesktop && (
          <div onClick={() => setChatBoxOpen(null)}>
            <ArrowForwardIosIcon />
          </div>
        )}
        <S.UserContainer>
          <S.AvatarContainer>
            {isOnline(userData) && <S.OnlineDot />}
            <Avatar
              alt={userData.username}
              src={userData.avatar}
              sx={{ width: 56, height: 56 }}
            />
          </S.AvatarContainer>
          <S.NameContainer>
            <S.UserFullName>{`${userData.firstName} ${userData.lastName}`}</S.UserFullName>
          </S.NameContainer>
        </S.UserContainer>
      </S.Conversation>
    </Container>
  );
}

export default ChatHeader;

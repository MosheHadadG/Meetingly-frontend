import React from "react";
import { useSelector } from "react-redux";
import { selectIsDesktop } from "../../../../../../redux/slices/uiSlice";
import { selectOnlineUsers } from "../../../../../../redux/slices/authSlice";

import { useLocation, useNavigate } from "react-router-dom";
import { selectIsPrivateMode } from "../../../../../../redux/slices/chatSlice";
import ChatPrivateHeader from "./components/ChatPrivateHeader/ChatPrivateHeader";
import ChatGroupHeader from "./components/ChatGroupHeader/ChatGroupHeader";

function ChatHeader({ setChatBoxOpen, currentChatData, isPrivateMode }) {
  const isDesktop = useSelector(selectIsDesktop);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    setChatBoxOpen(null);
    navigate(location.pathname, { replace: true });
  };

  return isPrivateMode ? (
    <ChatPrivateHeader
      isDesktop={isDesktop}
      handleClick={handleClick}
      currentChatData={currentChatData}
    />
  ) : (
    <ChatGroupHeader
      isDesktop={isDesktop}
      handleClick={handleClick}
      currentChatData={currentChatData}
    />
  );
}

export default ChatHeader;

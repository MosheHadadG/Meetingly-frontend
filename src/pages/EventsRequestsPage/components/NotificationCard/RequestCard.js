import React, { useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Input/Button/Button";
import Spinner from "../../../../components/Spinner/Spinner";
import {
  setMakeEventsRequestsRefetch,
  setTotalEventsRequests,
  selectCurrentSocket,
} from "../../../../redux/slices/authSlice";
import { useEventRequestUserDecisionMutation } from "../../../../redux/slices/apiSlices/authApiSlice";
import * as S from "./RequestCard.styled";

function RequestCard({ request, requestRef, withoutBoxShadow, fromNotificationsPage }) {
  const { content, createdAt, sender, refType, _id: requestId } = request;
  const [eventRequestUserDecision, { isLoading }] = useEventRequestUserDecisionMutation();
  const [userDecision, setUserDecision] = useState("");
  const [msg, setMsg] = useState("");
  const [madeDecision, setMadeDecision] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSelector(selectCurrentSocket);

  const firstTime = useRef(true);
  const madeDecisionRef = useRef(false);

  useEffect(() => {
    // Make Refetch if user made a decision when component mount
    return () => {
      if (madeDecisionRef.current && firstTime.current) {
        dispatch(setMakeEventsRequestsRefetch(madeDecisionRef.current));
        firstTime.current = false;
      }
    };
  }, []);

  useEffect(() => {
    if (userDecision) {
      madeDecisionRef.current = true;
      const sendUserDecision = async () => {
        const userDecisionData = {
          userDecision: userDecision,
          eventId: refType._id,
          requestId: requestId,
          userRequestId: sender._id,
        };

        try {
          const eventRequestResponse = await eventRequestUserDecision(
            userDecisionData
          ).unwrap();
          const { totalEventsRequests, message, participantEventNotification } =
            eventRequestResponse;
          setMadeDecision(true);
          dispatch(
            setTotalEventsRequests(totalEventsRequests <= 0 ? null : totalEventsRequests)
          );
          setMsg(message);
          socket?.emit("sendNotification", {
            notification: participantEventNotification,
            type: "requestDecision",
          });
        } catch (err) {
          console.log(err);
        }
      };
      sendUserDecision();
    }
  }, [userDecision]);

  return (
    <>
      {isLoading && <Spinner />}
      <Box
        boxShadow={withoutBoxShadow ? null : 1}
        bgcolor="background.paper"
        m={0}
        p={1}
        style={{ width: "100%", height: "125px", padding: "0" }}
      >
        <S.Container ref={requestRef}>
          <S.RequestWrapper>
            <S.AvatarContentContainer>
              <S.AvatarWrapper>
                <Avatar
                  alt="name"
                  src={sender.avatar}
                  sx={{ width: 46, height: 46 }}
                  onClick={() => navigate(`/profile/${sender.username}`)}
                />
              </S.AvatarWrapper>
              <S.RequestContent>
                <S.RequestContentParagraph>{content}</S.RequestContentParagraph>
              </S.RequestContent>
            </S.AvatarContentContainer>
            <S.RequestTime>
              <S.RequestTimeParagrph>{format(createdAt, "he_HE")}</S.RequestTimeParagrph>
            </S.RequestTime>
          </S.RequestWrapper>
          {madeDecision ? (
            <S.RequestDecisionContent>
              <S.RequestDecisionParagraph>{msg}</S.RequestDecisionParagraph>
            </S.RequestDecisionContent>
          ) : (
            <S.Buttons>
              <Button
                handleClick={() => setUserDecision("APPROVED")}
                text="אשר"
                name="APPROVED"
                color="var(--color-primary-purple)"
              />
              <Button
                handleClick={() => setUserDecision("REJECTED")}
                text="דחה"
                name="REJECTED"
                color="var(--color-white)"
                fontColor="var(--color-primary-purple)"
              />
            </S.Buttons>
          )}
        </S.Container>
      </Box>
    </>
  );
}

export default RequestCard;

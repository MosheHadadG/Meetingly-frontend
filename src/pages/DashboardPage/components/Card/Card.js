import React from "react";
import * as S from "./Card.styled";
import PlaceIcon from "@mui/icons-material/Place";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  useAddEventToFavoritesMutation,
  useRemoveEventFromFavoritesMutation,
} from "../../../../redux/slices/apiSlices/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../redux/slices/authSlice";

function CardEvent({ eventId, imageSrc, title, place, date, time, alt, clickedEvent }) {
  const [addEventToFavorites, { isLoading: addIsLoading }] =
    useAddEventToFavoritesMutation();

  const [removeEventFromFavorites, { isLoading: removeIsLoading }] =
    useRemoveEventFromFavoritesMutation();
  const userLoggedIn = useSelector(selectCurrentUser);

  const addToFavorites = async (e) => {
    e.stopPropagation();
    try {
      const addEventToUserFavorites = await addEventToFavorites({ eventId }).unwrap();
      // console.log(addEventToUserFavorites);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromFavorites = async (e) => {
    e.stopPropagation();
    try {
      const removeEventFromUserFavorites = await removeEventFromFavorites({
        eventId,
      }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      onClick={clickedEvent}
      sx={{ width: 150, height: 230, borderRadius: 3, direction: "rtl" }}
    >
      <CardActionArea>
        {/* <S.CardMediaContainer> */}
        <CardMedia component="img" height="120" image={imageSrc} alt={title} />

        {userLoggedIn.favoriteEvents.includes(eventId) ? (
          <S.FavoriteIconContainer onClick={(e) => removeFromFavorites(e)}>
            <FavoriteIcon sx={{ fontSize: 30, color: "#e22d2d" }} />
          </S.FavoriteIconContainer>
        ) : (
          <S.FavoriteIconContainer onClick={(e) => addToFavorites(e)}>
            <FavoriteBorderIcon sx={{ fontSize: 30 }} />
          </S.FavoriteIconContainer>
        )}

        {/* </S.CardMediaContainer> */}

        <CardContent
          sx={{
            padding: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            gutterBottom
            variant="p"
            sx={{ textAlign: "center", fontWeight: 600 }}
            component={"p"}
          >
            {title}
          </Typography>
          <Typography
            textAlign={"center"}
            width="100%"
            variant="body2"
            color="text.secondary"
            gutterBottom
          >
            <PlaceIcon sx={{ fontSize: "0.8rem" }} /> {place}
          </Typography>
          <Typography
            width="100%"
            textAlign={"center"}
            variant="body2"
            color="text.secondary"
          >
            {date} {time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardEvent;

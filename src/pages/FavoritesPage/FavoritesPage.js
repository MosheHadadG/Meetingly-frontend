import React from "react";
import { useSelector } from "react-redux";
import { selectIsDesktop } from "../../redux/slices/uiSlice";
import FavoriteEvents from "./components/FavoriteEvents/FavoriteEvents";
import * as S from "./FavoritesPage.styled";

function FavoritesPage() {
  const isDesktop = useSelector(selectIsDesktop);

  return (
    <S.Container isDesktop={isDesktop}>
      <S.HeaderFavorites>
        <S.TitleFavorites>המועדפים שלך</S.TitleFavorites>
      </S.HeaderFavorites>
      <FavoriteEvents />
    </S.Container>
  );
}

export default FavoritesPage;

import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectSearchTerm, setSearchTerm } from "../../redux/slices/eventsSlice";
import { selectIsDesktop } from "../../redux/slices/uiSlice";
import SearchIcon from "@mui/icons-material/Search";

import * as S from "./Search.styled";

function Search() {
  const searchTerm = useSelector(selectSearchTerm);
  const isDesktop = useSelector(selectIsDesktop);

  const dispatch = useDispatch();

  return (
    <S.Wrap>
      <SearchIcon sx={{ fontSize: "1.6rem" }} />
      <S.Input
        id="search"
        name="search"
        type="text"
        placeholder="חפש אירוע..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        isDesktop={isDesktop}
      />
    </S.Wrap>
  );
}

export default Search;

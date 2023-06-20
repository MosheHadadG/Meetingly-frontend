import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import CropOutlinedIcon from "@mui/icons-material/CropOutlined";

import * as S from "./EditEventImg.styled";

function EditEventImg() {
  return (
    <S.Container>
      <S.EditImgParagraph>ערוך</S.EditImgParagraph>
      <S.EditImgIconWrapper>
        <CropOutlinedIcon sx={{ width: "20px" }} />
      </S.EditImgIconWrapper>
    </S.Container>
  );
}

export default EditEventImg;

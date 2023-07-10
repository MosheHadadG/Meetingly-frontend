// import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
// import ErrorParagraph from "../../../../../../components/Input/ErrorParagraph/ErrorParagraph";
// import Input from "../../../../../../components/Input/Input/Input";
import * as S from "./UploadEventCoverImg.styled";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ButtonUploadFile from "../../../../../components/Input/ButtonUploadFile/ButtonUploadFile";
import CropOutlinedIcon from "@mui/icons-material/CropOutlined";
import ErrorParagraph from "../../../../../components/Input/ErrorParagraph/ErrorParagraph";
import {
  useDeleteEventCoverImgMutation,
  useUploadEventCoverImgMutation,
} from "../../../../../redux/slices/apiSlices/eventsApiSlice";
import Button from "../../../../../components/Input/Button/Button";
import CheckIcon from "@mui/icons-material/Check";
import { Box, CircularProgress } from "@mui/material";
import ButtonUploadSave from "./components/ButtonUploadSave/ButtonUploadSave";
import { useSelector } from "react-redux";
import { selectIsDesktop } from "../../../../../redux/slices/uiSlice";
function UploadEventCoverImg({
  formState,
  handleChange,
  handleBlur,
  setFieldValue,
  errors,
  touched,
  submitButtonSave,
  handleSubmit,
}) {
  const [previewUrl, setPreviewUrl] = useState();

  const [uploadEventCoverImg, { isLoading, isSuccess, error, reset }] =
    useUploadEventCoverImgMutation();

  const [deleteEventCoverImg] = useDeleteEventCoverImgMutation();

  const isDesktop = useSelector(selectIsDesktop);

  useEffect(() => {
    if (formState.coverImgSrc) {
      setPreviewUrl(formState.coverImgSrc);
    }
  }, []);

  useEffect(() => {
    if (!formState.coverImgFile) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(formState.coverImgFile);
  }, [formState.coverImgFile]);

  const uploadEventCover = async () => {
    if (!formState.coverImgFile) return;

    if (formState.coverImgSrc) {
      let path = formState.coverImgSrc.split("/");
      let fileName = path[path.length - 1];
      try {
        await deleteEventCoverImg({ fileName });
      } catch (err) {
        console.log(err);
      }
    }

    const formData = new FormData();
    formData.append("eventCoverImg-upload", formState.coverImgFile);
    try {
      const coverImgData = await uploadEventCoverImg(formData).unwrap();
      if (!coverImgData) return;
      setFieldValue("coverImgSrc", coverImgData.location);
      if (submitButtonSave) return handleSubmit({ coverImgSrc: coverImgData.location });
    } catch (err) {
      console.log(err);
      //   if (err.status === 400) {
      //     setErrMsg(err.data.error);
      //   } else {
      //     setErrMsg("תקלה בשרתים שלנו");
      //   }
      // }
    }
  };

  const pickedHandler = ({ target }) => {
    if (target.files && target.files.length === 1) {
      const pickedFile = target.files[0];
      setFieldValue("coverImgFile", pickedFile);
      reset();
      return;
    }
  };

  return (
    <>
      <S.Container>
        <S.EventCoverImgPreview isDesktop={isDesktop}>
          {previewUrl ? (
            <S.EventImg isDesktop={isDesktop} src={previewUrl} />
          ) : (
            <S.EmptyCoverImg isDesktop={isDesktop} />
          )}

          <ButtonUploadFile
            icon={!previewUrl ? <AddAPhotoIcon /> : <CropOutlinedIcon />}
            text={!previewUrl ? "העלה תמונת נושא" : "ערוך"}
            width={!previewUrl ? "180px" : "80px"}
            acceptFiles=".jpg, .png, .jpeg"
            name="coverImgFile"
            handleChange={pickedHandler}
            isDark={!previewUrl && true}
            handleBlur={handleBlur}
            error={errors.coverImgFile}
          />

          {previewUrl && (
            <S.ButtonUploadSaveWrapper>
              {!errors.coverImgFile && (
                <ButtonUploadSave
                  loading={isLoading}
                  success={isSuccess}
                  handleClick={uploadEventCover}
                  error={errors.coverImgSrc && touched.coverImgSrc}
                />
              )}
            </S.ButtonUploadSaveWrapper>
          )}

          {/* {previewUrl && <S.ButtonUploadSave>שמור</S.ButtonUploadSave>} */}
        </S.EventCoverImgPreview>
      </S.Container>
      {errors.coverImgFile && (
        <ErrorParagraph textAlign="center" text={errors.coverImgFile} />
      )}
      {formState.coverImgFile && errors.coverImgSrc && touched.coverImgSrc && (
        <ErrorParagraph textAlign="center" text={errors.coverImgSrc} />
      )}
    </>
  );
}

export default UploadEventCoverImg;

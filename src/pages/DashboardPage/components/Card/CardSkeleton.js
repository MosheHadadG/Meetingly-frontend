import React from "react";
import * as S from "./CardSkeleton.styled";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function CardSkeleton() {
  return (
    <Card sx={{ width: 150, height: 230, borderRadius: 3, direction: "rtl" }}>
      <CardActionArea>
        <Skeleton width={"100%"} height={120} />
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
            textAlign={"center"}
            width="100%"
            variant="body2"
            color="text.secondary"
            gutterBottom
          >
            <Skeleton count={3} style={{ marginBottom: "0.6rem" }} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardSkeleton;

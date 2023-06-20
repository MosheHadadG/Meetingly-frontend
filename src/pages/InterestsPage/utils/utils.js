import NightlifeIcon from "@mui/icons-material/Nightlife";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import LuggageIcon from "@mui/icons-material/Luggage";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { color } from "@mui/system";

export const INTERESTS_LIST = [
  {
    name: "חיי לילה",
    type: "nightlife",
    icon: (
      <NightlifeIcon
        sx={{ fontSize: "2rem", color: "var(--color-primary-purple)" }}
      />
    ),
  },
  {
    name: "ספורט",
    type: "sport",
    icon: (
      <DirectionsRunIcon
        sx={{ fontSize: "2rem", color: "var(--color-primary-purple)" }}
      />
    ),
  },
  {
    name: "פנאי",
    type: "leisure",
    icon: (
      <CameraAltIcon
        sx={{ fontSize: "2rem", color: "var(--color-primary-purple)" }}
      />
    ),
  },
  {
    name: "שופינג",
    type: "shopping",
    icon: (
      <ShoppingBasketIcon
        sx={{ fontSize: "2rem", color: "var(--color-primary-purple)" }}
      />
    ),
  },
  {
    name: "מוזיקה",
    type: "music",
    icon: (
      <MusicNoteIcon
        sx={{ fontSize: "2rem", color: "var(--color-primary-purple)" }}
      />
    ),
  },
  {
    name: "אוכל",
    type: "food",
    icon: (
      <FastfoodIcon
        sx={{ fontSize: "2rem", color: "var(--color-primary-purple)" }}
      />
    ),
  },
  {
    name: "תרבות",
    type: "culture",
    icon: (
      <TheaterComedyIcon
        sx={{ fontSize: "2rem", color: "var(--color-primary-purple)" }}
      />
    ),
  },
  {
    name: "טיולים",
    type: "trips",
    icon: (
      <LuggageIcon
        sx={{ fontSize: "2rem", color: "var(--color-primary-purple)" }}
      />
    ),
  },
];

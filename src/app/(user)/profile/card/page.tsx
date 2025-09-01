"use client";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useTrackContext } from "@/lib/track.wrapper";
import PauseIcon from "@mui/icons-material/Pause";
import Link from "next/link";
import { convertSlugUrl } from "@/utils/api";
interface IProps {
  meta?: any;
  results: ITrackTop[];
}
const CardPage = ({ results, meta }: IProps) => {
  const theme = useTheme();

  //dua gia tri len context, khi setCurrentTrack thay doi thi
  const { currentTrack, setCurrentTrack } = useTrackContext();

  return (
    <>
      {(results ?? []).map((item) => (
        <Card sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Link
                href={`/track/${convertSlugUrl(item.title)}-${
                  item._id
                }.html?audio=${item.trackUrl}`}
              >
                <Typography component="div" variant="h5">
                  {item.title}
                </Typography>
              </Link>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: "text.secondary" }}
              >
                {item.description}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <IconButton aria-label="previous">
                {theme.direction === "rtl" ? (
                  <SkipNextIcon />
                ) : (
                  <SkipPreviousIcon />
                )}
              </IconButton>
              {item._id === currentTrack._id ? (
                <IconButton
                  aria-label="play/pause"
                  onClick={() =>
                    setCurrentTrack({
                      ...item,
                      isPlaying: !currentTrack.isPlaying,
                    })
                  }
                >
                  {currentTrack.isPlaying ? (
                    <PauseIcon sx={{ height: 38, width: 38 }} />
                  ) : (
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  )}
                </IconButton>
              ) : (
                <IconButton
                  aria-label="play"
                  onClick={() => setCurrentTrack({ ...item, isPlaying: true })}
                >
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
              )}
              <IconButton aria-label="next">
                {theme.direction === "rtl" ? (
                  <SkipPreviousIcon />
                ) : (
                  <SkipNextIcon />
                )}
              </IconButton>
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
            alt="Live from space album cover"
          />
        </Card>
      ))}
    </>
  );
};

export default CardPage;

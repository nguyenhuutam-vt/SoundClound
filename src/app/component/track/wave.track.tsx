"use client";
import { useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import "./wave.css";
import { Tooltip } from "@mui/material";
import { fetchDefaultImg, sendRequest } from "@/utils/api";
import { useTrackContext } from "@/lib/track.wrapper";
import CommentTrack from "./comment.track";

interface IProps {
  track: ITrackTop | null;
  comments: ICmtTrack[];
}

const WaveTrack = (props: IProps) => {
  const { track, comments } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { currentTrack, setCurrentTrack } = useTrackContext();

  const optionsMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
    // Define the waveform gradient

    let gradient;
    let progressGradient;

    if (typeof window !== "undefined") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      gradient = ctx?.createLinearGradient(0, 0, 0, canvas.height * 1.35);
      gradient?.addColorStop(0, "#656666"); // Top color
      gradient?.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
      gradient?.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff"
      ); // White line
      gradient?.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff"
      ); // White line
      gradient?.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#B1B1B1"
      ); // Bottom color
      gradient?.addColorStop(1, "#B1B1B1"); // Bottom color

      // Define the progress gradient
      progressGradient = ctx?.createLinearGradient(
        0,
        0,
        0,
        canvas.height * 1.35
      );
      progressGradient?.addColorStop(0, "#EE772F"); // Top color
      progressGradient?.addColorStop(
        (canvas.height * 0.7) / canvas.height,
        "#EB4926"
      ); // Top color
      progressGradient?.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff"
      ); // White line
      progressGradient?.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff"
      ); // White line
      progressGradient?.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#F6B094"
      ); // Bottom color
      progressGradient?.addColorStop(1, "#F6B094"); // Bottom color
    }
    return {
      waveColor: gradient,
      progressColor: "orange",
      url: `/api?audio=${fileName}`, //api tu route, api
      // url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${fileName}`,
      barWidth: 2,
    };
  }, [fileName]); // Thêm fileName vào dependency

  const wavesurfer = useWavesurfer(containerRef, optionsMemo);

  const onPlayPause = useCallback(() => {
    if (!wavesurfer) return;

    wavesurfer.playPause();
    // Cập nhật state sau khi playPause
    setIsPlaying((prev) => !prev); // Sử dụng functional update
  }, [wavesurfer]);

  // Thêm effect để sync state với wavesurfer
  useEffect(() => {
    if (!wavesurfer) return;
    // Lắng nghe sự kiện play/pause từ wavesurfer
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    wavesurfer.on("play", handlePlay);
    wavesurfer.on("pause", handlePause);

    return () => {
      wavesurfer.un("play", handlePlay);
      wavesurfer.un("pause", handlePause);
    };
  }, [wavesurfer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const arrComments = [
    {
      id: 1,
      avatar: "http://localhost:8000/images/chill1.png",
      moment: 10,
      user: "username 1",
      content: "just a comment1",
    },
    {
      id: 2,
      avatar: "http://localhost:8000/images/chill1.png",
      moment: 30,
      user: "username 2",
      content: "just a comment3",
    },
    {
      id: 3,
      avatar: "http://localhost:8000/images/chill1.png",
      moment: 50,
      user: "username 3",
      content: "just a comment3",
    },
  ];

  const calLeft = (moment: number) => {
    const hardCodeDuration = 199;
    const percent = (moment / hardCodeDuration) * 100;
    return `calc(${percent}% - 10px)`; // Giảm 10px để căn giữa ảnh đại diện
  };

  useEffect(() => {
    if (track?._id === currentTrack._id && wavesurfer) {
      currentTrack.isPlaying ? wavesurfer.play() : wavesurfer.pause();
    }
  }, [currentTrack]);

  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <div>{track?.title}</div>

      <div ref={containerRef} className="wave-form-container">
        <div className="time" id="time">
          {formatTime(wavesurfer?.getCurrentTime() || 0)}
        </div>
        <div className="duration" id="duration">
          {formatTime(wavesurfer?.getDuration() || 0)}
        </div>
        <div className="comments" style={{ display: "flex" }}>
          {comments.map((item) => (
            <Tooltip title={item.content} key={item._id}>
              <img
                src={fetchDefaultImg(item.user.type)}
                alt=""
                className=""
                style={{
                  height: "20px",
                  width: "20px",
                  position: "relative",
                  top: "90px",
                  zIndex: "10",
                  display: "flex",
                  left: calLeft(item.moment),
                }}
              />
            </Tooltip>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          onPlayPause();
          if (!track) return;
          setCurrentTrack({ ...track, isPlaying: !isPlaying });
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      <div>
        <CommentTrack comments={comments} track={track} wavesurfer={wavesurfer} />
      </div>
    </div>
  );
};

export default WaveTrack;

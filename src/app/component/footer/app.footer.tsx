"use client";
import { useTrackContext } from "@/lib/track.wrapper";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container, Toolbar } from "@mui/material";
import { useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const AppFooter = () => {
  const { currentTrack } = useTrackContext();
  const audioRef = useRef<any>(null);
  useEffect(() => {
    if (!currentTrack.isPlaying && audioRef.current) {
      audioRef?.current?.audio?.current.pause();
    } else {
      audioRef?.current?.audio?.current.play();
    }
    console.log("Current track:", audioRef);
  }, [currentTrack.isPlaying]);

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return <></>;
  }
  //lay gia tri tu context

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ top: "auto", bottom: 0, backgroundColor: "white" }}
    >
      <Toolbar>
        <Container sx={{ display: "flex", gap: 10 }}>
          <AudioPlayer
            key={currentTrack._id}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
            volume={0.5}
            autoPlay={currentTrack.isPlaying}
            ref={audioRef}
            // other props here
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              alignItems: "end",
            }}
          >
            <div style={{ color: "black" }}>Tam</div>
            <div style={{ color: "black" }}>Who am i</div>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default AppFooter;

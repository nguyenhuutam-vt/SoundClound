"use client";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container, Toolbar } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const AppFooter = () => {
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return <></>;
  }


  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ top: "auto", bottom: 0, backgroundColor: "white" }}
    >
      <Toolbar>
        <Container sx={{ display: "flex", gap: 10 }}>
          <AudioPlayer
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
            volume={0.5}
            onPlay={(e) => console.log("onPlay")}
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

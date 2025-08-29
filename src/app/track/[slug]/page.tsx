"use client";

import WaveTrack from "@/app/component/track/wave.track";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";

const DetailTrackPage = (props: any) => {
  // const searchParams = useSearchParams();
  // const audio = searchParams.get("audio");

  return (
    <Container>
      <div>
        <WaveTrack />
      </div>
    </Container>
  );
};

export default DetailTrackPage;

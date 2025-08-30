import { Container } from "@mui/material";
import MainSlider from "./component/main/main.slider";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AppHeader from "./component/header/app.header";
import AppFooter from "./component/footer/app.footer";
export default async function HomePage() {
  //get session de co the ai truy cap dc
  //cach de server-component co the lay duoc session
  //cach lay session tu phia sever
  const session = await getServerSession(authOptions);

  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "CHILL",
      limit: 10,
    },
  });

  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "WORKOUT",
      limit: 10,
    },
  });

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "PARTY",
      limit: 10,
    },
  });

  return (
    <>
      <AppHeader />
      <Container>
        <MainSlider title="Chill" data={chills?.data ? chills.data : []} />
        <MainSlider
          title="Workout"
          data={workouts?.data ? workouts.data : []}
        />
        <MainSlider title="Party" data={party?.data ? party.data : []} />
      </Container>
      <AppFooter />
    </>
  );
}

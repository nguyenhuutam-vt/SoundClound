import { sendRequest } from "@/utils/api";
import CardPage from "../card/page";
import { Container } from "@mui/material";

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
  //cach lay id tu slug truyen qa page la
  const userId = params.slug;
  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/users?current=1&pageSize=40`,
    method: "POST",
    body: {
      id: userId,
    },
    nextOption: {
      next: { tags: ["track-by-profile"] },
    },
  });
  //@ts-ignore
  const d = chills?.data?.result ?? [];
  console.log(d);

  return (
    <Container>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          padding: "20px",
        }}
      >
        <CardPage results={d || []} />
      </div>
    </Container>
  );
};

export default ProfilePage;

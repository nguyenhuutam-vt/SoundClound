import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import next from "next";

const TestA = async () => {
  const res = await sendRequest<any>({
    url: `http://localhost:3000/api/test`,
    method: "GET",
    nextOption: {
      //   next: { revalidate: 10 },
      next: { tags: ["hoi-dan-it"] },
    },
  });
  return (
    <Container sx={{ mt: 5 }}>
      <div>test random number</div>
      <div>{JSON.stringify(res)}</div>
    </Container>
  );
};

export default TestA;

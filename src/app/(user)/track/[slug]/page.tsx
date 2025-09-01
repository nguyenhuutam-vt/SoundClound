import WaveTrack from "@/app/component/track/wave.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import slugify from "slugify";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
//cach de SEO get tieu de len
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  // fetch data
  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${
      (
        await params
      ).slug
    }`,
    method: "GET",
  });

  return {
    title: res.data?.title,
    description: res.data?.description || "Detail track page",
    openGraph: {
      title: "Hỏi Dân IT",
      description: "Beyond Your Coding Skills",
      type: "website",
      images: [
        `https://raw.githubusercontent.com/hoidanit/images-hosting/master/eric.png`,
      ],
    },
  };
}

export async function generateStaticParams() {
  return [
    { slug: "tinh-co-yeu-em-68abc19c5d201c555f2ff213" },
    { slug: "nu-hon-bisou-68abc19c5d201c555f2ff20d" },
    { slug: "mien-man-68abc19c5d201c555f2ff20b" },
  ];
}

const DetailTrackPage = async (props: any) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const { params } = props;

  const words = params.slug.split(".html");
  params.slug = words[0].split("-").slice(-1)[0];

  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${params.slug}`,
    method: "GET",
  });

  const cmtTrack = await sendRequest<IBackendRes<ICmtTrack[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
    method: "POST",
    queryParams: {
      current: 1,
      pageSize: 10,
      trackId: params.slug,
      sort: "-createdAt",
    },
  });

  if (!res.data) {
    notFound();
  }
  //@ts-ignore
  const comments = cmtTrack?.data?.result ?? [];

  return (
    <Container>
      <div>
        <WaveTrack track={res?.data ?? null} comments={comments} />
      </div>
    </Container>
  );
};

export default DetailTrackPage;

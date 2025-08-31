import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //   return NextResponse.json({ data: "hoidanit" });
  //cho nay cổng 3000 đéo lấy đc nên cần qua tk next serve lấy từ công 8000 xuống dmmmmmm
  //server cua nextjs , la client neu k truy cap truc tiep toi server thi client truy cap len next server va lay api ve
  // moi lan truy cap chi can ``/api?audio=${audio}`` de lay duoc audio
  const url = new URL(request.url);
  const audio = url.searchParams.get("audio");

  if (!audio) {
    return NextResponse.json(
      { error: "Audio file not specified" },
      { status: 400 }
    );
  }

  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${audio}`);
}

// "use client";

// import { useState } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Blog lIKE",
  description: "mieu ta",
};

const LikePage = () => {
  // const [likedSongs, setLikedSongs] = useState("Tam");

  return (
    <div>
      <h1>Liked Songs </h1>
      {/* Display liked songs here */}
    </div>
  );
};

export default LikePage;

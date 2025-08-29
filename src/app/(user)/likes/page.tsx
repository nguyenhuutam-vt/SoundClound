"use client";

import { useState } from "react";

const LikePage = () => {
  const [likedSongs, setLikedSongs] = useState("Tam");

  return (
    <div>
      <h1>Liked Songs {likedSongs}</h1>
      {/* Display liked songs here */}
    </div>
  );
};

export default LikePage;

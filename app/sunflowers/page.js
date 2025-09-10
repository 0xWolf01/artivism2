'use client'

import React from 'react';
import ArtPiecePage from "../../components/art/ArtPiecePage";
import { artPieces } from "../../data/artPieces";

const Sunflowers = () => {
  const piece = artPieces.sunflowers;
  
  return <ArtPiecePage {...piece} />;
};

export default Sunflowers;
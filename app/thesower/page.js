'use client'

import React from 'react';
import ArtPiecePage from "../../components/art/ArtPiecePage";
import { artPieces } from "../../data/artPieces";

const Thesower = () => {
  const piece = artPieces.thesower;
  
  return <ArtPiecePage {...piece} />;
};

export default Thesower;
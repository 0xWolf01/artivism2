'use client'

import React from 'react';
import ArtPiecePage from "../../components/art/ArtPiecePage";
import { artPieces } from "../../data/artPieces";

const Campbells = () => {
  const piece = artPieces.campbells;
  
  return <ArtPiecePage {...piece} />;
};

export default Campbells;
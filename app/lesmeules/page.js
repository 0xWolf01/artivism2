'use client'

import React from 'react';
import ArtPiecePage from "../../components/art/ArtPiecePage";
import { artPieces } from "../../data/artPieces";

const Lesmeules = () => {
  const piece = artPieces.lesmeules;
  
  return <ArtPiecePage {...piece} />;
};

export default Lesmeules;
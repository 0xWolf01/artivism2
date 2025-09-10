'use client'

import React from 'react';
import ArtPiecePage from "../../components/art/ArtPiecePage";
import { artPieces } from "../../data/artPieces";

const LePrintemps = () => {
  const piece = artPieces.leprintemps;
  
  return <ArtPiecePage {...piece} />;
};

export default LePrintemps;
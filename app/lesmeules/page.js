'use client'

import React from 'react';
import ArtPiecePage from '../../src/components/art/ArtPiecePage';
import { artPieces } from '../../src/data/artPieces';

const Lesmeules = () => {
  const piece = artPieces.lesmeules;
  
  return <ArtPiecePage {...piece} />;
};

export default Lesmeules;
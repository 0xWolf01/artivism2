'use client'

import React from 'react';
import ArtPiecePage from '../../src/components/art/ArtPiecePage';
import { artPieces } from '../../src/data/artPieces';

const Sunflowers = () => {
  const piece = artPieces.sunflowers;
  
  return <ArtPiecePage {...piece} />;
};

export default Sunflowers;
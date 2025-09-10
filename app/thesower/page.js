'use client'

import React from 'react';
import ArtPiecePage from '../../src/components/art/ArtPiecePage';
import { artPieces } from '../../src/data/artPieces';

const Thesower = () => {
  const piece = artPieces.thesower;
  
  return <ArtPiecePage {...piece} />;
};

export default Thesower;
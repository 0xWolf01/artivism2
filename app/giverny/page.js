'use client'

import React from 'react';
import ArtPiecePage from '../../src/components/art/ArtPiecePage';
import { artPieces } from '../../src/data/artPieces';

const Giverny = () => {
  const piece = artPieces.giverny;
  
  return <ArtPiecePage {...piece} />;
};

export default Giverny;
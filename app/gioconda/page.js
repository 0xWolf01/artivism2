'use client'

import React from 'react';
import ArtPiecePage from '../../src/components/art/ArtPiecePage';
import { artPieces } from '../../src/data/artPieces';

const Gioconda = () => {
  const piece = artPieces.gioconda;
  
  return <ArtPiecePage {...piece} />;
};

export default Gioconda;
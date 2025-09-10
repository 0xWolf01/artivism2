'use client'

import React from 'react';
import ArtPiecePage from '../../src/components/art/ArtPiecePage';
import { artPieces } from '../../src/data/artPieces';

const Campbells = () => {
  const piece = artPieces.campbells;
  
  return <ArtPiecePage {...piece} />;
};

export default Campbells;
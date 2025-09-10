'use client'

import React from 'react';
import ArtPiecePage from '../../src/components/art/ArtPiecePage';
import { artPieces } from '../../src/data/artPieces';

const LePrintemps = () => {
  const piece = artPieces.leprintemps;
  
  return <ArtPiecePage {...piece} />;
};

export default LePrintemps;
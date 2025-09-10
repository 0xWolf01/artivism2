'use client'

import React from 'react';
import ArtPiecePage from '../../src/components/art/ArtPiecePage';
import { artPieces } from '../../src/data/artPieces';

const Deathandlife = () => {
  const piece = artPieces.deathandlife;
  
  return <ArtPiecePage {...piece} />;
};

export default Deathandlife;
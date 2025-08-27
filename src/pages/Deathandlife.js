import React from 'react';
import ArtPiecePage from '../components/art/ArtPiecePage';
import { artPieces } from '../data/artPieces';

const Deathandlife = () => {
  const piece = artPieces.deathandlife;
  
  return <ArtPiecePage {...piece} />;
};

export default Deathandlife;

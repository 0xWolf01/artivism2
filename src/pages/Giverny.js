import React from 'react';
import ArtPiecePage from '../components/art/ArtPiecePage';
import { artPieces } from '../data/artPieces';

const Giverny = () => {
  const piece = artPieces.giverny;
  
  return <ArtPiecePage {...piece} />;
};

export default Giverny;

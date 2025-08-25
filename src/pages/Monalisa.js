import React from 'react';
import { Link } from 'react-router-dom';

const Monalisa = () => {
  return (
    <div className="monalisa-page">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/gallery" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          ← Back to Gallery
        </Link>
        
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img 
              src="/assets/img/cuadro-ejemplo-2.png" 
              alt="Mona Lisa Reimagined"
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm">
              Iconic Reinterpretation
            </div>
          </div>
          
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-6">Mona Lisa Reimagined</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Artist</h3>
                <p className="text-gray-600">Digital Activist Collective</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Year</h3>
                <p className="text-gray-600">2024</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Medium</h3>
                <p className="text-gray-600">Digital Art & Protest</p>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">About This Piece</h2>
              <p className="text-gray-700 mb-4">
                This revolutionary piece takes one of the most iconic artworks in human history and 
                transforms it through the lens of modern protest and social commentary. 
                The Mona Lisa, a symbol of artistic perfection and cultural heritage, 
                becomes a canvas for contemporary social critique.
              </p>
              
              <p className="text-gray-700 mb-6">
                By reimagining this masterpiece, the artist challenges our assumptions about 
                what constitutes "high art" and questions the role of cultural institutions 
                in preserving and presenting works that may not reflect contemporary values.
              </p>
              
              <h3 className="text-xl font-bold mb-3">The Transformation</h3>
              <p className="text-gray-700 mb-6">
                The piece maintains the enigmatic smile and composition of the original while 
                introducing elements that reflect current social movements and protests. 
                This creates a powerful dialogue between the past and present, 
                between artistic tradition and social activism.
              </p>
              
              <h3 className="text-xl font-bold mb-3">Cultural Impact</h3>
              <p className="text-gray-700 mb-6">
                This work represents a bold statement about the evolution of art and culture. 
                It suggests that even the most revered masterpieces can and should be 
                reinterpreted through contemporary perspectives, especially when those 
                perspectives challenge the status quo.
              </p>
            </div>
            
            <div className="border-t pt-8 mt-8">
              <h3 className="text-xl font-bold mb-4">Exhibition & Collection</h3>
              <p className="text-gray-600 mb-6">
                This piece is available for both private collection and public exhibition. 
                It represents a unique opportunity to own a piece of art that bridges 
                classical tradition with contemporary social commentary.
              </p>
              <div className="flex gap-4">
                <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                  Request Exhibition
                </button>
                <Link 
                  to="/store" 
                  className="border border-black text-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition-colors duration-200"
                >
                  View Store
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Monalisa;

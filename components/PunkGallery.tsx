import React from 'react';
import { PunkData } from '../types';
import { Loader2, Sparkles, Box } from 'lucide-react';

interface PunkGalleryProps {
  punks: PunkData[];
}

const PunkGallery: React.FC<PunkGalleryProps> = ({ punks }) => {
  if (punks.length === 0) return null;

  return (
    <section id="gallery" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 pixel-font">RECENT MINTS</h2>
          <p className="text-slate-400">Live feed from the minting factory</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {punks.map((punk) => (
            <div key={punk.id} className="bg-slate-900 border border-slate-800 overflow-hidden group hover:border-pink-500 transition-colors">
              <div className="aspect-square w-full relative bg-slate-800">
                <img 
                  src={punk.image} 
                  alt={`Punk #${punk.id}`} 
                  className="w-full h-full object-cover pixelated"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 font-mono rounded">
                  #{punk.id}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-[10px] uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {punk.attributes.skin}
                  </span>
                  <span className="text-[10px] uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {punk.attributes.eyes}
                  </span>
                   {punk.attributes.accessory !== 'None' && (
                    <span className="text-[10px] uppercase bg-pink-900/30 text-pink-300 px-2 py-0.5 rounded border border-pink-900/50">
                      {punk.attributes.accessory}
                    </span>
                   )}
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <h4 className="text-xs font-bold text-violet-400 mb-1 flex items-center gap-1">
                    <Sparkles size={10} />
                    GEMINI BIO
                  </h4>
                  {punk.isLoadingBio ? (
                     <div className="flex items-center gap-2 text-slate-500 text-xs animate-pulse">
                       <Loader2 size={12} className="animate-spin" />
                       Generating lore...
                     </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic leading-relaxed">
                      "{punk.bio}"
                    </p>
                  )}
                </div>

                {punk.ipfsHash && (
                  <div className="border-t border-slate-800 mt-3 pt-2">
                    <a 
                      href={`https://ipfs.io/ipfs/${punk.ipfsHash.replace('ipfs://', '')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                    >
                      <Box size={10} />
                      View on IPFS
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PunkGallery;
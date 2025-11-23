import React from 'react';
import { generatePunk } from '../utils/punkGen';

const Hero: React.FC = () => {
  // Generate a few preview punks for the hero
  const previewPunks = React.useMemo(() => [
    generatePunk(1001),
    generatePunk(4042),
    generatePunk(8888),
    generatePunk(1337)
  ], []);

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 pixel-font">
            MINT THE <span className="text-pink-500">NEXT GEN</span> <br/>
            OF PIXEL PUNKS
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">
            10,000 uniquely generated cyberpunk avatars living on the blockchain. 
            Each punk is enhanced with an <span className="text-violet-400 font-semibold">AI-generated backstory</span> powered by Gemini.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a href="#mint" className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-none border-b-4 border-pink-900 active:border-b-0 active:translate-y-1 transition-all pixel-font text-2xl">
              MINT NOW
            </a>
            <a href="#gallery" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-none border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 transition-all pixel-font text-2xl">
              VIEW GALLERY
            </a>
          </div>
        </div>

        <div className="mt-20 flex justify-center gap-6 flex-wrap">
          {previewPunks.map((p, i) => (
            <div key={i} className="group relative w-32 h-32 md:w-48 md:h-48 bg-slate-800 p-2 border-2 border-slate-700 hover:border-pink-500 hover:scale-105 transition-transform duration-300">
              <img 
                src={p.image} 
                alt="Punk Preview" 
                className="w-full h-full pixelated object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                 <span className="text-xs font-mono text-green-400">#{1000 + i * 123}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

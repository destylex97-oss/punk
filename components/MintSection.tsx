import React, { useState } from 'react';
import { MintStatus } from '../types';
import { Minus, Plus, Cpu, Zap } from 'lucide-react';

interface MintSectionProps {
  onMint: (amount: number) => void;
  status: MintStatus;
  mintedCount: number;
  walletConnected: boolean;
}

const MintSection: React.FC<MintSectionProps> = ({ onMint, status, mintedCount, walletConnected }) => {
  const [amount, setAmount] = useState(1);
  const PRICE_PER_MINT = 0.05;

  const handleMint = () => {
    if (status === MintStatus.MINTING || !walletConnected) return;
    onMint(amount);
  };

  return (
    <section id="mint" className="py-20 bg-slate-900 border-y border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Cpu size={120} className="text-pink-500" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-2 pixel-font">PUBLIC SALE IS LIVE</h2>
            <div className="flex items-center gap-2 mb-8">
              <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-violet-500" 
                  style={{ width: `${(mintedCount / 10000) * 100}%` }}
                ></div>
              </div>
              <span className="text-mono text-slate-400 text-sm">{mintedCount} / 10,000</span>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-slate-900 p-6 border border-slate-800 mb-6">
                  <div className="flex justify-between text-slate-400 mb-2 font-mono text-sm">
                    <span>Price per Punk</span>
                    <span>{PRICE_PER_MINT} ETH</span>
                  </div>
                  <div className="flex justify-between text-white text-xl font-bold font-mono">
                    <span>Total</span>
                    <span>{(amount * PRICE_PER_MINT).toFixed(2)} ETH</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-800 p-2 mb-6 w-full max-w-[200px]">
                  <button 
                    onClick={() => setAmount(Math.max(1, amount - 1))}
                    className="p-2 hover:bg-slate-700 text-white transition-colors disabled:opacity-50"
                    disabled={status === MintStatus.MINTING}
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-2xl font-bold text-white font-mono">{amount}</span>
                  <button 
                    onClick={() => setAmount(Math.min(5, amount + 1))}
                    className="p-2 hover:bg-slate-700 text-white transition-colors disabled:opacity-50"
                    disabled={status === MintStatus.MINTING}
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <p className="text-xs text-slate-500 mb-6 font-mono">Max 5 per transaction.</p>

                <button
                  onClick={handleMint}
                  disabled={status === MintStatus.MINTING || !walletConnected}
                  className={`w-full py-4 text-xl font-bold pixel-font tracking-widest border-b-4 active:border-b-0 active:translate-y-1 transition-all
                    ${!walletConnected 
                      ? 'bg-slate-700 border-slate-800 text-slate-400 cursor-not-allowed' 
                      : status === MintStatus.MINTING
                        ? 'bg-yellow-600 border-yellow-800 text-white cursor-wait'
                        : 'bg-pink-600 border-pink-900 hover:bg-pink-500 text-white'
                    }
                  `}
                >
                  {!walletConnected 
                    ? 'CONNECT WALLET TO MINT' 
                    : status === MintStatus.MINTING 
                      ? 'MINTING IN PROGRESS...' 
                      : 'MINT NOW'
                  }
                </button>
              </div>

              <div className="hidden md:block">
                 <div className="aspect-square bg-slate-900 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-600 p-8 text-center">
                    <Zap size={48} className="mb-4 text-slate-700" />
                    <p className="font-mono text-sm">Mystery Punks Revealed Instantly</p>
                    <p className="font-mono text-xs mt-2 text-slate-500">Includes AI generated lore</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MintSection;

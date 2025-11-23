import React from 'react';
import { Wallet, Menu } from 'lucide-react';

interface NavbarProps {
  walletAddress: string | null;
  onConnect: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ walletAddress, onConnect }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 pixel-font tracking-wider">
              CYBERPUNK.10K
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#hero" className="hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
              <a href="#mint" className="hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Mint</a>
              <a href="#gallery" className="hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Gallery</a>
              <a href="#roadmap" className="hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Roadmap</a>
            </div>
          </div>
          <div>
            <button
              onClick={onConnect}
              className={`flex items-center gap-2 px-4 py-2 rounded-none border-2 border-slate-700 hover:border-pink-500 hover:text-pink-500 transition-all font-mono text-sm ${walletAddress ? 'bg-slate-800 text-green-400 border-green-500/50' : 'bg-transparent text-white'}`}
            >
              <Wallet size={16} />
              {walletAddress 
                ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
                : 'CONNECT WALLET'
              }
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

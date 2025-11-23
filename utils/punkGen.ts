import { PunkAttributes } from "../types";

// Simple pseudo-random number generator based on seed
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const COLORS = {
  skin: {
    Alien: '#c8fbfb',
    Zombie: '#75b86d',
    HumanL: '#fac39a',
    HumanD: '#75482f',
    Ape: '#5c4535',
  },
  eyes: {
    Normal: '#000000',
    Red: '#ff0000',
    VR: '#ff00ff',
    Small: '#333333'
  },
  hair: {
    None: 'transparent',
    Mohawk: '#ff0055',
    Cap: '#5555ff',
    Afro: '#221100',
    Wild: '#00ffaa'
  },
  acc: {
    None: 'transparent',
    Pipe: '#ddaa00',
    Shades: '#111111',
    Earring: '#ffff00'
  }
};

const drawPixel = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
  if (color === 'transparent') return;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
};

export const generatePunk = (id: number): { image: string; attributes: PunkAttributes } => {
  const canvas = document.createElement('canvas');
  canvas.width = 24;
  canvas.height = 24;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error("Canvas not supported");

  // Deterministic random based on ID
  let seed = id * 12345;
  const rand = () => {
    const r = seededRandom(seed);
    seed += 1;
    return r;
  };

  const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
  const chance = (prob: number) => rand() < prob;

  // 1. Determine Attributes
  const skinType = chance(0.05) ? 'Alien' : chance(0.1) ? 'Zombie' : chance(0.15) ? 'Ape' : chance(0.5) ? 'HumanL' : 'HumanD';
  const eyeType = chance(0.1) ? 'VR' : chance(0.2) ? 'Red' : chance(0.3) ? 'Small' : 'Normal';
  const hairType = pick(['None', 'Mohawk', 'Cap', 'Afro', 'Wild']);
  const mouthType = chance(0.5) ? 'Smile' : 'Frown';
  const accType = chance(0.4) ? pick(['Pipe', 'Shades', 'Earring']) : 'None';
  
  // Override logic for visual consistency
  const finalAcc = eyeType === 'VR' && accType === 'Shades' ? 'None' : accType;

  const attributes: PunkAttributes = {
    skin: skinType,
    eyes: eyeType,
    mouth: mouthType,
    accessory: finalAcc,
    hair: hairType
  };

  // 2. Draw
  // Background
  ctx.fillStyle = '#638596'; 
  ctx.fillRect(0, 0, 24, 24);

  // Face Shape
  const skinColor = COLORS.skin[skinType as keyof typeof COLORS.skin];
  for(let x=8; x<=16; x++) {
      for(let y=6; y<=20; y++) {
          drawPixel(ctx, x, y, skinColor);
      }
  }
  // Jaw/Chin refinement
  drawPixel(ctx, 7, 10, skinColor); drawPixel(ctx, 7, 11, skinColor);
  drawPixel(ctx, 17, 10, skinColor); drawPixel(ctx, 17, 11, skinColor);
  
  // Eyes
  const eyeColor = COLORS.eyes[eyeType as keyof typeof COLORS.eyes];
  if (eyeType === 'VR') {
     ctx.fillStyle = eyeColor;
     ctx.fillRect(7, 11, 11, 2);
  } else {
     drawPixel(ctx, 10, 11, eyeColor);
     drawPixel(ctx, 14, 11, eyeColor);
  }

  // Mouth
  ctx.fillStyle = '#331111'; // Mouth color
  if (mouthType === 'Smile') {
      drawPixel(ctx, 10, 17, '#331111');
      drawPixel(ctx, 11, 17, '#331111');
      drawPixel(ctx, 12, 17, '#331111');
      drawPixel(ctx, 13, 17, '#331111');
      drawPixel(ctx, 14, 17, '#331111');
      drawPixel(ctx, 9, 16, '#331111');
      drawPixel(ctx, 15, 16, '#331111');
  } else {
      ctx.fillRect(10, 17, 5, 1);
  }

  // Hair
  const hairColor = COLORS.hair[hairType as keyof typeof COLORS.hair];
  if (hairType === 'Mohawk') {
      for(let y=2; y<10; y++) drawPixel(ctx, 12, y, hairColor);
  } else if (hairType === 'Cap') {
      ctx.fillStyle = hairColor;
      ctx.fillRect(7, 5, 11, 2);
      ctx.fillRect(7, 5, 1, 4);
      ctx.fillRect(17, 5, 1, 4);
      ctx.fillRect(8, 4, 9, 1);
  } else if (hairType === 'Afro') {
      ctx.fillStyle = hairColor;
      ctx.fillRect(6, 4, 13, 5);
      ctx.fillRect(5, 5, 1, 3);
      ctx.fillRect(18, 5, 1, 3);
  } else if (hairType === 'Wild') {
       for(let i=0; i<20; i++) {
           drawPixel(ctx, 6 + Math.floor(rand()*13), 2 + Math.floor(rand()*6), hairColor);
       }
  }

  // Accessories
  if (finalAcc === 'Pipe') {
      drawPixel(ctx, 12, 18, COLORS.acc.Pipe);
      drawPixel(ctx, 13, 18, COLORS.acc.Pipe);
      drawPixel(ctx, 14, 18, COLORS.acc.Pipe);
      drawPixel(ctx, 15, 18, COLORS.acc.Pipe);
      drawPixel(ctx, 15, 17, COLORS.acc.Pipe);
      ctx.fillStyle = '#ffffff'; // smoke
      drawPixel(ctx, 16, 15, '#ffffff');
      drawPixel(ctx, 17, 14, '#dddddd');
  } else if (finalAcc === 'Shades') {
       ctx.fillStyle = COLORS.acc.Shades;
       ctx.fillRect(8, 11, 9, 2);
       drawPixel(ctx, 7, 11, COLORS.acc.Shades);
       drawPixel(ctx, 17, 11, COLORS.acc.Shades);
  } else if (finalAcc === 'Earring') {
      drawPixel(ctx, 7, 15, COLORS.acc.Earring);
  }

  return {
    image: canvas.toDataURL('image/png'),
    attributes
  };
};

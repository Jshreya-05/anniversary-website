import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, writeFileSync, mkdirSync, existsSync, renameSync } from 'fs'

try {
  // Trip images
  const tripSrcDir = 'C:\\Users\\Shreya\\.gemini\\antigravity-ide\\brain\\429c5fc7-ae30-429c-ae72-323a82cb77a5';
  const tripDestDir = 'e:\\shreya\\AAI & BABA\\anniversary-website\\public\\assets\\images\\trips';
  mkdirSync(tripDestDir, { recursive: true });
  
  const tripFiles = [
    'media__1781988390179.jpg',
    'media__1781988390192.jpg',
    'media__1781988390256.jpg',
    'media__1781988390264.jpg'
  ];
  
  tripFiles.forEach((file, index) => {
    copyFileSync(`${tripSrcDir}\\${file}`, `${tripDestDir}\\trips_memory_${index + 1}.jpg`);
  });
  
  // New Then vs Now and Hero images
  const newSrcDir = 'C:\\Users\\Shreya\\.gemini\\antigravity-ide\\brain\\e7aa3997-e944-4e7a-9524-5ca448b636bd';
  const thenVsNowDestDir = 'e:\\shreya\\AAI & BABA\\anniversary-website\\public\\assets\\images\\thenVsNow';
  const heroDestDir = 'e:\\shreya\\AAI & BABA\\anniversary-website\\public\\assets\\images\\hero';
  
  mkdirSync(thenVsNowDestDir, { recursive: true });
  mkdirSync(heroDestDir, { recursive: true });
  
  copyFileSync(`${newSrcDir}\\media__1781989315687.png`, `${thenVsNowDestDir}\\then.png`);
  copyFileSync(`${newSrcDir}\\media__1781989342928.png`, `${thenVsNowDestDir}\\now.png`);
  copyFileSync(`${newSrcDir}\\media__1781989342928.png`, `${heroDestDir}\\hero_main.png`);
  
  // Rename audio file
  const audioDir = 'e:\\shreya\\AAI & BABA\\anniversary-website\\public\\assets\\audio';
  if (existsSync(`${audioDir}\\thousand years.mp3`)) {
    renameSync(`${audioDir}\\thousand years.mp3`, `${audioDir}\\a-thousand-years.mp3`);
  }
  
  writeFileSync('copy_status.txt', 'SUCCESS_ALL');
} catch (e) {
  writeFileSync('copy_status.txt', 'ERROR: ' + e.message + '\n' + e.stack);
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
})

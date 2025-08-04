import { removeBackground, loadImage } from './backgroundRemoval';
import heroImageUrl from '@/assets/hero-professional-sidebyside.webp';

export const processHeroImageBackground = async (): Promise<string> => {
  try {
    // Fetch the original image
    const response = await fetch(heroImageUrl);
    const blob = await response.blob();
    
    // Load as HTML image element
    const imageElement = await loadImage(blob);
    
    // Remove background
    const processedBlob = await removeBackground(imageElement);
    
    // Create object URL for the processed image
    return URL.createObjectURL(processedBlob);
  } catch (error) {
    console.error('Failed to process hero image:', error);
    // Fallback to original image
    return heroImageUrl;
  }
};
// Base64 encoded logo for PDF generation
// This will be populated with the actual logo data
export const LOGO_BASE64 = '';

// Function to load and convert logo to base64
export const getLogoBase64 = async (): Promise<string> => {
  if (LOGO_BASE64) {
    return LOGO_BASE64;
  }
  
  try {
    const response = await fetch('/lovable-uploads/21b98309-c8cb-4502-abb6-3a70b51fd83a.png');
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Failed to load logo:', error);
    return '';
  }
};

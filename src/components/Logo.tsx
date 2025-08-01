import logoImage from "@/assets/valiblox-logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Logo = ({ size = "md", className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto"
  };

  return (
    <img 
      src={logoImage} 
      alt="Valiblox - Design File QA Validation" 
      className={`${sizeClasses[size]} ${className}`}
    />
  );
};
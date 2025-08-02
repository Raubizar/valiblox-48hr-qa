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
      src="/lovable-uploads/21b98309-c8cb-4502-abb6-3a70b51fd83a.png" 
      alt="Valiblox - QA Validation Services" 
      className={`${sizeClasses[size]} ${className}`}
    />
  );
};
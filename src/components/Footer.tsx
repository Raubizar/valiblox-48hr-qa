import { Button } from "@/components/ui/button";
import { Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>team@valiblox.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>Dublin, Ireland</span>
            </div>
          </div>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            Get a Quote
          </Button>
        </div>
      </div>
    </footer>
  );
};
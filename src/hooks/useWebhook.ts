import { useState } from "react";
import { submitToWebhook } from "@/lib/webhook";

interface UseWebhookProps {
  source: string;
  title: string;
  description?: string;
  submitButtonText?: string;
  generatePDF?: boolean;
  analysisData?: any;
}

interface WebhookFormData {
  name: string;
  email: string;
  message?: string;
}

export const useWebhook = ({ 
  source, 
  title, 
  description, 
  submitButtonText,
  generatePDF = false,
  analysisData
}: UseWebhookProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);

  const openModal = async () => {
    if (generatePDF && analysisData && !pdfBase64) {
      setIsGeneratingPDF(true);
      try {
        const { generateVCheckReport } = await import("@/lib/pdf-generator");
        const pdf = await generateVCheckReport(analysisData);
        setPdfBase64(pdf);
      } catch (error) {
        console.error("PDF generation error:", error);
      } finally {
        setIsGeneratingPDF(false);
      }
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (formData: WebhookFormData) => {
    try {
      // If PDF exists, trigger download first
      if (pdfBase64) {
        const blob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { 
          type: 'application/pdf' 
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `vcheck-report-${Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

      // Send lead data to webhook (without PDF to keep payload small)
      const result = await submitToWebhook({
        ...formData,
        source,
        // Don't send PDF data - just the analysis summary for lead scoring
        analysisData: analysisData ? {
          completionPercentage: analysisData.summary.deliveryPercentage,
          totalFiles: analysisData.summary.total,
          deliveredFiles: analysisData.summary.done,
          missingFiles: analysisData.summary.todo
        } : undefined
      });
      
      return result;
    } catch (error) {
      console.error("Webhook submission error:", error);
      return {
        success: false,
        error: "Failed to submit. Please try again."
      };
    }
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleSubmit,
    isGeneratingPDF,
    modalProps: {
      title,
      description,
      submitButtonText
    }
  };
};
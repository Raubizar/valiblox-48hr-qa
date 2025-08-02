import { useState } from "react";
import { submitToWebhook } from "@/lib/webhook";

interface UseWebhookProps {
  source: string;
  title: string;
  description?: string;
  submitButtonText?: string;
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
  submitButtonText 
}: UseWebhookProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (formData: WebhookFormData) => {
    try {
      const result = await submitToWebhook({
        ...formData,
        source
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
    modalProps: {
      title,
      description,
      submitButtonText
    }
  };
};
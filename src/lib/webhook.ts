interface WebhookFormData {
  name: string;
  email: string;
  message?: string;
  source: string;
}

interface WebhookResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const submitToWebhook = async (formData: WebhookFormData): Promise<WebhookResponse> => {
  try {
    // Domain validation (security feature)
    const allowedDomains = [
      'localhost',
      '127.0.0.1',
      'valiblox.com',
      'netlify.app',
      'vercel.app'
    ];
    
    const currentDomain = window.location.hostname;
    const isDomainAllowed = allowedDomains.some(domain => 
      currentDomain === domain || currentDomain.endsWith('.' + domain)
    );
    
    if (!isDomainAllowed) {
      throw new Error("Domain not allowed");
    }

    // Construct webhook URL from encoded parts (for security)
    const encodedParts = [
      "aHR0cHM6Ly9ob29rLmV1Mi5tYWtlLmNvbS8=", // Base64 encoded: https://hook.eu2.make.com/
      "dzZzdG52dGt4ZTBtOGxmZHZhZjR4YWNlZHR0cnU3NmQ=" // Base64 encoded: w6stnvtkxe0m8lfdvaf4xacedttru76d
    ];
    
    const webhookUrl = encodedParts.map(part => atob(part)).join('');

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message?.trim() || "",
      source: formData.source,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct"
    };

    console.log("📤 Sending payload:", payload);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("📥 Response received:");
    console.log("   Status:", response.status);
    console.log("   OK:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.text();
    console.log("✅ Success response:", responseData);
    
    return { success: true, data: responseData };

  } catch (error) {
    console.error("Error submitting to webhook:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
};
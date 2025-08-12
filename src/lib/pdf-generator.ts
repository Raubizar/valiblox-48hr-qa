import jsPDF from 'jspdf';
import { imageToBase64 } from './image-utils';

interface ValidationResult {
  excelName: string;
  matchedFile: string;
  status: 'Done' | 'To Do' | 'File not in Drawing List';
  matchType: 'exact' | 'none' | 'extra';
}

interface AnalysisResult {
  results: ValidationResult[];
  summary: {
    total: number;
    done: number;
    todo: number;
    extra: number;
    deliveryPercentage: number;
  };
}

export const generateVCheckReport = async (analysisResult: AnalysisResult): Promise<string> => {
  try {
    console.log('Starting PDF generation with:', analysisResult);
    console.log('Summary data:', analysisResult?.summary);
    console.log('Results data:', analysisResult?.results);
    
    const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait
    const pageWidth = pdf.internal.pageSize.getWidth(); // ~210mm in portrait
    const pageHeight = pdf.internal.pageSize.getHeight(); // ~297mm in portrait

    // Colors matching website
    const primaryColor = '#10b981'; // emerald-500
    const darkColor = '#1e293b'; // slate-800  
    const grayColor = '#64748b'; // slate-500
    const redColor = '#ef4444'; // red-500
    const greenColor = '#10b981'; // emerald-500
    const amberColor = '#f59e0b'; // amber-500

    // Load logo
    let logoBase64: string | null = null;
    try {
      logoBase64 = await imageToBase64('/lovable-uploads/21b98309-c8cb-4502-abb6-3a70b51fd83a.png');
      console.log('Logo loaded successfully');
    } catch (error) {
      console.warn('Could not load logo:', error);
    }

  // Header with logo and title
  let yPosition = 25;

  if (logoBase64) {
    // Use actual logo
    try {
      pdf.addImage(logoBase64, 'PNG', 25, yPosition - 5, 12, 12);
    } catch (error) {
      console.warn('Could not add logo to PDF, using fallback');
      // Fallback to placeholder
      pdf.setFillColor(16, 185, 129);
      pdf.rect(25, yPosition - 5, 30, 10, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.text('VALIBLOX', 27, yPosition + 1);
    }
  } else {
    // Fallback placeholder
    pdf.setFillColor(16, 185, 129);
    pdf.rect(25, yPosition - 5, 30, 10, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text('VALIBLOX', 27, yPosition + 1);
  }

  // Company name and tagline
  pdf.setTextColor(darkColor);
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold");
  pdf.text('Valiblox', logoBase64 ? 45 : 60, yPosition + 2);

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(grayColor);
  pdf.text('Independent QA validation for data center projects', logoBase64 ? 45 : 60, yPosition + 8);

  // Report title
  yPosition += 25;
  pdf.setFontSize(18);
  pdf.setTextColor(darkColor);
  pdf.setFont("helvetica", "bold");
  pdf.text('Deliverables V-Check Report', 25, yPosition);

  // Project info
  yPosition += 20;
  pdf.setFontSize(10);
  pdf.setTextColor(grayColor);
  pdf.text(`Project: V-Check Analysis`, 25, yPosition);
  pdf.text(`Analysis Date: ${new Date().toLocaleDateString()}`, 25, yPosition + 8);
  pdf.text(`Generated: ${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`, 25, yPosition + 16);

  // Donut chart and summary section
  yPosition += 35;
  
  // Draw donut chart like website
  const chartCenterX = 150;
  const chartCenterY = yPosition + 25;
  const outerRadius = 20;
  const innerRadius = 12;
  const percentage = Math.max(0, Math.min(100, analysisResult.summary.deliveryPercentage || 0));

  // Determine color based on percentage like website
  let chartColor = redColor;
  if (percentage >= 90) chartColor = greenColor;
  else if (percentage >= 60) chartColor = amberColor;

  // Background donut (light gray)
  pdf.setFillColor(229, 231, 235); // gray-200
  pdf.circle(chartCenterX, chartCenterY, outerRadius, 'F');
  pdf.setFillColor(255, 255, 255); // white center
  pdf.circle(chartCenterX, chartCenterY, innerRadius, 'F');

  // Progress donut using multiple small circles to create arc effect
  if (percentage > 0) {
    // Set the progress color
    if (chartColor === greenColor) {
      pdf.setFillColor(16, 185, 129); // emerald-500
    } else if (chartColor === amberColor) {
      pdf.setFillColor(245, 158, 11); // amber-500  
    } else {
      pdf.setFillColor(239, 68, 68); // red-500
    }
    
    // Calculate how many degrees to fill
    const progressAngle = (percentage / 100) * 360;
    const donutRadius = (outerRadius + innerRadius) / 2;
    const donutThickness = outerRadius - innerRadius;
    
    // Draw small filled circles along the arc path
    const step = 3; // degrees between each circle
    for (let angle = 0; angle < progressAngle; angle += step) {
      const radians = (angle - 90) * Math.PI / 180; // Start from top
      const x = chartCenterX + Math.cos(radians) * donutRadius;
      const y = chartCenterY + Math.sin(radians) * donutRadius;
      
      // Draw small filled circle
      pdf.circle(x, y, donutThickness / 2, 'F');
    }
  }

  // Percentage text in center
  pdf.setTextColor(darkColor); // Use dark color for text, not chart color
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  const percentText = `${percentage.toFixed(0)}%`;
  const textWidth = pdf.getTextWidth(percentText);
  pdf.text(percentText, chartCenterX - (textWidth / 2), chartCenterY + 3);

  // Chart label
  pdf.setFontSize(9);
  pdf.setTextColor(grayColor);
  const labelText = 'Completion Rate';
  const labelWidth = pdf.getTextWidth(labelText);
  pdf.text(labelText, chartCenterX - (labelWidth / 2), chartCenterY + 35);

  // Executive Summary Box
  const summaryBoxX = 25;
  const summaryBoxY = yPosition;
  const summaryBoxWidth = 100;
  const summaryBoxHeight = 50;

  pdf.setFillColor(240, 253, 244); // light green background
  pdf.setDrawColor(34, 197, 94); // green border
  pdf.setLineWidth(0.5);
  pdf.rect(summaryBoxX, summaryBoxY, summaryBoxWidth, summaryBoxHeight, 'FD');

  pdf.setFontSize(14);
  pdf.setTextColor(darkColor);
  pdf.setFont("helvetica", "bold");
  pdf.text('Executive Summary', summaryBoxX + 5, summaryBoxY + 12);

  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(darkColor);

  let textY = summaryBoxY + 22;
  pdf.text(`• Delivery Completion: ${percentage.toFixed(1)}%`, summaryBoxX + 5, textY);
  textY += 7;
  pdf.text(`• Files Delivered: ${analysisResult.summary.done || 0} of ${analysisResult.summary.total || 0} expected`, summaryBoxX + 5, textY);
  textY += 7;
  pdf.text(`• Missing Files: ${analysisResult.summary.todo || 0}`, summaryBoxX + 5, textY);
  
  if ((analysisResult.summary.extra || 0) > 0) {
    textY += 7;
    pdf.text(`• Extra Files: ${analysisResult.summary.extra} (not in register)`, summaryBoxX + 5, textY);
  }

  // Detailed Results Table
  yPosition += 70;
  pdf.setFontSize(14);
  pdf.setTextColor(darkColor);
  pdf.setFont("helvetica", "bold");
  pdf.text('Detailed Analysis Results', 25, yPosition);

  yPosition += 15;

  // Table headers with optimized column widths for portrait
  const tableX = 25;
  const tableWidth = pageWidth - 50;
  const col1Width = tableWidth * 0.5; // 50% for Expected Drawing Name
  const col2Width = tableWidth * 0.35; // 35% for Delivered File  
  const col3Width = tableWidth * 0.15; // 15% for Status
  
  pdf.setFillColor(248, 250, 252); // slate-50
  pdf.rect(tableX, yPosition, tableWidth, 12, 'F');
  
  pdf.setFontSize(9);
  pdf.setTextColor(darkColor);
  pdf.setFont("helvetica", "bold");
  pdf.text('Expected Drawing Name', tableX + 5, yPosition + 7);
  pdf.text('Delivered File', tableX + col1Width + 5, yPosition + 7);
  pdf.text('Status', tableX + col1Width + col2Width + 5, yPosition + 7);

  yPosition += 14;

  // Table rows
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8); // Reduced font size for better fit
  
  // Ensure results array exists and has items
  const results = analysisResult.results || [];
  console.log('PDF Generator - Results data:', results.slice(0, 3)); // Show first 3 for debugging
  
  results.forEach((result, index) => {
    if (!result) return; // Skip if result is null/undefined
    
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 25;
    }

    // Alternating row colors
    if (index % 2 === 0) {
      pdf.setFillColor(249, 250, 251);
      pdf.rect(25, yPosition - 2, pageWidth - 50, 12, 'F'); // Increased height from 10 to 12
    }

    // Status color
    let statusColor = darkColor;
    let displayStatus: string = result.status;
    
    if (result.status === 'Done') {
      statusColor = greenColor;
    } else if (result.status === 'To Do') {
      statusColor = redColor;
      displayStatus = 'Missing';
    } else {
      statusColor = amberColor;
    }

    pdf.setTextColor(darkColor);
    
    // Improved function to wrap text across multiple lines with better width calculation
    const wrapText = (text: string, maxWidth: number, fontSize: number = 8) => {
      pdf.setFontSize(fontSize);
      
      // If text fits in one line, return as is
      if (pdf.getTextWidth(text) <= maxWidth) {
        return [text];
      }
      
      // Split on common separators for technical file names
      const parts = text.split(/[\s\-_\/\\.]+/);
      const lines = [];
      let currentLine = '';
      
      for (const part of parts) {
        if (!part) continue; // Skip empty parts
        
        const testLine = currentLine + (currentLine ? ' ' : '') + part;
        const textWidth = pdf.getTextWidth(testLine);
        
        if (textWidth > maxWidth && currentLine) {
          // Current line is full, start new line
          lines.push(currentLine);
          currentLine = part;
          
          // If single part is still too long, force break it
          if (pdf.getTextWidth(part) > maxWidth) {
            // Character-by-character breaking for very long parts
            let charLine = '';
            for (const char of part) {
              const testChar = charLine + char;
              if (pdf.getTextWidth(testChar) > maxWidth && charLine) {
                lines.push(charLine);
                charLine = char;
              } else {
                charLine = testChar;
              }
            }
            currentLine = charLine;
          }
        } else {
          currentLine = testLine;
        }
      }
      
      if (currentLine) lines.push(currentLine);
      
      // Ensure we don't have empty lines
      return lines.filter(line => line.trim().length > 0);
    };
    
    // Get full text without truncation
    const excelName = String(result.excelName || 'Unknown');
    const matchedFile = String(result.matchedFile || 'N/A');
    const statusText = String(displayStatus || 'Unknown');
    
    // Wrap text for each column using the new optimized widths
    const col1TextWidth = col1Width - 10; // Account for padding
    const col2TextWidth = col2Width - 10; // Account for padding  
    const col3TextWidth = col3Width - 10; // Account for padding
    
    const excelLines = wrapText(excelName, col1TextWidth, 8);
    const matchedLines = wrapText(matchedFile, col2TextWidth, 8);
    const statusLines = wrapText(statusText, col3TextWidth, 8);
    
    // Calculate row height based on maximum lines needed
    const maxLines = Math.max(excelLines.length, matchedLines.length, statusLines.length);
    const lineHeight = 4;
    const rowHeight = Math.max(12, maxLines * lineHeight + 6); // Added more padding
    
    // Draw alternating row background
    if (index % 2 === 0) {
      pdf.setFillColor(249, 250, 251);
      pdf.rect(tableX, yPosition - 2, tableWidth, rowHeight, 'F');
    }
    
    // Draw wrapped text for each column using the new positioning
    pdf.setTextColor(darkColor);
    excelLines.forEach((line, lineIndex) => {
      pdf.text(line, tableX + 5, yPosition + 6 + (lineIndex * lineHeight));
    });
    
    matchedLines.forEach((line, lineIndex) => {
      pdf.text(line, tableX + col1Width + 5, yPosition + 6 + (lineIndex * lineHeight));
    });
    
    pdf.setTextColor(statusColor);
    statusLines.forEach((line, lineIndex) => {
      pdf.text(line, tableX + col1Width + col2Width + 5, yPosition + 6 + (lineIndex * lineHeight));
    });

    yPosition += rowHeight; // Use dynamic row height
  });

  // QA Services section with improved layout
  yPosition += 30; // Increased spacing to avoid overlap
  
  // Section title with background
  pdf.setFillColor(240, 248, 255); // Light blue background
  pdf.rect(25, yPosition - 5, pageWidth - 50, 20, 'F');
  
  pdf.setTextColor(51, 65, 85); // Dark slate color
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Our Complete QA Validation Services', 30, yPosition + 8);
  
  yPosition += 25;
  
  // Services list with better formatting and PDF-safe bullets
  const services = [
    { icon: '•', text: 'Drawing Register & Naming Convention Compliance', color: [34, 197, 94] }, // Green
    { icon: '•', text: 'Title Block Standards & Consistency Validation', color: [59, 130, 246] }, // Blue  
    { icon: '•', text: 'BIM LOD/LOIN Requirements Verification', color: [168, 85, 247] }, // Purple
    { icon: '•', text: '3D Model Clash Detection & Resolution', color: [245, 101, 101] }, // Red
    { icon: '•', text: 'Version Control & Drawing Status Verification', color: [251, 146, 60] }, // Orange
    { icon: '•', text: 'Content Completeness & Quality Assessment', color: [14, 165, 233] }, // Sky blue
    { icon: '•', text: 'Client-Specific Standard Compliance Check', color: [139, 69, 19] }, // Saddle brown
    { icon: '•', text: 'Deliverable Package Coordination Review', color: [219, 39, 119] } // Pink
  ];
  
  // Create two columns for services with portrait optimization
  const leftColumnServices = services.slice(0, 4);
  const rightColumnServices = services.slice(4);
  
  const leftColumnX = 30; // Standard left margin for portrait
  const rightColumnX = pageWidth / 2 + 5; // Adjusted spacing for portrait
  const serviceLineHeight = 8; // Compact spacing for portrait
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  
  // Left column
  leftColumnServices.forEach((service, index) => {
    const currentY = yPosition + (index * serviceLineHeight);
    
    // Checkmark with color
    pdf.setTextColor(service.color[0], service.color[1], service.color[2]);
    pdf.setFont('helvetica', 'bold');
    pdf.text(service.icon, leftColumnX, currentY);
    
    // Service text
    pdf.setTextColor(75, 85, 99); // Gray-600
    pdf.setFont('helvetica', 'normal');
    pdf.text(service.text, leftColumnX + 8, currentY);
  });
  
  // Right column
  rightColumnServices.forEach((service, index) => {
    const currentY = yPosition + (index * serviceLineHeight);
    
    // Checkmark with color
    pdf.setTextColor(service.color[0], service.color[1], service.color[2]);
    pdf.setFont('helvetica', 'bold');
    pdf.text(service.icon, rightColumnX, currentY);
    
    // Service text
    pdf.setTextColor(75, 85, 99); // Gray-600
    pdf.setFont('helvetica', 'normal');
    pdf.text(service.text, rightColumnX + 8, currentY);
  });
  
  yPosition += leftColumnServices.length * serviceLineHeight + 40; // Increased spacing before button
  
  // Add vibrant CTA button with embedded link
  const buttonY = yPosition;
  const buttonWidth = 120; // Adjusted width for portrait
  const buttonHeight = 16; // Standard height
  const buttonX = (pageWidth - buttonWidth) / 2;
  
  // Button background with gradient effect (simulate with overlapping rectangles)
  pdf.setFillColor(59, 130, 246); // Blue-500
  pdf.roundedRect(buttonX, buttonY, buttonWidth, buttonHeight, 3, 3, 'F');
  
  // Button highlight (top gradient effect)
  pdf.setFillColor(96, 165, 250); // Blue-400
  pdf.roundedRect(buttonX, buttonY, buttonWidth, buttonHeight / 2, 3, 3, 'F');
  
  // Button text with embedded link
  pdf.setTextColor(255, 255, 255); // White
  pdf.setFontSize(10); // Slightly smaller for portrait
  pdf.setFont('helvetica', 'bold');
  const buttonText = '>> Book Your Free 30-Minute QA Consultation';
  const buttonTextWidth = pdf.getTextWidth(buttonText);
  const textX = buttonX + (buttonWidth - buttonTextWidth) / 2;
  
  // Add clickable text
  pdf.text(buttonText, textX, buttonY + 10);
  
  // Make the entire button area clickable by adding an invisible link rectangle
  pdf.link(buttonX, buttonY, buttonWidth, buttonHeight, { url: 'https://calendly.com/raubizar/30min' });
  
  // Update yPosition after button (no separate URL line)
  yPosition += buttonHeight + 20; // Space after button
  yPosition += 15;

  // Footer with website elements
  const footerY = pageHeight - 35;
  
  if (logoBase64) {
    // Use actual logo in footer
    try {
      pdf.addImage(logoBase64, 'PNG', 25, footerY - 3, 8, 8);
    } catch (error) {
      // Fallback
      pdf.setFillColor(16, 185, 129);
      pdf.rect(25, footerY - 3, 20, 6, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(7);
      pdf.text('VALIBLOX', 27, footerY + 1);
    }
  } else {
    // Footer logo placeholder
    pdf.setFillColor(16, 185, 129);
    pdf.rect(25, footerY - 3, 20, 6, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(7);
    pdf.text('VALIBLOX', 27, footerY + 1);
  }

  // Trust badges like website footer
  const badgeY = footerY + 8;
  pdf.setFontSize(7);
  pdf.setTextColor(grayColor);
  pdf.setFont("helvetica", "normal");
  
  pdf.text('• NDA-Protected', 50, badgeY);
  pdf.text('• 48h Turnaround', 105, badgeY);
  pdf.text('• Machine-Precision + Expert Review', 25, badgeY + 8);

  // Contact email
  pdf.setFontSize(9);
  pdf.setTextColor(primaryColor);
  pdf.setFont("helvetica", "normal");
  pdf.text('team@valiblox.com', 25, badgeY + 18);

  // Website link (right aligned)
  pdf.setFontSize(8);
  pdf.setTextColor(grayColor);
  const websiteText = 'www.valiblox.com';
  const websiteWidth = pdf.getTextWidth(websiteText);
  pdf.text(websiteText, pageWidth - websiteWidth - 25, footerY + 2);

  return pdf.output('datauristring').split(',')[1];
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

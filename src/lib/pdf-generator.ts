import jsPDF from 'jspdf';
import { imageToBase64 } from './image-utils';

interface ValidationResult {
  expectedDrawingName: string;
  deliveredFile: string;
  status: 'Done' | 'To Do' | 'File not in Drawing List';
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
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

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

  // Background circle
  pdf.setFillColor(240, 240, 240);
  pdf.circle(chartCenterX, chartCenterY, outerRadius, 'F');
  pdf.setFillColor(255, 255, 255);
  pdf.circle(chartCenterX, chartCenterY, innerRadius, 'F');

  // Progress arc (simplified implementation)
  if (percentage > 0) {
    const angleStep = 3;
    const totalAngle = (percentage / 100) * 360;
    
    pdf.setDrawColor(chartColor);
    pdf.setLineWidth(outerRadius - innerRadius);
    
    for (let angle = 0; angle < totalAngle; angle += angleStep) {
      const radians = (angle - 90) * Math.PI / 180;
      const x = chartCenterX + Math.cos(radians) * ((outerRadius + innerRadius) / 2);
      const y = chartCenterY + Math.sin(radians) * ((outerRadius + innerRadius) / 2);
      pdf.circle(x, y, 0.5, 'F');
    }
  }

  // Percentage text in center
  pdf.setTextColor(chartColor);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text(`${percentage.toFixed(0)}%`, chartCenterX - 8, chartCenterY + 2);

  // Chart label
  pdf.setFontSize(8);
  pdf.setTextColor(grayColor);
  pdf.text('Completion Rate', chartCenterX - 15, chartCenterY + 35);

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

  // Table headers
  pdf.setFillColor(248, 250, 252); // slate-50
  pdf.rect(25, yPosition, pageWidth - 50, 10, 'F');
  
  pdf.setFontSize(9);
  pdf.setTextColor(darkColor);
  pdf.setFont("helvetica", "bold");
  pdf.text('Expected Drawing Name', 30, yPosition + 7);
  pdf.text('Delivered File', 95, yPosition + 7);
  pdf.text('Status', 155, yPosition + 7);

  yPosition += 12;

  // Table rows
  pdf.setFont("helvetica", "normal");
  
  // Ensure results array exists and has items
  const results = analysisResult.results || [];
  results.forEach((result, index) => {
    if (!result) return; // Skip if result is null/undefined
    
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 25;
    }

    // Alternating row colors
    if (index % 2 === 0) {
      pdf.setFillColor(249, 250, 251);
      pdf.rect(25, yPosition - 2, pageWidth - 50, 10, 'F');
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
    pdf.text(String(result.expectedDrawingName || 'Unknown'), 30, yPosition + 5);
    pdf.text(String(result.deliveredFile || 'N/A'), 95, yPosition + 5);
    
    pdf.setTextColor(statusColor);
    pdf.text(String(displayStatus || 'Unknown'), 155, yPosition + 5);

    yPosition += 10;
  });

  // QA Services section
  yPosition += 20;
  pdf.setFontSize(12);
  pdf.setTextColor(darkColor);
  pdf.setFont("helvetica", "bold");
  pdf.text('Our Complete QA Validation Services', 25, yPosition);

  yPosition += 10;
  pdf.setFontSize(9);
  pdf.setTextColor(grayColor);
  const qaServices = [
    '• Drawing Register & Naming Convention Compliance',
    '• Title Block Standards & Consistency Validation',
    '• BIM LOD/LOIN Requirements Verification',
    '• 3D Model Clash Detection & Resolution',
    '• Version Control & Drawing Status Verification',
    '• Content Completeness & Quality Assessment',
    '• Client-Specific Standard Compliance Check',
    '• Deliverable Package Coordination Review'
  ];

  qaServices.forEach((service, index) => {
    pdf.text(service, 25, yPosition + 8 + (index * 6));
  });

  // Call to Action
  yPosition += 65;
  pdf.setFontSize(11);
  pdf.setTextColor(primaryColor);
  pdf.setFont("helvetica", "bold");
  pdf.text('📅 Book Your Free 30-Minute QA Consultation', 25, yPosition);

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
  const badgeY = footerY + 12;
  pdf.setFontSize(8);
  pdf.setTextColor(grayColor);
  pdf.setFont("helvetica", "normal");
  
  pdf.text('🛡️ NDA-Protected', 25, badgeY);
  pdf.text('🕐 48h Turnaround', 70, badgeY);
  pdf.text('🎯 Machine-Precision + Expert Review', 115, badgeY);

  // Contact email
  pdf.setTextColor(primaryColor);
  pdf.text('team@valiblox.com', 25, badgeY + 10);

  // Website link
  pdf.setTextColor(grayColor);
  pdf.text('www.valiblox.com', pageWidth - 35, footerY + 2);

  return pdf.output('datauristring').split(',')[1];
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

import jsPDF from 'jspdf';
import { getLogoBase64 } from './logo-base64';

export interface ValidationResult {
  drawingNumber: string;
  status: 'Done' | 'To Do' | 'File not in Drawing List';
  deliveredFile?: string;
}

export interface AnalysisResult {
  summary: {
    total: number;
    done: number;
    todo: number;
    extra: number;
    deliveryPercentage: number;
  };
  results: ValidationResult[];
  extraFiles: string[];
}

export const generatePDF = async (analysisResult: AnalysisResult): Promise<string> => {
  const pdf = new jsPDF('portrait', 'pt', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Website colors
  const primaryColor = '#10b981'; // emerald-500
  const darkColor = '#0f172a';   // slate-900
  const grayColor = '#64748b';   // slate-500
  const lightGrayColor = '#f1f5f9'; // slate-100
  const redColor = '#ef4444';    // red-500
  const greenColor = '#10b981';  // emerald-500
  const amberColor = '#f59e0b';  // amber-500
  
  // Get logo
  const logoBase64 = await getLogoBase64();
  
  // Header with logo - matching website header
  const headerHeight = 80;
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, headerHeight, 'F');
  
  // Add logo if available
  if (logoBase64) {
    try {
      pdf.addImage(`data:image/png;base64,${logoBase64}`, 'PNG', 30, 20, 40, 40);
    } catch (error) {
      console.warn('Failed to add logo to PDF:', error);
    }
  }
  
  // Company name next to logo
  pdf.setFontSize(18);
  pdf.setTextColor(darkColor);
  pdf.setFont("helvetica", "bold");
  pdf.text('Valiblox', 80, 45);
  
  // Tagline
  pdf.setFontSize(10);
  pdf.setTextColor(grayColor);
  pdf.setFont("helvetica", "normal");
  pdf.text('Independent QA validation for data center projects', 80, 58);
  
  // Main title
  pdf.setFontSize(20);
  pdf.setTextColor(darkColor);
  pdf.setFont("helvetica", "bold");
  pdf.text('Deliverables V-Check Report', 30, headerHeight + 40);
  
  // Project info
  let yPosition = headerHeight + 70;
  pdf.setFontSize(10);
  pdf.setTextColor(grayColor);
  pdf.setFont("helvetica", "normal");
  
  const currentDate = new Date().toLocaleDateString('en-GB');
  const currentTime = new Date().toLocaleTimeString('en-GB', { hour12: false });
  
  pdf.text(`Project: V-Check Analysis`, 30, yPosition);
  pdf.text(`Analysis Date: ${currentDate}`, 30, yPosition + 15);
  pdf.text(`Generated: ${currentDate}, ${currentTime}`, 30, yPosition + 30);
  
  // Main content area
  yPosition += 70;
  
  // Create layout similar to website - side by side executive summary and donut chart
  const leftColumnWidth = 300;
  const rightColumnX = leftColumnWidth + 50;
  
  // Executive Summary Box (matching website card style)
  pdf.setFillColor(240, 253, 244); // light green background
  pdf.setDrawColor(34, 197, 94);   // green border
  pdf.setLineWidth(1);
  pdf.rect(30, yPosition, leftColumnWidth, 120, 'FD');
  
  pdf.setFontSize(16);
  pdf.setTextColor(darkColor);
  pdf.setFont("helvetica", "bold");
  pdf.text('Executive Summary', 40, yPosition + 25);
  
  // Summary stats matching website layout
  const summary = analysisResult.summary;
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(darkColor);
  
  let textY = yPosition + 45;
  pdf.text(`• Delivery Completion: ${summary.deliveryPercentage.toFixed(1)}%`, 40, textY);
  textY += 18;
  pdf.text(`• Files Delivered: ${summary.done} of ${summary.total} expected`, 40, textY);
  textY += 18;
  pdf.text(`• Missing Files: ${summary.todo}`, 40, textY);
  
  if (summary.extra > 0) {
    textY += 18;
    pdf.text(`• Extra Files: ${summary.extra} (not in register)`, 40, textY);
  }
  
  // Donut Chart (matching website DonutChart component)
  const chartCenterX = rightColumnX + 60;
  const chartCenterY = yPosition + 60;
  const chartRadius = 45;
  const chartStrokeWidth = 8;
  
  // Background circle (light gray)
  pdf.setDrawColor(229, 231, 235); // gray-200
  pdf.setLineWidth(chartStrokeWidth);
  pdf.circle(chartCenterX, chartCenterY, chartRadius, 'S');
  
  // Progress arc - determine color based on percentage like website
  const percentage = summary.deliveryPercentage;
  let progressColor = redColor;
  if (percentage >= 90) {
    progressColor = greenColor;
  } else if (percentage >= 60) {
    progressColor = amberColor;
  }
  
  // Draw donut chart progress (simplified approach)
  if (percentage > 0) {
    pdf.setDrawColor(progressColor);
    pdf.setLineWidth(chartStrokeWidth);
    
    // Calculate arc parameters
    const startAngle = -90; // Start from top
    const arcAngle = (percentage / 100) * 360;
    
    // Draw arc segments to simulate donut chart
    const segments = Math.max(1, Math.floor(arcAngle / 10));
    for (let i = 0; i < segments; i++) {
      const segmentAngle = arcAngle / segments;
      const currentAngle = startAngle + (i * segmentAngle);
      const nextAngle = startAngle + ((i + 1) * segmentAngle);
      
      const x1 = chartCenterX + chartRadius * Math.cos(currentAngle * Math.PI / 180);
      const y1 = chartCenterY + chartRadius * Math.sin(currentAngle * Math.PI / 180);
      const x2 = chartCenterX + chartRadius * Math.cos(nextAngle * Math.PI / 180);
      const y2 = chartCenterY + chartRadius * Math.sin(nextAngle * Math.PI / 180);
      
      pdf.line(x1, y1, x2, y2);
    }
  }
  
  // Center percentage text
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(progressColor);
  const percentText = `${Math.round(percentage)}%`;
  const textWidth = pdf.getTextWidth(percentText);
  pdf.text(percentText, chartCenterX - textWidth/2, chartCenterY + 5);
  
  // Chart label
  pdf.setFontSize(9);
  pdf.setTextColor(grayColor);
  pdf.setFont("helvetica", "normal");
  const labelText = 'COMPLETION RATE';
  const labelWidth = pdf.getTextWidth(labelText);
  pdf.text(labelText, chartCenterX - labelWidth/2, chartCenterY + 75);
  
  // Detailed Results Table
  yPosition += 160;
  pdf.setFontSize(16);
  pdf.setTextColor(darkColor);
  pdf.setFont("helvetica", "bold");
  pdf.text('Detailed Analysis Results', 30, yPosition);
  
  yPosition += 30;
  
  // Table headers with website styling
  pdf.setFillColor(248, 250, 252); // slate-50
  pdf.setDrawColor(226, 232, 240);  // slate-200
  pdf.rect(30, yPosition, pageWidth - 60, 25, 'FD');
  
  pdf.setFontSize(10);
  pdf.setTextColor(darkColor);
  pdf.setFont("helvetica", "bold");
  pdf.text('Expected Drawing Name', 35, yPosition + 15);
  pdf.text('Delivered File', 200, yPosition + 15);
  pdf.text('Status', 450, yPosition + 15);
  
  yPosition += 25;
  
  // Table rows with alternating colors like website
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  
  analysisResult.results.forEach((result, index) => {
    // Alternating row colors
    if (index % 2 === 0) {
      pdf.setFillColor(255, 255, 255); // white
    } else {
      pdf.setFillColor(248, 250, 252); // slate-50
    }
    pdf.rect(30, yPosition, pageWidth - 60, 20, 'F');
    
    // Row content
    pdf.setTextColor(darkColor);
    pdf.text(result.drawingNumber.substring(0, 35), 35, yPosition + 12);
    pdf.text((result.deliveredFile || 'N/A').substring(0, 30), 200, yPosition + 12);
    
    // Status with color coding
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
    
    pdf.setTextColor(statusColor);
    pdf.text(displayStatus, 450, yPosition + 12);
    
    yPosition += 20;
    
    // Add new page if needed
    if (yPosition > pageHeight - 150) {
      pdf.addPage();
      yPosition = 50;
    }
  });
  
  // QA Services section (matching website content)
  yPosition += 30;
  if (yPosition > pageHeight - 200) {
    pdf.addPage();
    yPosition = 50;
  }
  
  pdf.setFontSize(14);
  pdf.setTextColor(darkColor);
  pdf.setFont("helvetica", "bold");
  pdf.text('Our Comprehensive QA Services Include:', 30, yPosition);
  
  yPosition += 25;
  pdf.setFontSize(9);
  pdf.setTextColor(grayColor);
  pdf.setFont("helvetica", "normal");
  
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
  
  qaServices.forEach((service) => {
    pdf.text(service, 30, yPosition);
    yPosition += 12;
  });
  
  // Call to Action
  yPosition += 20;
  pdf.setFontSize(12);
  pdf.setTextColor(primaryColor);
  pdf.setFont("helvetica", "bold");
  pdf.textWithLink('📅 Book Your Free 30-Minute QA Consultation', 30, yPosition, {
    url: 'https://calendly.com/raubizar/30min'
  });
  
  // Footer matching website footer
  const footerY = pageHeight - 80;
  
  // Footer background
  pdf.setFillColor(15, 23, 42); // slate-900 like website footer
  pdf.rect(0, footerY, pageWidth, 80, 'F');
  
  // Footer logo
  if (logoBase64) {
    try {
      pdf.addImage(`data:image/png;base64,${logoBase64}`, 'PNG', 30, footerY + 15, 20, 20);
    } catch (error) {
      console.warn('Failed to add footer logo:', error);
    }
  }
  
  // Company name in footer
  pdf.setFontSize(10);
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.text('Valiblox', 55, footerY + 25);
  
  // Trust badges (matching website footer)
  pdf.setFontSize(8);
  pdf.setTextColor(148, 163, 184); // slate-400
  pdf.setFont("helvetica", "normal");
  
  const badges = [
    '🛡️ NDA-Protected',
    '⏱️ 48h Turnaround', 
    '🔧 Machine-Precision + Expert Review',
    '📧 team@valiblox.com'
  ];
  
  let badgeX = 30;
  badges.forEach((badge) => {
    if (badgeX + pdf.getTextWidth(badge) < pageWidth - 30) {
      pdf.text(badge, badgeX, footerY + 45);
      badgeX += pdf.getTextWidth(badge) + 20;
    }
  });
  
  // Website link
  pdf.setFontSize(8);
  pdf.setTextColor(16, 185, 129); // emerald-500
  pdf.textWithLink('www.valiblox.com', 30, footerY + 60, { url: 'https://valiblox.com' });
  
  // Page number
  pdf.setTextColor(148, 163, 184);
  pdf.text(`Page 1 of 1`, pageWidth - 60, footerY + 60);
  
  // Return base64 PDF data
  return pdf.output('datauristring').split(',')[1];
};

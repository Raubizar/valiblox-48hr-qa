import jsPDF from 'jspdf';
import { ComparisonResult } from './drawing-list-utils';

export interface PDFGenerationOptions {
  analysisResult: ComparisonResult;
  projectName?: string;
  timestamp?: string;
}

export async function generateVCheckReport(options: PDFGenerationOptions): Promise<string> {
  const { analysisResult, projectName = 'V-Check Analysis', timestamp = new Date().toLocaleDateString() } = options;
  
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Colors
  const primaryColor = '#10b981'; // Valiblox green
  const darkColor = '#374151';
  const lightGray = '#f3f4f6';
  
  let yPosition = 30;
  
  // Header with Valiblox branding
  pdf.setFontSize(24);
  pdf.setTextColor(primaryColor);
  pdf.text('VALIBLOX', 20, yPosition);
  
  pdf.setFontSize(20);
  pdf.setTextColor(darkColor);
  pdf.text('Deliverables V-Check Report', 20, yPosition + 15);
  
  // Project info
  yPosition += 35;
  pdf.setFontSize(12);
  pdf.setTextColor('#6b7280');
  pdf.text(`Project: ${projectName}`, 20, yPosition);
  pdf.text(`Analysis Date: ${timestamp}`, 20, yPosition + 8);
  pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, yPosition + 16);
  
  // Executive Summary Box
  yPosition += 35;
  pdf.setFillColor(240, 253, 244); // Light green background
  pdf.rect(20, yPosition - 5, pageWidth - 40, 45, 'F');
  
  pdf.setFontSize(16);
  pdf.setTextColor(darkColor);
  pdf.text('Executive Summary', 25, yPosition + 8);
  
  pdf.setFontSize(12);
  const summary = analysisResult.summary;
  pdf.text(`✓ Delivery Completion: ${summary.deliveryPercentage.toFixed(1)}%`, 25, yPosition + 20);
  pdf.text(`✓ Files Delivered: ${summary.done} of ${summary.total} expected`, 25, yPosition + 28);
  pdf.text(`⚠ Missing Files: ${summary.todo}`, 25, yPosition + 36);
  if (summary.extra > 0) {
    pdf.text(`📎 Extra Files: ${summary.extra} (not in register)`, 120, yPosition + 36);
  }
  
  // Detailed Results Table
  yPosition += 60;
  pdf.setFontSize(14);
  pdf.setTextColor(darkColor);
  pdf.text('Detailed Analysis Results', 20, yPosition);
  
  yPosition += 15;
  
  // Table headers
  pdf.setFillColor(229, 231, 235); // Gray background
  pdf.rect(20, yPosition - 3, pageWidth - 40, 12, 'F');
  
  pdf.setFontSize(10);
  pdf.setTextColor(darkColor);
  pdf.text('Expected Drawing Name', 22, yPosition + 5);
  pdf.text('Delivered File', 90, yPosition + 5);
  pdf.text('Status', 150, yPosition + 5);
  
  yPosition += 15;
  
  // Table rows
  const maxRowsPerPage = 20;
  let rowCount = 0;
  
  for (const result of analysisResult.results.slice(0, maxRowsPerPage)) {
    if (yPosition > pageHeight - 30) {
      pdf.addPage();
      yPosition = 30;
    }
    
    pdf.setFontSize(9);
    
    // Alternate row background
    if (rowCount % 2 === 0) {
      pdf.setFillColor(249, 250, 251);
      pdf.rect(20, yPosition - 3, pageWidth - 40, 10, 'F');
    }
    
    // Status color coding
    let statusColor = darkColor;
    if (result.status === 'Done') statusColor = '#059669';
    else if (result.status === 'To Do') statusColor = '#dc2626';
    else statusColor = '#f59e0b';
    
    pdf.setTextColor(darkColor);
    const excelName = result.excelName.length > 25 ? result.excelName.substring(0, 22) + '...' : result.excelName;
    const fileName = result.matchedFile.length > 25 ? result.matchedFile.substring(0, 22) + '...' : result.matchedFile;
    
    pdf.text(excelName, 22, yPosition + 4);
    pdf.text(fileName, 90, yPosition + 4);
    
    pdf.setTextColor(statusColor);
    pdf.text(result.status, 150, yPosition + 4);
    
    yPosition += 12;
    rowCount++;
  }
  
  // Full QA Audit Information
  yPosition += 20;
  if (yPosition > pageHeight - 100) {
    pdf.addPage();
    yPosition = 30;
  }
  
  pdf.setFillColor(239, 246, 255); // Light blue background
  pdf.rect(20, yPosition - 5, pageWidth - 40, 80, 'F');
  
  pdf.setFontSize(16);
  pdf.setTextColor(darkColor);
  pdf.text('Ready for a Complete 48-Hour QA Audit?', 25, yPosition + 10);
  
  pdf.setFontSize(10);
  pdf.setTextColor('#374151');
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
    pdf.text(service, 25, yPosition + 20 + (index * 6));
  });
  
  // Call to Action
  yPosition += 70;
  pdf.setFontSize(12);
  pdf.setTextColor(primaryColor);
  pdf.textWithLink('📅 Book Your Free 30-Minute QA Consultation', 25, yPosition, {
    url: 'https://calendly.com/raubizar/30min'
  });
  
  // Footer
  yPosition = pageHeight - 20;
  pdf.setFontSize(8);
  pdf.setTextColor('#9ca3af');
  pdf.textWithLink('www.valiblox.com', 20, yPosition, { url: 'https://valiblox.com' });
  pdf.text('Valiblox - Quality Assurance for Construction Deliverables', pageWidth - 120, yPosition);
  
  // Return base64 PDF data
  return pdf.output('datauristring').split(',')[1];
}

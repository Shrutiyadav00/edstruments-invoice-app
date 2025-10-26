import React from 'react'
import './PDFViewer.css'

interface PDFViewerProps {
  pdfFile: string | null
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfFile }) => {
  return (
    <div className="pdf-viewer">
      {pdfFile ? (
        <iframe
          src={pdfFile}
          title="PDF Viewer"
          className="pdf-iframe"
        />
      ) : (
        <div className="pdf-placeholder">
          <div className="pdf-icon">📄</div>
          <p>Upload a PDF file to view it here</p>
          <p className="placeholder-hint">Supported format: PDF</p>
        </div>
      )}
    </div>
  )
}

export default PDFViewer


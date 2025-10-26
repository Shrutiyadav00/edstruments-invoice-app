import React, { useState, useRef } from 'react'
import { Formik, Form, FieldArray, Field, ErrorMessage, FormikValues } from 'formik'
import * as Yup from 'yup'
import './InvoiceForm.css'
import PDFViewer from './PDFViewer'
import { v4 as uuidv4 } from 'uuid'

interface InvoiceFormProps {
  onLogout: () => void
}

interface ExpenseItem {
  id: string
  lineAmount: string
  department: string
  account: string
  location: string
  description: string
}

interface InvoiceFormData {
  vendor: string
  vendorAddress: string
  purchaseOrderNumber: string
  selectPONumber: string
  invoiceNumber: string
  invoiceDate: string
  paymentTerms: string
  totalAmount: string
  currency: string
  invoiceDueDate: string
  glPostDate: string
  invoiceDescription: string
  expenseDetails: ExpenseItem[]
  comments: string
}

const InvoiceFormSchema = Yup.object().shape({
  vendor: Yup.string().required('Vendor is required'),
  invoiceNumber: Yup.string().required('Invoice Number is required'),
  invoiceDate: Yup.string().required('Invoice Date is required'),
  totalAmount: Yup.string().required('Total Amount is required'),
})

const DUMMY_DATA: InvoiceFormData = {
  vendor: 'A-1 Exterminators',
  vendorAddress: '550 Main St, Lynn',
  purchaseOrderNumber: 'PO-2024-001',
  selectPONumber: 'PO-2024-001',
  invoiceNumber: 'INV-2024-001',
  invoiceDate: '2024-01-15',
  paymentTerms: 'Net 30',
  totalAmount: '1500.00',
  currency: 'USD',
  invoiceDueDate: '2024-02-15',
  glPostDate: '2024-01-16',
  invoiceDescription: 'Quarterly pest control services for main office',
  expenseDetails: [
    {
      id: uuidv4(),
      lineAmount: '1500.00',
      department: 'IT',
      account: 'Office Supplies',
      location: 'Main Office',
      description: 'Pest control service'
    }
  ],
  comments: 'Please process this invoice for Q1 2024 services.'
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('vendorDetails')
  const [pdfFile, setPdfFile] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadSavedData = (): Partial<InvoiceFormData> => {
    const savedData = localStorage.getItem('invoiceFormData')
    return savedData ? JSON.parse(savedData) : {}
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const fileData = e.target?.result
        setPdfFile(fileData as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const populateDummyData = (setValues: (values: any) => void) => {
    setValues(DUMMY_DATA)
    // Also load a sample PDF if needed
    // For demo purposes, you can set a sample PDF URL or base64
  }

  const initialValues: InvoiceFormData = {
    vendor: '',
    vendorAddress: '',
    purchaseOrderNumber: '',
    selectPONumber: '',
    invoiceNumber: '',
    invoiceDate: '',
    paymentTerms: '',
    totalAmount: '0.00',
    currency: 'USD',
    invoiceDueDate: '',
    glPostDate: '',
    invoiceDescription: '',
    expenseDetails: [
      {
        id: uuidv4(),
        lineAmount: '0.00',
        department: '',
        account: '',
        location: '',
        description: ''
      }
    ],
    comments: '',
    ...loadSavedData()
  }

  return (
    <div className="invoice-form-container">
      <div className="header">
        <div className="header-content">
          <button className="back-button">← Back</button>
          <h1>Create New Invoice</h1>
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={InvoiceFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Save to localStorage
          localStorage.setItem('invoiceFormData', JSON.stringify(values))
          
          console.log('Form submitted:', values)
          setSubmitting(false)
          alert('Invoice saved successfully!')
        }}
      >
        {({ values, setValues, isSubmitting }) => (
          <Form className="invoice-form">
            <div className="form-layout">
              {/* Left Panel - PDF Upload */}
              <div className="left-panel">
                <PDFViewer pdfFile={pdfFile} />
                <div className="upload-section">
                  <div className="upload-box">
                    <div className="upload-icon">
                      {pdfFile ? '✓' : '☁'}
                    </div>
                    <p>To auto-populate fields and save time.</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      className="upload-button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      📎 Upload File
                    </button>
                    <p className="upload-hint">Click to upload or Drag and drop</p>
                  </div>
                </div>
                
                <div className="dummy-data-button">
                  <button
                    type="button"
                    className="populate-button"
                    onClick={() => populateDummyData(setValues)}
                  >
                    📋 Populate with Dummy Data
                  </button>
                </div>
              </div>

              {/* Right Panel - Form Fields */}
              <div className="right-panel">
                <div className="tabs">
                  <button
                    type="button"
                    className={`tab ${activeTab === 'vendorDetails' ? 'active' : ''}`}
                    onClick={() => setActiveTab('vendorDetails')}
                  >
                    Vendor Details
                  </button>
                  <button
                    type="button"
                    className={`tab ${activeTab === 'invoiceDetails' ? 'active' : ''}`}
                    onClick={() => setActiveTab('invoiceDetails')}
                  >
                    Invoice Details
                  </button>
                  <button
                    type="button"
                    className={`tab ${activeTab === 'comments' ? 'active' : ''}`}
                    onClick={() => setActiveTab('comments')}
                  >
                    Comments
                  </button>
                </div>

                <div className="form-content">
                  {/* Vendor Details Tab */}
                  {activeTab === 'vendorDetails' && (
                    <div className="tab-content">
                      <div className="section">
                        <h2>Vendor Details</h2>
                        <div className="field-group">
                          <label>Vendor *</label>
                          <Field as="select" name="vendor">
                            <option value="">Select Vendor</option>
                            <option value="A-1 Exterminators">A-1 Exterminators</option>
                            <option value="Office Max">Office Max</option>
                            <option value="Global Suppliers">Global Suppliers</option>
                          </Field>
                          <ErrorMessage name="vendor" component="div" className="error-message" />
                        </div>
                        <div className="field-group">
                          <label>Vendor Address</label>
                          <Field type="text" name="vendorAddress" placeholder="Enter vendor address" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Invoice Details Tab */}
                  {activeTab === 'invoiceDetails' && (
                    <div className="tab-content">
                      <div className="section">
                        <h2>Invoice Details</h2>
                        
                        <div className="field-group">
                          <label>Purchase Order Number</label>
                          <Field type="text" name="purchaseOrderNumber" placeholder="Enter PO Number" />
                        </div>
                        <div className="field-group">
                          <label>Select PO Number</label>
                          <Field as="select" name="selectPONumber">
                            <option value="">Select</option>
                            <option value="PO-2024-001">PO-2024-001</option>
                            <option value="PO-2024-002">PO-2024-002</option>
                          </Field>
                        </div>
                      </div>

                      <div className="section">
                        <h3>Invoice Details</h3>
                        <div className="field-group">
                          <label>Invoice Number *</label>
                          <Field type="text" name="invoiceNumber" placeholder="Enter invoice number" />
                          <ErrorMessage name="invoiceNumber" component="div" className="error-message" />
                        </div>
                        <div className="field-group">
                          <label>Invoice Date *</label>
                          <Field type="date" name="invoiceDate" />
                          <ErrorMessage name="invoiceDate" component="div" className="error-message" />
                        </div>
                        <div className="field-group">
                          <label>Payment Terms</label>
                          <Field as="select" name="paymentTerms">
                            <option value="">Select</option>
                            <option value="Net 15">Net 15</option>
                            <option value="Net 30">Net 30</option>
                            <option value="Net 60">Net 60</option>
                          </Field>
                        </div>
                        <div className="field-row">
                          <div className="field-group">
                            <label>Total Amount *</label>
                            <Field type="number" name="totalAmount" step="0.01" placeholder="0.00" />
                            <ErrorMessage name="totalAmount" component="div" className="error-message" />
                          </div>
                          <div className="field-group">
                            <label>Currency</label>
                            <Field as="select" name="currency">
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                            </Field>
                          </div>
                        </div>
                        <div className="field-group">
                          <label>Invoice Due Date</label>
                          <Field type="date" name="invoiceDueDate" />
                        </div>
                        <div className="field-group">
                          <label>GL Post Date</label>
                          <Field type="date" name="glPostDate" />
                        </div>
                        <div className="field-group">
                          <label>Invoice Description</label>
                          <Field as="textarea" name="invoiceDescription" rows="3" />
                        </div>
                      </div>

                      <div className="section">
                        <h3>Expense Details</h3>
                        <div className="expense-summary">
                          ${values.totalAmount || '0.00'} / ${values.totalAmount || '0.00'}
                        </div>
                        <FieldArray name="expenseDetails">
                          {({ push, remove }) => (
                            <div className="expense-items">
                              {values.expenseDetails.map((expense, index) => (
                                <div key={expense.id} className="expense-item">
                                  <div className="field-group">
                                    <label>Line Amount</label>
                                    <Field 
                                      type="number" 
                                      name={`expenseDetails.${index}.lineAmount`} 
                                      step="0.01" 
                                      placeholder="0.00"
                                    />
                                  </div>
                                  <div className="field-group">
                                    <label>Department</label>
                                    <Field as="select" name={`expenseDetails.${index}.department`}>
                                      <option value="">Select Department</option>
                                      <option value="IT">IT</option>
                                      <option value="HR">HR</option>
                                      <option value="Finance">Finance</option>
                                    </Field>
                                  </div>
                                  <div className="field-group">
                                    <label>Account</label>
                                    <Field as="select" name={`expenseDetails.${index}.account`}>
                                      <option value="">Select Account</option>
                                      <option value="Office Supplies">Office Supplies</option>
                                      <option value="Utilities">Utilities</option>
                                      <option value="Travel">Travel</option>
                                    </Field>
                                  </div>
                                  <div className="field-group">
                                    <label>Location</label>
                                    <Field as="select" name={`expenseDetails.${index}.location`}>
                                      <option value="">Select Location</option>
                                      <option value="Main Office">Main Office</option>
                                      <option value="Branch 1">Branch 1</option>
                                    </Field>
                                  </div>
                                  <div className="field-group">
                                    <label>Description</label>
                                    <Field as="textarea" name={`expenseDetails.${index}.description`} rows="2" />
                                  </div>
                                  {values.expenseDetails.length > 1 && (
                                    <button
                                      type="button"
                                      className="remove-button"
                                      onClick={() => remove(index)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>
                        <button
                          type="button"
                          className="add-expense-button"
                          onClick={() => {
                            const newExpense: ExpenseItem = {
                              id: uuidv4(),
                              lineAmount: '0.00',
                              department: '',
                              account: '',
                              location: '',
                              description: ''
                            }
                            const currentExpenses = values.expenseDetails || []
                            setValues({
                              ...values,
                              expenseDetails: [...currentExpenses, newExpense]
                            })
                          }}
                        >
                          + Add Expense Coding
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Comments Tab */}
                  {activeTab === 'comments' && (
                    <div className="tab-content">
                      <div className="section">
                        <h2>Comments</h2>
                        <div className="field-group">
                          <label>Add Comments</label>
                          <Field 
                            as="textarea" 
                            name="comments" 
                            rows="5" 
                            placeholder="Add a comment and use @name to tag someone."
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="button" className="save-draft-button">
                    Save as Draft
                  </button>
                  <button type="submit" className="submit-new-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit & New'}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default InvoiceForm


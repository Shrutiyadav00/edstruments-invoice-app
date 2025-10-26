# Invoice Form Application

A modern React application for creating and managing invoices with a complete login system, form validation, and PDF upload capabilities.

## 🚀 Features

### Core Features

1. **Login System**
   - Secure login with username/password validation
   - Session management using localStorage
   - Auto-login functionality for returning users
   - Logout functionality

2. **Invoice Form**
   - **Vendor Details**: Vendor selection and address
   - **Invoice Details**: Complete invoice information including:
     - Purchase Order Number
     - Invoice Number, Date, Due Date
     - Payment Terms
     - Total Amount (with currency selection)
     - GL Post Date
     - Invoice Description
   - **Expense Details**: Multi-item expense coding with:
     - Line Amount
     - Department, Account, Location
     - Description
   - **Comments**: Add comments and tag people

3. **PDF Upload & Display**
   - Upload PDF files
   - View uploaded PDFs in the interface
   - Auto-populate functionality (UI ready)

4. **Data Persistence**
   - All form data saved to localStorage
   - Data persists across page reloads
   - Auto-populate form on revisit

5. **Dummy Data Population**
   - One-click button to populate all fields with sample data
   - Useful for testing and demos

6. **Form Validation**
   - Comprehensive validation using Formik and Yup
   - Error messages for invalid inputs
   - Dynamic styling for validation status
   - Required field indicators

### Bonus Features

- Responsive design for mobile and desktop
- Modern UI with gradient backgrounds
- Smooth animations and transitions
- Error handling and user feedback
- Clean, professional interface

## 🛠️ Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Formik** - Form management
- **Yup** - Form validation
- **React Router** - Navigation
- **react-pdf** - PDF rendering (installed, ready to integrate)
- **UUID** - Unique ID generation

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd Edstruments
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   - Navigate to `http://localhost:5173` in your browser
   - The default Vite port is 5173

## 🎯 Usage

### Login

1. Enter any username (minimum 3 characters)
2. Enter any password (minimum 6 characters)
3. Click "Login" to access the invoice form

**Note:** This is a demo application - no backend authentication required.

### Using the Invoice Form

### Navigating Tabs

- **Vendor Details**: Enter vendor information
- **Invoice Details**: Enter invoice and expense details
- **Comments**: Add comments or notes

### Upload PDF

1. Click the "Upload File" button in the left panel
2. Select a PDF file from your computer
3. The PDF will display in the viewer

### Populate Dummy Data

1. Click "📋 Populate with Dummy Data" button
2. All form fields will be filled with sample data
3. This helps you see all features in action

### Adding Expense Items

1. Fill in the expense details (Amount, Department, Account, Location, Description)
2. Click "+ Add Expense Coding" to add more items
3. Use the "Remove" button to delete unwanted items

### Saving & Submitting

- **Save as Draft**: Saves data to localStorage (for future sessions)
- **Submit & New**: Submits the invoice and saves data

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
Edstruments/
├── src/
│   ├── components/
│   │   ├── Login.tsx          # Login component
│   │   ├── Login.css          # Login styles
│   │   ├── InvoiceForm.tsx    # Main invoice form
│   │   ├── InvoiceForm.css    # Invoice form styles
│   │   ├── PDFViewer.tsx      # PDF viewer component
│   │   └── PDFViewer.css      # PDF viewer styles
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── index.html                 # HTML entry point
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

## 📋 Form Data Persistence

The application uses localStorage to persist:

1. **Session Data**: Stored as `invoiceAppSession`
   - Contains username and timestamp
   - Used for auto-login

2. **Form Data**: Stored as `invoiceFormData`
   - Contains all form inputs
   - Auto-populates on page reload

## 🎨 Validation Rules

- **Username**: Minimum 3 characters
- **Password**: Minimum 6 characters
- **Required Fields**: Vendor, Invoice Number, Invoice Date, Total Amount
- **Error Display**: Red borders and error messages below fields

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Host on Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Deploy automatically

### Host on Netlify

1. Push your code to GitHub
2. Connect the repo on [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Other Platforms

The `dist` folder contains the production build that can be deployed to any static hosting service.

## ✅ Features Implemented

- ✅ Login system with validation
- ✅ Session management with localStorage
- ✅ Auto-login functionality
- ✅ Logout functionality
- ✅ Complete invoice form with all fields
- ✅ Multiple tabs (Vendor, Invoice, Comments)
- ✅ Form validation with Formik & Yup
- ✅ Error messages and dynamic styling
- ✅ Data persistence with localStorage
- ✅ PDF upload UI (ready for backend integration)
- ✅ Dummy data population button
- ✅ Responsive design
- ✅ Professional UI/UX
- ✅ Expense details management (add/remove items)
- ✅ Clean, maintainable code structure

## 📝 Notes

- The PDF viewer uses iframe for display
- Session persists until manual logout
- Form data is stored locally in the browser
- No backend API is required for basic functionality
- Ready for backend integration if needed

## 🔐 Security Notes

This is a demo application. For production use:
- Implement proper authentication with backend
- Use secure session management
- Validate data on server-side
- Use HTTPS for all connections
- Implement proper authorization

## 👤 Author

Developed for Edstruments - React Application Assignment

## 📄 License

This project is created for assessment purposes.


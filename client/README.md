# Certificate Generator Client 🎨

A modern React TypeScript frontend application for generating personalized PDF certificates with embedded QR codes. Built with Vite, Tailwind CSS, and advanced PDF manipulation capabilities for professional certificate creation.

## 🌟 Features

### 📄 PDF Certificate Generation
- **Template-based Generation**: Uses customizable PDF templates as base
- **Dynamic Text Embedding**: Real-time name placement with adjustable positioning
- **QR Code Integration**: Automatic QR code generation and embedding
- **Live Preview**: Instant preview of certificate modifications
- **Professional Output**: High-quality PDF generation with proper formatting

### 🎨 User Interface
- **Intuitive Design**: Clean, professional interface built with Tailwind CSS
- **Real-time Controls**: Live positioning controls for text and QR codes
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Visual Feedback**: Immediate visual feedback for all user interactions

### 🔧 Advanced Customization
- **Precise Positioning**: Pixel-perfect control over element placement
- **Typography Control**: Customizable font size, color, and styling
- **QR Code Customization**: Adjustable size and positioning for QR codes
- **Template Flexibility**: Support for various certificate template formats

## 🛠️ Technology Stack

### Core Framework
- **React 18**: Latest React with concurrent features and modern hooks
- **TypeScript**: Full type safety and enhanced developer experience
- **Vite**: Lightning-fast build tool with hot module replacement

### PDF & Graphics
- **PDF-lib**: Advanced PDF manipulation and generation
- **QRCode.js**: High-quality QR code generation
- **Canvas API**: Image processing and manipulation

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **PostCSS**: CSS processing with Autoprefixer
- **Responsive Design**: Mobile-first approach with flexible layouts

### Development Tools
- **ESLint**: Code linting with TypeScript and React support
- **TypeScript Compiler**: Strict type checking and modern JavaScript features
- **Vite DevServer**: Hot module replacement for fast development

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm**, **yarn**, or **pnpm** package manager
- **Certificate Template**: PDF file for your certificate design
- **Backend Server**: Running on http://localhost:3000

### Installation

1. **Navigate to client directory**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   # Using npm
   npm install
   
   # Using yarn
   yarn install
   
   # Using pnpm
   pnpm install
   ```

3. **Add certificate template**:
   ```bash
   # Copy your certificate template to public directory
   cp /path/to/your/certificate.pdf ./public/certificate.pdf
   ```

4. **Configure Firebase bucket**:
   ```typescript
   // Edit src/components/CertificateGenerator.tsx (line 12)
   const bucketURL = "your-firebase-bucket-name";
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

6. **Open in browser**:
   - Navigate to `http://localhost:5173`
   - Ensure backend server is running on `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build locally
npm run preview

# Serve the dist folder
npm run serve
```

## 📁 Project Structure

```
client/
├── public/
│   ├── certificate.pdf    # Certificate template (required)
│   └── vite.svg           # Vite logo
├── src/
│   ├── components/
│   │   └── CertificateGenerator.tsx  # Main certificate component
│   ├── App.tsx            # Root application component
│   ├── main.tsx           # Application entry point
│   ├── index.css          # Global styles and Tailwind imports
│   └── vite-env.d.ts      # Vite type definitions
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

## 🎨 Core Components

### CertificateGenerator.tsx
The main component handling certificate generation:

#### Key Features:
- **State Management**: Handles name, positioning, and PDF generation state
- **PDF Manipulation**: Uses PDF-lib to modify certificate templates
- **QR Code Generation**: Creates verification QR codes with unique URLs
- **Real-time Preview**: Updates certificate preview as user makes changes
- **File Upload**: Sends generated certificates to backend server

#### Component Props:
```typescript
interface CertificateGeneratorProps {
  // No props required - fully self-contained component
}

interface CertificateState {
  name: string;                    // Recipient name
  namePosition: { x: number; y: number };   // Name placement coordinates
  qrPosition: { x: number; y: number };     // QR code placement coordinates
  pdfBlobUrl: string | null;       // Generated PDF blob URL for preview
}
```

#### Key Functions:
- **`generatePdfBlobUrl()`**: Creates PDF with embedded name and QR code
- **`handleGeneratePdf()`**: Finalizes and downloads certificate
- **Position handlers**: Update text and QR code positioning

### App.tsx
Root component providing:
- **Layout Structure**: Centered layout with background styling
- **Component Integration**: Renders CertificateGenerator component
- **Global Styling**: Applies Tailwind CSS classes for overall appearance

## ⚙️ Configuration

### Vite Configuration (`vite.config.ts`)
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### Tailwind Configuration (`tailwind.config.js`)
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [],
}
```

### TypeScript Configuration
- **`tsconfig.json`**: Base TypeScript configuration
- **`tsconfig.app.json`**: Application-specific compiler options
- **`tsconfig.node.json`**: Node.js/build tool specific settings

## 🔧 Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Type checking (if configured)
npm run type-check
```

### Code Quality

#### ESLint Configuration
Strict linting rules for:
- **TypeScript compliance**
- **React best practices**
- **Code consistency**
- **Unused variable detection**
- **Import organization**

#### Type Safety
```typescript
// Strong typing for certificate data
interface CertificateData {
  recipientName: string;
  generatedDate: Date;
  certificateId: string;
  verificationUrl: string;
}

// PDF manipulation types
interface PDFPosition {
  x: number;
  y: number;
}

interface PDFTextOptions {
  size: number;
  color: { r: number; g: number; b: number };
}
```

## 📱 Usage Guide

### Certificate Creation Process

1. **Enter Recipient Name**:
   ```typescript
   // User input updates state
   const [name, setName] = useState('');
   ```

2. **Adjust Positioning**:
   ```typescript
   // Fine-tune text and QR code placement
   const [namePosition, setNamePosition] = useState({ x: 220, y: 300 });
   const [qrPosition, setQrPosition] = useState({ x: 710, y: 530 });
   ```

3. **Real-time Preview**:
   ```typescript
   // PDF updates automatically when dependencies change
   useEffect(() => {
     if (name) {
       generatePdfBlobUrl();
     }
   }, [name, namePosition, qrPosition]);
   ```

4. **Generate & Download**:
   ```typescript
   // Creates final PDF and triggers download
   const handleGeneratePdf = async () => {
     // Upload to Firebase and download locally
   };
   ```

### Customization Options

#### Text Styling
```typescript
// Modify in CertificateGenerator.tsx
firstPage.drawText(name, {
  x: namePosition.x,
  y: firstPage.getHeight() - namePosition.y,
  size: 34,                    // Font size
  color: rgb(0, 0, 0),        // Text color (black)
});
```

#### QR Code Appearance
```typescript
// Adjust QR code size and position
firstPage.drawImage(qrImage, {
  x: qrPosition.x,
  y: firstPage.getHeight() - qrPosition.y,
  width: 70,                   // QR code width
  height: 70,                  // QR code height
});
```

#### Certificate Template
- Replace `./public/certificate.pdf` with your design
- Ensure adequate space for name and QR code
- Test with various name lengths
- Consider different certificate orientations

## 🔍 API Integration

### Backend Communication
```typescript
// POST request to upload generated certificate
const response = await axios.post('http://localhost:3000/certificates', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```

### Request Format
```typescript
// FormData structure
const formData = new FormData();
formData.append('image', pdfBlob, `${name}.pdf`);
formData.append('userName', name);
```

### Error Handling
```typescript
try {
  const response = await axios.post(API_ENDPOINT, formData);
  // Handle successful upload
} catch (error) {
  console.error('Certificate upload failed:', error);
  // Display user-friendly error message
}
```

## 🎨 UI/UX Features

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Flexible Layout**: Adapts to various screen sizes
- **Touch-friendly**: Large touch targets for mobile users
- **Cross-browser**: Compatible with modern browsers

### User Experience
- **Immediate Feedback**: Real-time preview updates
- **Intuitive Controls**: Clear labeling and logical flow
- **Error Prevention**: Input validation and user guidance
- **Professional Appearance**: Clean, modern interface

### Accessibility
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and structure
- **High Contrast**: Readable color combinations
- **Focus Management**: Clear focus indicators

## 🧪 Testing

### Manual Testing Checklist
```bash
# Core Functionality
☐ Certificate template loads correctly
☐ Name input updates preview in real-time
☐ Position controls adjust text and QR code placement
☐ QR code generates with correct verification URL
☐ PDF downloads successfully with proper formatting
☐ Certificate uploads to backend server
☐ Generated QR code can be scanned and verified

# UI/UX Testing
☐ Responsive design works on mobile devices
☐ All controls are accessible via keyboard
☐ Error messages display appropriately
☐ Loading states provide user feedback
```

### Development Testing
```bash
# Lint checking
npm run lint

# Type checking
npx tsc --noEmit

# Build verification
npm run build
npm run preview
```

## 🚀 Deployment

### Static Site Deployment

#### Netlify
```bash
# Build and deploy
npm run build
# Upload dist/ folder to Netlify
```

#### Vercel
```bash
# Connect repository and deploy
vercel --prod
```

#### Firebase Hosting
```bash
# Build and deploy to Firebase
npm run build
firebase deploy --only hosting
```

### Environment Configuration

#### Production Environment Variables
```bash
# Backend API endpoint
VITE_API_URL=https://your-api-domain.com

# Firebase configuration
VITE_FIREBASE_BUCKET=your-production-bucket
```

#### Build Optimization
```bash
# Analyze bundle size
npx vite-bundle-analyzer

# Build with source maps disabled for production
VITE_BUILD_SOURCEMAP=false npm run build
```

## 🔍 Troubleshooting

### Common Issues

1. **Certificate Template Not Loading**
   ```bash
   # Check file exists
   ls -la public/certificate.pdf
   
   # Verify MIME type support
   # Ensure PDF is not corrupted
   ```

2. **QR Code Generation Errors**
   ```typescript
   // Check bucket URL configuration
   const bucketURL = "your-bucket-name"; // Must be set
   
   // Verify QR code library
   import QRCode from 'qrcode';
   ```

3. **PDF Positioning Issues**
   ```typescript
   // PDF coordinates start from bottom-left
   // Y-coordinate calculation:
   y: firstPage.getHeight() - namePosition.y
   ```

4. **Build or Development Issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   
   # Clear Vite cache
   rm -rf .vite
   npm run dev
   ```

### Debug Mode
```typescript
// Enable console logging for PDF generation
console.log('PDF generation started');
console.log('Name position:', namePosition);
console.log('QR position:', qrPosition);
console.log('Generated PDF size:', pdfBytes.length);
```

## 🤝 Contributing

### Development Guidelines
1. **Follow TypeScript best practices**
2. **Use functional components with hooks**
3. **Maintain consistent code formatting**
4. **Add proper error handling**
5. **Write meaningful commit messages**
6. **Test certificate generation thoroughly**

### Code Style
- **Functional Components**: Use React hooks instead of class components
- **TypeScript Interfaces**: Define proper types for all data structures
- **Error Boundaries**: Implement proper error handling
- **Performance**: Optimize re-renders and memory usage

### Feature Requests
- **Multiple Templates**: Support for different certificate designs
- **Batch Generation**: Generate multiple certificates at once
- **Advanced Positioning**: Visual drag-and-drop positioning
- **Font Customization**: Multiple font options
- **Color Themes**: Dark/light mode support

---

## 📄 License

This project is licensed under the MIT License.

---

**Ready to create professional certificates with QR validation! 🎓✨**

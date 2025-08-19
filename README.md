# QR-Validated Certificate Generator 🎓📜

A modern web application that generates personalized PDF certificates with embedded QR codes for validation. Built with React TypeScript (client) and Node.js Express (server), integrated with Firebase for secure certificate storage and verification.

## 🌟 Features

### 📄 Certificate Generation
- **PDF Template Customization**: Use your own certificate template as a base
- **Dynamic Text Placement**: Adjustable positioning for recipient names
- **Real-time Preview**: Live preview of certificate as you customize
- **Professional Typography**: Clean, professional text rendering

### 🔐 QR Code Validation
- **Embedded QR Codes**: Auto-generated QR codes linked to certificate verification
- **Secure Verification**: QR codes point to Firebase-hosted certificate copies
- **Anti-fraud Protection**: Tamper-proof certificate validation system
- **Mobile-friendly Scanning**: QR codes optimized for mobile scanning

### ☁️ Cloud Integration
- **Firebase Storage**: Secure cloud storage for generated certificates
- **Public Verification**: Certificates accessible via unique URLs
- **Automated Upload**: Seamless certificate upload and hosting
- **Scalable Infrastructure**: Built on Google Firebase platform

## 🏗️ Architecture

```
QR-Validated-Certificate-Generator/
├── client/                 # React TypeScript Frontend
│   ├── public/            # Static assets and certificate template
│   │   └── certificate.pdf # Your certificate template
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   └── App.tsx       # Main application
│   └── package.json       # Dependencies and scripts
├── server/                # Node.js Express Backend
│   ├── index.js          # Main server file
│   ├── ServiceAccount.json # Firebase service account key
│   └── package.json       # Dependencies and scripts
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16.0.0 or higher
- **npm** or **yarn** package manager
- **Firebase Project** with Storage enabled
- **Firebase Service Account** private key

### 1. Clone Repository
```bash
git clone <repository-url>
cd QR-Validated-Certificate-Generator
```

### 2. Firebase Setup
1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Cloud Storage

2. **Generate Service Account Key**:
   - Go to Project Settings → Service Accounts
   - Generate a new private key
   - Download the JSON file

3. **Configure Storage Rules**:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

### 3. Setup Server
```bash
cd server
npm install

# Add your Firebase service account key
cp /path/to/your/serviceAccountKey.json ./ServiceAccount.json

# Update Firebase config in index.js (line 11)
# Replace "dss-gdsc.appspot.com" with your bucket name

npm start
```

### 4. Setup Client
```bash
cd client
npm install

# Add your certificate template
cp /path/to/your/certificate.pdf ./public/certificate.pdf

# Update bucket URL in CertificateGenerator.tsx (line 12)
# Add your Firebase storage bucket name

npm run dev
```

### 5. Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## ⚙️ Configuration

### Required Files

#### 1. Certificate Template (`./client/public/certificate.pdf`)
- PDF template for your certificates
- Should have space for recipient name and QR code
- Recommended size: A4 landscape or portrait

#### 2. Firebase Service Account (`./server/ServiceAccount.json`)
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "...",
  "client_email": "...",
  "client_id": "...",
  "auth_uri": "...",
  "token_uri": "..."
}
```

#### 3. Bucket Configuration
Update the following files with your Firebase storage bucket name:
- `./server/index.js` (line 11): `storageBucket` property
- `./client/src/components/CertificateGenerator.tsx` (line 12): `bucketURL` variable

## 🎨 Customization

### Text Positioning
Adjust name and QR code positions through the UI:
- **Name Position**: X/Y coordinates for recipient name placement
- **QR Position**: X/Y coordinates for QR code placement
- **Live Preview**: See changes in real-time

### Styling
Customize the appearance by modifying:
- **Font Size**: Line 26 in CertificateGenerator.tsx
- **Font Color**: Line 27 in CertificateGenerator.tsx (RGB values)
- **QR Code Size**: Lines 41-42 in CertificateGenerator.tsx

### Certificate Template
- Replace `./client/public/certificate.pdf` with your template
- Ensure adequate space for name and QR code
- Test positioning with sample data

## 📱 Usage Workflow

### Certificate Generation
1. **Enter Recipient Name**: Type the certificate recipient's name
2. **Adjust Positioning**: Fine-tune text and QR code placement
3. **Preview Certificate**: View real-time preview of final certificate
4. **Generate & Download**: Create certificate and download PDF
5. **Automatic Upload**: Certificate is automatically uploaded to Firebase

### Certificate Verification
1. **Scan QR Code**: Use any QR code scanner on the certificate
2. **Access Verification**: QR code leads to Firebase-hosted certificate copy
3. **Verify Authenticity**: Compare with original certificate

## 🔧 API Documentation

### POST `/certificates`
Upload and store a generated certificate.

**Request**:
- **Content-Type**: `multipart/form-data`
- **Body**:
  - `image`: PDF file (certificate)
  - `userName`: Recipient name (string)

**Response**:
```json
{
  "message": "Certificate created successfully",
  "imageUrl": "https://storage.googleapis.com/bucket-name/filename.pdf"
}
```

## 🛡️ Security Features

### Anti-tampering
- **QR Code Verification**: Each certificate has a unique QR code
- **Cloud Verification**: Original certificates stored in Firebase
- **Immutable Records**: Certificates cannot be modified after upload

### Data Privacy
- **Secure Upload**: HTTPS encryption for all data transmission
- **Firebase Security**: Google-grade security infrastructure
- **No Personal Data Storage**: Only certificate files are stored

## 🧪 Development

### Running in Development Mode
```bash
# Terminal 1 - Server
cd server
npm run dev  # or nodemon index.js

# Terminal 2 - Client
cd client
npm run dev
```

### Building for Production
```bash
# Client build
cd client
npm run build

# Server deployment
cd server
# Deploy to your preferred hosting service
```

### Testing
```bash
# Client testing
cd client
npm run lint
npm run type-check

# Manual testing checklist
# □ Certificate template loads correctly
# □ Name input updates preview
# □ Position controls work
# □ QR code generates and embeds
# □ PDF downloads successfully
# □ Certificate uploads to Firebase
# □ QR code verification works
```

## 🐛 Troubleshooting

### Common Issues

1. **Certificate Template Not Loading**
   - Ensure `certificate.pdf` exists in `./client/public/`
   - Check file permissions and format
   - Verify PDF is not corrupted

2. **Firebase Upload Errors**
   - Verify service account JSON is valid
   - Check Firebase project configuration
   - Ensure storage bucket exists and has correct rules

3. **QR Code Not Working**
   - Verify bucket URL is correctly configured
   - Check Firebase storage permissions
   - Ensure certificate was uploaded successfully

4. **Position Adjustments Not Working**
   - Clear browser cache
   - Check for JavaScript console errors
   - Verify PDF template dimensions

### Debug Mode
```bash
# Enable detailed logging
cd server
DEBUG=* node index.js

# Client development tools
cd client
npm run dev
# Open browser developer tools for client-side debugging
```

## 🚀 Deployment

### Client Deployment (Static Hosting)
- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect GitHub repository
- **Firebase Hosting**: `firebase deploy`

### Server Deployment
- **Railway**: Connect GitHub repository
- **Render**: Deploy from Git
- **DigitalOcean App Platform**: Container or static site
- **Heroku**: Git-based deployment

### Environment Variables (Production)
```bash
# Server environment variables
PORT=3000
FIREBASE_PROJECT_ID=your-project-id
STORAGE_BUCKET=your-bucket-name
```

## 🤝 Contributing

### Development Guidelines
1. **Follow TypeScript best practices**
2. **Maintain consistent code formatting**
3. **Add comments for complex logic**
4. **Test certificate generation thoroughly**
5. **Ensure Firebase security rules are appropriate**

### Feature Requests
- **Bulk certificate generation**
- **Multiple certificate templates**
- **Certificate analytics**
- **Email integration**
- **Certificate expiration dates**

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **PDF-lib**: PDF manipulation library
- **Firebase**: Cloud storage and hosting
- **React**: Frontend framework
- **Express.js**: Backend framework
- **QRCode.js**: QR code generation

---

**Ready to generate secure, verifiable certificates! 🎓✨**

For detailed setup instructions, see the individual README files in the [client/](./client/README.md) and [server/](./server/README.md) directories.

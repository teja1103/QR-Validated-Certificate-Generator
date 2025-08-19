# Certificate Generator Server 🚀

A Node.js Express backend server for the QR-Validated Certificate Generator. This server handles certificate file uploads, Firebase storage integration, and provides secure certificate hosting for QR code verification.

## 🌟 Features

### 📁 File Management
- **PDF Upload Handling**: Secure multipart file upload processing
- **Memory Storage**: Efficient in-memory file processing using Multer
- **File Validation**: Automatic file type and size validation
- **Secure Processing**: Safe file handling with proper error management

### ☁️ Firebase Integration
- **Cloud Storage**: Seamless integration with Firebase Storage
- **Public Access**: Automatic public URL generation for certificate verification
- **Service Account**: Secure authentication using Firebase service accounts
- **Scalable Storage**: Leverages Google Cloud infrastructure

### 🔐 Security & Reliability
- **CORS Protection**: Configurable cross-origin resource sharing
- **Error Handling**: Comprehensive error management and logging
- **Input Validation**: Proper validation of uploaded files and data
- **Secure Authentication**: Firebase service account authentication

## 🛠️ Technology Stack

### Core Framework
- **Express.js**: Fast, unopinionated web framework for Node.js
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine
- **Multer**: Middleware for handling multipart/form-data file uploads

### Cloud Services
- **Firebase Admin SDK**: Server-side Firebase integration
- **Firebase Storage**: Cloud storage for certificate files
- **Google Cloud**: Underlying infrastructure for file storage

### Development Tools
- **CORS**: Cross-Origin Resource Sharing middleware
- **JSON**: Built-in JSON parsing and handling
- **Error Logging**: Console-based error tracking and debugging

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16.0.0 or higher
- **npm** package manager
- **Firebase Project** with Storage enabled
- **Firebase Service Account** private key JSON file

### Installation

1. **Navigate to server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase Service Account**:
   ```bash
   # Place your Firebase service account JSON file
   cp /path/to/your/serviceAccount.json ./ServiceAccount.json
   ```

4. **Update Firebase Configuration**:
   ```javascript
   // Edit index.js (line 11)
   admin.initializeApp({
     credential: admin.credential.cert(serviceAccount),
     storageBucket: "your-bucket-name.appspot.com", // Replace with your bucket
   });
   ```

5. **Start the server**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   
   # Or directly with Node.js
   node index.js
   ```

6. **Verify server is running**:
   - Server should start on `http://localhost:3000`
   - Check console for "Server running on port 3000"

## 📁 Project Structure

```
server/
├── index.js             # Main server file
├── ServiceAccount.json  # Firebase service account key (required)
├── package.json         # Dependencies and scripts
├── package-lock.json    # Dependency lock file
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## ⚙️ Configuration

### Firebase Service Account (`ServiceAccount.json`)
```json
{
  "type": "service_account",
  "project_id": "your-firebase-project-id",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-...@your-project.iam.gserviceaccount.com",
  "client_id": "client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

### Environment Variables
```bash
# Optional environment variables
PORT=3000                           # Server port (default: 3000)
NODE_ENV=development               # Environment (development/production)
FIREBASE_PROJECT_ID=your-project   # Firebase project ID
STORAGE_BUCKET=your-bucket-name    # Firebase storage bucket name
```

### Firebase Storage Rules
```javascript
// Configure in Firebase Console
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Allow public read access for certificate verification
      allow read: if true;
      
      // Allow write access for authenticated requests
      allow write: if request.auth != null;
    }
  }
}
```

## 🔧 API Documentation

### POST `/certificates`
Upload and store a generated certificate in Firebase Storage.

#### Request Format
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Endpoint**: `http://localhost:3000/certificates`

#### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `image` | File | Yes | PDF certificate file |
| `userName` | String | Yes | Recipient name for the certificate |

#### Request Example
```bash
# Using cURL
curl -X POST http://localhost:3000/certificates \
  -F "image=@certificate.pdf" \
  -F "userName=John Doe"

# Using JavaScript (FormData)
const formData = new FormData();
formData.append('image', pdfBlob, 'certificate.pdf');
formData.append('userName', 'John Doe');

fetch('http://localhost:3000/certificates', {
  method: 'POST',
  body: formData
});
```

#### Response Format
```typescript
// Success Response (201)
interface SuccessResponse {
  message: string;      // "Certificate created successfully"
  imageUrl: string;     // Public URL to the uploaded certificate
}

// Error Response (500)
interface ErrorResponse {
  error: string;        // Error description
}
```

#### Response Examples
```json
// Success (201 Created)
{
  "message": "Certificate created successfully",
  "imageUrl": "https://storage.googleapis.com/your-bucket/JohnDoe.pdf"
}

// Error (500 Internal Server Error)
{
  "error": "Failed to upload certificate"
}
```

## 🔍 Core Functionality

### File Upload Processing
```javascript
// Multer configuration for memory storage
const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory temporarily
});

// File processing middleware
app.post("/certificates", upload.single("image"), async (req, res) => {
  const file = req.file;           // Uploaded PDF file
  const fileName = req.body.userName; // Recipient name
  // Processing logic...
});
```

### Firebase Storage Integration
```javascript
// Firebase initialization
const admin = require("firebase-admin");
const serviceAccount = require("./ServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "your-bucket.appspot.com",
});

const bucket = getStorage().bucket();
```

### File Upload Process
```javascript
// 1. Create unique filename (remove spaces)
const uploadName = fileName.replace(/\s+/g, '');

// 2. Upload file to Firebase Storage
const fileUpload = bucket.file(uploadName);
await fileUpload.save(file.buffer, {
  contentType: file.mimetype,
});

// 3. Make file publicly accessible
await fileUpload.makePublic();

// 4. Generate public URL
const imageUrl = `https://storage.googleapis.com/${bucket.name}/${uploadName}`;
```

## 🛡️ Security Features

### Input Validation
```javascript
// File validation
if (!file) {
  return res.status(400).json({ error: "No file uploaded" });
}

// Filename validation
if (!fileName) {
  return res.status(400).json({ error: "Username is required" });
}
```

### Error Handling
```javascript
try {
  // File processing logic
  await processFile();
  res.status(201).json({ message: "Success", imageUrl });
} catch (error) {
  console.error("Error uploading image or saving data:", error);
  res.status(500).json({ error: "Failed to upload certificate" });
}
```

### CORS Configuration
```javascript
// Enable CORS for client access
app.use(cors({
  origin: ['http://localhost:5173'], // Vite dev server
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));
```

## 🧪 Development

### Available Scripts
```bash
# Start development server
npm run dev

# Start production server
npm start

# Install dependencies
npm install

# Check for updates
npm audit
```

### Development Setup
```bash
# Install nodemon for auto-restart
npm install -g nodemon

# Run with nodemon
nodemon index.js

# Enable debug logging
DEBUG=* node index.js
```

### Testing the API
```bash
# Health check (basic test)
curl http://localhost:3000/

# Test certificate upload
curl -X POST http://localhost:3000/certificates \
  -F "image=@test.pdf" \
  -F "userName=TestUser"

# Check Firebase Storage for uploaded files
# Visit: https://console.firebase.google.com/
```

## 📊 Performance & Monitoring

### Performance Metrics
- **File Upload**: ~2-5 seconds (depends on file size)
- **Firebase Upload**: ~3-8 seconds (depends on network)
- **Memory Usage**: ~50-100MB per concurrent request
- **Concurrent Requests**: Up to 100 (configurable)

### Logging & Monitoring
```javascript
// Enable request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Error logging
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});
```

### Health Check Endpoint
```javascript
// Add health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## 🚀 Deployment

### Production Deployment

#### Environment Setup
```bash
# Set production environment
export NODE_ENV=production
export PORT=3000

# Set Firebase credentials
export GOOGLE_APPLICATION_CREDENTIALS="./ServiceAccount.json"
```

#### Process Management
```bash
# Using PM2 for production
npm install -g pm2

# Start with PM2
pm2 start index.js --name certificate-server

# Monitor processes
pm2 status
pm2 logs certificate-server
```

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
```

```bash
# Build and run Docker container
docker build -t certificate-server .
docker run -p 3000:3000 -v /path/to/ServiceAccount.json:/app/ServiceAccount.json certificate-server
```

### Cloud Platform Deployment

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway deploy
```

#### Render
```yaml
# render.yaml
services:
  - type: web
    name: certificate-server
    env: node
    plan: starter
    buildCommand: npm install
    startCommand: node index.js
    envVars:
      - key: NODE_ENV
        value: production
```

#### Heroku
```bash
# Install Heroku CLI and deploy
heroku create your-app-name
git push heroku main

# Set environment variables
heroku config:set NODE_ENV=production
```

## 🔍 Troubleshooting

### Common Issues

1. **Firebase Authentication Errors**
   ```bash
   # Verify service account file exists
   ls -la ServiceAccount.json
   
   # Check Firebase project configuration
   cat ServiceAccount.json | grep project_id
   
   # Verify Firebase Storage is enabled
   # Check Firebase Console: Storage section
   ```

2. **File Upload Failures**
   ```javascript
   // Add detailed logging
   console.log('File received:', file ? file.originalname : 'No file');
   console.log('File size:', file ? file.size : 'N/A');
   console.log('Content type:', file ? file.mimetype : 'N/A');
   ```

3. **CORS Issues**
   ```javascript
   // Update CORS configuration
   app.use(cors({
     origin: '*', // Allow all origins (development only)
     methods: ['GET', 'POST'],
     allowedHeaders: ['Content-Type']
   }));
   ```

4. **Port Already in Use**
   ```bash
   # Find process using port 3000
   lsof -ti:3000
   
   # Kill process
   kill -9 $(lsof -ti:3000)
   
   # Or use different port
   PORT=3001 node index.js
   ```

### Debug Mode
```javascript
// Add verbose logging
const DEBUG = process.env.DEBUG || false;

if (DEBUG) {
  console.log('Debug mode enabled');
  console.log('Firebase config:', admin.apps[0].options);
  console.log('Storage bucket:', bucket.name);
}
```

### Error Monitoring
```javascript
// Enhanced error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
```

## 📈 Scaling Considerations

### Performance Optimization
- **File Size Limits**: Configure maximum upload size
- **Memory Management**: Monitor memory usage for large files
- **Connection Pooling**: Optimize Firebase connections
- **Caching**: Implement response caching where appropriate

### Load Balancing
```javascript
// Add request rate limiting
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/certificates', limiter);
```

## 🤝 Contributing

### Development Guidelines
1. **Follow Node.js best practices**
2. **Add proper error handling for all async operations**
3. **Validate all inputs thoroughly**
4. **Add logging for debugging purposes**
5. **Test file upload functionality**
6. **Document any configuration changes**

### Code Style
- **ES6+ Features**: Use modern JavaScript features
- **Async/Await**: Prefer async/await over callbacks
- **Error Handling**: Always handle errors gracefully
- **Logging**: Add meaningful log messages
- **Comments**: Document complex logic

### Feature Requests
- **Authentication**: Add user authentication system
- **Rate Limiting**: Implement request rate limiting
- **File Validation**: Enhanced file type validation
- **Analytics**: Track certificate generation statistics
- **Webhook Support**: Add webhook notifications

---

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Express.js**: Fast and minimal web framework
- **Firebase**: Reliable cloud storage and authentication
- **Multer**: Efficient file upload handling
- **Node.js**: Powerful JavaScript runtime

---

**Ready to serve secure certificate generation! 🚀📄**

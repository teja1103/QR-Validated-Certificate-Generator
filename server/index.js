const express = require("express");
const admin = require("firebase-admin");
const multer = require("multer");
const cors = require("cors");
const { getStorage } = require("firebase-admin/storage");

const serviceAccount = require("./ServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "dss-gdsc.appspot.com", // Replace with your Storage bucket name
});

const db = admin.firestore();
const bucket = getStorage().bucket();

const app = express();
app.use(cors());

const upload = multer({
  storage: multer.memoryStorage(), // Store the file in memory temporarily
});

app.post("/certificates", upload.single("image"), async (req, res) => {
  const file = req.file; // The uploaded image
  const fileName = req.body.userName;
  const uploadName = fileName.replace(/\s+/g, '');
  console.log(uploadName);
  
  try {
    let imageUrl = "";

    if (file) {
      // Create a unique file name and upload the file to Firebase Storage
      const fileUpload = bucket.file(uploadName);

      await fileUpload.save(file.buffer, {
        contentType: file.mimetype,
      });

      // Make the file publicly accessible
      await fileUpload.makePublic();

      // Get the public URL of the uploaded image
      imageUrl = `https://storage.googleapis.com/${bucket.name}/${uploadName}`;
    }

    res.status(201).json({
      message: "Certificate created successfully",
      imageUrl,
    });
    console.log("Successful");
    
  } catch (error) {
    console.error("Error uploading image or saving data:", error);
    res.status(500).json({ error: "Failed to upload certificate" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log("Server running on port", port);
});

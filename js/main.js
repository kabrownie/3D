
       

// Import the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";
//  firebase

    // Import the functions you need from the SDKs you need
    
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

     // Import the Firebase SDK
    
    
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc1r-4dJDie-Q-09XXRzQ_rg4g5I-ADG8",
  authDomain: "karanja-3d.firebaseapp.com",
  projectId: "karanja-3d",
  storageBucket: "karanja-3d.appspot.com",
  messagingSenderId: "656913140329",
  appId: "1:656913140329:web:b32e65ba7223b19a2bf0f8",
  measurementId: "G-P3YBXGKL8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
 // Initialize Firebase
    
 const analytics = getAnalytics(app);
 // Initialize Firebase

// Function to load images and videos from Firebase Storage
document.addEventListener("DOMContentLoaded", async () => {
  const gallery = document.getElementById('gallery');
  const storageRef = ref(storage, 'upload/');  // Reference to 'upload/' folder

  // List all files in 'uploads/' folder
  listAll(storageRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // Get the download URL for each file
        getDownloadURL(itemRef).then((url) => {
          // Check if the file is an image or video based on file extension
          const fileType = itemRef.name.split('.').pop().toLowerCase();
          if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
            // Add an image element to the gallery
            const img = document.createElement('img');
            img.src = url;
            gallery.appendChild(img);
          } else if (['mp4', 'webm', 'ogg'].includes(fileType)) {
            // Add a video element to the gallery
            const video = document.createElement('video');
            video.src = url;
            video.controls = true;
            gallery.appendChild(video);
          }
        }).catch((error) => {
          console.error('Error fetching file:', error);
        });
      });
    })
    .catch((error) => {
      console.error('Error listing files:', error);
    });
});



// bean
// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

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
const analytics = getAnalytics(app);

// Load images and videos from Firebase Storage and display in gallery
document.addEventListener("DOMContentLoaded", async () => {
  const gallery = document.getElementById('gallery');
  const storageRef = ref(storage, 'upload/'); // Reference to 'upload/' folder

  listAll(storageRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // Get download URL for each file
        getDownloadURL(itemRef).then((url) => {
          const fileType = itemRef.name.split('.').pop().toLowerCase();
          if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
            // Add image element to the gallery
            const img = document.createElement('img');
            img.src = url;
            img.alt = itemRef.name;
            img.loading = 'lazy';  // Lazy load images
            img.addEventListener('click', () => {
              // Show the image in the overlay when clicked
              showImageInOverlay(url);
            });
            gallery.appendChild(img);
          // } else if (['mp4', 'webm', 'ogg'].includes(fileType)) {
          //   // Add video element to the gallery
          //   const video = document.createElement('video');
          //   video.src = url;
          //   video.controls = true;
          //   gallery.appendChild(video);
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

// Function to show image in overlay
function showImageInOverlay(url) {
  const overlay = document.getElementById('imageOverlay');
  const overlayImage = document.getElementById('overlayImage');
  overlayImage.src = url;  // Set the clicked image in the overlay
  overlay.style.display = 'flex';  // Show the overlay
}

// Close the overlay when 'x' button is clicked
const closeOverlay = document.getElementById("closeOverlay");
closeOverlay.addEventListener("click", function() {
  document.getElementById("imageOverlay").style.display = "none";
});

// Optionally, close the overlay if the user clicks outside the image
const overlay = document.getElementById("imageOverlay");
overlay.addEventListener("click", function(event) {
  if (event.target === overlay) {
    overlay.style.display = "none";
  }
});

// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";
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

// Open or create IndexedDB database
const dbPromise = idb.openDB('file-cache', 1, {
  upgrade(db) {
    db.createObjectStore('files', {
      keyPath: 'name'
    });
  }
});

// Cache files function
async function cacheFile(url, name) {
  const db = await dbPromise;
  await db.put('files', { name, url });
}

// Load cached files function
async function loadCachedFiles() {
  const db = await dbPromise;
  const cachedFiles = await db.getAll('files');

  cachedFiles.forEach(file => {
    const img = document.createElement('img');
    img.src = file.url;
    img.alt = file.name;
    img.loading = 'lazy';
    img.addEventListener('click', () => {
      showImageInOverlay(file.url);
    });
    document.getElementById('gallery').appendChild(img);
  });
}

// Load gallery function
async function loadGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear existing gallery content
  const storageRef = ref(storage, 'upload/');

  listAll(storageRef)
    .then(async (res) => {
      for (const itemRef of res.items) {
        try {
          const url = await getDownloadURL(itemRef);
          await cacheFile(url, itemRef.name); // Cache the file
          const fileType = itemRef.name.split('.').pop().toLowerCase();
          if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
            const img = document.createElement('img');
            img.src = url;
            img.alt = itemRef.name;
            img.loading = 'lazy';
            img.addEventListener('click', () => {
              showImageInOverlay(url);
            });
            gallery.appendChild(img);
          }
        } catch (error) {
          console.error('Error fetching file:', error);
        }
      }
    })
    .catch((error) => {
      console.error('Error listing files:', error);
    });
}

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

// Load cached files and gallery on page load
document.addEventListener("DOMContentLoaded", async () => {
  await loadCachedFiles(); // Load cached files
  loadGallery(); // Load gallery from Firebase
});

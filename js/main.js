
   
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
overlay.addEventListener("click", function() {
  document.getElementById("imageOverlay").style.display="none";
  
}); 
// Ensure the script runs after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Array of image URLs
    const images = [
        { url: "https://picsum.photos/id/237/200/300" },
        { url: "https://picsum.photos/id/238/200/300" },
        { url: "https://picsum.photos/id/239/200/300" }, // Invalid URL for testing
    ];

    // Get references to the button and output div
    const button = document.getElementById("download-images-button");
    const output = document.getElementById("output");

    // Function to download an image
    const downloadImage = (image) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image.url;

            img.onload = () => resolve(img); // Resolve with the loaded image
            img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`)); // Reject on error
        });
    };

    // Event listener for button click
    button.addEventListener("click", () => {
        output.innerHTML = "Downloading images..."; // Show loading message

        // Use Promise.all to download all images
        const downloadPromises = images.map(downloadImage);

        Promise.all(downloadPromises)
            .then((loadedImages) => {
                output.innerHTML = ""; // Clear loading message

                // Display all downloaded images
                loadedImages.forEach((img) => {
                    output.appendChild(img); // Append each image to the output div
                });
            })
            .catch((error) => {
                output.innerHTML = `Error: ${error.message}`; // Show error message
            });
    });
});

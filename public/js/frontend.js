// frontend.js

document.addEventListener('DOMContentLoaded', function () {
    // Ensure the form and file input elements are present
    const form = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');

    // Check if form and file input are found
    if (form && fileInput) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting traditionally

            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            // Perform the file upload via fetch
            fetch('/files/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('File uploaded successfully!');
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    } else {
        console.error('Form or File Input not found');
    }
});

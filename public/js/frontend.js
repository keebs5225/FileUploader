// frontend.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const fileGrid = document.getElementById('fileGrid');
    const fileDetails = document.getElementById('fileDetails');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const fileType = document.getElementById('fileType');
    const fileUploadedAt = document.getElementById('fileUploadedAt');
    const fileDownload = document.getElementById('fileDownload');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const sortSelect = document.getElementById('sort');

    let filesData = [];

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Preserve dark mode state
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Load files
    function loadFiles() {
        fetch('/files/')
            .then(response => response.json())
            .then(files => {
                filesData = files;
                displayFiles();
            })
            .catch(error => console.error('Error loading files:', error));
    }

    // Display files in the grid
    function displayFiles() {
        fileGrid.innerHTML = ''; // Clear grid

        filesData.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.classList.add('file-item');

            // Ensure file type is defined before checking
            const fileTypeIsImage = file.type && file.type.startsWith('image/');
            if (fileTypeIsImage) {
                fileItem.innerHTML = `<img src="${file.url}" alt="${file.name}" class="file-thumbnail">`;
            } else {
                fileItem.innerHTML = `<span class="file-icon">📄</span><p>${file.name}</p>`;
            }

            // Add delete button dynamically
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function () {
                deleteFile(file.id);
            });

            fileItem.appendChild(deleteButton);
            fileItem.addEventListener('click', () => showFileDetails(file));
            fileGrid.appendChild(fileItem);
        });
    }

    // Show file details
    function showFileDetails(file) {
        fileName.textContent = file.name;
        fileSize.textContent = (file.size / 1024).toFixed(2) + ' KB';
        fileType.textContent = file.type || 'Unknown';
        fileUploadedAt.textContent = new Date(file.createdAt).toLocaleString();
        fileDownload.href = file.url;
        fileDownload.textContent = 'Download File';
        fileDetails.classList.remove('hidden');
    }

    // Sort files
    sortSelect.addEventListener('change', () => {
        const sortBy = sortSelect.value;

        if (sortBy === 'name') {
            filesData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'type') {
            filesData.sort((a, b) => a.type.localeCompare(b.type));
        } else if (sortBy === 'size') {
            filesData.sort((a, b) => a.size - b.size);
        } else if (sortBy === 'modified') {
            filesData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        displayFiles();
    });

    // Handle file upload
    form.addEventListener('submit', function (event) {
        event.preventDefault();

         // Check if a file is selected
        if (!fileInput.files[0]) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        fetch('/files/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(() => {
            alert('File uploaded successfully!');
            loadFiles(); // Reload the files after upload
        })
        .catch(error => console.error('Error uploading file:', error));
    });

    // Delete file
    function deleteFile(fileId) {
        fetch(`/files/${fileId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('File deleted successfully!');
                    loadFiles(); // Reload files after delete
                } else {
                    console.error('Error deleting file');
                }
            })
            .catch(error => console.error('Error deleting file:', error));
    }

    // Initialize
    loadFiles();
});

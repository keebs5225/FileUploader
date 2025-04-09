// frontend.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const fileGrid = document.getElementById('fileGrid');
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

            const fileTypeIsImage = file.type && file.type.startsWith('image/');
            if (fileTypeIsImage) {
                fileItem.innerHTML = `<img src="${file.url}" alt="${file.name}" class="file-thumbnail">`;
            } else {
                fileItem.innerHTML = `<span class="file-icon">📄</span><p>${file.name}</p>`;
            }

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function (e) {
                e.stopPropagation(); // Prevent triggering detail toggle
                deleteFile(file.id);
            });

            fileItem.appendChild(deleteButton);
            fileItem.addEventListener('click', () => showFileDetails(file, fileItem));
            fileGrid.appendChild(fileItem);
        });
    }

    // Show/hide file details inside the file square
    function showFileDetails(file, fileElement) {
        const previouslyActive = document.querySelector('.file-item.active');
        if (previouslyActive && previouslyActive !== fileElement) {
            previouslyActive.classList.remove('active');
            const oldDetails = previouslyActive.querySelector('.file-details');
            if (oldDetails) oldDetails.remove();
        }

        const isActive = fileElement.classList.contains('active');
        if (isActive) {
            fileElement.classList.remove('active');
            const details = fileElement.querySelector('.file-details');
            if (details) details.remove();
            return;
        }

        fileElement.classList.add('active');

        const details = document.createElement('div');
        details.className = 'file-details';
        details.innerHTML = `
            <p><strong>Name:</strong> ${file.name}</p>
            <p><strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p>

            <p><strong>Uploaded:</strong> ${new Date(file.createdAt).toLocaleString()}</p>
            <a href="${file.url}" target="_blank">Download File</a>
        `;
        // <p><strong>Type:</strong> ${file.type || 'Unknown'}</p>

        fileElement.appendChild(details);
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
            loadFiles(); // Reload files
        })
        .catch(error => console.error('Error uploading file:', error));
    });

    // Delete file
    function deleteFile(fileId) {
        fetch(`/files/${fileId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('File deleted successfully!');
                    loadFiles();
                } else {
                    console.error('Error deleting file');
                }
            })
            .catch(error => console.error('Error deleting file:', error));
    }

    // Initialize
    loadFiles();
});

# FileUploader

A stripped-down version of Google Drive with authentication and cloud storage integration. This project allows users to upload files, organize them into folders, and store them on cloud storage platforms such as Cloudinary or Supabase.

## 🚀 Technologies Used
- **Express**: Web framework for building the server.
- **Prisma & @prisma/client**: ORM for database interactions.
- **Multer**: Middleware for handling file uploads.
- **dotenv**: Manage environment variables.
- **Passport & passport-local**: Authentication middleware.
- **express-session**: Session management for authentication.
- **connect-session-prisma**: Store session data in Prisma (or replace with another session store if unavailable).
- **bcryptjs**: Password hashing for secure authentication.
- **Cloudinary / supabase-js**: Integration with cloud storage for file hosting.
- **uuid**: Generate unique IDs for shared links.
- **cors**: Handle cross-origin requests for the frontend and backend.


## 🛠 Features Implemented
- **File Upload**: Users can upload files with a progress bar.
- **User Authentication**: Secure sign-up and login system using Passport.js.
- **Session Management**: Session-based authentication using `express-session` and Prisma.
- **Cloud Storage**: Files are stored in Cloudinary or Supabase.
- **Folder Organization**: Users can create folders to organize their uploaded files.
- **Unique Share Links**: Generates unique links for file sharing.
- **Responsive Design**: UI is fully responsive on desktop and mobile devices.

## ⚙️ Installation Instructions
To set up this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/keebs5225/FileUploader.git
    cd FileUploader
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables. Example:
    ```env
    SESSION_SECRET=your_session_secret
    CLOUDINARY_URL=your_cloudinary_url
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key
    ```

4. Run Prisma migrations to set up the database schema:
    ```bash
    npx prisma migrate dev --name init
    ```

5. Start the application:
    ```bash
    npm run dev
    ```

6. Access the app in your browser at `http://localhost:3000`.

## 🧑‍💻 Usage Guidelines
- **Upload Files**: After logging in, you can upload files through the user interface.
- **Authentication**: Sign up and log in using your credentials.

## 🔮 Future Improvements Planned
- **Multi-file Upload**: Enhance the upload process to support multiple files at once.
- **Search Functionality**: Allow users to search for files across their cloud storage.
- **Enhanced User Permissions**: Add user roles and permission management for sharing and accessing files.
- **Improved File Previews**: Show file previews for images, videos, etc., before uploading.

## 🎓 Learning Outcomes
- Gained experience in building a full-stack file upload system with cloud storage integration.
- Learned how to implement session management with `express-session` and Prisma.
- Familiarized with using third-party storage services (Cloudinary) for file hosting.
- Improved understanding of user authentication with Passport.js.

## 🌐 Link to Live Demo
You can try the live demo of the project here:
[Live Demo](https://keebs5225.github.io/FileUploader)

## 📁 File Directory
file-uploader/
│── prisma/                 # Prisma schema and migrations
│   ├── schema.prisma       # Prisma database schema
│   ├── migrations/         # Database migration files
│── public/                 # Public assets (CSS, JS, images)
│   ├──css
│   │   ├── styles.css
│   ├──js
│   │   ├── frontend.js
│── uploads/                # Locally stored files (before cloud upload, ignored by Git)
│── src/
│   ├── controllers/        # Business logic for authentication, files, folders
│   │   ├── authController.js
│   │   ├── fileController.js
│   │   ├── folderController.js
│   ├── middlewares/        # Multer config, authentication middleware
│   │   ├── multerConfig.js
│   │   ├── authMiddleware.js
│   │   ├── passportConfig.js
│   ├── routes/             # Express routes
│   │   ├── authRoutes.js
│   │   ├── fileRoutes.js
│   │   ├── folderRoutes.js
│   ├── services/           # Services for Prisma, Cloudinary/Supabase interactions
│   │   ├── prismaService.js
│   │   ├── cloudStorageService.js
│   ├── views/              # EJS templates (if using server-side rendering)
│   │   ├──index.ejs
│   │   ├──login.ejs
│   │   ├──signup.ejs
│   ├── app.js              # Express app setup
│   ├── server.js           # Main server entry point
│── .gitignore              # Ignoring sensitive files (e.g., .env, node_modules)
│── .env                    # Environment variables (ignored in Git)
│── package.json            # Dependencies
│── package-lock.json       # Lock file for npm
│── README.md               # Project details
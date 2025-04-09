# FileUploader
Stripped down version of Google Drive


----------------------------------------------File Directory:----------------------------------------------------------------
FileUploader/
|
│── prisma/                 # Prisma schema and migrations
│   ├── schema.prisma       # Prisma database schema
│   ├── migrations/         # Database migration files
|   |
│── public/                 # Public assets (CSS, JS, images)
│── uploads/                # Locally stored files (before cloud upload, ignored by Git)
│── src/
|   |
│   ├── controllers/        # Business logic for authentication, files, folders
│   │   ├── authController.js
│   │   ├── fileController.js
│   │   ├── folderController.js
│   │   |
│   ├── middlewares/        # Multer config, authentication middleware
│   │   ├── multerConfig.js
│   │   ├── authMiddleware.js
│   │   |
│   ├── routes/             # Express routes
│   │   ├── authRoutes.js
│   │   ├── fileRoutes.js
│   │   ├── folderRoutes.js
│   │   |
│   ├── services/           # Services for Prisma, Cloudinary/Supabase interactions
│   │   ├── prismaService.js
│   │   ├── cloudStorageService.js
│   │   |
│   ├── views/              # EJS templates (if using server-side rendering)
│   ├── app.js              # Express app setup
│   ├── server.js           # Main server entry point
│   │
│── .gitignore              # Ignoring sensitive files (e.g., .env, node_modules)
│── .env                    # Environment variables (ignored in Git)
│── package.json            # Dependencies
│── package-lock.json       # Lock file for npm
│── README.md               # Project details



----------------------------------------------Dependency && Purpose:--------------------------------------------------------------
--Dependency -----------------Purpose--
express	------------------------Web framework
prisma & @prisma/client---------ORM for database
multer--------------------------File uploads
dotenv--------------------------Manage env variables
passport & passport-local-------Authentication
express-session-----------------Session-based auth
connect-session-prisma----------Store sessions in DB
bcryptjs------------------------Password hashing
cloudinary / supabase-js--------Cloud storage
uuid----------------------------Generate unique share links
cors----------------------------Handle cross-origin requests



----------------------------------------------placeholder:--------------------------------------------------------------

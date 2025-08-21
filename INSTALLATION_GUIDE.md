# OAUSTECH Student Registration System - Installation Guide

## Project Overview
A comprehensive web-based student registration system for Oke-Ogun Polytechnic Saki (OAUSTECH) that manages all 15 required registration documents with separate authentication for students and administrators.

## Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui (Radix UI)
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Icons**: Lucide React
- **Notifications**: Sonner Toast

## System Features
✅ **Dual Authentication System** - Separate login portals for students and administrators
✅ **Document Management** - Complete handling of all 15 required documents
✅ **Progress Tracking** - Real-time registration progress monitoring
✅ **Category Organization** - Documents organized by type (Admission, Academic, Financial, Personal, Medical, Legal)
✅ **Upload Validation** - File type and size validation with progress indicators
✅ **Status Management** - Document approval workflow (Pending → Uploaded → Under Review → Approved/Rejected)
✅ **Responsive Design** - Mobile-first design with Tailwind CSS
✅ **Admin Dashboard** - Complete student management and document review system

## Required Documents (All 15 Implemented)
1. JAMB Admission Letter (1 colored + 4 photocopies)
2. OAUSTECH School Admission Letter (1 colored + 4 photocopies)
3. JAMB Result/SUPEB Result(DE) (1 colored + 4 photocopies)
4. O'Level Result WAEC/NECO (1 colored + 4 photocopies)
5. Clearance Form (completed by HOD and Dean)
6. Candidate Application Form (1 colored + 4 photocopies)
7. Acceptance Clearance (1 colored + 4 photocopies)
8. Payment Receipts (PUTME, Access/Checkers, Acceptance Fee, Medical Fee, School Fee)
9. Attestation Letter
10. Certificate of Birth
11. Certificate of Origin
12. Medical Form (1 colored + 4 photocopies)
13. Medical Certificate of Fitness
14. Declaration Against Cultism
15. Course Form

## Prerequisites
Before installation, ensure you have:
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **Modern Web Browser** (Chrome, Firefox, Safari, Edge)

## Installation Steps

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd oaustech-registration-system
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
VITE_APP_NAME=OAUSTECH Registration System
VITE_API_URL=http://localhost:3000/api
```

### 4. Start Development Server
```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production
```bash
# Using npm
npm run build

# Or using yarn
yarn build
```

## Demo Credentials

### Student Login
- **Email**: `student@oaustech.edu.ng`
- **Password**: `student123`

### Admin Login
- **Email**: `admin@oaustech.edu.ng`
- **Password**: `admin123`

## Project Structure
```
src/
├── components/
│   ├── ui/                 # Shadcn UI components
│   └── DocumentUploadCard.tsx
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── pages/
│   ├── Index.tsx          # Landing page
│   ├── StudentLogin.tsx   # Student authentication
│   ├── AdminLogin.tsx     # Admin authentication
│   ├── StudentDashboard.tsx # Student document management
│   ├── AdminDashboard.tsx # Admin management panel
│   └── NotFound.tsx       # 404 page
├── types/
│   └── documents.ts       # Document type definitions
├── hooks/
│   └── use-toast.ts       # Toast notifications
├── lib/
│   └── utils.ts           # Utility functions
├── App.tsx                # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles and design system
```

## Key Features Implementation

### Authentication System
- Separate login flows for students and administrators
- Context-based state management
- Protected routes with role-based access
- Session persistence with localStorage

### Document Management
- File upload with validation (PDF, JPEG, PNG)
- Maximum file size limit (10MB)
- Progress tracking during upload
- Document categorization and organization
- Status workflow management

### Design System
- Custom color palette with OAUSTECH branding
- Semantic color tokens for consistent theming
- Dark/Light mode support
- Responsive grid layouts
- Accessible UI components

## Deployment Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts to deploy

### Option 2: Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run build && npm run deploy`

## Performance Optimization
- Lazy loading for large components
- Image optimization with proper alt attributes
- Efficient state management
- Minimal bundle size with tree shaking
- CDN-ready static assets

## Security Features
- Input validation and sanitization
- File type and size restrictions
- XSS protection through React's built-in escaping
- Secure authentication flow
- Protected route access

## Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **React Developer Tools** - Debugging

## Future Enhancements
- Email notifications for document status updates
- Bulk document processing for administrators
- Document version history
- Advanced search and filtering
- Integration with payment gateways
- Mobile app version
- Database integration (MongoDB/PostgreSQL)
- RESTful API backend

## Support & Maintenance
- Regular dependency updates
- Security patches
- Performance monitoring
- User feedback integration
- Feature enhancement based on requirements

## Testing
```bash
# Run tests (if implemented)
npm run test

# Run e2e tests
npm run test:e2e
```

## Troubleshooting

### Common Issues
1. **Port already in use**: Change port in vite.config.ts
2. **Module not found**: Clear node_modules and reinstall
3. **Build errors**: Check TypeScript errors and resolve
4. **Styling issues**: Verify Tailwind CSS configuration

### Performance Issues
- Check browser developer tools for console errors
- Verify network requests are completing successfully
- Monitor memory usage for large file uploads

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
This project is developed for educational purposes as part of a school project for OAUSTECH.

---

**Note**: This is a frontend-only implementation. For production use, integrate with a backend API for data persistence, user authentication, and file storage.
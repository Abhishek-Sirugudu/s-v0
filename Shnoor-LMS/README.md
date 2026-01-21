# SHNOOR LMS - Project Structure

This document provides an overview of the current folder structure and key files in the application after the migration to a component-based architecture and Tailwind CSS.

## Project Root

```
/shnoor-frontend/Shnoor-LMS/
├── src/                  # Source code
├── public/               # Static assets
├── index.html            # Entry HTML
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## Source Directory (`src/`)

### Core Files
- `App.jsx` - Main application component and routing.
- `main.jsx` - Application entry point.
- `index.css` - Global styles and Tailwind imports.

### Authentication (`src/auth/`)
- `firebase.js` - Firebase configuration and initialization.
- `AuthContext.jsx` - Authentication provider and hook.

### Components (`src/components/`)
#### Layouts (`src/components/layout/`)
- **AdminLayout/**
  - `index.jsx` - Logic wrapper.
  - `view.jsx` - UI component.
- **InstructorLayout/**
  - `index.jsx` - Logic wrapper.
  - `view.jsx` - UI component.
- **StudentLayout/**
  - `index.jsx` - Logic wrapper.
  - `view.jsx` - UI component.

#### Chat (`src/components/chat/`)
- `ChatList.jsx` - Component for listing conversations.
- `ChatWindow.jsx` - Component for the chat interface.

### Context (`src/context/`)
- `SocketContext.jsx` - Real-time communication context (mocked/actual).

### Configuration (`src/config/`)
- `api.js` - API configuration and endpoints.

### Utils (`src/utils/`)
- `gamification.js` - XP, levels, and badging logic.
- `studentData.js` - Mock data and local storage helpers for students.

---

## Pages (`src/pages/`)

### Authentication Pages (`src/pages/auth/`)
- **Login/**           (`index.jsx`, `view.jsx`)
- **Register/**        (`index.jsx`, `view.jsx`)
- **ForgotPassword/**  (`index.jsx`, `view.jsx`)

### Student Portal (`src/pages/student/`)
- **Dashboard/**       (`index.jsx`, `view.jsx`) - Main student landing page.
- **StudentCourses/**  (`index.jsx`, `view.jsx`) - Course catalog and "My Courses".
- **CourseDetail/**    (`index.jsx`, `view.jsx`) - Detailed view of a course.
- **CoursePlayer/**    (`index.jsx`, `view.jsx`) - Video learning interface.
- **StudentExams/**    (`index.jsx`, `view.jsx`) - List of available exams.
- **ExamRunner/**      (`index.jsx`, `view.jsx`) - Interface for taking exams.
- **PracticeArea/**    (`index.jsx`, `view.jsx`) - Coding practice challenges.
- **MyCertificates/**  (`index.jsx`, `view.jsx`) - Earned certificates gallery.
- **Leaderboard/**     (`index.jsx`, `view.jsx`) - Gamification leaderboard.
- **StudentChat/**     (`index.jsx`, `view.jsx`) - Student messaging interface.
- `PracticeSession.jsx` - Component for active coding practice sessions.

### Instructor Portal (`src/pages/instructor/`)
- **InstructorDashboard/** (`index.jsx`, `view.jsx`) - Instructor overview.
- **CourseList/**          (`index.jsx`, `view.jsx`) - Instructor's courses management.
- **AddCourse/**           (`index.jsx`, `view.jsx`) - Course creation wizard.
- **ExamBuilder/**         (`index.jsx`, `view.jsx`) - Tool to create exams.
- **StudentPerformance/**  (`index.jsx`, `view.jsx`) - Analytics on student progress.
- **InstructorChat/**      (`index.jsx`, `view.jsx`) - Instructor messaging.
- **InstructorSettings/**  (`index.jsx`, `view.jsx`) - Profile and account settings.

### Admin Portal (`src/pages/admin/`)
- **AdminDashboard/**      (`index.jsx`, `view.jsx`) - Admin implementation details? (Check path)
- **ManageUsers/**         (`index.jsx`, `view.jsx`) - User management table.
- **ApproveUsers/**        (`index.jsx`, `view.jsx`) - Pending user approval.
- **ApproveCourses/**      (`index.jsx`, `view.jsx`) - Course moderation queue.
- **AssignCourse/**        (`index.jsx`, `view.jsx`) - Manual course assignment.
- **AddInstructor/**       (`index.jsx`, `view.jsx`) - Create new instructor accounts.
- **ProfileManagement/**   (`index.jsx`, `view.jsx`) - Admin profile settings.

### Shared Pages (`src/pages/shared/`)
- **ProfileSettings/**     (`index.jsx`, `view.jsx`) - Common profile editing for non-admin roles.

## Architecture Note
This project follows a strict **Separation of Concerns** pattern for pages:
- **`index.jsx`**: Handles business logic, state management, API calls, and data transformations.
- **`view.jsx`**: Start of the UI. Handles presentation and visual structure using **Tailwind CSS**. It receives data and action handlers via props.

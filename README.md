# TaskMaster - Task Management Dashboard

A modern, feature-rich Task Management Dashboard built with React 19, Redux Toolkit, and Tailwind CSS. This application demonstrates modern React fundamentals, state management best practices, and responsive UI design.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.11.2-764ABC?logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-06B6D4?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Features in Detail](#features-in-detail)
- [Code Architecture](#code-architecture)
- [API Handling](#api-handling)
- [Styling](#styling)
- [Theme System](#theme-system)
- [Performance & Best Practices](#performance--best-practices)

## ✨ Features

### Core Features
- **📝 Task Management**: Create, read, update, and delete tasks
- **✅ Status Management**: Mark tasks as completed or pending with instant UI updates
- **🔍 Search Functionality**: Search tasks by title in real-time
- **🏷️ Task Filters**: Filter tasks by All, Pending, or Completed status
- **🌙 Light/Dark Theme**: Persistent theme preference with system preference detection
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **✨ Smooth Animations**: Beautiful transitions using Framer Motion
- **💾 Persistent Storage**: All data persisted in browser localStorage

### User Experience
- Real-time task updates without page reload
- Inline editing for task titles
- Confirmation dialogs for destructive actions
- Loading states and error handling
- Empty state messaging for better UX
- Hover effects and visual feedback on all interactive elements

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2.0**: Latest React with hooks and functional components
- **Vite 7.2.4**: Next-generation frontend build tool for fast development

### State Management
- **Redux Toolkit 2.11.2**: Modern Redux with built-in best practices
  - Slice pattern for reducers
  - Async thunks for API handling
  - Automatic state normalization

### Styling
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
  - Custom color palette with primary colors
  - Dark mode support
  - Responsive design utilities

### Animations
- **Framer Motion 12.23.26**: Professional motion library
  - Component transitions
  - Layout animations
  - Hover and tap interactions

### UI Icons
- **Lucide React 0.562.0**: Modern icon library
  - Lightweight SVG icons
  - Consistent styling

### Build Tools
- **PostCSS 8.4.33**: CSS transformations
- **Autoprefixer 10.4.17**: Vendor prefixes
- **ESLint 9.39.1**: Code quality and consistency

## 📁 Project Structure

```
task-management/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Image and media assets
│   ├── components/        # React components
│   │   ├── Dashboard.jsx      # Main dashboard layout
│   │   ├── TaskForm.jsx       # Task creation form
│   │   ├── TaskFilters.jsx    # Filter and search controls
│   │   ├── TaskList.jsx       # Task list container
│   │   └── TaskItem.jsx       # Individual task component
│   ├── redux/             # Redux state management
│   │   ├── store.js           # Redux store configuration
│   │   ├── tasksSlice.js      # Tasks state and reducers
│   │   └── themeSlice.js      # Theme state management
│   ├── services/          # API and external services
│   │   └── api.js             # Mock API with localStorage
│   ├── App.jsx            # Root app component with theme toggle
│   ├── App.css            # App styles
│   ├── index.css          # Global styles and animations
│   └── main.jsx           # React DOM render entry point
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── eslint.config.js       # ESLint configuration
├── package.json           # Project dependencies
└── README.md              # This file
```

## 🚀 Installation

### Prerequisites
- **Node.js**: v16.0.0 or higher
- **npm** or **yarn**: Latest version recommended

### Setup Steps

1. **Clone or extract the project**
   ```bash
   cd "Task Management"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   Or with yarn:
   ```bash
   yarn install
   ```

3. **Verify installation**
   ```bash
   npm run lint
   ```

## 💻 Usage

### Development Server

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another available port).

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality with ESLint:

```bash
npm run lint
```

## 📚 Features in Detail

### 1. Task Management

#### Create Task
- Click the input field or use the form at the top of the dashboard
- Enter a task title (required)
- Click "Add Task" button or press Enter
- New task appears immediately with "pending" status

#### Edit Task
- Hover over a task to reveal the edit button
- Click the edit icon (pencil) to enter edit mode
- Modify the task title
- Click outside or press Enter to save changes
- Changes reflect immediately in the list

#### Delete Task
- Hover over a task to reveal the delete button
- Click the trash icon
- Confirm deletion when prompted
- Task is removed immediately from the list

#### Mark Complete/Pending
- Click the circle icon on the left side of any task
- Empty circle = pending task
- Filled checkmark circle = completed task
- Status updates instantly

### 2. Filtering & Search

#### Filter by Status
- Use the filter buttons: "All Tasks", "Pending", "Completed"
- Only tasks matching the selected filter will display
- Works seamlessly with search

#### Search Tasks
- Type in the search input to find tasks by title
- Search is case-insensitive
- Works in real-time as you type
- Combines with active filter

### 3. Theme Toggle

- Click the theme button in the top-right navbar
- Toggle between light and dark modes
- Theme preference is saved in localStorage
- System preference is detected on first visit

## 🏗️ Code Architecture

### Redux Store Structure

The Redux store is organized into two slices:

#### Tasks Slice (`tasksSlice.js`)
```javascript
{
  tasks: {
    items: [],           // Array of task objects
    status: 'idle',      // Loading state: idle, loading, succeeded, failed
    error: null,         // Error message if any
    filter: 'all',       // Active filter: all, completed, pending
    searchQuery: ''      // Current search query
  }
}
```

**Available Actions:**
- `fetchTasks()`: Load tasks from localStorage
- `addTask(task)`: Create new task
- `updateTask({id, updates})`: Modify task properties
- `deleteTask(id)`: Remove task
- `setFilter(filter)`: Change active filter
- `setSearchQuery(query)`: Update search query

#### Theme Slice (`themeSlice.js`)
```javascript
{
  theme: {
    theme: 'light'  // Current theme: light or dark
  }
}
```

**Available Actions:**
- `toggleTheme()`: Switch between light and dark modes
- `setTheme(theme)`: Set specific theme

### Component Hierarchy

```
App
├── Navigation (Theme Toggle)
└── Dashboard
    ├── TaskForm (Add new task)
    ├── TaskFilters (Filter & Search)
    └── TaskList
        └── TaskItem (Individual task with actions)
            ├── Status Toggle
            ├── Edit/Delete Buttons
            └── Animated transitions
```

## 🔌 API Handling

### Mock API Service

The application uses a mock API layer (`services/api.js`) that simulates network requests with localStorage persistence.

#### API Methods

All API methods include simulated network delays for realistic UX:

- **`fetchTasks()`** - Retrieves all tasks (500ms delay)
  - Initializes with sample tasks on first load
  - Returns: Array of task objects

- **`addTask(task)`** - Creates a new task (500ms delay)
  - Generates unique ID using `crypto.randomUUID()`
  - Sets status to 'pending' by default
  - Returns: Created task object

- **`updateTask(id, updates)`** - Updates task properties (400ms delay)
  - Accepts partial updates
  - Returns: Updated task object
  - Throws error if task not found

- **`deleteTask(id)`** - Removes a task (300ms delay)
  - Returns: ID of deleted task
  - Removes from localStorage

#### Data Persistence

All tasks are persisted in browser's localStorage under the key `'tm_tasks'`. This ensures data survives page refreshes during development and testing.

**Sample Task Structure:**
```javascript
{
  id: 'unique-uuid',
  title: 'Task title',
  status: 'pending' // or 'completed'
}
```

## 🎨 Styling

### Design System

#### Color Palette
- **Primary**: Custom blue gradient (sky-500 to indigo-600)
- **Light Mode**: White backgrounds with gray text
- **Dark Mode**: Dark gray backgrounds with light text
- **Accent Colors**: Green for completed, Red for delete actions

#### Typography
- **Headlines**: Extra bold with gradient text
- **Body**: Medium weight for readability
- **Inputs**: Rounded corners with focus rings

#### Spacing
- Responsive padding: 4px - 32px
- Consistent gaps between elements
- Mobile-first breakpoints

### Responsive Design

**Breakpoints:**
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

**Responsive Features:**
- Flexible layout containers
- Responsive typography sizes
- Mobile-optimized forms and buttons
- Stack-based navigation on small screens

## 🌙 Theme System

### Implementation Details

1. **Detection**: Checks localStorage for saved preference
2. **Fallback**: Uses system preference if no saved preference
3. **Application**: Adds/removes 'dark' class on document root
4. **Persistence**: Saves preference on every toggle

### Usage in Components

Components automatically respond to theme changes through:
- Tailwind's `dark:` prefix utilities
- CSS custom properties (if used)
- React hooks re-rendering on theme state change

## ⚡ Performance & Best Practices

### Performance Optimizations
- ✅ Code splitting with Vite
- ✅ Lazy loading of components (via React.lazy)
- ✅ Memoization with React.memo where beneficial
- ✅ Efficient Redux selectors
- ✅ Minimal re-renders with proper dependency arrays

### Code Quality
- ✅ ESLint configuration for consistent code style
- ✅ Functional components with hooks
- ✅ Proper error handling and loading states
- ✅ Clean separation of concerns
- ✅ Meaningful variable and function names

### Accessibility
- ✅ Semantic HTML elements
- ✅ ARIA labels on icon buttons
- ✅ Keyboard navigation support
- ✅ Proper focus management
- ✅ Color contrast compliance

### Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔑 Key Implementation Highlights

### Redux Async Thunks
The application uses Redux Toolkit's `createAsyncThunk` for API calls with automatic:
- Pending, fulfilled, and rejected action dispatching
- Error state management
- Loading indicators

### Framer Motion Animations
Smooth animations on:
- Component mounting with spring effects
- Layout changes (add/delete tasks)
- Hover interactions
- Theme transitions

### Filter & Search Combination
The TaskList component intelligently combines:
1. Status filtering (All/Pending/Completed)
2. Title search (case-insensitive substring match)
3. Real-time updates as filters change

### Inline Editing
TaskItem implements local state for editing mode:
- Non-disruptive editing experience
- Blur-triggered save for convenience
- Escape key support (via blur)

## 📝 Sample Data

On first load, the application initializes with sample tasks:
1. "Complete Project Documentation" - Completed
2. "Review Pull Requests" - Pending
3. "Setup CI/CD Pipeline" - Pending

These can be modified or deleted, and all changes persist in localStorage.

## 🚨 Error Handling

The application handles:
- ✅ Failed task loads with user-friendly messages
- ✅ Failed API requests with retry capability (via reloading)
- ✅ Invalid input with disabled buttons and validation
- ✅ Missing tasks on update/delete with error messages

## 📦 Available Scripts Summary

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code quality with ESLint |

## 🔮 Future Enhancement Ideas

- 🧪 Unit tests with Vitest and React Testing Library
- 📊 Task statistics and analytics
- 🏷️ Task categories/tags
- 📅 Due dates and reminders
- 🔄 Task recurrence
- 👥 Multi-user support
- ☁️ Real backend integration
- 📤 Import/Export tasks (JSON, CSV)
- 📱 Progressive Web App (PWA) capabilities
- 🔔 Desktop notifications

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Development Notes

### Adding New Features

1. **New Task Property**: Update task model in `api.js` and `TaskItem.jsx`
2. **New Filter Type**: Add to filters array in `TaskFilters.jsx` and logic in `TaskList.jsx`
3. **New Redux Action**: Add reducer in `tasksSlice.js` and dispatch in components
4. **Styling Updates**: Modify Tailwind classes in component className props

### Debugging

- **Redux State**: Check Redux DevTools browser extension
- **API Issues**: Check localStorage in browser DevTools
- **Styling**: Use Tailwind's `class` inspection in DevTools
- **Performance**: Use React DevTools Profiler tab

## 🙋 Support & Questions

For issues or questions about the implementation:
1. Check the code comments for explanations
2. Review component propTypes/JSDoc comments
3. Examine Redux slice actions and reducers
4. Refer to official documentation for libraries used

---

**Built with ❤️ using React 19, Redux Toolkit, and Tailwind CSS**

# Admin Panel Generation Prompt

## Project Context

I need you to create a comprehensive admin panel for a Next.js 16 software development company website (Kedi Tech). The project already has a client portal, and now I need a separate admin panel for managing the business operations.

## Technical Stack

- **Framework**: Next.js 16.0.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Internationalization**: Bilingual support (French as default, English)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **React Version**: 19.2.0

## Project Structure

The project uses locale-based routing:
- Routes: `/[locale]/admin/*`
- Locale structure: `src/app/[locale]/admin/`
- Components: `src/components/admin/`
- Translations: `src/i18n/dictionaries/{locale}.json`

## Current Client Portal Features (for reference)

The existing client portal includes:
- Dashboard with stats (total spent, active projects, pending invoices, completed projects)
- Projects management (list, detail view with milestones)
- Messages (conversations with Ibrahim, Sekou, General Chat)
- Files management (upload, download, delete)
- Payments & Invoices (list, preview, download)
- Settings page

## Admin Panel Requirements

### 1. Authentication & Access Control
- Admin login page at `/[locale]/admin/login`
- Protected routes with middleware
- Role-based access (Admin, Manager, Support)
- Session management

### 2. Admin Dashboard (`/[locale]/admin`)
- **Overview Statistics**:
  - Total clients
  - Active projects count
  - Total revenue (monthly/yearly)
  - Pending tasks
  - Team members online
  - Recent activity feed
- **Charts & Analytics**:
  - Revenue trends (line chart)
  - Project status distribution (pie chart)
  - Client acquisition over time
  - Team performance metrics
- **Quick Actions**:
  - Create new project
  - Add new client
  - Generate invoice
  - View pending tasks

### 3. Clients Management (`/[locale]/admin/clients`)
- **Clients List**:
  - Table view with: Name, Email, Company, Projects Count, Total Spent, Status, Actions
  - Search and filter functionality
  - Pagination
- **Client Detail Page** (`/[locale]/admin/clients/[id]`):
  - Client information (edit form)
  - Associated projects list
  - Payment history
  - Communication history
  - Files and documents
  - Notes section

### 4. Projects Management (`/[locale]/admin/projects`)
- **Projects List**:
  - Table with: Project Name, Client, Status, Progress, Due Date, Budget, Team Members, Actions
  - Filter by status, client, date range
  - Bulk actions (status change, assign team)
- **Project Detail Page** (`/[locale]/admin/projects/[id]`):
  - Project overview and details
  - Milestones management (add, edit, update status)
  - Team assignment (multi-select team members)
  - Time tracking
  - Budget tracking and expenses
  - Files and documents
  - Client communication log
  - Project timeline/Gantt chart view

### 5. Team Management (`/[locale]/admin/team`)
- **Team Members List**:
  - Table with: Name, Role, Email, Assigned Projects, Status, Actions
  - Add new team member
  - Edit team member details
  - Assign roles and permissions
- **Roles & Permissions**:
  - Admin, Project Manager, Developer, Designer, Support
  - Permission matrix

### 6. Invoices & Payments (`/[locale]/admin/invoices`)
- **Invoices List**:
  - Table with: Invoice #, Client, Amount, Status, Due Date, Created Date, Actions
  - Filter by status, client, date range
  - Bulk actions (send, mark as paid)
- **Create/Edit Invoice**:
  - Invoice form with line items
  - Tax calculation
  - PDF generation (dummy for now)
  - Send invoice via email (dummy)

### 7. Messages Management (`/[locale]/admin/messages`)
- View all client conversations
- Filter by client, team member, status
- Assign conversations to team members
- Internal notes on conversations
- Response templates

### 8. Files & Documents (`/[locale]/admin/files`)
- Centralized file management
- Organize by project, client, category
- Upload, download, delete
- File versioning
- Access control per file

### 9. Analytics & Reports (`/[locale]/admin/analytics`)
- Revenue reports (daily, weekly, monthly, yearly)
- Project performance reports
- Team productivity reports
- Client satisfaction metrics
- Export reports (CSV, PDF - dummy)

### 10. Settings (`/[locale]/admin/settings`)
- **General Settings**:
  - Company information
  - Business hours
  - Currency and timezone
- **Email Templates**:
  - Invoice template
  - Project update template
  - Welcome email template
- **Notifications**:
  - Email notification preferences
  - System alerts
- **Integrations** (dummy placeholders):
  - Payment gateways
  - Email service
  - Calendar sync

## Design Requirements

1. **Layout**:
   - Sidebar navigation (similar to client portal but with admin-specific items)
   - Top bar with search, notifications, user menu, language switcher
   - Responsive design (mobile-friendly)

2. **Color Scheme**:
   - Use existing theme system (light/dark mode support)
   - Primary color for admin actions
   - Status colors: Success (green), Warning (yellow), Error (red), Info (blue)

3. **Components**:
   - Reuse existing Shadcn/ui components
   - Create admin-specific components in `src/components/admin/`
   - Consistent with client portal design language

4. **Data Tables**:
   - Sortable columns
   - Row selection
   - Pagination
   - Export functionality (dummy)

## Data Structure (for reference)

```typescript
// Projects
{
  id: string;
  name: string;
  status: "In Progress" | "Completed" | "On Hold" | "Cancelled";
  progress: number;
  dueDate: string;
  client: string;
  budget: string;
  milestones: Array<{id, title, status, date}>;
}

// Invoices
{
  id: string;
  project: string;
  amount: string;
  status: "Pending" | "Paid" | "Overdue";
  date: string;
}

// Clients (to be created)
{
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: "Active" | "Inactive";
  totalSpent: number;
  projectsCount: number;
}
```

## Internationalization

- All text must be translatable
- Add admin panel translations to existing `en.json` and `fr.json`
- Translation keys structure: `admin.{section}.{key}`
- Example:
  ```json
  {
    "admin": {
      "nav": {
        "dashboard": "Dashboard",
        "clients": "Clients",
        "projects": "Projects",
        "team": "Team",
        "invoices": "Invoices",
        "messages": "Messages",
        "files": "Files",
        "analytics": "Analytics",
        "settings": "Settings"
      },
      "dashboard": {
        "title": "Admin Dashboard",
        "totalClients": "Total Clients",
        ...
      }
    }
  }
  ```

## Implementation Guidelines

1. **File Structure**:
   ```
   src/app/[locale]/admin/
     ├── layout.tsx (admin layout with sidebar)
     ├── page.tsx (dashboard)
     ├── login/
     │   └── page.tsx
     ├── clients/
     │   ├── page.tsx
     │   └── [id]/
     │       └── page.tsx
     ├── projects/
     │   ├── page.tsx
     │   └── [id]/
     │       └── page.tsx
     ├── team/
     │   └── page.tsx
     ├── invoices/
     │   ├── page.tsx
     │   └── [id]/
     │       └── page.tsx
     ├── messages/
     │   └── page.tsx
     ├── files/
     │   └── page.tsx
     ├── analytics/
     │   └── page.tsx
     └── settings/
         └── page.tsx
   ```

2. **Components**:
   ```
   src/components/admin/
     ├── sidebar.tsx
     ├── topbar.tsx
     ├── stats-card.tsx
     ├── data-table.tsx
     ├── client-form.tsx
     ├── project-form.tsx
     └── invoice-form.tsx
   ```

3. **Data**:
   - Create dummy data files in `src/data/admin/`
   - Use TypeScript interfaces for type safety
   - All data operations should be dummy/simulated (no real backend)

4. **Features to Implement as Dummy**:
   - File uploads (simulate with local state)
   - Email sending (show success message)
   - PDF generation (show preview dialog)
   - Export functionality (download dummy files)
   - Authentication (simple mock, no real auth)

## Specific Features

1. **Search Functionality**:
   - Global search in topbar (search clients, projects, invoices)
   - Section-specific search filters

2. **Notifications**:
   - Notification bell in topbar
   - Show: New messages, overdue invoices, project deadlines, etc.

3. **Bulk Actions**:
   - Select multiple items in tables
   - Bulk status updates
   - Bulk export

4. **Quick Create**:
   - Floating action button or dropdown
   - Quick create: Project, Invoice, Client, Task

5. **Activity Log**:
   - Track all admin actions
   - Show in dashboard and detail pages

## Code Quality Requirements

- TypeScript strict mode
- Proper error handling
- Loading states
- Empty states
- Responsive design
- Accessible (ARIA labels, keyboard navigation)
- Clean, maintainable code
- Follow existing code patterns and conventions

## Deliverables

1. Complete admin panel with all pages
2. Admin-specific components
3. Translation keys for both languages
4. Dummy data files
5. TypeScript interfaces
6. Responsive design
7. Dark mode support

## Notes

- This is a frontend-only implementation (no real backend)
- All data operations are simulated
- Focus on UI/UX and functionality demonstration
- Follow the existing code style and patterns from the client portal
- Ensure consistency with the overall design system

---

**Please generate the complete admin panel following these specifications.**


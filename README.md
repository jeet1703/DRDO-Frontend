# DRDO ER/IPR Portal – Frontend

This is the frontend of the secure DRDO ER/IPR web portal. It allows authenticated users to submit new project entries and view or manage previously submitted records through a clean, modern UI built with React and Tailwind CSS.

---

## 🚀 Features

- 📝 **Data Entry Form** — Submit new ER/IPR project records.
- 📊 **Dashboard** — View, filter, and manage submitted records.
- 🔐 **Login Authentication** — Secure login screen.
- 🧭 **Navigation** — Navbar and footer for seamless page switching.
- 🎨 **Consistent UI** — Styled with Tailwind CSS to match DRDO theme.

---

## 📁 File Structure (Frontend)

frontend/
├── public/
│ └── index.html
├── src/
│ ├── assets/ # Images (e.g., logo, banner)
│ ├── components/ # Reusable components like Navbar, Footer
│ ├── pages/ # React pages (Home, Login, Form, Dashboard)
│ ├── App.jsx
│ ├── index.js
│ └── tailwind.config.js
└── package.json

yaml
Copy
Edit

---

## 📦 Installation

```bash
cd frontend
npm install
🧪 Running the App Locally
bash
Copy
Edit
npm run dev
Then go to http://localhost:5173 to see the app.

🌐 Pages Overview
Page	Route	Description
Login	/	Secure login screen with username/password
Home	/home	Welcome screen with navigation
Form	/form	Data entry form for ER/IPR records
Dashboard	/dashboard	View and update all submitted records

🔧 Tech Stack
React

React Router DOM

Tailwind CSS

Vite (build tool)

📌 Notes
Backend must be running at http://localhost:5000 for API requests to work.

Make sure CORS is configured in the backend (Flask-CORS).

👨‍💻 Developer
Prabhjeet Singh
Feel free to reach out at: Prabhjeetdec03@gmail.com

🛡️ License
This project is confidential and intended for use within the DRDO intranet.

yaml
Copy
Edit

---

Let me know if you'd like:
- A similar README for the **backend**
- Auto-deployment instructions (e.g., via Netlify/Vercel)
- A markdown version with embedded images or badges

I'm ready when you are!






Do you like this personality?








Search

Reason

Deep research

Create image




ChatGPT 
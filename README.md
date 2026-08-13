<div align="center">

# 🛠️ Dushyant Power Tools

### Full-Stack Power Tools E-Commerce & Business Management Platform

A modern web platform built to manage **products, customers, dealers, orders, inventory, leads, billing, warranty claims, employees, news and business operations** from a single system.

<p>
  <img src="https://media.licdn.com/dms/image/v2/D5622AQH9XQLFB7k0gg/feedshare-shrink_800/B56Z_7U2UxGQAo-/0/1786627974840?e=1788393600&v=beta&t=9KKHYBKJDyite30xIywWqMtP3wdhZk-ESS89lbt3zB4" width="100%" />
</p>

</div>

---

## 👋 About The Project

**Dushyant Power Tools** is a business-focused web application designed for a power tools and hardware business.

The platform combines a **customer-facing website** with a powerful **role-based portal and Admin Panel**, allowing the business to manage its complete digital operation from one place.

### 🎯 Main Goals

- Provide customers with an easy product browsing and shopping experience.
- Provide dealers with a dedicated business portal.
- Give managers and employees role-specific workspaces.
- Provide administrators with complete business control.
- Manage thousands of products and their inventory.
- Track orders, leads, billing, warranty claims and business activities.
- Publish industry news, guides and product updates.

---

# ✨ Key Features

### 🌐 Public Website

- 🏠 Home Page
- 🛍️ Product Catalogue
- 🔎 Product Search
- 🔋 Cordless Tools
- 🏷️ Product Categories
- 📰 News & Market Insights
- ⭐ Reviews
- 🛡️ Warranty Claim
- 🤝 Become a Dealer
- 📞 Contact Us
- 🔐 Login
- 📝 Registration
- 🛒 Shopping Cart
- 📱 Responsive Design

### 🔐 Role-Based Portals

- 👤 Customer Portal
- 🤝 Dealer Portal
- 👨‍💼 Manager Portal
- 👷 Employee Portal
- 🔒 Admin Portal

### 🧑‍💼 Admin Panel

- 📊 Dashboard
- 📈 Analytics
- 👥 Users
- 👤 Profile
- 🎯 Lead Manager
- 🏢 Parties
- 🧾 Billing
- 🛒 Purchases
- 💰 Expenses
- 📦 Inventory Tracker
- 🛍️ Products
- 📋 Orders
- 🤝 Dealer Orders
- 🚚 Dispatch Management
- 🛡️ Warranty Claims
- 📰 News & Alerts
- 📷 Photos & Documents
- 👨‍💼 Employee Management
- ⚙️ Settings

---

# 🏗️ Application Architecture

```text
                         DUSHYANT POWER TOOLS
                                  │
             ┌────────────────────┴────────────────────┐
             │                                         │
      🌐 PUBLIC WEBSITE                          🔐 PORTAL SYSTEM
             │                                         │
     ┌───────┼────────┐                    ┌───────────┼───────────┐
     │       │        │                    │           │           │
   Home   Products   News              Customer     Dealer      Manager
     │       │        │                    │           │           │
     └───────┴────────┘                    Employee      Admin
                                                     │
                                                     ▼
                                             🧑‍💼 ADMIN PANEL
                                                     │
          ┌──────────────┬─────────────┬────────────┼──────────────┐
          │              │             │            │              │
       Products        Orders       Inventory      Users          Leads
          │              │             │            │              │
          └──────────────┴─────────────┴────────────┴──────────────┘
                                  │
                                  ▼
                              REST APIs
                                  │
                          Node.js / Express
                                  │
                         ┌────────┴────────┐
                         │                 │
                      MongoDB            Redis
```

---

# 🌐 Public Website

The public website is the customer-facing part of the application.

Visitors can explore products, read industry content, create an account, contact the business and access services such as warranty claims.

## 🏠 Home Page

The Home Page contains:

- Business branding
- Navigation
- Search
- Login/Register
- Hero banner
- Product/business highlights
- Call-to-action buttons
- Contact actions
- Social/contact floating buttons

<p align="center">
  <img src="https://chatgpt.com/backend-api/estuary/content?id=file_00000000a5dc8211bdfab093ef80cccf&ts=496213&p=fs&cid=1&sig=5c523825bc51abe89b27d314178c2f98bf52dff85bb0b5ca3c329dc642a9f9e8&v=0" alt="Dushyant Power Tools Home Page" width="100%" />
</p>

---

# 🔋 Cordless Tools

The Cordless Tools section provides a dedicated catalogue for cordless power tools.

### Product information includes

- Product image
- Product name
- Product code
- Voltage
- Speed
- Capacity/specifications
- Price
- MRP
- Discount
- View Details
- Add to Cart

<p align="center">
  <img src="https://chatgpt.com/backend-api/estuary/content?id=file_00000000329c8211b7ba7f6716dac79f&ts=496213&p=fs&cid=1&sig=c08a4b7260fed925756a5bb7eee8e26b352e29c7cec8b70dcfecf2e82e7f103c&v=0" width="100%" />
</p>

---

# 🔐 Login Portal

The application uses a role-based portal selection system.

<p align="center">
  <img src="https://media.licdn.com/dms/image/v2/D5622AQFd-YcDb0esdQ/feedshare-image-high-res/B56Z_7Uzt5JMAY-/0/1786627964071?e=1788393600&v=beta&t=OTicqTC4lIV1tdOWs-o2jOZwKSTudpZ73appGEf_lPk" alt="Role Based Login Portal" width="85%" />
</p>

## 👤 Customer Portal

Customer access includes:

- Orders
- Cart
- Warranty
- Profile

## 🤝 Dealer Portal

Dealer access includes:

- Partner pricing
- Dealer orders
- Dealer account

## 👨‍💼 Manager Portal

Manager access includes:

- Assigned customers
- Leads
- Customer management

## 👷 Employee Portal

Employee access includes:

- Attendance
- Tasks
- Salary
- Chat

## 🔒 Admin Portal

Admin access includes:

- Users
- Products
- Inventory
- Billing
- Reports
- Business management

---

# 📝 Registration

The registration page allows users to create their account.

### Registration options

- Customer
- Shopkeeper / Dealer

### Registration fields

- Full Name
- Mobile Number
- Email Address
- Password
- Confirm Password
- Account Type

<p align="center">
  <img src="https://media.licdn.com/dms/image/v2/D5622AQF3UFQRaMszMA/feedshare-image-high-res/B56Z_7UzkKHAAY-/0/1786627963483?e=1788393600&v=beta&t=DhHwC5GU6371BYvsUes7giLFqT8eX7mnRzn4E1_CcYc" width="85%" />
</p>

---

# 📰 News & Market Insights

The News & Updates section is used for publishing industry-related content.

### Content categories

- Technical Guide
- Industry Insight
- Buying Guide
- New Products
- Events
- Maintenance
- DIY Tutorial
- Comparison

### Content features

- Featured articles
- Article cards
- Read More
- Article categories
- Publish dates
- WhatsApp sharing

<p align="center">
  <img src="https://chatgpt.com/backend-api/estuary/content?id=file_000000009ff882118cbc6816e8ab1cfd&ts=496213&p=fs&cid=1&sig=8501a7b231782c7d1c0df7afc5a06808763213cac1def353d75bccea7cfca047&v=0" width="100%" />
</p>

---

# 🧑‍💼 Admin Panel

The Admin Panel is the internal business management system.

It allows authorized administrators to monitor and manage the major operations of Dushyant Power Tools.

---

# 📊 Admin Dashboard

The dashboard provides a complete business overview.

### Dashboard Cards

- 💰 Today's Sales
- 💵 Cash Balance
- 📋 Pending Orders
- 📦 Total Products
- 📉 Low Stock
- 🚫 Out of Stock
- 🎯 New Leads

### Dashboard Sections

- Stock Alert
- Business Preview
- Weekly Sales Trend
- Latest Order Requests
- Lead Manager
- Products Needing Attention

<p align="center">
  <img src="https://chatgpt.com/backend-api/estuary/content?id=file_00000000c1988211a02c7819d528c10f&ts=496213&p=fs&cid=1&sig=97c1c0074750f9dfed87bccc802ff5328101edefc2d0581e248faeaedb01d4f7&v=0" alt="Dushyant Power Tools Admin Dashboard" width="100%" />
</p>

---

# 📦 Admin Product Management

The Products section provides complete product catalogue management.

### Product Management Features

- ➕ Add Product
- ✏️ Edit Product
- 🗑️ Delete Product
- 🔎 Search Products
- 🏷️ Filter by Category
- 📦 Stock Filter
- 🟢 Live Products
- 🔒 Private Products
- 🟡 Low Stock
- 🔴 Out of Stock
- 💰 Price
- 🧾 MRP
- 📊 Quantity
- 📄 Pagination
- 👁️ Product Visibility

The current UI shown in the supplied screenshot contains **1,535 products**, including live, private and out-of-stock inventory states.

<p align="center">
  <img src="https://chatgpt.com/backend-api/estuary/content?id=file_0000000013708211ade2b55c0a467d21&ts=496213&p=fs&cid=1&sig=5ef6707c71ff6c3c45c3e7f7eca48f3c0e2e1206e6c9b55760cc98a77bd4ccbf&v=0" width="100%" />
</p>

---

# 🧭 Admin Panel Sections

| Section | Purpose |
|---|---|
| 📊 **Dashboard** | Business overview, sales, stock, orders and leads |
| 📈 **Analytics** | Business performance and analytics |
| 👥 **Users** | Manage registered users |
| 👤 **Profile** | Admin profile |
| 🎯 **Lead Manager** | Manage customer leads |
| 🏢 **Parties** | Manage business/customer/dealer parties |
| 🧾 **Billing** | Billing and invoice operations |
| 🛒 **Purchases** | Purchase and supplier records |
| 💰 **Expenses** | Business expense management |
| 📦 **Inventory Tracker** | Track inventory and stock movement |
| 🛍️ **Products** | Product catalogue CRUD |
| 📋 **Orders** | Customer order management |
| 🤝 **Dealer Orders** | Dealer order management |
| 🚚 **Dispatch Management** | Dispatch and delivery workflow |
| 🛡️ **Warranty Claims** | Warranty claim processing |
| 📰 **News & Alerts** | News, updates and announcements |
| 📷 **Photos & Docs** | Business media/documents |
| 👨‍💼 **Employee Management** | Employee operations |
| ⚙️ **Settings** | Application configuration |

---

# 🔄 Business Workflow

## 🛍️ Customer Order Flow

```text
Customer
   │
   ▼
Browse Products
   │
   ▼
Search / Category
   │
   ▼
Product Details
   │
   ▼
Add To Cart
   │
   ▼
Place Order
   │
   ▼
Admin Receives Order
   │
   ▼
Order Processing
   │
   ▼
Dispatch Management
   │
   ▼
Delivery
```

## 📦 Inventory Flow

```text
Admin Adds Product
        │
        ▼
Inventory Quantity
        │
   ┌────┼────────────┐
   ▼    ▼            ▼
In Stock  Low Stock  Out of Stock
   │       │            │
   │       ▼            ▼
   │   Stock Alert   Buy Blocked
   │       │
   └───────┴──────► Admin Restocks
```

## 👥 Authentication Flow

```text
Register / Login
       │
       ▼
Authentication
       │
       ▼
Role Detection
       │
 ┌─────┼──────┬────────┬─────────┐
 ▼     ▼      ▼        ▼         ▼
User  Dealer Manager Employee  Admin
 │      │       │        │        │
 ▼      ▼       ▼        ▼        ▼
Customer Dealer Manager Employee Admin
Portal   Portal  Portal   Portal  Panel
```

---

# 🧩 Core Modules

## 👥 User Management

Admin can manage user-related information and role-based access.

## 🎯 Lead Management

The Lead Manager is designed to track incoming business/customer leads and their status.

## 📦 Inventory Management

Inventory Tracker and stock indicators help administrators monitor product availability.

## 🛒 Order Management

Customer orders and dealer orders are handled through separate management sections.

## 🚚 Dispatch Management

Orders can move through the dispatch/delivery workflow.

## 🛡️ Warranty Claims

Warranty claims provide a dedicated workflow for customer after-sales service.

## 🧾 Billing

Billing provides the internal area for invoices and business transactions.

## 👨‍💼 Employee Management

Employee Management is designed for employee-related operations such as attendance, tasks and salary workflows.

## 📰 News & Alerts

Administrators can manage business news, announcements and public updates.

---

# 🛠️ Technology Stack

## Frontend

- ⚛️ React.js
- ⚡ Vite
- JavaScript
- HTML5
- CSS3
- React Router
- Axios
- Responsive UI

## Backend

- 🟢 Node.js
- 🚂 Express.js
- REST APIs

## Database

- 🍃 MongoDB

## Performance / Caching

- 🔴 Redis

## Development Tools

- Git
- GitHub
- VS Code
- Postman
- Thunder Client
- Figma

> The exact dependencies used by the project should always be verified from the project's `package.json`.

---

# 📂 Project Structure

```text
Dushyant-Power-Tools/
│
├── frontend/
│   │
│   ├── public/
│   │
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       │   ├── Home/
│       │   ├── Products/
│       │   ├── CordlessTools/
│       │   ├── Login/
│       │   ├── Register/
│       │   ├── News/
│       │   ├── Customer/
│       │   ├── Dealer/
│       │   ├── Manager/
│       │   ├── Employee/
│       │   └── Admin/
│       │
│       ├── layouts/
│       ├── routes/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── docs/
│   └── screenshots/
│       ├── home.png
│       ├── cordless-tools.png
│       ├── login-portal.png
│       ├── news-updates.png
│       ├── register.png
│       ├── admin-dashboard.png
│       └── admin-products.png
│
├── .env
├── package.json
└── README.md
```

---

# 🔌 API Architecture

The frontend communicates with backend services through REST APIs.

### Example Product APIs

```text
GET     /api/products
GET     /api/products/:id
POST    /api/products
PUT     /api/products/:id
DELETE  /api/products/:id
```

### Example User APIs

```text
GET     /api/users
GET     /api/users/:id
PUT     /api/users/:id
DELETE  /api/users/:id
```

### Example Order APIs

```text
GET     /api/orders
GET     /api/orders/:id
POST    /api/orders
PUT     /api/orders/:id
```

### Other API modules

```text
Authentication
Users
Products
Categories
Inventory
Orders
Dealer Orders
Leads
Warranty Claims
Billing
Purchases
Expenses
News
Reviews
Employees
Analytics
```

> API paths are examples. Use the actual endpoint names implemented by the project's backend.

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone <your-repository-url>
```

## 2. Open Project

```bash
cd Dushyant-Power-Tools
```

## 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

## 4. Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

# ▶️ Run Locally

## Frontend

```bash
cd frontend
npm run dev
```

## Backend

```bash
cd backend
npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file for backend configuration.

Example:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
REDIS_URL=your_redis_connection
```

For frontend configuration, if required:

```env
VITE_API_URL=http://localhost:4000
```

### ⚠️ Security

Never commit:

```text
.env
.env.local
database passwords
JWT secrets
API keys
private credentials
```

to GitHub.

---

# 📱 Responsive Design

The application is designed for:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📟 Tablet

The public website and portal interfaces are designed to provide a consistent experience across different screen sizes.

---

# 📸 Screenshots Gallery

### 🏠 Home

<p align="center">
  <img src="./docs/screenshots/home.png" alt="Home Page" width="95%" />
</p>

### 🔋 Cordless Tools

<p align="center">
  <img src="./docs/screenshots/cordless-tools.png" alt="Cordless Tools" width="95%" />
</p>

### 🔐 Login Portal

<p align="center">
  <img src="./docs/screenshots/login-portal.png" alt="Login Portal" width="80%" />
</p>

### 📰 News & Updates

<p align="center">
  <img src="./docs/screenshots/news-updates.png" alt="News and Updates" width="95%" />
</p>

### 📝 Registration

<p align="center">
  <img src="./docs/screenshots/register.png" alt="Registration" width="80%" />
</p>

### 📊 Admin Dashboard

<p align="center">
  <img src="./docs/screenshots/admin-dashboard.png" alt="Admin Dashboard" width="95%" />
</p>

### 📦 Admin Products

<p align="center">
  <img src="./docs/screenshots/admin-products.png" alt="Admin Products" width="95%" />
</p>

---

# 📊 Home vs Admin Panel

| Feature | Public Website | Admin Panel |
|---|:---:|:---:|
| Browse Products | ✅ | ✅ |
| Search Products | ✅ | ✅ |
| Product Details | ✅ | ✅ |
| Add Product | ❌ | ✅ |
| Edit Product | ❌ | ✅ |
| Delete Product | ❌ | ✅ |
| Inventory Management | ❌ | ✅ |
| Stock Alerts | ❌ | ✅ |
| Customer Orders | 👤 | 🧑‍💼 |
| Dealer Orders | 👤 | 🧑‍💼 |
| Leads | Submit/View | Manage |
| Warranty | Submit | Process |
| News | Read | Manage |
| Users | Register/Login | Manage |
| Billing | Customer Side | Admin |
| Analytics | ❌ | ✅ |
| Employee Management | ❌ | ✅ |
| Settings | ❌ | ✅ |

---

# 🚀 Deployment

The application can be deployed using services suitable for React/Node.js applications.

### Frontend

Possible deployment platforms:

- Vercel
- Netlify
- Static hosting/CDN

### Backend

Possible deployment platforms:

- AWS
- Render
- Railway
- VPS/Cloud Server

### Database

- MongoDB Atlas
- Self-hosted MongoDB

> Deployment configuration depends on the actual infrastructure used by the project.

---

# 🔮 Future Improvements

Planned or possible improvements include:

- 💳 Online Payment Gateway
- 📱 Dedicated Mobile Application
- 🔔 Real-Time Notifications
- 📧 Email Notifications
- 💬 WhatsApp Order Notifications
- 📄 Automatic Invoice PDF
- 📊 Advanced Business Analytics
- 🤖 AI Product Search
- 🧠 Product Recommendations
- 🔄 Real-Time Inventory Synchronization
- 🏷️ Advanced Dealer Pricing
- 📦 Advanced Delivery Tracking

---

# ✅ Project Highlights

```text
✔ Full Product Catalogue
✔ Role-Based Authentication
✔ Customer Portal
✔ Dealer Portal
✔ Manager Portal
✔ Employee Portal
✔ Admin Panel
✔ Inventory Management
✔ Order Management
✔ Dealer Order Management
✔ Lead Management
✔ Billing
✔ Warranty Claims
✔ News & Alerts
✔ Employee Management
✔ Responsive UI
```

---

# ❓ FAQ

### Is the website responsive?

Yes. The UI is designed for desktop, laptop, tablet and mobile screen sizes.

### Who can access the Admin Panel?

Only authorized administrator accounts should be allowed to access administrative functionality.

### Can products be managed from the Admin Panel?

Yes. The Products section is designed for adding, editing, deleting, searching and managing product stock/visibility.

### Does the application support different user roles?

Yes. The portal structure separates Customer, Dealer, Manager, Employee and Admin access.

### Can inventory be monitored?

Yes. The Admin Dashboard and Inventory Tracker provide stock-related monitoring including low-stock and out-of-stock states.

### Can customers submit warranty claims?

Yes. Warranty Claims is provided as a dedicated customer/admin workflow.

---

# 👨‍💻 Developer

<div align="center">

### Dushyant Power Tools

**Full-Stack Web Application**

Built with ❤️ using modern web technologies.

</div>

---

# 📄 License

This is a private business application developed for **Dushyant Power Tools**.

---

<div align="center">

### ⭐ If you like this project, consider giving the repository a star!

**Dushyant Power Tools — Powering Your Business Digitally.** 🛠️

</div>

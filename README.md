

<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
=======
# electrosphere
>>>>>>> c569ea86e573950c67ee51f68fad79e4a67636d1

![image alt](https://github.com/Prakashbhaskar123/electrosphere/blob/d11c85718794a5ff0639c71a5392dadb4bc3b835/Images/s1.png)
![image alt](https://github.com/Prakashbhaskar123/electrosphere/blob/53f0280212d0f015b57c8fdcd968a8a834208c25/Images/s2.png)
![image alt](https://github.com/Prakashbhaskar123/electrosphere/blob/53f0280212d0f015b57c8fdcd968a8a834208c25/Images/s3.png)
![image alt](https://github.com/Prakashbhaskar123/electrosphere/blob/53f0280212d0f015b57c8fdcd968a8a834208c25/Images/s4.png)
![image alt](https://github.com/Prakashbhaskar123/electrosphere/blob/53f0280212d0f015b57c8fdcd968a8a834208c25/Images/s5.png)


<div align="center">

# ⚡ ElectroSphere

### Your Universe of Electronics — Discover. Explore. Shop the Future.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=vercel)](https://electrosphere-rose.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Live%20API-green?style=for-the-badge&logo=render)](https://electrosphere-2.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Prakashbhaskar123/electrosphere)

![ElectroSphere Banner](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 🌟 What is ElectroSphere?

ElectroSphere is a **full-stack e-commerce platform** exclusively for electronics and tech products. Unlike conventional shopping websites, ElectroSphere has a unique **dual-section architecture** that combines shopping with tech discovery — and a special **"Chip Inside"** feature that reveals the semiconductor details powering every device.

> 💡 **The VLSI Twist:** Every product shows its chip name and process node (e.g., Apple A19 Pro · 3nm TSMC) — bridging semiconductor engineering with modern web development.

---

## 🚀 Live Demo

| Service | URL |
|---|---|
| 🌐 Frontend | [electrosphere-rose.vercel.app](https://electrosphere-rose.vercel.app) |
| ⚙️ Backend API | [electrosphere-2.onrender.com](https://electrosphere-2.onrender.com) |
| 📂 GitHub | [Prakashbhaskar123/electrosphere](https://github.com/Prakashbhaskar123/electrosphere) |

> ⚠️ **Note:** Backend is on Render free tier. First request after inactivity may take ~50 seconds to wake up.

---

## ✨ Features

### 🛒 Shop Section
- Browse 10+ electronics products
- Search products in real-time
- Filter by category (Phones, Laptops, Audio, Wearables, Tablets)
- Sort by price and rating
- Add to cart with quantity management
- Wishlist (save favourite products)
- 3-step checkout (Address → Review → Payment)
- Order confirmation with delivery estimate

### 🔭 Explore Section
- Discover latest launched products worldwide
- See upcoming gadgets (Coming Soon)
- **⚡ Chip Inside** — semiconductor chip name + process node for every product
- Category-wise tech discovery

### 🔐 Authentication
- Secure user registration and login
- JWT-based authentication (expires in 7 days)
- Password encryption with bcrypt
- Role-based access (User / Admin)

### 🔧 Admin Panel
- Dashboard with total products, orders, revenue
- Add / Delete products with full details
- Manage chip and semiconductor information
- View and update all orders
- Color-coded order status (Placed → Confirmed → Shipped → Delivered)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React.js** | UI component library |
| **Vite** | Build tool and dev server |
| **Framer Motion** | Animations and transitions |
| **React Router DOM** | Client-side routing |
| **CSS3** | Styling and responsive design |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework and API routing |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **bcryptjs** | Password hashing |
| **JSON Web Tokens** | Authentication tokens |
| **CORS** | Cross-origin request handling |
| **dotenv** | Environment variable management |

### Deployment
| Service | Usage |
|---|---|
| **Vercel** | Frontend hosting |
| **Render** | Backend hosting |
| **MongoDB Atlas** | Cloud database |
| **GitHub** | Version control |

---

## 📁 Project Structure

```
electrosphere/
│
├── 📁 backend/                    
│   ├── 📁 middleware/
│   │   └── auth.js               # JWT verification middleware
│   ├── 📁 models/
│   │   ├── User.js               # User schema
│   │   ├── Product.js            # Product schema
│   │   └── Order.js              # Order schema
│   ├── 📁 routes/
│   │   ├── auth.js               # Register & Login APIs
│   │   ├── products.js           # Product CRUD APIs
│   │   └── orders.js             # Order management APIs
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Main server entry point
│
├── 📁 src/                        
│   ├── 📁 pages/
│   │   ├── Landing.jsx           # Homepage with animations
│   │   ├── Explore.jsx           # Tech discovery page
│   │   ├── Shop.jsx              # Shopping page
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Register page
│   │   ├── Checkout.jsx          # 3-step checkout
│   │   ├── OrderSuccess.jsx      # Order confirmation
│   │   └── Admin.jsx             # Admin dashboard
│   ├── api.js                    # Centralized API functions
│   ├── App.jsx                   # Route definitions
│   └── main.jsx                  # React entry point
│
├── vercel.json                    # Vercel routing config
├── .vercelignore                  # Excludes backend from Vercel
└── package.json
```

---

## ⚙️ Getting Started Locally

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account (free)

### 1. Clone the Repository
```bash
git clone https://github.com/Prakashbhaskar123/electrosphere.git
cd electrosphere
```

### 2. Setup Frontend
```bash
npm install
```

### 3. Setup Backend
```bash
cd backend
npm install
```

### 4. Configure Environment Variables
Create `backend/.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 5. Run Development Servers

**Terminal 1 — Frontend:**
```bash
# From project root
npm run dev
```

**Terminal 2 — Backend:**
```bash
# From backend folder
node server.js
```

### 6. Open in Browser
```
http://localhost:5173
```

---

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/register    → Register new user
POST /api/auth/login       → Login user
```

### Products
```
GET    /api/products          → Get all products
GET    /api/products/:id      → Get single product
POST   /api/products          → Add product (Admin)
PUT    /api/products/:id      → Update product (Admin)
DELETE /api/products/:id      → Delete product (Admin)
```

### Orders
```
POST /api/orders              → Place order (Auth)
GET  /api/orders/myorders     → Get my orders (Auth)
GET  /api/orders/:id          → Get single order (Auth)
GET  /api/orders              → Get all orders (Admin)
PUT  /api/orders/:id          → Update order status (Admin)
```

---

## 🖼️ Screenshots

### Landing Page
> Beautiful animated landing page with particle background and dual-section buttons

### Explore Page
> Tech discovery portal with Chip Inside feature showing semiconductor details

### Shop Page
> Full-featured shopping experience with search, filters, cart and wishlist

### Admin Dashboard
> Complete admin panel with product and order management

---

## 🎯 Why ElectroSphere is Unique

| Feature | Amazon | Flipkart | ElectroSphere |
|---|---|---|---|
| Shopping | ✅ | ✅ | ✅ |
| Tech Discovery | ❌ | ❌ | ✅ |
| Chip Info | ❌ | ❌ | ✅ |
| Process Node | ❌ | ❌ | ✅ |
| Admin Panel | N/A | N/A | ✅ |

---

## 🔮 Future Improvements

- [ ] Razorpay payment gateway integration
- [ ] Real product images with cloud storage
- [ ] User profile and order history page
- [ ] Product reviews and ratings
- [ ] Email notifications for orders
- [ ] Mobile app with React Native
- [ ] AI-powered product recommendations

---

## 👨‍💻 Author

**Penta Leela Prakash**

[![GitHub](https://img.shields.io/badge/GitHub-Prakashbhaskar123-black?style=flat-square&logo=github)](https://github.com/Prakashbhaskar123)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-leela--prakash--penta-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/leela-prakash-penta)
[![Email](https://img.shields.io/badge/Email-pentaleelaprakash@gmail.com-red?style=flat-square&logo=gmail)](mailto:pentaleelaprakash@gmail.com)

> B.Tech ECE | Vishnu Institute of Technology | GPA: 9.5/10  
> VLSI Enthusiast × Full Stack Developer

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

Made with ❤️ by [Penta Leela Prakash](https://github.com/Prakashbhaskar123)

</div>

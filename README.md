# StyleStudio

> Full-stack fashion e-commerce platform with secure authentication, payment integration, and an interactive 3D virtual try-on experience.

---

## Highlights


- **Razorpay Payment Gateway** — Complete payment flow (cards, UPI, net banking, COD) with backend HMAC signature verification
- **JWT Authentication** — Secure signup/login with bcrypt password hashing and protected routes
- **Persistent Cart** — localStorage-based cart with size and quantity selection across sessions
- **MongoDB Atlas** — Cloud database with Mongoose schemas for users and orders; full CRUD via RESTful API
- **Production-style Validation** — Inline field-level validation for email, card, CVV, UPI, and ZIP - no browser alerts
- **3D Virtual Try-On** — Interactive Three.js GLB model viewer for real-time outfit previews, a feature rarely implemented at this level

---


## Getting Started

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd stylestudio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

### 4. Run the project
```bash
npm start
```

---
 
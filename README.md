# Petoria
A full-stack e-commerce web application featuring category-driven product discovery, advanced search and filtering, wishlist/cart management, and a secure checkout flow with backend order persistence.<br>
Built with a React frontend, Express/Node backend, MongoDB database.

---
## Demo Link
[Live Demo](https://pet-store-frontend-tau.vercel.app/)

---
## Quick Start
```
git clone https://github.com/Abhishek-Das251002/Pet-Store-Frontend.git
cd Pet-Store-Frontend
npm install
npm run dev
```

---
## Technologies
**Frontend Technologies**
- React.js
- React Router DOM
- JavaScript (ES6+)
- Bootstrap 5
- React Icons
- Lucide React
- React Toastify (Notifications & Alerts)
- HTML5 & CSS3

**Backend Technologies**
- Node.js
- Express.js
- RESTful APIs

**Database**
- MongoDB 

---
## Demo Video
Watch a walkthrough (5–7 minutes) of all major features of this app: [Video Link]()

---
## Features
**Home**
- Featured product categories with quick navigation
- Global search bar for real-time product discovery

**Product Listing**
- Filter and sort products by category and attributes
- Responsive grid layout for browsing products

**Product Details**
- View complete product information and pricing
- Add products to cart or wishlist

**Wishlist & Cart**
- Manage saved and selected products
- Update quantities and remove items

**Checkout**
- Address selection and order summary
- Secure order placement with backend persistence

**User Profile**
- View and manage personal details and addresses
- Access order history

**UX Enhancements**
- Loading indicators for async actions
- Toast notifications for success and error states

---
## API References
### **GET /products**
Fetch all pet store products

Sample Response:
```
[{ "_id", "name", "price", "category", "image", ... }]
```

### **GET /products/:productId**
Get detailed information for a single product

Sample Response:
```
{
  "data": {
    "product": { "_id", "name", "price", "description", "category", ... }
  }
}
```

### **GET /categories**
Retrieve a unique list of all product categories

Sample Response:
```
{
  "data": {
    "categories": ["Dogs", "Cats", "Accessories", ...]
  }
}
```

### **POST /orders/history**
Save a new order to the database

Sample Response:
```
{
  "message": "order saved successfully.",
  "order": { "_id", "items", "totalAmount", ... }
}
```

### **GET /orders/history**
Fetch all previously placed orders

Sample Response:
```
[
  { "_id", "items", "totalAmount", "createdAt", ... }
]
```

---
## Contact
For bugs or feature requests, please reach out to abhishekgautam1966@gmail.com
# Real-Time Order Management System

A full-stack order management system frontend built with React.js, featuring PDF invoice upload to Cloudinary, form validation with react-hook-form, and toast notifications.

---

## Live link: https://legendary-concha-91ce94.netlify.app/

---

## Features

- Create orders with:
  - Customer name
  - Order amount
  - Invoice PDF upload (via file select or drag & drop)
- Upload invoice PDFs directly to Cloudinary
- Generate unique order IDs (UUID)
- Form validation with error messages
- Toast notifications for success and errors
- Responsive and clean UI using Tailwind CSS and DaisyUI
- View order details and download invoices 

---

## Tech Stack

- React.js (Vite)
- Tailwind CSS & DaisyUI
- React Hook Form (form management & validation)
- Axios (HTTP client)
- React Hot Toast (notifications)
- UUID (unique order IDs)
- Cloudinary (pdf file hosting)

---

## Getting Started

### Prerequisites

- Node.js 
- npm or yarn
- Cloudinary account (for PDF uploads)
- Backend API URL (to save order data)

---

### Frontend Setup

1. **Clone the repo**

```bash
git clone https://github.com/yourusername/order-management-frontend.git
cd order-management-frontend
````

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file in project root**

Add the following environment variables:

```env
VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/<your-cloud-name>/auto/upload
VITE_UPLOAD_PRESET=<your-upload-preset>
VITE_API_URL=http://localhost:5000/api  # or your backend API URL
```

* Replace `<your-cloud-name>` and `<your-upload-preset>` with your Cloudinary credentials.
* Set `VITE_API_URL` to your backend API base URL.

4. **Run the app locally**

```bash
npm run dev
```

Open `http://localhost:3000` (or the port shown in console) to view the app.

---

## Usage

* Navigate to **Create Order** page.
* Fill in customer name and order amount.
* Upload an invoice PDF via click or drag & drop.
* Click **Create Order**.
* On success, the order is saved to backend, and invoice uploaded to Cloudinary.
* View orders on the dashboard (backend API required).

---

## Folder Structure

```
/src
  /components
  /pages
  App.jsx
  main.jsx
/public
  _redirects  (for Netlify SPA routing)
.env
package.json
tailwind.config.js
```

---

## Deployment (Netlify)

1. Build the app

```bash
npm run build
```

2. Create a new site on Netlify and connect your GitHub repo.

3. Set build command to:

```
npm run build
```

4. Set publish directory to:

```
build
```

5. Add environment variables on Netlify dashboard matching your `.env`.

6. Add a `_redirects` file in `/public` with:

```
/* /index.html 200
```

to enable client-side routing.

---

## Troubleshooting

* **PDF not uploading?** Make sure your Cloudinary URL and preset are correct and unsigned upload is enabled.
* **Form errors?** Check console logs and verify validation messages.
* **Routing issues on refresh?** Ensure `_redirects` file is present with correct content for Netlify.
* **CORS errors?** Backend should enable CORS for your frontend domain.

---

## Backend Setup

1. Create a `.env` file in the backend project root with the following content:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/orderdb?retryWrites=true&w=majority
PORT=3000
```

* Replace `<username>`, `<password>`, and the connection string according to your MongoDB Atlas or local MongoDB setup.
* You can change the `PORT` if needed.

2. Install dependencies:

```bash
npm install
```

3. Run the backend server:

```bash
node index.js
```

---

### API Endpoints

| Method | Endpoint     | Description                            | Request Body                                                                                | Response                                      |
| ------ | ------------ | -------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------- |
| GET    | `/allorders` | Retrieve all orders (latest first)     | None                                                                                        | Array of order objects                        |
| GET    | `/order/:id` | Get a single order by MongoDB ObjectId | None                                                                                        | Order object                                  |
| POST   | `/order`     | Create a new order                     | JSON order object: <br> `{ orderId, customerName, orderAmount, invoiceFileUrl, orderDate }` | JSON confirmation message & inserted order ID |

---

### Order Object Structure

```json
{
  "_id": "bb9f20c2-09c4-4512-99ce-6a2dfd16c5f1",
  "orderId": "bb9f20c2-09c4-4512-99ce-6a2dfd16c5f1",
  "customerName": "John Doe",
  "orderAmount": 99.99,
  "invoiceFileUrl": "https://res.cloudinary.com/your-cloud-name/...",
  "orderDate": "2025-08-03T08:00:00Z"
}
```

---

### Notes

* The server listens on the port specified in the `.env` file (default 3000).
* CORS is enabled to allow frontend requests.
* MongoDB is used to store orders in the `orders` collection within the `orderdb` database.
* The backend expects the frontend to provide the full order object including the invoice URL.

---

### Example cURL Requests

**Get all orders**

```bash
curl http://localhost:3000/allorders
```

**Get order by ID**

```bash
curl http://localhost:3000/order/60f7c8a9b4d1c81234567890
```

**Create a new order**

```bash
curl -X POST http://localhost:3000/order \
-H "Content-Type: application/json" \
-d '{
  "_id": "bb9f20c2-09c4-4512-99ce-6a2dfd16c5f1",
  "orderId": "bb9f20c2-09c4-4512-99ce-6a2dfd16c5f1",
  "customerName": "John Doe",
  "orderAmount": 99.99,
  "invoiceFileUrl": "https://res.cloudinary.com/your-cloud-name/...",
  "orderDate": "2025-08-03T08:00:00Z"
}'
```

---

## Backend Deployment on Vercel

1. Create a `vercel.json` file in your backend root directory:

```json
{
    "version": 2,
    "builds": [
        {
            "src": "index.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "index.js",
            "methods": [
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS"
            ]
        }
    ]
}
```

2. Install Vercel CLI if not already installed:

```bash
npm install -g vercel
```

3. **Login to Vercel**:

```bash
vercel login
```

Follow the prompts to authenticate.

4. Initialize your project with Vercel:

```bash
vercel
```

* Choose **Create new project**
* Select **Other** for framework
* Leave build/output commands empty


  
5. Add your environment variables (e.g., MongoDB URI):

```bash
vercel env add MONGO_URI production
```

6. Deploy to production:

```bash
vercel --prod
```

Your backend will be accessible at the generated Vercel URL.









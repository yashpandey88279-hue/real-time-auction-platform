# 🏆 Real-Time Auction Platform

A full-stack web application for real-time bidding on auction items using Next.js, Node.js/Express, MongoDB, and Socket.IO.

## 📋 Features

✅ User Authentication (Register/Login with JWT)
✅ Real-Time Bidding with WebSocket (Socket.IO)
✅ Live Countdown Timers
✅ Auction Management (Create, Edit, Delete)
✅ Bid History Tracking
✅ Responsive Design (Mobile-Friendly)
✅ Dark/Light Professional UI
✅ Dashboard for User Activity

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14
- React 18
- Socket.IO Client
- Axios
- Plain CSS

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- JWT (JSON Web Tokens)
- bcryptjs

## 📁 Project Structure

```
real-time-auction-platform/
├── client/                 # Next.js Frontend
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── styles/
│   └── package.json
├── server/                 # Node.js Backend
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── socket/
│   ├── scripts/
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/auction-platform
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

Seed the database with demo data:
```bash
npm run seed
```

Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## 📖 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Auctions
- `GET /api/auctions` - Get all active auctions
- `GET /api/auctions/:id` - Get auction details
- `POST /api/auctions` - Create new auction (protected)
- `PUT /api/auctions/:id` - Update auction (protected)
- `DELETE /api/auctions/:id` - Delete auction (protected)
- `GET /api/auctions/user/auctions` - Get user's auctions (protected)
- `GET /api/auctions/user/bids` - Get user's bids (protected)

## 🔌 Socket.IO Events

**Client → Server:**
- `join_auction` - Join an auction room
- `leave_auction` - Leave an auction room
- `place_bid` - Place a bid

**Server → Client:**
- `bid_updated` - Broadcast bid updates
- `bid_error` - Error placing bid
- `auction_ended` - Auction has ended

## 🔐 Authentication

- JWT tokens are stored in localStorage
- Include token in Authorization header: `Bearer <token>`
- Tokens expire in 7 days

## 📱 Pages

- `/` - Home page with active auctions
- `/login` - User login
- `/register` - User registration
- `/auctions/[id]` - Auction detail & bidding
- `/auctions/create` - Create new auction
- `/dashboard` - User dashboard (my auctions & bids)

## 🎨 Styling

- Dark/Light professional theme
- Fully responsive
- Plain CSS (no frameworks)
- Smooth animations and transitions

## 🗄️ Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Auctions Collection
```javascript
{
  title: String,
  description: String,
  imageUrl: String,
  startingBid: Number,
  currentBid: Number,
  seller: ObjectId (ref User),
  bids: [
    {
      user: ObjectId (ref User),
      amount: Number,
      timestamp: Date
    }
  ],
  endTime: Date,
  status: String (active/closed),
  winner: ObjectId (ref User),
  createdAt: Date
}
```

## 🧪 Demo Credentials

After running `npm run seed`:

**Seller Account:**
- Email: `seller@auction.com`
- Password: `password123`

**Bidder Accounts:**
- Alice: `alice@auction.com` / `password123`
- Bob: `bob@auction.com` / `password123`

## 🚀 Deployment

### Backend (Heroku/Railway)
```bash
heroku create your-app-name
git push heroku main
```

### Frontend (Vercel)
```bash
npm i -g vercel
vercel
```

## 📝 Environment Variables

**Backend (.env):**
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=production
CLIENT_URL=your_frontend_url
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_SOCKET_URL=your_backend_socket_url
```

## 🐛 Troubleshooting

**Socket.IO connection issues:**
- Ensure backend server is running
- Check CORS settings in server.js
- Verify Socket URL in frontend .env

**MongoDB connection errors:**
- Ensure MongoDB is running
- Check connection string in .env
- Verify network access (if using MongoDB Atlas)

**JWT authentication failures:**
- Clear localStorage and re-login
- Verify JWT_SECRET matches between .env files
- Check token expiration

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

---

Built with ❤️ for real-time auction enthusiasts
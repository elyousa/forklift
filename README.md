# 🚜 Forklift Inventory & Tracking App

A full-stack web application for monitoring forklift status and location in real-time using a dashboard UI. Built with Node.js, MySQL, and Socket.IO — fully containerized using Docker for local deployment and easy portability.

---

## 📦 Project Structure

```
forklift/
├── Server/
│   ├── app.js                 # Express backend with WebSocket support
│   ├── dbService.js           # Database abstraction
│   ├── schema.sql             # MySQL database schema
│   ├── init-user.sql
│   ├── Dockerfile             # Backend Docker setup
│   ├── docker-compose.yml     # Full-stack orchestration
│   ├── .env                   # Environment configuration
│   ├── .dockerignore          # Docker ignore patterns
│   ├── package.json           # Backend dependencies
│   ├── public/                # Frontend UI (formerly "Client")
│   │   ├── index.html
│   │   ├── dashboard.js
│   │   ├── inventoryTab.js
│   │   └── Pictures/
│   │       ├── glift.png
│   │       ├── rlift.png
│   │       ├── ylift.png
│   │       └── layout.jpg
│   └── wait-for.sh            # Script to wait for DB before booting app
```

---

## ⚙️ Setup Instructions

### ✅ Requirements
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
- Git installed

---

### 🐳 Run Locally Using Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/elyousa/forklift.git
   cd forklift
   ```

2. **Build and launch the full app**
   ```bash
   docker-compose -f Server/docker-compose.yml --env-file Server/.env up --build
   ```

3. **Access the dashboard**
   - Open [http://localhost:7000](http://localhost:7000)

---

## 📄 .env File:

```env
PORT=7000
USER=root
PASSWORD=magna
DATABASE=forklift_db
DB_PORT=3306
HOST=db
```

---

## 💾 Database Schema

This app uses a single table to track forklift data:

```sql
CREATE TABLE forklifts (
  ID VARCHAR(255) PRIMARY KEY,
  Name VARCHAR(255),
  Status VARCHAR(100),
  lat DECIMAL(5, 2),
  lng DECIMAL(5, 2)
);
```

Schema is applied automatically when the DB container is first started.

---

## 🔄 Real-Time Dashboard Updates

This app uses **WebSockets (Socket.IO)** to:
- Push forklift updates instantly to connected clients
- Eliminate the need for refresh buttons or polling
- Keep all users in sync as updates occur

---

## 🧠 Design Decisions

- **Socket.IO** for efficient, real-time communication
- **Dockerized stack** for reproducibility and easy local testing
- **Frontend served via Express** for simplicity
- **DB initialization via SQL script** on container startup

---

## 📌 Assumptions

- Forklift GPS coordinates are stored with decimal precision
- Forklift GPS coordinates are between 0 and 100
- App runs on port `7000` and MySQL is exposed on port `3307`

---

> 🗓 Last updated: April 10, 2025

# 🧶 Crochet Corner – Dockerized 3-Tier Application

A **Docker-focused 3-tier web application** built to gain hands-on experience with containerization, Docker Compose, Docker Hub, networking, health checks, and persistent storage.

The application consists of:

- **Frontend** – Vite + JavaScript
- **Backend** – Node.js + Express
- **Database** – MongoDB

> 🐳 **Primary Focus: Docker & Containerization**

---

## 🐳 Docker Implementation

This project focuses on implementing Docker concepts in a real multi-container application.

### Docker concepts demonstrated

- Multi-stage Docker builds
- Dockerfiles for frontend and backend
- Docker image creation and tagging
- Docker containers
- Docker Compose
- Docker Hub
- Docker networks
- Container-to-container communication
- Docker named volumes
- Database persistence
- Container health checks
- Service dependencies
- Port mapping
- Environment variables using `.env`
- Container restart policies
- Pulling images from Docker Hub
- Container troubleshooting and log monitoring

---

## 🏗️ Application Architecture

```text
                    User
                     |
                     | Port 3000
                     ↓
             ┌─────────────────┐
             │    Frontend     │
             │  Nginx + Vite   │
             │    Container    │
             └────────┬────────┘
                      |
                      | API
                      ↓
             ┌─────────────────┐
             │     Backend     │
             │ Node.js Express │
             │    Container    │
             └────────┬────────┘
                      |
                      | MongoDB
                      ↓
             ┌─────────────────┐
             │    MongoDB      │
             │    Container    │
             └────────┬────────┘
                      |
                      ↓
                Docker Volume
                  mongo-data

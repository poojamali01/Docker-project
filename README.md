# 🧶 Crochet Corner

A 3-tier web application built using Docker Compose.

## Architecture

Frontend:
- HTML
- CSS
- JavaScript
- Vite
- Nginx

Backend:
- Node.js
- Express

Database:
- MongoDB

Containerization:
- Docker
- Docker Compose
- Docker Hub

## Architecture Flow

Browser
↓
Frontend
↓
Backend API
↓
MongoDB

## Project Structure

crochet-corner/
├── frontend/
├── backend/
├── database/
├── docker-compose.yml
├── .env
└── README.md

## Docker Hub Images

Frontend:
YOUR_DOCKER_HUB_FRONTEND_LINK

Backend:
YOUR_DOCKER_HUB_BACKEND_LINK

## How to Run

Clone the repository.

Create the .env file.

Run:

docker compose pull

docker compose up

Open:

http://localhost:3000

## Services

Frontend: 3000

Backend: 5000

MongoDB: 27017

## Features

- View crochet products
- Add products
- MongoDB persistence
- REST API
- Docker containers
- Docker Compose
- Health checks
- Named volume
- Docker Hub images

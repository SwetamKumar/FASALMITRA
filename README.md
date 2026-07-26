# 🌾 FasalMitra (फसलमित्र)
### An Agricultural Connectivity Platform

> *"FasalMitra" means "Crop Friend" in Hindi — a digital companion for India's farming community.*

[![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen?style=flat-square&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-Vite%205-61DAFB?style=flat-square&logo=react)](https://vitejs.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)


## 📖 About the Project

FasalMitra is a full-stack web application built to bridge the gap between **farmers, buyers, and agricultural service providers** in India. The platform enables farmers to list their produce digitally, connect directly with verified buyers, and access services — eliminating middlemen and improving income transparency.

This project was developed as part of my **Industrial Training / Final Year Portfolio** at Ardent Computech Pvt. Ltd., reflecting a real-world problem faced by millions of farmers across Bihar and rural India.

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🔐 Role-Based Auth | Separate login flows for Farmers, Buyers, and Admin |
| 🌱 Crop Listing | Farmers can add, update, and remove produce with pricing |
| 🛒 Buyer Dashboard | Browse and filter available crops by category, region, or price |
| 🤝 Inquiry System | Direct connection requests between farmers and buyers |
| 🛠️ Admin Panel | Platform moderation, user management, listing approvals |
| 📱 Responsive UI | Mobile-friendly interface suitable for low-end devices |


## 🛠️ Tech Stack

### Backend
- **Java 17** — Core language
- **Spring Boot 3.2** — REST API development, MVC architecture
- **Spring Data JPA + Hibernate** — ORM and database interaction
- **Maven** — Dependency management and build

### Frontend
- **React.js** (with Vite 5) — Component-based UI
- **Axios** — API communication
- **React Router** — Client-side routing

### Database
- **MySQL 8.0** — Relational database
- **JPA Entities** — Mapped with manual getters/setters to avoid Lombok/Jackson recursion issues

### Dev Tools
- IntelliJ IDEA / Spring Tool Suite (STS)
- Git & GitHub
- Postman (API testing)

## 🗂️ Project Structure

```
FasalMitra/
├── backend/
│   ├── src/main/java/com/fasalmitra/
│   │   ├── controller/       # REST Controllers
│   │   ├── service/          # Business logic layer
│   │   ├── repository/       # JPA Repositories
│   │   ├── model/            # Entity classes
│   │   └── config/           # CORS, Security config
│   └── src/main/resources/
│       └── application.properties
│
└── frontend/
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── pages/            # Route-level pages
    │   ├── services/         # Axios API calls
    │   └── App.jsx
    └── vite.config.js
```

## ⚙️ Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8.0
- Maven 3.8+

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/FasalMitra.git
cd FasalMitra
```

### 2. Configure the Database

Create a MySQL database:

```sql
CREATE DATABASE fasalmitra_db;
```

Update `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/fasalmitra_db
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 3. Run the Backend

```bash
cd backend
mvn spring-boot:run
```

Backend starts on: `http://localhost:8080`

### 4. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts on: `http://localhost:5173`

## 🔌 API Endpoints (Sample)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register farmer or buyer |
| POST | `/api/auth/login` | Login and get token |
| GET | `/api/crops` | Get all crop listings |
| POST | `/api/crops/add` | Add a new crop (Farmer only) |
| PUT | `/api/crops/{id}` | Update crop listing |
| DELETE | `/api/crops/{id}` | Remove a listing |
| POST | `/api/inquiry/send` | Send inquiry to farmer |
| GET | `/api/admin/users` | Get all users (Admin only) |

## 🚀 Future Enhancements

- [ ] **Real-time price discovery** via Agmarknet / Agri market APIs
- [ ] **AI-based crop recommendation** using region and seasonal data
- [ ] **Multilingual support** — Hindi, Bhojpuri, and other regional languages
- [ ] **Integrated payment gateway** for direct farmer-buyer transactions
- [ ] **SMS / WhatsApp notifications** for farmers with limited internet access
- [ ] **Android app** using React Native
- [ ] **Weather integration** for farming advisories

## 🧠 What I Learned

Building FasalMitra from scratch gave me hands-on experience that goes well beyond coursework:

- **End-to-end REST API design** with Spring Boot — controllers, services, repositories, DTOs
- **Debugging JPA/Hibernate** — resolved a StackOverflow recursion issue in entity relationships by replacing Lombok with manual getters/setters
- **CORS configuration** between Spring Boot backend and React frontend
- **Role-based access control** patterns in a real application
- **User-centered thinking** — designing for farmers who may not be tech-savvy
- **Project structuring** — MVC layering, separation of concerns, and clean code habits

## 🙋‍♂️ Author

**Swetam Kumar**
- 📍 Bihar, India
- 🎓 B.Tech CSE | 2027 Batch
- 💼 [LinkedIn](www.linkedin.com/in/swetam-kumar-15a15a289)
- 🐙 [GitHub](https://github.com/SwetamKumar)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> *Built with ❤️ to empower India's farmers through technology.*

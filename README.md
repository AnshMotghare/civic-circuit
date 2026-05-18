# Civic Circuit Deployment Guide

This repository has two parts:
- Frontend: React + Vite in the repository root
- Backend: Spring Boot in the [Civic-Circuit](Civic-Circuit) folder
- Database: PostgreSQL on Railway

The steps below show how to deploy the frontend on Railway, connect the Spring Boot backend, and use Railway PostgreSQL.

## 1. Prepare the backend for Railway

Your Spring Boot backend should not use local database values in production. Replace the hardcoded PostgreSQL settings in [application.properties](Civic-Circuit/src/main/resources/application.properties) with environment variables or set them directly in Railway.

Use these environment variables in Railway:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `SPRING_JPA_HIBERNATE_DDL_AUTO`

Example production values:

```properties
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
spring.jpa.hibernate.ddl-auto=${SPRING_JPA_HIBERNATE_DDL_AUTO:update}
```

Also update CORS in [CorsConfig.java](Civic-Circuit/src/main/java/com/spring/civic/config/CorsConfig.java) so it allows your deployed Railway frontend URL instead of only localhost.

## 2. Create the PostgreSQL database on Railway

1. Log in to Railway.
2. Create a new project.
3. Add a PostgreSQL plugin.
4. Copy the Railway connection details.
5. Set them as the backend environment variables listed above.

Railway will give you the database URL, username, and password. Use those values in the Spring Boot service.

## 3. Deploy the Spring Boot backend on Railway

1. Create a new Railway service from the same repository.
2. Set the service root to the backend folder: [Civic-Circuit](Civic-Circuit)
3. Build command: `./mvnw clean package -DskipTests`
4. Start command: `java -jar target/Civic-Circuit-0.0.1-SNAPSHOT.jar`
5. Add the PostgreSQL environment variables.
6. Deploy the service.

If Railway asks for a port, let it use the default `PORT` environment variable.

## 4. Deploy the frontend on Railway

1. Create another Railway service for the frontend from the repository root.
2. Build command: `npm install && npm run build`
3. Start command: `npm run preview -- --host 0.0.0.0 --port $PORT`
4. Add this frontend environment variable:
	- `VITE_API_BASE_URL` = your deployed backend Railway URL
5. Deploy the frontend service.

If Railway prefers a static server for the frontend, you can also use a package like `serve` and start it against the Vite `dist` folder.

If you use Google sign-in, also add the Firebase variables in Railway:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## 5. Update the frontend backend URL

Your React app calls the backend through `VITE_API_BASE_URL` in files like [AuthModals.jsx](src/components/AuthModals.jsx), [Quiz.jsx](src/components/Quiz.jsx), [UsersDashboard.jsx](src/components/UsersDashboard.jsx), and [Supportpage.jsx](src/components/Supportpage.jsx).

After deployment, make sure `VITE_API_BASE_URL` points to the Railway backend URL, not `http://localhost:8080`.

## 6. Verify the deployment

1. Open the frontend Railway URL.
2. Sign up or log in.
3. Check that the app can fetch user stats from the backend.
4. Submit a quiz and confirm that PostgreSQL is saving the updated stats.
5. Test Google sign-in if it is enabled.

## 7. Common deployment issues

- If login fails, check that the backend CORS list includes the Railway frontend domain.
- If the database connection fails, confirm the Railway PostgreSQL variables are copied correctly.
- If the frontend cannot reach the backend, confirm `VITE_API_BASE_URL` is the deployed backend URL.
- If Google sign-in fails, confirm the Firebase `VITE_FIREBASE_*` values are set in Railway.

## 8. Local development commands

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
cd Civic-Circuit
./mvnw spring-boot:run
```

On Windows, you can use:

```bash
cd Civic-Circuit
mvnw.cmd spring-boot:run
```

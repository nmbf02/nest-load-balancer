# 🚀 Load Balancer Exploration in Kubernetes with a NestJS Application

## 📌 Overview
This project demonstrates how a **Kubernetes LoadBalancer** distributes traffic across multiple instances of a **NestJS** application. The project includes building the application, containerization with Docker, deploying on Kubernetes, and testing performance with Apache Bench (`ab`) and JMeter.

## 📁 Features
- 🏗 **NestJS API** with a `/load-test` endpoint.
- 🐳 **Dockerized application** for containerization.
- ☸️ **Kubernetes deployment** with multiple replicas.
- ⚖️ **Load balancing** using a `LoadBalancer` service.
- 🏎 **Performance testing** using **Apache Bench (ab)** and **JMeter**.

---

# 🛠️ **Step-by-Step Guide to Build & Deploy the Project**

## 📌 1. Install Required Dependencies
Make sure you have the following installed:
- **[Node.js (LTS)](https://nodejs.org/en/download)**
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**
- **[Kubernetes (kubectl)](https://kubernetes.io/docs/tasks/tools/)**
- **[Minikube (if not using Docker Desktop)](https://minikube.sigs.k8s.io/docs/start/)**
- **[JMeter (for performance testing)](https://jmeter.apache.org/download_jmeter.cgi)**
- **[Apache Bench (included in XAMPP for Windows)](https://www.apachefriends.org/index.html)**

---

## 📌 2. Create and Configure the NestJS Application
### 2.1. Create a New NestJS Project
```bash
npm i -g @nestjs/cli
nest new nest-load-balancer
cd nest-load-balancer
```

### 2.2. Create a Controller for Load Testing
Run:
```bash
nest generate controller load-test
```
Modify `src/load-test/load-test.controller.ts`:
```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('load-test')
export class LoadTestController {
  @Get()
  handleLoadTest(): string {
    let sum = 0;
    for (let i = 0; i < 1_000_000; i++) {
      sum += i;
    }
    return `Processed Load Test: ${sum}`;
  }
}
```

### 2.3. Register the Controller in `app.module.ts`
Modify `src/app.module.ts`:
```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoadTestController } from './load-test/load-test.controller';

@Module({
  controllers: [AppController, LoadTestController],
  providers: [AppService],
})
export class AppModule {}
```

### 2.4. Run Locally to Test
```bash
npm run start
```
Test with:
```
http://localhost:3000/load-test
```

---

## 📌 3. Dockerize the Application
### 3.1. Create a `Dockerfile` in the root folder
```dockerfile
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
```

### 3.2. Build and Tag the Docker Image
```bash
docker build -t your_dockerhub_username/nest-load-balancer .
```

### 3.3. Push the Image to Docker Hub
```bash
docker login
docker push your_dockerhub_username/nest-load-balancer
```

---

## 📌 4. Deploy to Kubernetes
### 4.1. Create Kubernetes Deployment
Create `k8s/deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nest-load-balancer
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nest-load-balancer
  template:
    metadata:
      labels:
        app: nest-load-balancer
    spec:
      containers:
        - name: nest-load-balancer
          image: your_dockerhub_username/nest-load-balancer
          ports:
            - containerPort: 3000
```

### 4.2. Create Kubernetes Service
Create `k8s/service.yaml`:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nest-load-balancer-service
spec:
  type: LoadBalancer
  selector:
    app: nest-load-balancer
  ports:
    - protocol: TCP
      port: 4000
      targetPort: 3000
```

### 4.3. Apply the Deployment and Service
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### 4.4. Verify Everything is Running
```bash
kubectl get pods
kubectl get services
```
Test with:
```
http://localhost:4000/load-test
```

---

## 📌 5. Performance Testing

### ✅ Apache Bench (`ab`)
Run:
```powershell
cd C:\xampp\apache\bin
.\ab.exe -n 1000 -c 10 http://localhost:4000/load-test
```

### ✅ JMeter
1. Open **JMeter** and create a **Thread Group**.
2. Configure:
   - **Threads (Users):** `100`
   - **Loop Count:** `10`
3. Add an **HTTP Request** pointing to `http://localhost:4000/load-test`.
4. Run the test and analyze results.

---

## 📌 6. Scaling and Observing Load Distribution
### 6.1. Increase Replicas
```bash
kubectl scale deployment nest-load-balancer --replicas=5
kubectl get pods
```

### 6.2. View Logs to Check Load Balancing
```bash
kubectl logs -f -l app=nest-load-balancer
```

---

## 📩 Contact
For any questions or contributions, feel free to reach out! 🚀
```

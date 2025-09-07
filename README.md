# Todos-AI-Agent-using-openAI-and-PostgreSQL

## 📝Todo Agent

An AI-powered Todo Manager that combines a PostgreSQL + Drizzle ORM backend with an Agentic AI assistant.
The AI assistant uses structured reasoning (PLAN → ACTION → OBSERVATION → OUTPUT) to manage todos intelligently.

## 🚀 Features

### ✅ Advanced Todo Management (via Drizzle ORM)
- Create structured todos with **mandatory titles** and **optional rich descriptions**.  
- Retrieve and visualize the **entire todo list** with metadata (timestamps, completion states).  
- Perform **granular updates** (title, description, completion status) while preserving audit timestamps.  
- Delete todos with strict referential integrity.  
- Full-text, case-insensitive **search across titles**, enabling intelligent query of tasks.

### 🐘 PostgreSQL in Docker
- PostgreSQL **v16** containerized for portability and reproducibility.  
- Persistent **volume-backed storage** ensures no data loss between runs.  
- Simple `docker compose up -d` workflow for local development and deployment parity.

### 🤖 Agentic AI Assistant
- Orchestrates task management using an **agentic reasoning loop**:  
  `START → PLAN → ACTION → OBSERVATION → OUTPUT`.  
- Leverages **tool-calling functions** (`createTodo`, `updateTodo`, `deleteTodoById`, `getAllTodos`, `searchTodo`).  
- Explicit schema enforcement ensures **title/description separation** when creating todos.  
- Produces deterministic, structured **JSON traces** for every interaction, enabling traceability and debugging.

---

## 🛠️ Tech Stack

- **Backend**: Node.js (ESM modules, async/await patterns)  
- **Database Layer**: Drizzle ORM (type-safe, schema-driven migrations)  
- **Database**: PostgreSQL (Dockerized, v16 with persistent volumes)  
- **AI Assistant**: Custom system prompt w/ agentic reasoning + OpenAI chat completions  
- **Migration Tooling**: `drizzle-kit` for schema versioning and reproducible migrations  

---
---

## ⚡ How to Run

### 1. Clone the Repository
```bash
git clone https://github.com/Ujjwalagrhri918/Todos-AI-Agent-using-openAI-and-PostgreSQL.git
cd Todos-AI-Agent-using-openAI-and-PostgreSQL
```
### 2. Install all the dependencies 
```bash
npm install
```
### 3. Set up the .env file 
```bash
OPENAI_API_KEY=your-openai-key-here
DATABASE_URL= postgresql://myuser:mypass@localhost:5431/mydb
```
### 4. Make sure you have Docker + Docker Compose installed.
```bash
docker compose up -d
```

### 5. Use drizzle-kit to apply schema migrations:
```bash
npx drizzle-kit generate
npx drizzle-kit push
```

### 6. Start the agent 
```bash
node index.js
```


<img width="2349" height="215" alt="image" src="https://github.com/user-attachments/assets/535016b0-5306-406a-91eb-d1bc5ce6d892" />

<img width="2347" height="248" alt="image" src="https://github.com/user-attachments/assets/83017db1-1708-4184-b3f0-fbddb84e7802" />
<hr>

<img width="2340" height="386" alt="image" src="https://github.com/user-attachments/assets/7a32d87b-13aa-4deb-9b1a-06706c42ca22" />

<img width="2347" height="308" alt="image" src="https://github.com/user-attachments/assets/e580e349-bcd5-4f2b-9547-62a55cd6de74" />
<hr>

<img width="2331" height="346" alt="image" src="https://github.com/user-attachments/assets/b454c67e-12a8-474d-b500-3c240bb26a5c" />

<img width="2350" height="324" alt="image" src="https://github.com/user-attachments/assets/10067f08-df7e-4f6f-8d2e-8bb3ea507252" />

<hr>
<img width="2334" height="182" alt="image" src="https://github.com/user-attachments/assets/9d17ed69-5f91-468d-b32b-e914c549221c" />

<hr>
<img width="2326" height="183" alt="image" src="https://github.com/user-attachments/assets/2a378cfd-75b2-4b06-ab40-e9c8b1a6a5ae" />

<img width="2345" height="240" alt="image" src="https://github.com/user-attachments/assets/444ff342-2615-4152-8382-2064cf95a0b6" />

<hr>


Made with ❤️ by Ujjwal





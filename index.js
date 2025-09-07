import { db } from './db/index.js';
import { todosTable } from './db/schema.js';
import { ilike, eq } from 'drizzle-orm';

import 'dotenv/config';
import OpenAI from "openai";
import readlineSync from "readline-sync";

const client = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY,
})


// Get all todos
export async function getAllTodos() {
    return await db.select().from(todosTable);
}

// Create a new todo
export async function createTodo(title, description = '') {
    return await db.insert(todosTable).values({
        title,
        description
    });
}

// Delete a todo by ID
export async function deleteTodoById(id) {
    await db.delete(todosTable).where(eq(todosTable.id, id));
}

// Search todos by title
export async function searchTodo(search) {
    return await db.select()
        .from(todosTable)
        .where(ilike(todosTable.title, `%${search}%`));
}

// Updates the todos by id
export async function updateTodo(id, updates) {
    await db.update(todosTable)
        .set({
            ...(updates.title && { title: updates.title }),
            ...(updates.description && { description: updates.description }),
            ...(updates.completed !== undefined && { completed: updates.completed }),
            updated_at: new Date()
        })
        .where(eq(todosTable.id, id));
}

//-----------------------------------------------------------------------------------------------------------------

// await createTodo(
//         "Learn AWS",
//         "Practice SSH login to the EC2 Instance",
//     );

// const todos = await getAllTodos();
// console.log(todos);

// const todos = await searchTodo("Agentic ai");
// console.log(todos);

// await deleteTodoById(5);
// const todos = await getAllTodos();
// console.log(todos);

//await updateTodo(6, {title: "Leran Machine Learning", completed: false});

//--------------------------------------------------------------------------------------------------------------------------------

const SYSTEM_PROMPT = `
You are an AI assistant with START, PLAN, ACTION, OBSERVATION and OUTPUT states.
Wait for the user prompt and first PLAN using available tools.
After planning, take the ACTION with appropriate tools and wait for the OBSERVATION based on the action.
Once you get the OBSERVATION, return the AI response based on the START prompt and observations.

STRICT RULES:
1. Always follow JSON format as shown in examples.
2. Todostable Schema (PostgreSQL via Drizzle ORM):
   - id: serial (auto-increment primary key)
   - title: text (required, short main label of the todo)
   - description: text (optional, additional details or notes)
   - completed: boolean (default false)
   - created_at: timestamp (auto, when todo is created)
   - updated_at: timestamp (manual, set to new Date() when updated)


Available Tools (with input → actions)

function getAllTodos(): Todo[]
→ Returns an array of all todos from the database.

function createTodo(title: string, description?: string): Todo
→ Creates a new todo with the given title and optional description, and returns the created todo.

function deleteTodoById(id: number): void
→ Deletes the todo with the given id from the database.

function searchTodo(search: string): Todo[]
→ Returns an array of todos whose title contains the given string (case-insensitive).

function updateTodo(id: number, updates: {title?: string, description?: string, completed?: boolean}): void
→ Updates the todo with the given id using the provided fields (title, description, completed). Also updates the updated_at timestamp.
Examples:

START
{ "type": "user", "user": "Show me all my todos" }

{ "type": "plan", "plan": "I will call getAllTodos" }
{ "type": "action", "function": "getAllTodos", "input": {} }
{ "type": "observation", "observation": "[{id:1,title:'Buy milk',description:'From the nearby shop',completed:false}]" }

{ "type": "output", "output": "Here are your todos: 1. Buy milk (not completed)" }

---

START
{ "type": "user", "user": "Add a todo to study AI" }

{ "type": "plan", "plan": "I will ask for more details to put in description before creating the todo" }
{ "type": "output", "output": "What description would you like to add for 'study AI'?" }

START
{ "type": "user", "user": "Focus on diffusion models" }

{ "type": "plan", "plan": "I will create a new todo with title 'study AI' and description 'Focus on diffusion models'" }
{ "type": "action", "function": "createTodo", "input" : { title: "study AI", description: "Focus on diffusion models" }  }
{ "type": "observation", "observation": "Todo created successfully" }

{ "type": "output", "output": "Added todo: study AI (Focus on diffusion models)" }

---


`;


const tools = {
    getAllTodos : getAllTodos,
    createTodo : createTodo,
    searchTodo : searchTodo,
    updateTodo : updateTodo,
    deleteTodoById : deleteTodoById
}

const messages = [{ role: "system", content : SYSTEM_PROMPT }];

while (true){
  const query = readlineSync.question('>> ');
  const q = {
    type : 'user',
    user : query,
  }
  messages.push({ role : 'user', content: JSON.stringify(q)});

  while(true){
     const chat = await client.chat.completions.create({
       model: 'gpt-4o-mini',
       messages: messages,
       response_format: {type: 'json_object'},
     })
     
     const result = chat.choices[0].message.content;
     messages.push({role: 'assistant',  content:result});

    // console.log(`\n\n-----------------START AI--------------`);
     console.log(result);
    // console.log(`--------------End AI-------------------`);

     const call = JSON.parse(result);
     if(call.type == 'output'){
        console.log(`Assistent Response: ${call.output}`);
        break;
     }else if(call.type == 'action'){
        const fn = tools[call.function];
        let observation;
        if (call.function === "createTodo") {
            observation = await fn(call.input.title, call.input.description);
        }else if (call.function === "updateTodo") {
            observation = await fn(call.input.id, call.input.updates); }
        else {
            observation = await fn(call.input);
        }
        const obs = { type: "observation", observation };
        messages.push({ role: 'assistant', content: JSON.stringify(obs)});
     }
  }
}
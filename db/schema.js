import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const todosTable = pgTable('todo', {
  id: serial('id').primaryKey(),                       // Auto-increment primary key
  title: text('title').notNull(),                      // Title of the todo
  description: text('description'),                    // Optional description
  completed: boolean('completed').default(false),      // Is the task done?
  created_at: timestamp('created_at').defaultNow(),    // Auto timestamp
  updated_at: timestamp('updated_at').defaultNow(),    // Update manually in code
});

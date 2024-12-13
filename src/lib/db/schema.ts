import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const dreams = pgTable('dreams', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  interpretation: text('interpretation'),
  mood: text('mood'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const dreamSymbols = pgTable('dream_symbols', {
  id: uuid('id').defaultRandom().primaryKey(),
  symbol: text('symbol').notNull(),
  generalMeaning: text('general_meaning').notNull(),
  culturalContext: text('cultural_context'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
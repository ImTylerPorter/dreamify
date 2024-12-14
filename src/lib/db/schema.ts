import {
  pgEnum,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
} from 'drizzle-orm/pg-core';

// Authentication schema
const auth = pgSchema('auth');

// Users table in the "auth" schema
export const authUsers = auth.table('users', {
  id: uuid('id').primaryKey()
});

// Enum for user roles
export const userRoleEnum = pgEnum('user_role', ['admin', 'normal']);

// Profiles table
export const profileTable = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  firstName: varchar('first_name'),
  lastName: varchar('last_name'),
  email: varchar('email'),
  displayName: varchar('display_name'),
  bio: varchar('bio'),
  role: varchar('role').default('user'),
  profileImage: varchar('profile_image'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Dreams table
export const dreamsTable = pgTable('dreams', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => authUsers.id, { onDelete: 'cascade' }), // Cascade delete dreams if user is deleted
  title: varchar('title', { length: 200 }).notNull(), // Add length constraint
  content: text('content').notNull(),
  interpretation: text('interpretation'),
  mood: varchar('mood', { length: 50 }), // Add length constraint for predefined moods
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

// Dream Symbols table
export const dreamSymbolsTable = pgTable('dream_symbols', {
  id: uuid('id').defaultRandom().primaryKey(),
  symbol: varchar('symbol', { length: 100 }).notNull(),
  generalMeaning: text('general_meaning').notNull(),
  culturalContext: text('cultural_context'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

// Interpretations table for tracking usage
export const interpretationsTable = pgTable('interpretations', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  date: timestamp('date', { withTimezone: true }).defaultNow().notNull(),
  count: integer('count').notNull().default(0) // Number of interpretations used on this date
});

// Subscriptions table for managing premium users
export const subscriptionsTable = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  plan: varchar('plan', { length: 50 }).notNull().default('free'), // e.g., 'free', 'premium', 'pro'
  status: varchar('status', { length: 50 }).notNull().default('active'), // e.g., 'active', 'canceled', 'paused'
  renewalDate: timestamp('renewal_date', { withTimezone: true }), // When the subscription renews
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

// Analytics table for tracking dream trends
export const analyticsTable = pgTable('analytics', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  symbolId: uuid('symbol_id')
    .references(() => dreamSymbolsTable.id, { onDelete: 'set null' }), // Optional reference
  mood: varchar('mood', { length: 50 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

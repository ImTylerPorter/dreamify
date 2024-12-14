import { pgTable, serial, text, pgPolicy, uuid, varchar, timestamp, integer, unique, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const userRole = pgEnum("user_role", ['admin', 'normal'])


export const dreamSymbols = pgTable("dream_symbols", {
	id: serial().primaryKey().notNull(),
	symbol: text().notNull(),
	generalMeaning: text("general_meaning").notNull(),
});

export const dreams = pgTable("dreams", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	title: varchar({ length: 200 }).notNull(),
	content: text().notNull(),
	interpretation: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	mood: varchar({ length: 50 }),
}, () => [
	pgPolicy("Users can update their own dreams", { as: "permissive", for: "update", to: ["public"], using: sql`(auth.uid() = user_id)` }),
	pgPolicy("Users can select their own dreams", { as: "permissive", for: "select", to: ["public"] }),
	pgPolicy("Users can insert their own dreams", { as: "permissive", for: "insert", to: ["public"] }),
]);

export const analytics = pgTable("analytics", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	symbolId: uuid("symbol_id"),
	mood: varchar({ length: 50 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const interpretations = pgTable("interpretations", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	date: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	count: integer().default(0).notNull(),
});

export const profiles = pgTable("profiles", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	firstName: varchar("first_name"),
	lastName: varchar("last_name"),
	email: varchar(),
	displayName: varchar("display_name"),
	bio: varchar(),
	role: varchar().default('user'),
	profileImage: varchar("profile_image"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	plan: varchar({ length: 50 }).default('free').notNull(),
	status: varchar({ length: 50 }).default('active').notNull(),
	renewalDate: timestamp("renewal_date", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("subscriptions_user_id_unique").on(table.userId),
]);

import { pgTable, uuid, text, integer, boolean, timestamp, unique, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// -------- entities --------
// one row per unique minecraft username being tracked
export const entities = pgTable("entities", {
  id: uuid("id").primaryKey().defaultRandom(),
  minecraftUsername: text("minecraft_username").notNull().unique(),
  totalReports: integer("total_reports").notNull().default(0),
  lastReportedAt: timestamp("last_reported_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// -------- entity_ips --------
// deduplicated IPs linked to an entity, built up across all reports
export const entityIps = pgTable("entity_ips", {
  id: uuid("id").primaryKey().defaultRandom(),
  entityId: uuid("entity_id").notNull().references(() => entities.id, { onDelete: "cascade" }),
  ipAddress: text("ip_address").notNull(),
  reportCount: integer("report_count").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [
  unique().on(t.entityId, t.ipAddress),
]);

// -------- reports --------
// one row per individual report submission
export const reports = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  entityId: uuid("entity_id").notNull().references(() => entities.id, { onDelete: "cascade" }),

  // category: bot | hacker | malicious_player | unknown
  category: text("category").notNull(),
  // subcategory: null only when category is 'unknown', otherwise required
  subcategory: text("subcategory"),

  causedHarm: boolean("caused_harm").notNull(),
  threatLevel: integer("threat_level"), // 0-10, optional
  comments: text("comments"),

  // stored for rate limiting - 1 report per entity per reporter IP per week
  // enforced in application code (not a unique constraint since window is time-based)
  reporterIp: text("reporter_ip").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [
  // categories are bot, hacker, malicious_player, and unknown
  check("category_valid", sql`${t.category} IN ('bot', 'hacker', 'malicious_player', 'unknown')`),
  // subcategory can't be null, except "unknown" MUST be null because it has no subcategories
  check("subcategory_required", sql`
    (${t.category} = 'unknown' AND ${t.subcategory} IS NULL)
    OR
    (${t.category} != 'unknown' AND ${t.subcategory} IS NOT NULL)
  `),
  // threat level range must be null or between 0 and 10
  check("threat_level_range", sql`
    ${t.threatLevel} IS NULL
    OR (${t.threatLevel} >= 0 AND ${t.threatLevel} <= 10)
  `),
]);

// -------- report_ips --------
// raw IPs as submitted on a specific report - collected to limit one report per entity per reporter
// separate from entity_ips - this is the unprocessed per-report record
export const reportIps = pgTable("report_ips", {
  id: uuid("id").primaryKey().defaultRandom(),
  reportId: uuid("report_id").notNull().references(() => reports.id, { onDelete: "cascade" }),
  ipAddress: text("ip_address").notNull(),
});

// -------- types --------
export type Entity = typeof entities.$inferSelect;
export type Report = typeof reports.$inferSelect;
export type EntityIp = typeof entityIps.$inferSelect;
export type ReportIp = typeof reportIps.$inferSelect;

export type NewEntity = typeof entities.$inferInsert;
export type NewReport = typeof reports.$inferInsert;
export type NewEntityIp = typeof entityIps.$inferInsert;
export type NewReportIp = typeof reportIps.$inferInsert;

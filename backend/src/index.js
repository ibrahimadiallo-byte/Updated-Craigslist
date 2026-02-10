import express from "express";
import cors from "cors";
import { all, get, initDb, run } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

const VALID_CATEGORIES = ["Jobs", "Housing", "For Sale", "Services"];
const PAID_CATEGORIES = new Set(["Jobs", "Housing"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

initDb();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/listings", async (req, res) => {
  const { title, description, category, price, contact_email, image_url } = req.body || {};

  if (!title || !description || !category || !contact_email) {
    return res.status(400).json({
      error: "ValidationError",
      message: "title, description, category, and contact_email are required",
    });
  }

  if (typeof title !== "string" || typeof description !== "string") {
    return res.status(400).json({
      error: "ValidationError",
      message: "title and description must be strings",
    });
  }

  if (!VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({
      error: "ValidationError",
      message: "category must be one of: Jobs, Housing, For Sale, Services",
    });
  }

  if (typeof contact_email !== "string" || !EMAIL_RE.test(contact_email)) {
    return res.status(400).json({
      error: "ValidationError",
      message: "contact_email must be a valid email address",
    });
  }

  if (price !== undefined && price !== null && typeof price !== "number") {
    return res.status(400).json({
      error: "ValidationError",
      message: "price must be a number if provided",
    });
  }

  const is_paid = PAID_CATEGORIES.has(category) ? 1 : 0;
  const created_at = new Date().toISOString();

  try {
    const result = await run(
      `
      INSERT INTO listings (title, description, category, price, contact_email, image_url, is_paid, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [title, description, category, price ?? null, contact_email, image_url ?? null, is_paid, created_at]
    );

    const listing = await get("SELECT * FROM listings WHERE id = ?", [result.lastID]);
    listing.is_paid = Boolean(listing.is_paid);

    return res.status(201).json(listing);
  } catch (err) {
    return res.status(500).json({ error: "ServerError", message: "failed to create listing" });
  }
});

app.get("/api/listings", async (req, res) => {
  const { category } = req.query;

  if (category && !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({
      error: "ValidationError",
      message: "category must be one of: Jobs, Housing, For Sale, Services",
    });
  }

  try {
    const rows = category
      ? await all(
          "SELECT * FROM listings WHERE category = ? ORDER BY datetime(created_at) DESC",
          [category]
        )
      : await all("SELECT * FROM listings ORDER BY datetime(created_at) DESC");

    const listings = rows.map((row) => ({ ...row, is_paid: Boolean(row.is_paid) }));
    return res.json(listings);
  } catch (err) {
    return res.status(500).json({ error: "ServerError", message: "failed to fetch listings" });
  }
});

app.get("/api/listings/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "ValidationError",
      message: "id must be a positive integer",
    });
  }

  try {
    const listing = await get("SELECT * FROM listings WHERE id = ?", [id]);
    if (!listing) {
      return res.status(404).json({ error: "NotFound", message: "listing not found" });
    }

    listing.is_paid = Boolean(listing.is_paid);
    return res.json(listing);
  } catch (err) {
    return res.status(500).json({ error: "ServerError", message: "failed to fetch listing" });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

import { initDb, run } from "./db.js";

const listings = [
  {
    title: "Software Engineer - Remote",
    description: "We're hiring a full-stack developer to join our team.",
    category: "Jobs",
    price: 80000,
    contact_email: "hr@company.com",
    image_url: null,
  },
  {
    title: "2BR Apartment - Downtown",
    description: "Spacious 2BR apartment close to transit and shops.",
    category: "Housing",
    price: 1500,
    contact_email: "landlord@email.com",
    image_url: null,
  },
  {
    title: "Used Couch for Sale",
    description: "Barely used, great condition. Pickup only.",
    category: "For Sale",
    price: 100,
    contact_email: "seller@email.com",
    image_url: null,
  },
  {
    title: "Handyman Services",
    description: "Affordable home repairs and maintenance.",
    category: "Services",
    price: null,
    contact_email: "handyman@email.com",
    image_url: null,
  },
];

const PAID_CATEGORIES = new Set(["Jobs", "Housing"]);

async function seed() {
  initDb();

  for (const listing of listings) {
    const is_paid = PAID_CATEGORIES.has(listing.category) ? 1 : 0;
    const created_at = new Date().toISOString();

    await run(
      `
      INSERT INTO listings (title, description, category, price, contact_email, image_url, is_paid, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        listing.title,
        listing.description,
        listing.category,
        listing.price,
        listing.contact_email,
        listing.image_url,
        is_paid,
        created_at,
      ]
    );
  }

  console.log("Seeded sample listings.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

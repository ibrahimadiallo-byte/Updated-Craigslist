import { initDb, run } from "./db.js";

const listings = [
  {
    title: "Software Engineer - Remote",
    description: "We're hiring a full-stack developer to join our team.",
    category: "Jobs",
    subcategories: ["accounting/finance", "admin/office"],
    location: "bronx",
    city: "Bronx",
    zip: "10451",
    price: 80000,
    contact_email: "hr@company.com",
    image_url: null,
    employment_type: "full-time",
    experience_level: "mid-level",
    company_name: "Acme Corp",
  },
  {
    title: "2BR Apartment - Downtown",
    description: "Spacious 2BR apartment close to transit and shops.",
    category: "Housing",
    subcategories: ["apartment/condo"],
    location: "brooklyn",
    city: "Brooklyn",
    zip: "11201",
    price: 1500,
    contact_email: "landlord@email.com",
    image_url: null,
    employment_type: null,
    experience_level: null,
    company_name: null,
  },
  {
    title: "Used Couch for Sale",
    description: "Barely used, great condition. Pickup only.",
    category: "For Sale",
    subcategories: ["furniture"],
    location: "queens",
    city: "Queens",
    zip: "11373",
    price: 100,
    contact_email: "seller@email.com",
    image_url: null,
    employment_type: null,
    experience_level: null,
    company_name: null,
  },
  {
    title: "Handyman Services",
    description: "Affordable home repairs and maintenance.",
    category: "Services",
    subcategories: ["home-repair"],
    location: "manhattan",
    city: "New York",
    zip: "10001",
    price: null,
    contact_email: "handyman@email.com",
    image_url: null,
    employment_type: null,
    experience_level: null,
    company_name: null,
  },
];

const PAID_CATEGORIES = new Set(["Jobs", "Housing"]);

async function seed() {
  initDb();

  for (const listing of listings) {
    const is_paid = PAID_CATEGORIES.has(listing.category) ? 1 : 0;
    const created_at = new Date().toISOString();

    const subcategoriesValue = listing.subcategories
      ? JSON.stringify(listing.subcategories)
      : null;

    await run(
      `
      INSERT INTO listings (
        title,
        description,
        category,
        subcategories,
        location,
        city,
        zip,
        price,
        contact_email,
        image_url,
        is_paid,
        employment_type,
        experience_level,
        company_name,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        listing.title,
        listing.description,
        listing.category,
        subcategoriesValue,
        listing.location,
        listing.city,
        listing.zip,
        listing.price,
        listing.contact_email,
        listing.image_url,
        is_paid,
        listing.employment_type,
        listing.experience_level,
        listing.company_name,
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

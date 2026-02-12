const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

function fail(msg) {
  console.error("Contract check failed:", msg);
  process.exit(1);
}

function isIsoDate(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function validateListing(listing) {
  const required = [
    "id",
    "title",
    "description",
    "category",
    "subcategories",
    "location",
    "city",
    "zip",
    "price",
    "contact_email",
    "image_url",
    "is_paid",
    "employment_type",
    "experience_level",
    "company_name",
    "created_at",
  ];

  for (const key of required) {
    if (!(key in listing)) fail(`missing field: ${key}`);
  }

  if (typeof listing.id !== "number") fail("id must be a number");
  if (typeof listing.title !== "string") fail("title must be a string");
  if (typeof listing.description !== "string") fail("description must be a string");
  if (!["Jobs", "Housing", "For Sale", "Services"].includes(listing.category)) {
    fail("category must be one of Jobs, Housing, For Sale, Services");
  }
  if (listing.price !== null && typeof listing.price !== "number") {
    fail("price must be number or null");
  }
  if (!Array.isArray(listing.subcategories)) {
    fail("subcategories must be an array");
  }
  if (listing.location !== null && typeof listing.location !== "string") {
    fail("location must be string or null");
  }
  if (listing.city !== null && typeof listing.city !== "string") {
    fail("city must be string or null");
  }
  if (listing.zip !== null && typeof listing.zip !== "string") {
    fail("zip must be string or null");
  }
  if (typeof listing.contact_email !== "string") fail("contact_email must be a string");
  if (listing.image_url !== null && typeof listing.image_url !== "string") {
    fail("image_url must be string or null");
  }
  if (typeof listing.is_paid !== "boolean") fail("is_paid must be boolean");
  if (listing.employment_type !== null && typeof listing.employment_type !== "string") {
    fail("employment_type must be string or null");
  }
  if (listing.experience_level !== null && typeof listing.experience_level !== "string") {
    fail("experience_level must be string or null");
  }
  if (listing.company_name !== null && typeof listing.company_name !== "string") {
    fail("company_name must be string or null");
  }
  if (!isIsoDate(listing.created_at)) fail("created_at must be ISO date string");
}

async function fetchJson(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) fail(`${path} returned ${res.status}`);
  return res.json();
}

async function main() {
  const listings = await fetchJson("/api/listings");
  if (!Array.isArray(listings)) fail("/api/listings must return an array");
  if (listings.length === 0) {
    console.warn("No listings returned. Seed data first with: npm run seed");
    process.exit(0);
  }

  validateListing(listings[0]);

  const id = listings[0].id;
  const byId = await fetchJson(`/api/listings/${id}`);
  validateListing(byId);

  console.log("Contract check passed.");
}

main().catch((err) => fail(err.message));

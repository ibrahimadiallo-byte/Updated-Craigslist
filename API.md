# API Contract

This document defines the backend API contract for the Craigslist clone. It is intended to keep frontend and backend aligned while development proceeds.

Base URL (local): `http://localhost:3000`
All endpoints are JSON unless stated otherwise.

## Data Model: Listing

Fields returned by the API:
- `id` (number)
- `title` (string)
- `description` (string)
- `category` (string: `Jobs`, `Housing`, `For Sale`, `Services`)
- `price` (number | null)
- `contact_email` (string)
- `image_url` (string | null)
- `is_paid` (boolean)
- `created_at` (ISO 8601 string)

### Business Rules
- If `category` is `Jobs` or `Housing`, then `is_paid` must be `true`.
- If `category` is `For Sale` or `Services`, then `is_paid` must be `false`.
- `price` is optional for all categories.
- `image_url` is optional.
- `title` and `description` must be strings.
- `contact_email` must be a valid email address.
- If provided, `price` must be a number.

## Endpoints

### Create Listing
`POST /api/listings`

Request body:
```json
{
  "title": "Software Engineer - Remote",
  "description": "We're hiring a full-stack developer...",
  "category": "Jobs",
  "price": 80000,
  "contact_email": "hr@company.com",
  "image_url": null
}
```

Response: `201 Created`
```json
{
  "id": 1,
  "title": "Software Engineer - Remote",
  "description": "We're hiring a full-stack developer...",
  "category": "Jobs",
  "price": 80000,
  "contact_email": "hr@company.com",
  "image_url": null,
  "is_paid": true,
  "created_at": "2026-02-10T18:30:00.000Z"
}
```

Validation errors: `400 Bad Request`
```json
{
  "error": "ValidationError",
  "message": "title, description, category, and contact_email are required"
}
```

### Get All Listings
`GET /api/listings`

Response: `200 OK`
```json
[
  {
    "id": 1,
    "title": "Software Engineer - Remote",
    "description": "We're hiring a full-stack developer...",
    "category": "Jobs",
    "price": 80000,
    "contact_email": "hr@company.com",
    "image_url": null,
    "is_paid": true,
    "created_at": "2026-02-10T18:30:00.000Z"
  }
]
```

### Filter Listings by Category
`GET /api/listings?category=Jobs`

Response: `200 OK`
```json
[
  {
    "id": 1,
    "title": "Software Engineer - Remote",
    "description": "We're hiring a full-stack developer...",
    "category": "Jobs",
    "price": 80000,
    "contact_email": "hr@company.com",
    "image_url": null,
    "is_paid": true,
    "created_at": "2026-02-10T18:30:00.000Z"
  }
]
```

Validation errors: `400 Bad Request`
```json
{
  "error": "ValidationError",
  "message": "category must be one of: Jobs, Housing, For Sale, Services"
}
```

### Get Listing by ID
`GET /api/listings/:id`

Response: `200 OK`
```json
{
  "id": 1,
  "title": "Software Engineer - Remote",
  "description": "We're hiring a full-stack developer...",
  "category": "Jobs",
  "price": 80000,
  "contact_email": "hr@company.com",
  "image_url": null,
  "is_paid": true,
  "created_at": "2026-02-10T18:30:00.000Z"
}
```

Not found: `404 Not Found`
```json
{
  "error": "NotFound",
  "message": "listing not found"
}
```

## Notes for Frontend
- The frontend should treat `is_paid` as the source of truth for showing paid badges.
- Dates are ISO strings; format on the client for display.
- If you plan to support file uploads later, keep `image_url` nullable for now.

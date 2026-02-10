# Updated-Craigslist
Product Requirements Document (PRD)
Craigslist Clone - Classifieds Platform

📋 Project Overview
Product Name: Craigslist Clone (Classifieds Platform)
Team Members: [Paula] & [Ibrahima]
Timeline: 1 Week
Business Model: Advertising - Paid listings for job postings and housing rentals
Objective: Build a simplified classifieds platform that demonstrates the core advertising business model where businesses pay to post certain types of listings (jobs, housing) while regular users browse for free.

🤝 Team Responsibilities
Backend (Ibrahima)
- Maintain API contract in API.md
- Database schema and persistence (SQLite)
- Core endpoints:
  POST /api/listings
  GET /api/listings
  GET /api/listings?category=...
  GET /api/listings/:id
- Validation and consistent error responses
Frontend (Paula)
- Build UI using API.md as the contract
- Integrate GET endpoints for listing and filtering
- Add POST integration once UI is ready

🧰 Backend Setup (Node + Express)
1. Install dependencies:
   cd "Updated Craigslist/backend"
   npm install
2. Seed sample data (optional):
   npm run seed
3. Start server:
   npm run dev
4. Verify in browser:
   http://localhost:3000/api/health
   http://localhost:3000/api/listings
5. Contract check (optional):
   npm run check

🎯 Product Vision
Create a minimal viable classifieds platform where:
Users can post listings across different categories
Most listings are free (items for sale, services)
Businesses pay to post job openings and apartment rentals
Users can browse all listings organized by category
Why This Demonstrates Advertising Business Model:
Platform: Our classifieds site
Advertisers: Businesses posting paid job/housing listings
Audience: Users browsing listings for free
Revenue: Businesses pay for visibility to reach our audience

✅ In Scope (What We're Building)
Core Features
1. Post a Listing
Simple form with fields:
Title (text input)
Description (textarea)
Category (dropdown: Jobs, Housing, For Sale, Services)
Price (number input, optional)
Contact email (text input)
Single image upload (optional)
Automatic detection: If category is "Jobs" or "Housing" → mark as paid listing
Confirmation screen after posting
2. Browse Listings by Category
Homepage with category list:
Jobs
Housing
For Sale
Services
Click category → see all listings in that category
Each listing shows:
Title
Price (if applicable)
Short description preview
Badge showing "PAID LISTING" for jobs/housing
Posted date
Click individual listing → full detail page
3. View Individual Listing
Full listing detail page showing:
Title
Full description
Price
Category
Contact email
Image (if uploaded)
Posted date
"PAID LISTING" badge if applicable
4. Paid Listing Indicator
Visual distinction for paid listings:
Badge/flag showing "Sponsored" or "Paid Listing"
Different background color or border
Demonstrates the advertising model clearly
5. Simple Payment Simulation
When posting in Jobs or Housing category:
Show message: "Job postings cost $25" or "Housing postings cost $5"
Checkbox: "I agree to pay [amount] for this listing"
No actual payment processing (just simulate it)
Mark listing as "paid" in database
Technical Requirements
Frontend:
4 main pages:
Homepage (category list)
Create listing page (form)
Category view page (filtered listings)
Individual listing detail page
Responsive design (mobile-friendly, basic CSS)
Clean, minimal UI (Craigslist aesthetic - simple and functional)
Backend:
RESTful API with endpoints:
POST /api/listings - Create new listing
GET /api/listings - Get all listings
GET /api/listings?category={category} - Filter by category
GET /api/listings/:id - Get specific listing
Database schema:
Listings Table:
id (primary key)
title (string)
description (text)
category (string: Jobs, Housing, For Sale, Services)
price (decimal, optional)
contact_email (string)
image_url (string, optional)
is_paid (boolean - true for Jobs/Housing)
created_at (timestamp)
Data Storage:
SQLite or PostgreSQL database
Store images locally or use simple cloud storage (optional)

❌ Out of Scope (What We're NOT Building)
Features We're Skipping:
User Accounts & Authentication
No signup/login system
No user profiles
No "my listings" dashboard
Justification: Craigslist barely requires accounts; keeps scope manageable
Search Functionality
No keyword search
No advanced filters (price range, date posted, location)
Justification: Browsing by category is the core feature
Messaging System
No in-app messaging between poster and interested parties
Users contact via email shown in listing
Justification: Too complex for one week
Edit/Delete Listings
No ability to edit or remove posted listings
Justification: Not core to demonstrating business model
Real Payment Processing
No Stripe/PayPal integration
Just simulate payment with checkbox
Justification: Payment integration is time-consuming and not necessary for demo
Image Gallery
Maximum 1 image per listing
No multiple image uploads
No image carousel
Justification: Simplifies file handling
Advanced Features
No favoriting/saving listings
No email notifications
No spam/fraud detection
No reporting/flagging system
No admin dashboard
No analytics/metrics
No geolocation/maps
No related listings suggestions
Justification: Not essential to core business model demonstration
Styling Polish
No fancy animations
No custom design system
Basic, clean CSS only
Justification: Craigslist is intentionally bare-bones; functional > beautiful

👤 User Flows
User Flow 1: Posting a Free Listing (For Sale Item)
1. User lands on Homepage
   ↓
2. User clicks "Post a Listing" button
   ↓
3. User fills out form:
   - Title: "Used Couch for Sale"
   - Description: "Barely used, great condition..."
   - Category: Select "For Sale"
   - Price: $100
   - Contact: user@email.com
   - Upload image (optional)
   ↓
4. User clicks "Submit"
   ↓
5. System saves listing to database (is_paid = false)
   ↓
6. User sees confirmation: "Your listing has been posted!"
   ↓
7. User is redirected to their listing detail page
   ↓
8. Listing appears in "For Sale" category
Success Criteria: Listing appears in correct category, no payment required, all info displays correctly

User Flow 2: Posting a Paid Listing (Job Posting)
1. User lands on Homepage
   ↓
2. User clicks "Post a Listing" button
   ↓
3. User fills out form:
   - Title: "Software Engineer - Remote"
   - Description: "We're hiring a full-stack developer..."
   - Category: Select "Jobs"
   - Price: $80,000/year (optional salary field)
   - Contact: hr@company.com
   ↓
4. System detects "Jobs" category
   ↓
5. Page shows: "⚠️ Job postings cost $25"
   ↓
6. Checkbox appears: "☐ I agree to pay $25 for this job posting"
   ↓
7. User checks box and clicks "Submit"
   ↓
8. System saves listing to database (is_paid = true)
   ↓
9. User sees confirmation: "Your paid job listing has been posted!"
   ↓
10. User is redirected to their listing detail page
    ↓
11. Listing appears in "Jobs" category with "PAID LISTING" badge
Success Criteria: System correctly identifies paid category, displays pricing, marks listing as paid, badge shows on listing

User Flow 3: Browsing Listings (Job Seeker)
1. User lands on Homepage
   ↓
2. User sees category list:
   - Jobs
   - Housing
   - For Sale
   - Services
   ↓
3. User clicks "Jobs"
   ↓
4. User sees list of all job postings:
   - Each shows: Title, brief description, "PAID LISTING" badge
   - Sorted by most recent first
   ↓
5. User clicks on "Software Engineer - Remote" listing
   ↓
6. User sees full listing detail:
   - Full title
   - Complete description
   - Salary info
   - Contact email
   - "PAID LISTING" badge
   - Posted date
   ↓
7. User contacts employer via email shown
Success Criteria: Category filtering works, listings display correctly, paid badges visible, contact info accessible

User Flow 4: Browsing From Homepage to Listing Detail
1. User lands on Homepage
   ↓
2. User sees 4 category options
   ↓
3. User clicks "Housing"
   ↓
4. User sees all housing listings with:
   - "PAID LISTING" badges (since Housing is paid category)
   - Apartment titles and prices
   - Preview descriptions
   ↓
5. User clicks "2BR Apartment - Downtown"
   ↓
6. User sees full apartment details:
   - Photos
   - Full description
   - Price: $1,500/month
   - Contact: landlord@email.com
   - Posted 2 days ago
   ↓
7. User contacts landlord via email
Success Criteria: Navigation flows smoothly, all housing marked as paid, information complete and accessible

🎨 Basic Wireframes/Page Structure
Homepage
┌─────────────────────────────────┐
│   CLASSIFIEDS PLATFORM          │
│   [Post a Listing Button]       │
├─────────────────────────────────┤
│                                 │
│   Browse by Category:           │
│                                 │
│   📋 Jobs (PAID)                │
│   🏠 Housing (PAID)             │
│   🛍️ For Sale                   │
│   ⚙️ Services                   │
│                                 │
└─────────────────────────────────┘
Create Listing Page
┌─────────────────────────────────┐
│   Post a Listing                │
├─────────────────────────────────┤
│   Title: [____________]         │
│   Description: [__________]     │
│   Category: [Dropdown ▼]       │
│   Price: [______]              │
│   Contact Email: [_________]    │
│   Upload Image: [Choose File]   │
│                                 │
│   ⚠️ Job postings cost $25      │
│   ☐ I agree to pay             │
│                                 │
│   [Submit Listing]              │
└─────────────────────────────────┘
Category View (e.g., Jobs)
┌─────────────────────────────────┐
│   ← Back to Categories          │
│   Jobs                          │
├─────────────────────────────────┤
│                                 │
│  ┌──────────────────────────┐  │
│  │ 💼 Software Engineer     │  │
│  │ PAID LISTING             │  │
│  │ Remote - $80k/year...    │  │
│  │ Posted: 1 day ago        │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │ 💼 Marketing Manager     │  │
│  │ PAID LISTING             │  │
│  │ NYC - Competitive pay... │  │
│  │ Posted: 3 days ago       │  │
│  └──────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
Listing Detail Page
┌─────────────────────────────────┐
│   ← Back to Jobs               │
├─────────────────────────────────┤
│   Software Engineer - Remote    │
│   🏷️ PAID LISTING               │
│   Posted: 1 day ago             │
├─────────────────────────────────┤
│   [Image if uploaded]           │
│                                 │
│   Price: $80,000/year           │
│                                 │
│   Description:                  │
│   We're hiring a full-stack     │
│   developer to join our team... │
│   (full description here)       │
│                                 │
│   Contact: hr@company.com       │
│                                 │
│   Category: Jobs                │
└─────────────────────────────────┘

🔧 Technical Stack Recommendation
Frontend:
HTML/CSS/JavaScript (Vanilla) OR
React (if both comfortable with it)
Basic responsive CSS (mobile-friendly)
Backend:
Node.js + Express OR
Python + Flask
RESTful API architecture
Database:
PostgreSQL (recommended) OR
SQLite (simpler, file-based)
File Storage (for images):
Local storage in /uploads folder OR
Cloudinary (free tier) for simplicity
Deployment (Optional):
Frontend: Vercel/Netlify
Backend: Render/Railway
Database: Built-in with hosting platform

📊 Success Metrics
Functional Requirements Met:
✅ User can post a listing
✅ User can browse listings by category
✅ User can view individual listing details
✅ Paid listings (Jobs/Housing) are clearly marked
✅ Payment simulation works for paid categories
✅ All data persists in database
Advertising Business Model Demonstrated:
✅ Clear distinction between free and paid listings
✅ Businesses "pay" to post jobs/housing
✅ Regular users browse for free
✅ Revenue model is obvious and understandable
Technical Requirements Met:
✅ Database properly stores and retrieves data
✅ API endpoints function correctly
✅ Frontend communicates with backend
✅ No critical bugs in core flows
✅ Responsive design works on mobile and desktop

📅 Development Timeline (1 Week)
Day 1-2: Setup & Backend
Set up project structure
Create database schema
Build API endpoints
Test endpoints with Postman/Insomnia
Day 3-4: Frontend Core
Build homepage with categories
Create listing form
Build category view page
Build listing detail page
Day 5: Integration
Connect frontend to backend
Test all user flows
Fix bugs
Day 6: Polish & Testing
Add paid listing badges/indicators
Improve styling (keep minimal)
Test payment simulation
Ensure responsive design
Day 7: Final Demo Prep
Final testing of all flows
Prepare demo presentation
Document what was built and why
Prepare to explain advertising business model

🎤 Demo Presentation Points
When presenting your clone, emphasize:
Business Model: "This is a classifieds platform using the advertising business model. Businesses pay to post jobs and housing listings, while regular users browse for free."


Revenue Stream: "We generate revenue by charging $25 for job postings and $5 for housing listings. These are clearly marked as 'PAID LISTING' to show transparency."


Core Feature: "The core feature is posting and browsing listings by category. We focused on this instead of complex features like user accounts or search because it demonstrates the business model most clearly."


Technical Achievement: "We built a full-stack application with [your tech stack], including database persistence, RESTful API, and responsive frontend in one week."


Scalability Potential: "While this is a simplified version, it could scale by adding search, user accounts, real payment processing, and more categories."



📝 Rationale for Product Selection
Why Craigslist?
Clear Advertising Model: Businesses pay for certain listing categories - easy to understand and demonstrate
Simple Design: Craigslist's minimalist interface means we can focus on functionality over fancy UI
Achievable Scope: Core feature (post + browse) is buildable in one week
Real-World Recognition: Everyone knows Craigslist, making it easy to explain
Demonstrates Learning: Shows understanding of paid advertising, two-sided marketplace, and freemium elements
What Makes This Challenging But Achievable:
Challenge: Building both frontend and backend, handling file uploads, database design
Achievable: Scope is limited to core features, no complex algorithms, well-defined requirements

✅ Definition of Done
The project is complete when:
A user can post a listing in any category
Listings in Jobs/Housing categories show payment simulation
All listings are stored in database and persist
Users can browse listings by clicking category
Users can view full details of any listing
Paid listings have visual indicators (badges)
Basic responsive styling is implemented
All 4 user flows work end-to-end with no critical bugs
Team can demo the product and explain the advertising business model clearly

👥 Team Responsibilities (Suggested Split)
Option 1: Frontend/Backend Split
Person A: Backend (database, API, server logic)
Person B: Frontend (pages, forms, styling, API integration)
Option 2: Feature Split
Person A: "Post Listing" feature (form + backend endpoint + payment logic)
Person B: "Browse Listings" feature (category pages + detail view + backend queries)
Both Should:
Communicate daily on progress
Review each other's code
Test the full application together
Collaborate on final demo prep

📚 Resources & References
Craigslist for Research:
https://craigslist.org - Use extensively to understand flows
Technical Documentation:
Express.js docs (if using Node)
Flask docs (if using Python)
PostgreSQL/SQLite docs
MDN Web Docs for frontend
Business Model Context:
Review how Craigslist charges for different listing types
Understand CPM, CPC, CPA models from earlier discussion
Research other classifieds platforms (OfferUp, Facebook Marketplace) for comparison

Good luck! You've got this. Focus on the core feature, keep it simple, and make sure the advertising business model is crystal clear in your demo. 🚀

# Analytics Implementation Plan - Admin Panel

## Overview

This document outlines all production-grade analytics that can be added to the admin dashboard. The e-commerce platform manages **Users, Products, Categories, Orders, Cart Items, Wishlists, Banners, Announcements**, and **Content** - each providing rich analytics opportunities.

---

## 1. Revenue Analytics

### 1.1 Revenue Over Time
- **Chart Type:** Line/Area chart
- **Granularity:** Daily, Weekly, Monthly, Yearly
- **Metrics:** Total revenue, Net revenue (after cancellations)
- **Features:**
  - Date range picker (Last 7/30/90 days, Custom range)
  - Comparison mode (vs previous period)
  - Tooltip with exact values and % change
- **Data Source:** `orders.totalAmount` filtered by status != CANCELLED

### 1.2 Average Order Value (AOV)
- **Chart Type:** Single stat card with trend sparkline
- **Formula:** Total Revenue / Total Orders
- **Breakdown:** By day/week/month
- **Features:** Trend indicator (up/down arrow with %)

### 1.3 Revenue by Order Status
- **Chart Type:** Donut/Pie chart
- **Segments:** Processing, Shipped, Delivered, Cancelled
- **Metrics:** Revenue contribution per status, Order count per status
- **Features:** Click segment to filter orders table

### 1.4 Revenue by Category
- **Chart Type:** Horizontal bar chart
- **Metrics:** Revenue per category, % of total revenue
- **Features:** Sortable by revenue or growth rate

### 1.5 Revenue by Product
- **Chart Type:** Table with mini bar charts
- **Metrics:** Top 10/20 products by revenue
- **Columns:** Product name, Revenue, Units sold, Avg price, Trend

### 1.6 Revenue Forecast
- **Chart Type:** Line chart with projection
- **Features:** Predicted revenue for next 30/60/90 days based on historical trends

---

## 2. Order Analytics

### 2.1 Orders Over Time
- **Chart Type:** Bar chart
- **Granularity:** Daily, Weekly, Monthly
- **Metrics:** Order count, Fulfilled vs Pending
- **Features:** Stacked bar (by status), Date range filter

### 2.2 Order Status Distribution
- **Chart Type:** Funnel chart or Donut chart
- **Stages:** Processing -> Shipped -> Delivered
- **Metrics:** Count at each stage, Drop-off rate, Avg time per stage
- **Features:** Identify bottlenecks in fulfillment

### 2.3 Order Fulfillment Time
- **Chart Type:** Histogram or Box plot
- **Metrics:** Avg time from order to delivery, Median fulfillment time
- **Breakdown:** By shipping region, by product category

### 2.4 Order Cancellation Rate
- **Chart Type:** Line chart + stat card
- **Formula:** Cancelled Orders / Total Orders * 100
- **Features:** Trend over time, Top reasons (if tracked)

### 2.5 Repeat Order Rate
- **Chart Type:** Stat card + cohort table
- **Formula:** Users with >1 order / Total ordering users
- **Features:** Cohort analysis by signup month

---

## 3. Product Analytics

### 3.1 Top-Selling Products
- **Chart Type:** Ranked list with thumbnail images
- **Metrics:** Units sold, Revenue, Revenue trend
- **Features:** Filter by category, date range, Top N selector (5/10/20/50)

### 3.2 Product Performance Matrix
- **Chart Type:** Scatter plot (BCG Matrix style)
- **Axes:** X = Units sold, Y = Revenue per unit
- **Quadrants:** Stars, Cash Cows, Question Marks, Dogs
- **Features:** Hover for product details, Click to navigate to product edit

### 3.3 Products by Category Distribution
- **Chart Type:** Treemap or Sunburst chart
- **Metrics:** Product count per category, Revenue per category
- **Features:** Drill-down into subcategories (if added later)

### 3.4 Pricing Tier Performance
- **Chart Type:** Stacked bar chart
- **Metrics:** Sales per pricing tier (from `product.priceTiers`)
- **Features:** Identify most popular price points

### 3.5 Grab Deal Utilization
- **Chart Type:** Stat cards + bar chart
- **Metrics:** Total grab deal redemptions, Revenue from grab deals, Avg grab code usage
- **Features:** Compare grab vs regular pricing performance

### 3.6 Product Tag Analysis
- **Chart Type:** Word cloud or horizontal bar chart
- **Metrics:** Most common `productTags` and `offerTags`
- **Features:** Identify trending product attributes

### 3.7 Inactive/Low-Performing Products
- **Chart Type:** Table with alerts
- **Metrics:** Products with 0 orders in last 30/60/90 days
- **Features:** Flag for review/discontinuation

---

## 4. User Analytics

### 4.1 User Growth Over Time
- **Chart Type:** Line chart with area fill
- **Granularity:** Daily, Weekly, Monthly
- **Metrics:** New users, Cumulative users, Active users
- **Features:** Cohort overlay, Growth rate indicator

### 4.2 User Role Distribution
- **Chart Type:** Donut chart
- **Segments:** User, Admin, Moderator
- **Metrics:** Count per role, % of total

### 4.3 User Engagement Metrics
- **Chart Type:** Stat cards
- **Metrics:**
  - Total registered users
  - Active users (placed order in last 30 days)
  - Dormant users (no activity in 90+ days)
  - Users with saved addresses
- **Features:** Trend indicators, Drill-down to user list

### 4.4 User Order Frequency
- **Chart Type:** Histogram
- **Buckets:** 1 order, 2-3 orders, 4-5 orders, 6+ orders
- **Metrics:** Distribution of users by order count
- **Features:** Identify power users vs one-time buyers

### 4.5 User Lifetime Value (LTV)
- **Chart Type:** Line chart + stat card
- **Formula:** Avg Revenue per User over their lifetime
- **Features:** LTV by cohort, LTV trend over time

### 4.6 Geographic Distribution (if address data used)
- **Chart Type:** Map or bar chart
- **Metrics:** Orders/users by city, state, country
- **Data Source:** `addresses` table

---

## 5. Cart & Wishlist Analytics

### 5.1 Cart Abandonment Rate
- **Chart Type:** Funnel chart
- **Stages:** Products viewed -> Added to cart -> Checkout started -> Order placed
- **Formula:** 1 - (Orders / Carts created)
- **Note:** Requires adding cart creation tracking to backend

### 5.2 Cart Contents Analysis
- **Chart Type:** Table + bar chart
- **Metrics:** Total items in carts across all users, Most carted products, Avg cart value
- **Data Source:** `cart_items` table

### 5.3 Wishlist Popularity
- **Chart Type:** Ranked list
- **Metrics:** Most wishlisted products, Wishlist-to-purchase conversion rate
- **Data Source:** `wishlist` table

### 5.4 Cart-to-Order Conversion
- **Chart Type:** Line chart over time
- **Formula:** Orders with cart items / Total carts
- **Features:** Identify conversion trends

---

## 6. Category Analytics

### 6.1 Category Performance Dashboard
- **Chart Type:** Grid of cards with mini charts
- **Per Category:**
  - Product count
  - Total revenue
  - Order count
  - Avg product price
  - Top product in category
- **Features:** Sortable, Filterable, Click to filter products

### 6.2 Category Growth Rate
- **Chart Type:** Line chart (multi-line)
- **Metrics:** Revenue growth per category over time
- **Features:** Identify growing vs declining categories

---

## 7. Content & Marketing Analytics

### 7.1 Banner Performance
- **Chart Type:** Table with metrics
- **Per Banner:**
  - Impressions (requires tracking)
  - Clicks (requires tracking)
  - CTR (Click-through rate)
  - Conversions from banner
- **Note:** Requires adding click/impression tracking to backend

### 7.2 Announcement Engagement
- **Chart Type:** Stat cards
- **Metrics:** Active announcements, Views per announcement
- **Note:** Requires adding view tracking

### 7.3 Top Bar Offer Effectiveness
- **Chart Type:** Stat card + correlation chart
- **Metrics:** Orders placed while offer bar was active
- **Features:** Correlate offer bar text with order spikes

---

## 8. Dashboard Overview (Executive Summary)

### 8.1 KPI Stat Cards (Real-time, not hardcoded)
| Metric | Calculation | Trend |
|--------|-------------|-------|
| Total Revenue | Sum of `orders.totalAmount` (non-cancelled) | vs previous period |
| Total Orders | Count of orders | vs previous period |
| Average Order Value | Revenue / Orders | vs previous period |
| Total Users | Count of users | vs previous period |
| Conversion Rate | Orders / Sessions* | vs previous period |
| Cart Abandonment Rate | 1 - (Orders/Carts)* | vs previous period |

*Requires additional tracking

### 8.2 Quick Insights Panel
- **Auto-generated insights:**
  - "Revenue increased by X% this week"
  - "Product Y is your top seller this month"
  - "Z users signed up today"
  - "N orders are pending fulfillment"
- **Alerts:**
  - Low stock products (if inventory tracking added)
  - Spike in cancellations
  - Unusual order volume

### 8.3 Recent Activity Feed
- **Chronological list:**
  - New orders
  - New user registrations
  - Products created/updated
  - Status changes
- **Features:** Filterable by activity type, Time range

---

## 9. Advanced Analytics (Future Phase)

### 9.1 Cohort Analysis
- **Chart Type:** Heatmap table
- **Metrics:** User retention by signup cohort
- **Rows:** Signup month, **Columns:** Months since signup
- **Values:** % of cohort still active

### 9.2 RFM Analysis (Recency, Frequency, Monetary)
- **Chart Type:** Segmentation table
- **Segments:** Champions, Loyal Customers, At Risk, Hibernating, Lost
- **Features:** Targeted marketing actions per segment

### 9.3 Product Affinity Analysis
- **Chart Type:** Network graph or association table
- **Metrics:** Products frequently bought together
- **Data Source:** `order_items` grouped by `orderId`

### 9.4 Seasonal Trends
- **Chart Type:** Multi-year overlay line chart
- **Metrics:** Revenue/orders by month across years
- **Features:** Identify seasonal patterns

### 9.5 Customer Acquisition Cost (CAC)
- **Chart Type:** Stat card + trend line
- **Formula:** Marketing Spend / New Customers
- **Note:** Requires marketing spend tracking

### 9.6 LTV:CAC Ratio
- **Chart Type:** Stat card with gauge
- **Benchmark:** 3:1 is healthy
- **Features:** Track over time

---

## 10. Implementation Requirements

### 10.1 Dependencies to Install
```bash
# Charting library (choose one)
npm install recharts                    # Recommended for React
# OR
npm install chart.js react-chartjs-2    # Alternative
# OR
npm install apexcharts react-apexcharts # Alternative

# Date handling
npm install date-fns                    # Date formatting & manipulation

# Optional: Advanced visualizations
npm install @visx/visx                  # D3-based React components
```

### 10.2 Backend Endpoints Needed

| Endpoint | Purpose | Data Returned |
|----------|---------|---------------|
| `GET /api/v1/analytics/revenue` | Revenue over time | Array of {date, revenue, orderCount} |
| `GET /api/v1/analytics/revenue-by-category` | Revenue per category | Array of {category, revenue, growth} |
| `GET /api/v1/analytics/top-products` | Top selling products | Array of {product, units, revenue} |
| `GET /api/v1/analytics/order-status` | Order status breakdown | Object {status: count} |
| `GET /api/v1/analytics/user-growth` | User acquisition | Array of {date, newUsers, cumulative} |
| `GET /api/v1/analytics/cart-stats` | Cart metrics | Object {totalCarts, avgValue, abandonmentRate} |
| `GET /api/v1/analytics/wishlist-stats` | Wishlist metrics | Array of {product, wishlistCount, conversionRate} |
| `GET /api/v1/analytics/kpis` | Dashboard KPIs | Object with all stat card values |
| `GET /api/v1/analytics/cohort` | Cohort retention | 2D array for heatmap |
| `GET /api/v1/analytics/fulfillment-time` | Fulfillment metrics | Object {avg, median, p95} |

### 10.3 Frontend Components to Build

| Component | Purpose |
|-----------|---------|
| `AnalyticsDashboard.jsx` | Main analytics page |
| `RevenueChart.jsx` | Revenue over time chart |
| `OrderStatusChart.jsx` | Order status donut chart |
| `TopProductsTable.jsx` | Top products ranked list |
| `UserGrowthChart.jsx` | User acquisition line chart |
| `CategoryPerformance.jsx` | Category bar charts |
| `KPIStatCard.jsx` | Reusable stat card with trend |
| `DateRangePicker.jsx` | Date range selector |
| `InsightsPanel.jsx` | Auto-generated insights |
| `ActivityFeed.jsx` | Recent activity timeline |
| `CartWishlistAnalytics.jsx` | Cart & wishlist metrics |
| `CohortHeatmap.jsx` | Cohort retention heatmap |

### 10.4 Database Indexes to Add (Performance)
```sql
-- Speed up analytics queries
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_wishlist_product_id ON wishlist(product_id);
```

---

## 11. Priority Implementation Order

### Phase 1: Core Dashboard (Week 1-2)
- [ ] Install charting library (Recharts recommended)
- [ ] Fix hardcoded stat cards with real data + trends
- [ ] Revenue over time chart
- [ ] Order status distribution chart
- [ ] Recent orders table (already exists, enhance)
- [ ] Date range picker

### Phase 2: Product & User Analytics (Week 3-4)
- [ ] Top-selling products
- [ ] Revenue by category
- [ ] User growth chart
- [ ] Average order value
- [ ] User role distribution

### Phase 3: Cart, Wishlist & Content (Week 5-6)
- [ ] Cart analytics
- [ ] Wishlist analytics
- [ ] Banner/content metrics (requires backend tracking)
- [ ] Quick insights panel

### Phase 4: Advanced Analytics (Week 7-8)
- [ ] Cohort analysis
- [ ] Fulfillment time metrics
- [ ] Product affinity
- [ ] RFM segmentation
- [ ] Export to CSV/PDF

---

## 12. Design Guidelines

### Chart Standards
- **Colors:** Use consistent palette (define in Tailwind config)
- **Tooltips:** Always show exact values + context
- **Responsive:** Charts must adapt to mobile/tablet/desktop
- **Loading states:** Use Skeleton components while fetching
- **Empty states:** Use EmptyState component when no data
- **Accessibility:** ARIA labels, keyboard navigation, color-blind safe palettes

### Layout Standards
- **Grid:** 12-column responsive grid
- **Spacing:** Consistent padding/margins (Tailwind spacing scale)
- **Cards:** Use existing Card/CardBody components
- **Typography:** Consistent heading hierarchy

---

## 13. Data Freshness Strategy

| Analytics Type | Update Frequency | Method |
|----------------|------------------|--------|
| KPI Stat Cards | Real-time | React Query refetch on mount + interval |
| Revenue Charts | Every 5 minutes | React Query staleTime |
| Top Products | Every 15 minutes | React Query staleTime |
| Cohort Analysis | Daily | Backend caching |
| Advanced Metrics | Hourly/Daily | Materialized views or cron jobs |

---

## 14. Export & Reporting

### Export Formats
- CSV (all tabular data)
- PDF (charts + summary)
- Excel (multi-sheet reports)

### Scheduled Reports
- Daily summary email
- Weekly performance digest
- Monthly comprehensive report

---

## Summary

| Category | Analytics Count | Priority |
|----------|----------------|----------|
| Revenue | 6 | High |
| Orders | 5 | High |
| Products | 7 | High |
| Users | 6 | High |
| Cart/Wishlist | 4 | Medium |
| Categories | 2 | Medium |
| Content/Marketing | 3 | Low |
| Advanced | 6 | Future |
| **Total** | **39 analytics** | |

This plan covers everything from basic dashboard improvements to advanced business intelligence features, all tailored to your existing data models and admin panel structure.

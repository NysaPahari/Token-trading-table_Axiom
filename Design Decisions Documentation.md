# Token Trading Table Project: Design Decisions Documentation

This document explains the key architectural and design decisions made during the development of the **Token Trading Table** project. The focus is on achieving the core goals: **pixel-perfect UI**, **sub-100ms interactions**, and **high maintainability**.

---

## 1. State Management Architecture: Clear Separation of Concerns (React Query + Redux Toolkit)

| Tool | Role | Rationale |
| :--- | :--- | :--- |
| **React Query** | Server State Management (data fetching, caching, synchronisation, optimistic updates). | Provides built-in caching and background refetching, **significantly reducing boilerplate and improving data consistency and performance.** |
| **Redux Toolkit** | Global Client UI State Management (sorting, filtering, modal state). | Reserved exclusively for complex UI state that must be shared across disparate components, **maintaining predictability and minimizing unnecessary component re-renders.** |

### Implementation:
* All token data flows from the API **directly into React Query's cache.**
* Redux stores only simple UI control parameters: `sortBy`, `filterCategory`, `displayMode`, `selectedTokenId`, and `showModal`.
* This separation creates **clear boundaries**, making the codebase more testable and maintainable.

---

## 2. Component Architecture: Atomic Design with Rigorous Memoisation

**Why:** To ensure maximum component reusability and **prevent cascading re-renders** in a high-frequency real-time application.

### Rationale:
* **Atomic Structure (Atoms → Molecules → Organisms):** Guarantees modularity and adherence to DRY (Don't Repeat Yourself) principles, making components easily testable and adaptable.
* **Extensive Memoization:** Since real-time updates can occur as frequently as every 500ms, **every presentational component is wrapped with `React.memo()`**. This ensures that only components receiving new, changed props (e.g., a price update) will re-render.

### Implementation:
* Custom hooks (`useTokenSorting`, `useModal`) abstract reusable business logic.
* `useMemo` and `useCallback` are used for costly operations (like sorting logic) and event handlers, respectively, to maintain referential equality.

---

## 3. Performance Optimization Strategy: Aggressive Memoisation & Optimized Update Intervals

**Goal:** Achieve less than **100ms interaction times** and maintain optimal rendering efficiency.

### Strategy:
1.  **Memoisation:** The primary defence against the performance hit of rapid updates.
2.  **Initial Boost:** A rapid update interval (e.g., **300ms**) for the first 10 seconds of application load ensures an immediate sense of "real-time" responsiveness.
3.  **Steady State:** After the initial period, the interval settles to a sustainable **500ms** for stable, high-frequency updates.
4.  **Layout Stability:** The use of dedicated loading states (**Skeletons**) is mandated to ensure a **zero Cumulative Layout Shift (CLS) score**.

---

## 4. Real-time Updates Design: Optimised HTTP Polling (Mocked)

**Why:** To simulate real-time performance reliably within the MVP context, leveraging a simpler, easier-to-debug architectural pattern while remaining **API-agnostic** for a future WebSocket integration.

### Design:
* The **`useTokenUpdates`** custom hook manages the polling logic.
* The client sends a `lastUpdate` timestamp to the updates endpoint.
* Updates are distributed randomly (30%/40%/30%) across the three columns to ensure a dynamic view.
* **Visual Feedback:** Smooth **colour transitions** are implemented via CSS animations to visually indicate price changes without being jarring. Flash effects with subtle scale/glow are used for significant changes.

---

## 5. UI/UX Design Decisions: Dynamic Engagement and Clarity

| Feature | Rationale | Implementation Detail |
| :--- | :--- | :--- |
| **Live Shuffling** | Prevents visual stagnation and ensures all tokens are visible over time. | Tokens shuffle independently within each column at random intervals (2-4 seconds) using state management. |
| **Conditional Labels (2nd Column)** | Provides a clear visual distinction between active and inactive migrating tokens. | Uses a `hasDynamicNumbers` state to conditionally render "Migrating %" (Blue, active update) or "Bonding %" (Green/Red, price change). |
| **Persistent Hover Effects** | Prevents visual flickering and enhances the user experience when interacting with embedded labels or graphics. | Uses Tailwind's `group` class and coordinated `onMouseEnter`/`onMouseLeave` handlers to maintain the hover state across related elements. |
| **Coin Graphic Visibility** | Makes "Migrating" tokens (e.g., those in the Final Stretch column) instantly identifiable. | Coin graphic is always visible for these tokens, with hover-triggered transformations to add interactivity. |

---

## 6. API Architecture: Next.js API Routes with Mock Data Fallback

**Why:** To decouple the frontend development from the backend API readiness and guarantee **graceful degradation**.

### Design:
* **API Routes (`app/api/tokens/`):** Provides a clean, server-side interface for data retrieval.
* **Mock Data Fallback:** The application checks for a real API URL. If the environment variable is not set, it automatically defaults to the high-fidelity mock data (`lib/mock-data.ts`), ensuring uninterrupted development.
* **Updates Endpoint:** Uses a `POST /api/tokens/updates` endpoint that accepts a `lastUpdate` timestamp, allowing the server to **efficiently return only incremental data changes.**

---

## 7. Number Formatting: Maximum 4 Decimal Places

**Rationale:** This decision prioritises **readability and visual hierarchy** over excessive precision, which can lead to visual clutter.

### Implementation:
* Centralized utility functions (`formatNumber()`, `formatPercentage()`, `formatPrice()`) in `lib/number-format.ts`.
* All price and percentage displays utilize **`toFixed(4)`** with subsequent **removal of trailing zeros** to maintain consistency.

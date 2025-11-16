# Axiom Trade Pulse Replication (Solana)

A high-fidelity, performance-optimised replication of the Axiom Trade Pulse dashboard for Solana, built with Next.js 14 and TypeScript.

## 🔗 Project Links

| Description | Link | 
| ----- | ----- | 
| **Original Target** | <https://axiom.trade/pulse?chain=sol> | 
| **Replicated Site** | <https://token-trading-table-axiom.vercel.app/> | 

## Architectural Focus & Design Decisions

The core architecture is engineered for peak performance, accessibility, and maintainability, directly supporting the stringent Lighthouse and interaction speed requirements.

* **State Separation (React Query / Redux Toolkit):**

  * **React Query** manages all server state (data fetching, caching, real-time mock data, and synchronisation) for optimal performance.

  * **Redux Toolkit** is strictly reserved for complex, global client UI state (e.g., active filters or application-wide preferences).

* **Atomic Architecture & Memoization:**

  * An Atomic component structure ensures maximum reusability (DRY principles).

  * Extensive use of `React.memo`, `useMemo`, and `useCallback` on all table components, preventing unnecessary re-renders during high-frequency real-time updates is crucial.

* **Performance Primitives:**

  * Next.js 14 App Router and TypeScript (Strict) provide the foundation.

  * Shadcn/Radix UI are utilised for accessible, unstyled UI primitives (Popover, Modal, Tooltip).

  * Skeleton/Shimmer loading states guarantee **zero Cumulative Layout Shift (CLS)**.


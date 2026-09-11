import { INITIATIVES } from "../data/initiatives";
import { STATISTICS } from "../data/statistics";

// NOTE: This service currently returns local mock data through async
// functions. When the Node.js/Express backend is ready, replace each
// function body with a `fetch` call against `${import.meta.env.VITE_API_URL}`
// while keeping the same function signatures, so pages/components do not
// need to change.
//
// Example future implementation:
//   export async function getInitiatives() {
//     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/initiatives`);
//     if (!response.ok) throw new Error("No se pudieron cargar las iniciativas");
//     return response.json();
//   }

const SIMULATED_DELAY_MS = 250;

function delay(value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), SIMULATED_DELAY_MS);
  });
}

export async function getInitiatives() {
  return delay(INITIATIVES);
}

export async function getInitiativeById(id) {
  const initiative = INITIATIVES.find((item) => item.id === id) ?? null;
  return delay(initiative);
}

export async function getStatistics() {
  return delay(STATISTICS);
}

// Simulated signature submission. Does not persist anywhere and does not
// alter the mock dataset's signature counts.
export async function submitSignature({ initiativeId, method }) {
  return delay({ success: true, initiativeId, method, simulated: true });
}

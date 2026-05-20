const WATCHLIST_KEY = "portbury-watchlist";

export function getWatchlistIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(WATCHLIST_KEY);

  if (!stored) {
    return [];
  }

  return JSON.parse(stored);
}

export function addVesselToWatchlist(vesselId: string) {
  const existing = getWatchlistIds();

  if (existing.includes(vesselId)) {
    return existing;
  }

  const updated = [...existing, vesselId];

  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));

  return updated;
}

export function removeVesselFromWatchlist(vesselId: string) {
  const existing = getWatchlistIds();

  const updated = existing.filter((id) => id !== vesselId);

  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));

  return updated;
}

export function clearWatchlist() {
  localStorage.removeItem(WATCHLIST_KEY);
}

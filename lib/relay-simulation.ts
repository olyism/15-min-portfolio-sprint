export type RelayState = { step: number; playing: boolean; stale: boolean; refreshed: boolean; decision: "pending" | "approved" | "rejected" };
export type RelayAction = { type: "play" | "pause" | "tick" | "approve" | "reject" | "refresh" } | { type: "reset"; stale?: boolean };
export function initialRelayState(stale = false): RelayState {
  return { step: 0, playing: false, stale, refreshed: false, decision: "pending" };
}
export function relayIsBlocked(state: RelayState) {
  return state.decision === "rejected" || state.step === 7 || (state.step === 5 && state.decision === "pending") || (state.step === 3 && state.stale && !state.refreshed);
}
export function relayReducer(state: RelayState, action: RelayAction): RelayState {
  switch (action.type) {
    case "reset": return initialRelayState(action.stale ?? state.stale);
    case "pause": return { ...state, playing: false };
    case "play": return relayIsBlocked(state) ? state : { ...state, playing: true };
    case "tick": {
      if (relayIsBlocked(state)) return { ...state, playing: false };
      const next = { ...state, step: Math.min(state.step + 1, 7) };
      return { ...next, playing: next.playing && !relayIsBlocked(next) };
    }
    case "approve": return state.step === 5 && state.decision === "pending" ? { ...state, decision: "approved", step: 6, playing: true } : state;
    case "reject": return state.step === 5 && state.decision === "pending" ? { ...state, decision: "rejected", playing: false } : state;
    case "refresh": return state.step === 3 && state.stale && !state.refreshed ? { ...state, refreshed: true, step: 4, playing: true } : state;
  }
}

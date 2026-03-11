export type FirebaseRestConfig = {
  apiKey: string;
  projectId: string;
};

/**
 * Firebase (Firestore) REST config.
 *
 * You can either:
 * 1) Replace the placeholders below, OR
 * 2) Define Vite env vars on your host:
 *    - VITE_FIREBASE_API_KEY
 *    - VITE_FIREBASE_PROJECT_ID
 */
export const firebaseRestConfig: FirebaseRestConfig = {
  apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY ?? "AIzaSyAEu2Qhng0E6NiaD7KZJBoKE3eYyyfYA3U",
  projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID ?? "path2action-b7aec",
};

export function getFirestoreDocUrl(collection: string, docId: string) {
  const { apiKey, projectId } = firebaseRestConfig;
  const base = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/${encodeURIComponent(collection)}/${encodeURIComponent(docId)}`;
  return `${base}?key=${encodeURIComponent(apiKey)}`;
}


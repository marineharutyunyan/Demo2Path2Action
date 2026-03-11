import { useState, useCallback, useRef } from "react";
import { firebaseRestConfig, getFirestoreDocUrl } from "@/lib/firebase";

type PlanPayload = Record<string, unknown>;

export interface PlanData {
  wizardData: PlanPayload;
  currentStep: number;
  updatedAt?: string;
}

interface UsePlanStorageReturn {
  savePlan: (planId: string, data: PlanPayload, step: number) => void;
  loadPlan: (planId: string) => Promise<PlanData | null>;
  deletePlan: (planId: string) => Promise<void>;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

function ensureConfigured() {
  const { apiKey, projectId } = firebaseRestConfig;
  return Boolean(apiKey && projectId && apiKey !== "YOUR_API_KEY" && projectId !== "YOUR_PROJECT_ID");
}

function safeJsonParse<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function usePlanStorage(): UsePlanStorageReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSaveRef = useRef<{ planId: string; data: PlanPayload; step: number } | null>(null);

  const savePlan = useCallback((planId: string, data: PlanPayload, step: number) => {
    if (!planId) return;
    if (!ensureConfigured()) {
      setError("Firebase is not configured yet. Add VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID.");
      return;
    }

    pendingSaveRef.current = { planId, data, step };

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      const saveData = pendingSaveRef.current;
      if (!saveData) return;

      setIsSaving(true);
      setError(null);

      try {
        const url = getFirestoreDocUrl("plans", saveData.planId);
        const nowIso = new Date().toISOString();

        // Store wizard data as JSON string to avoid Firestore REST "Value" mapping complexity.
        const body = {
          fields: {
            wizardData: { stringValue: JSON.stringify(saveData.data) },
            currentStep: { integerValue: String(saveData.step) },
            updatedAt: { timestampValue: nowIso },
          },
        };

        const updateMask = [
          "updateMask.fieldPaths=wizardData",
          "updateMask.fieldPaths=currentStep",
          "updateMask.fieldPaths=updatedAt",
        ].join("&");

        const res = await fetch(`${url}&${updateMask}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Firestore save failed (${res.status}): ${text}`);
        }
      } catch (err) {
        console.error("Error saving to Firebase (REST):", err);
        setError("Failed to save plan to cloud. Your data is still saved locally.");
      } finally {
        setIsSaving(false);
        pendingSaveRef.current = null;
      }
    }, 500);
  }, []);

  const loadPlan = useCallback(async (planId: string): Promise<PlanData | null> => {
    if (!planId) return null;
    if (!ensureConfigured()) return null;

    setIsLoading(true);
    setError(null);

    try {
      const url = getFirestoreDocUrl("plans", planId);
      const res = await fetch(url);

      if (res.status === 404) return null;
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Firestore load failed (${res.status}): ${text}`);
      }

      const json = (await res.json()) as any;
      const wizardRaw = json?.fields?.wizardData?.stringValue ?? "{}";
      const stepRaw = json?.fields?.currentStep?.integerValue ?? "1";
      const updatedAt = json?.fields?.updatedAt?.timestampValue as string | undefined;

      return {
        wizardData: safeJsonParse<PlanPayload>(wizardRaw, {}),
        currentStep: Number(stepRaw) || 1,
        updatedAt,
      };
    } catch (err) {
      console.error("Error loading from Firebase (REST):", err);
      setError("Failed to load plan from cloud. Using local data.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePlan = useCallback(async (planId: string): Promise<void> => {
    if (!planId) return;
    if (!ensureConfigured()) return;

    try {
      const url = getFirestoreDocUrl("plans", planId);
      await fetch(url, { method: "DELETE" });
    } catch (err) {
      console.error("Error deleting from Firebase (REST):", err);
    }
  }, []);

  return {
    savePlan,
    loadPlan,
    deletePlan,
    isLoading,
    isSaving,
    error,
  };
}


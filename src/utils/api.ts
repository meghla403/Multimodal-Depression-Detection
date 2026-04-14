import type { PredictionResult, UploadedFiles } from "@/types/prediction";
import { API_URL } from "@/utils/constants";

export async function runPrediction(
  files: UploadedFiles,
): Promise<PredictionResult> {
  const form = new FormData();
  if (files.audio) form.append("audio", files.audio);
  if (files.video) form.append("video", files.video);

  let res: Response;
  try {
    res = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: form,
    });
  } catch (networkErr) {
    const msg =
      networkErr instanceof Error ? networkErr.message : String(networkErr);
    throw new Error(
      `Cannot reach backend at ${API_URL}. ${msg}`,
    );
  }

  if (!res.ok) {
    let detail = `Request failed (HTTP ${res.status})`;
    try {
      const data = await res.json();
      if (data?.detail !== undefined) {
        detail = formatDetail(data.detail);
      }
    } catch {
      // body wasn't JSON — keep the default detail
    }
    throw new Error(detail);
  }

  return (await res.json()) as PredictionResult;
}

function formatDetail(detail: unknown): string {
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((d) => {
        if (typeof d === "string") return d;
        if (d && typeof d === "object" && "msg" in d) {
          const loc = "loc" in d && Array.isArray(d.loc) ? d.loc.join(".") : "";
          return loc ? `${loc}: ${d.msg}` : String(d.msg);
        }
        return JSON.stringify(d);
      })
      .join("; ");
  }
  if (detail && typeof detail === "object") {
    return JSON.stringify(detail);
  }
  return String(detail);
}

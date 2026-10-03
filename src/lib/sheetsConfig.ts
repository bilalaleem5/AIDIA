/**
 * Google Sheets API Endpoints & Submission Service
 * Direct sync to Google Apps Script Web Apps without third-party services.
 */

export const GOOGLE_SHEETS_ENDPOINTS = {
  // 1. Main Accelerator Application (/apply)
  APPLY: "https://script.google.com/macros/s/AKfycbzx14txuZKpppSsK6hwKdCGUFjGTSBQPFbPZWH9AbI3TZT19Kr4jgTlv8btf2_Sh-hP9A/exec",

  // 2. Submit Research & Technology (/submit-technology)
  SUBMIT_TECH: "https://script.google.com/macros/s/AKfycbzWgduZkN8tWyzsBaCdFQF3F9OPLxWaZ54sZAuPjMtFtBdSbz21GbJihWe9FIHWktcu/exec",

  // 3. Investor Registration (/investors#register)
  INVESTORS: "https://script.google.com/macros/s/AKfycbzc3CKztjXkvIgETA8zhksCULL5X32XkQOyhNWR1GhUOTEYIIa3_B69aUwxJWrYSEGd1w/exec",

  // 4. Partner Inquiries (/partners)
  PARTNERS: "https://script.google.com/macros/s/AKfycbxGJ-7kReFIANSuoCckLr_d60J3p5LXt3HVKEthIPjE7yDdnHvPp0WUF_ut3MHVeFAx2w/exec",

  // 5. Mentor Applications (/partners#mentors)
  MENTORS: "https://script.google.com/macros/s/AKfycbyXAPvZ7OSLHI2Mxm0IfMuq5zKqrkt26fpVL1INa-ty4_f6gEl8CGCLbkE01U0-OxgXgg/exec",

  // 6. Direct Contact (/about#contact) -> Routed directly to WhatsApp (+966 50 521 0112)
  // 7. Footer Newsletter -> Removed from website per user request
};

export async function submitFormToSheet(
  endpointKey: keyof typeof GOOGLE_SHEETS_ENDPOINTS,
  payload: { ref?: string; at?: string; data?: Record<string, unknown> } | Record<string, unknown>
): Promise<boolean> {
  const url = GOOGLE_SHEETS_ENDPOINTS[endpointKey];
  if (!url) {
    console.info(`[GoogleSheets] No remote URL configured for ${endpointKey}; saved locally.`);
    return false;
  }

  const body = JSON.stringify(payload);

  try {
    // Attempt standard fetch with text/plain to avoid preflight OPTIONS block
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    });
    return true;
  } catch (err) {
    // Fallback: If browser enforces opaque redirect, use mode: "no-cors"
    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body,
      });
      return true;
    } catch (fallbackErr) {
      console.error(`[GoogleSheets] Submission failed for ${endpointKey}:`, fallbackErr);
      return false;
    }
  }
}

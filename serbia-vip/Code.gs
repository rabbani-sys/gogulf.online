/*******************************************************
 SERBIA CAREER GATEWAY — GOOGLE APPS SCRIPT BACKEND
 1. Create/open a Google Sheet.
 2. Extensions → Apps Script.
 3. Paste this entire file.
 4. Set ROOT_FOLDER_ID below to a Drive folder ID.
 5. Deploy → New deployment → Web app.
    Execute as: Me
    Who has access: Anyone
 6. Copy the /exec URL into index.html:
    window.SERBIA_APP_CONFIG.apiUrl
********************************************************/

const ROOT_FOLDER_ID = "PASTE_DRIVE_FOLDER_ID_HERE";
const SPREADSHEET_ID = "PASTE_GOOGLE_SHEET_ID_HERE";

function doGet() {
  return json_({ ok: true, service: "Serbia Career Gateway API", version: "1.0.0" });
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const action = body.action || "unknown";
    const data = body.data || {};

    switch (action) {
      case "proposal":
        return json_(saveProposal_(data));
      case "proposal_pdf_generated":
        return json_(logEvent_("proposal_pdf_generated", data));
      case "login":
        return json_(logEvent_("login", data));
      case "signup":
        return json_(logEvent_("signup", data));
      default:
        return json_({ ok: false, error: "Unknown action", action });
    }
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  }
}

function saveProposal_(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateSheet_(ss, "Applications", [
    "Timestamp","Reference","Name","First Name","Last Name","Passport",
    "Mobile","Email","Roles","Status","Signature Drive URL","Candidate Folder URL"
  ]);

  const root = DriveApp.getFolderById(ROOT_FOLDER_ID);
  const candidates = getOrCreateFolder_(root, "Candidates");
  const candidateFolder = getOrCreateFolder_(candidates, sanitize_(data.refNumber || ("SRB-" + Date.now())));

  let signatureUrl = "";
  if (data.signatureDataUrl) {
    signatureUrl = saveDataUrl_(data.signatureDataUrl, candidateFolder,
      (data.refNumber || "candidate") + "_signature.png");
  }

  sheet.appendRow([
    new Date(),
    data.refNumber || "",
    data.fullName || "",
    data.firstName || "",
    data.lastName || "",
    data.passport || "",
    data.mobile || "",
    data.email || "",
    data.roles || "",
    "NEW",
    signatureUrl,
    candidateFolder.getUrl()
  ]);

  // Audit log
  logEvent_("proposal_created", {
    refNumber: data.refNumber || "",
    fullName: data.fullName || "",
    email: data.email || ""
  });

  return {
    ok: true,
    reference: data.refNumber || "",
    candidateFolderUrl: candidateFolder.getUrl(),
    signatureUrl
  };
}

function logEvent_(action, data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateSheet_(ss, "Activity_Log",
    ["Timestamp","Action","Reference","Name","Email","Payload"]);
  sheet.appendRow([
    new Date(),
    action,
    data.refNumber || "",
    data.fullName || "",
    data.email || "",
    JSON.stringify(data)
  ]);
  return { ok: true, action };
}

function getOrCreateSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  return sheet;
}

function getOrCreateFolder_(parent, name) {
  const existing = parent.getFoldersByName(name);
  return existing.hasNext() ? existing.next() : parent.createFolder(name);
}

function saveDataUrl_(dataUrl, folder, filename) {
  const match = String(dataUrl).match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return "";
  const blob = Utilities.newBlob(
    Utilities.base64Decode(match[2]),
    match[1],
    filename
  );
  return folder.createFile(blob).getUrl();
}

function sanitize_(value) {
  return String(value || "candidate").replace(/[^\w.-]+/g, "_").slice(0, 80);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

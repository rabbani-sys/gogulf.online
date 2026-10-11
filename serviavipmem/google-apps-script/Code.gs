/**
 * Serbia Gateway signed-proposal email endpoint.
 * Deploy as a Web App that executes as the script owner.
 * Candidate data and PDF are emailed only; this script does not use Google Sheets.
 */
const RECEIVING_EMAIL = 'mgs.rabbani@gmail.com';
const MAX_PDF_BYTES = 7 * 1024 * 1024;

function doGet() {
  return jsonOutput_({ ok: true, service: 'Serbia Gateway Email Service', status: 'ready', storage: 'email-only' });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return jsonOutput_({ ok: false, error: 'Empty request.' });
    if (e.postData.contents.length > 10500000) return jsonOutput_({ ok: false, error: 'Request is too large.' });
    const data = JSON.parse(e.postData.contents);
    if (data.honeypot) return jsonOutput_({ ok: false, error: 'Rejected.' });
    if (data.action !== 'signed' || data.delivery !== 'gmail_only') return jsonOutput_({ ok: false, error: 'Unsupported request.' });

    const c = data.candidate || {};
    const name = clean_(c.name || ((c.firstName || '') + ' ' + (c.lastName || '')), 120);
    const mobile = clean_(c.mobile, 40);
    const passport = clean_(c.passport, 40);
    const proposalId = clean_(data.proposalId, 80);
    const pdfBase64 = String(data.pdfBase64 || '');
    const pdfFilename = safeFilename_(data.pdfFilename || ('Serbia-Gateway-Proposal-' + proposalId + '.pdf'));
    if (!name || !mobile || !passport || !proposalId) return jsonOutput_({ ok: false, error: 'Required candidate fields are missing.' });
    if (!pdfBase64 || pdfBase64.length > Math.ceil(MAX_PDF_BYTES * 4 / 3) + 1000) return jsonOutput_({ ok: false, error: 'PDF is missing or exceeds the 7 MB limit.' });

    const bytes = Utilities.base64Decode(pdfBase64);
    if (bytes.length > MAX_PDF_BYTES) return jsonOutput_({ ok: false, error: 'PDF exceeds the 7 MB limit.' });
    const pdf = Utilities.newBlob(bytes, 'application/pdf', pdfFilename);
    const roles = clean_(c.job, 250) || 'Not specified';
    const email = clean_(c.email, 160) || 'Not provided';
    const signedAt = clean_(data.signedAt, 80) || new Date().toISOString();
    const subject = 'New Signed Application — Serbia Gateway';
    const body = [
      'A candidate has submitted a signed Serbia Gateway proposal.', '',
      'Proposal reference: ' + proposalId,
      'Candidate: ' + name,
      'Mobile: ' + mobile,
      'Email: ' + email,
      'Passport number: ' + passport,
      'Selected position(s): ' + roles,
      'Submission timestamp: ' + signedAt,
      '', 'The signed proposal PDF is attached.',
      'Delivery mode: Gmail only. No candidate documents are stored in Google Sheets.'
    ].join('\n');

    MailApp.sendEmail({
      to: RECEIVING_EMAIL,
      subject: subject,
      body: body,
      name: 'Serbia Gateway Proposal Hub',
      attachments: [pdf]
    });
    return jsonOutput_({ ok: true, message: 'Email send request completed.', proposalId: proposalId });
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    return jsonOutput_({ ok: false, error: 'Email processing failed. Check Apps Script execution logs.' });
  }
}

function clean_(value, maxLength) {
  return String(value == null ? '' : value).replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength);
}
function safeFilename_(value) {
  return String(value).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120) || 'Serbia-Gateway-Proposal.pdf';
}
function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

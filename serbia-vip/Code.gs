const SPREADSHEET_ID = 'PASTE_GOOGLE_SHEET_ID_HERE';
const ROOT_FOLDER_ID = 'PASTE_GOOGLE_DRIVE_FOLDER_ID_HERE';

function doGet() { return json_({ok:true,service:'Serbia Career Gateway API',time:new Date().toISOString()}); }
function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const action = data.action || '';
    if (action === 'proposal') return saveProposal_(data);
    if (action === 'proposal_pdf_generated') { logEvent_('PROPOSAL_PDF_GENERATED', data); return json_({ok:true,action}); }
    if (action === 'payment_proof') return savePaymentProof_(data);
    if (action === 'login') { logEvent_('LOGIN', data); return json_({ok:true,action}); }
    if (action === 'signup') { logEvent_('SIGNUP', data); return json_({ok:true,action}); }
    return json_({ok:false,error:'Unknown action'});
  } catch (err) { return json_({ok:false,error:String(err)}); }
}

function saveProposal_(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateSheet_(ss,'Applications',['Timestamp','Reference','Candidate','Passport','Mobile','Role','Status','Signature File URL']);
  let sigUrl='';
  if (data.signatureData) {
    const folder=getOrCreateCandidateFolder_(data.ref||'UNKNOWN');
    sigUrl=folder.createFile(dataUrlToBlob_(data.signatureData,(data.ref||'signature')+'.png')).getUrl();
  }
  sheet.appendRow([new Date(),data.ref||'',data.name||'',data.passport||'',data.mobile||'',data.role||'','Application Submitted',sigUrl]);
  logEvent_('PROPOSAL_SUBMITTED',data);
  return json_({ok:true,ref:data.ref||''});
}

function savePaymentProof_(data) {
  const ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet=getOrCreateSheet_(ss,'Payments',['Timestamp','Reference','Candidate','Receipt No','Stage','Amount','Method','Transaction ID','Payment Date','Paid From','Proof File URL','Status']);
  const p=data.payment||{}; let proofUrl='';
  if (p.proofData && String(p.proofData).indexOf('data:')===0) {
    const folder=getOrCreateCandidateFolder_(String(data.ref||'UNKNOWN'));
    const ext=String(p.proofData).indexOf('application/pdf')>=0?'pdf':'jpg';
    proofUrl=folder.createFile(dataUrlToBlob_(p.proofData,(p.receiptNo||'payment-proof')+'.'+ext)).getUrl();
  }
  sheet.appendRow([new Date(),data.ref||'',data.candidate||'',p.receiptNo||'',p.stageLabel||'',Number(p.amount||0),p.method||'',p.txnId||'',p.txnDate||'',p.from||'',proofUrl,'Under Review']);
  logEvent_('PAYMENT_PROOF_SUBMITTED',data);
  return json_({ok:true,action:'payment_proof',receiptNo:p.receiptNo||'',proofUrl,status:'Under Review'});
}

function getOrCreateSheet_(ss,name,headers) {
  let sh=ss.getSheetByName(name); if(!sh) sh=ss.insertSheet(name);
  if(sh.getLastRow()===0) sh.appendRow(headers); return sh;
}
function getOrCreateCandidateFolder_(ref) {
  const root=DriveApp.getFolderById(ROOT_FOLDER_ID); const safe=String(ref).replace(/[^A-Za-z0-9_-]/g,'_');
  const it=root.getFoldersByName(safe); return it.hasNext()?it.next():root.createFolder(safe);
}
function logEvent_(type,data) {
  const ss=SpreadsheetApp.openById(SPREADSHEET_ID); const sh=getOrCreateSheet_(ss,'Activity_Log',['Timestamp','Event','Reference','Candidate','Data']);
  sh.appendRow([new Date(),type,data.ref||'',data.name||data.candidate||'',JSON.stringify(data).slice(0,45000)]);
}
function dataUrlToBlob_(dataUrl,name) {
  const m=String(dataUrl).match(/^data:([^;]+);base64,(.*)$/); if(!m) throw new Error('Invalid data URL');
  return Utilities.newBlob(Utilities.base64Decode(m[2]),m[1],name);
}
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }

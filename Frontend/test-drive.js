const folderId = "1XcFCNoO4fyMKDV-FCrfODrs25WyOsbvl";
const apiKey = "AIzaSyBR2rxD2-c_ZELm6OkylURX3la7bp6AdNk";
const query = `'${folderId}' in parents and trashed = false`;
const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name,mimeType,webViewLink,webContentLink,modifiedTime)&supportsAllDrives=true&includeItemsFromAllDrives=true`;

fetch(url)
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error(err));

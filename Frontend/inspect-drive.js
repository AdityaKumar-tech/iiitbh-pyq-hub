const rootFolderId = "1XcFCNoO4fyMKDV-FCrfODrs25WyOsbvl";
const apiKey = "AIzaSyBR2rxD2-c_ZELm6OkylURX3la7bp6AdNk";

const fetchChildren = async (parentId) => {
  const query = `'${parentId}' in parents and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    query
  )}&key=${apiKey}&fields=files(id,name,mimeType)&supportsAllDrives=true&includeItemsFromAllDrives=true`;

  const res = await fetch(url);
  const data = await res.json();
  return data.files || [];
};

async function check() {
  const files = await fetchChildren('1F6eFpHqMM6EZhExVuW0a3Vp0vEAwZcWx'); // A subject folder (Basic Electrical Engineering)
  console.log("Children inside subject folder:");
  console.log(files);
}
check();

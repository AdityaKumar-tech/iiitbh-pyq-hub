const fs = require('fs');

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

async function updateData() {
  const dataPath = './src/data/pyq-data.json';
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  for (const semester of data.semesters) {
    for (const subject of semester.subjects) {
      if (!subject.folder_id) continue;
      
      console.log(`Checking ${subject.name} (${subject.folder_id})`);
      const children = await fetchChildren(subject.folder_id);
      
      for (const child of children) {
        if (child.name.toUpperCase() === 'PYQS') {
          subject.pyqs_folder_id = child.id;
        } else if (child.name.toUpperCase() === 'NOTES') {
          subject.notes_folder_id = child.id;
        }
      }
    }
  }

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log('Finished updating data!');
}

updateData();

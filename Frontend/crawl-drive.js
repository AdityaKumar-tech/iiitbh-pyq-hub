import fs from "fs";

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

const getSemesterDescription = (num) => {
  const year = Math.ceil(num / 2);
  const yearStr = ["First", "Second", "Third", "Fourth"][year - 1] || "Unknown";
  const type = num % 2 === 0 ? "Even" : "Odd";
  return `${yearStr} year, ${type} Semester`;
};

const crawl = async () => {
  console.log("Crawling root folder...");
  const semestersData = [];
  const semFolders = await fetchChildren(rootFolderId);

  for (const semFolder of semFolders) {
    if (semFolder.mimeType !== "application/vnd.google-apps.folder") continue;

    const numMatch = semFolder.name.match(/\d+/);
    const num = numMatch ? parseInt(numMatch[0]) : 0;

    const semObj = {
      semester_number: num,
      title: `Semester ${num}`,
      description: getSemesterDescription(num),
      folder_id: semFolder.id,
      subjects: [],
    };

    console.log(`Crawling ${semFolder.name}...`);
    const branchFolders = await fetchChildren(semFolder.id);

    for (const branchFolder of branchFolders) {
      if (branchFolder.mimeType !== "application/vnd.google-apps.folder") continue;

      const branchName = branchFolder.name.toLowerCase().trim();
      console.log(`  Crawling branch ${branchFolder.name}...`);

      const subjectFolders = await fetchChildren(branchFolder.id);
      for (const subjectFolder of subjectFolders) {
        if (subjectFolder.mimeType !== "application/vnd.google-apps.folder") continue;

        let pyqs_folder_id = "";
        let notes_folder_id = "";

        const innerFolders = await fetchChildren(subjectFolder.id);
        for (const inner of innerFolders) {
          if (inner.mimeType === "application/vnd.google-apps.folder") {
            if (inner.name.toUpperCase() === "PYQS") pyqs_folder_id = inner.id;
            if (inner.name.toUpperCase() === "NOTES") notes_folder_id = inner.id;
          }
        }

        semObj.subjects.push({
          slug: subjectFolder.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          code: "",
          name: subjectFolder.name,
          folder_id: subjectFolder.id,
          pyqs_folder_id,
          notes_folder_id,
          branch: branchName,
        });
      }
    }

    semObj.subjects.sort((a, b) => a.name.localeCompare(b.name));
    semestersData.push(semObj);
  }

  semestersData.sort((a, b) => a.semester_number - b.semester_number);

  const finalData = { semesters: semestersData };
  fs.writeFileSync(
    "./src/data/pyq-data.json",
    JSON.stringify(finalData, null, 2)
  );
  console.log("pyq-data.json generated successfully!");
};

crawl().catch(console.error);

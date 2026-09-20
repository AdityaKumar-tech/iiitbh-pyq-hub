export async function fetchPYQsFromDrive(folderId) {
  if (!folderId || folderId.startsWith("placeholder")) {
    return [];
  }

  const apiKey = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
  if (!apiKey) {
    console.error("Missing Google Drive API Key");
    return { error: "Missing Google Drive API Key in .env file" };
  }

  try {
    const query = `'${folderId}' in parents and trashed = false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name,mimeType,webViewLink,webContentLink,modifiedTime)&supportsAllDrives=true&includeItemsFromAllDrives=true`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Drive API responded with ${response.status}`);
    }

    const data = await response.json();
    return (data.files || []).map(file => ({
      id: file.id,
      title: file.name,
      meta: `Updated ${new Date(file.modifiedTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      type: "pyqs",
      viewUrl: file.webViewLink,
      downloadUrl: file.webContentLink
    }));
  } catch (error) {
    console.error("Error fetching PYQs from Google Drive:", error);
    return { error: error.message };
  }
}

export async function fetchRecentResourcesFromDrive(pyqData) {
  const apiKey = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
  if (!apiKey || !pyqData || !pyqData.semesters) {
    return [];
  }

  try {
    const targets = [];
    for (const sem of pyqData.semesters) {
      for (const sub of sem.subjects) {
        if (sub.pyqs_folder_id && sub.pyqs_folder_id !== sub.folder_id) {
          targets.push({
            folderId: sub.pyqs_folder_id,
            semNumber: sem.semester_number,
            subjectName: sub.name,
            subjectSlug: sub.slug,
            type: "PYQ",
            color: "from-emerald-500 to-teal-500",
          });
        }
        if (sub.notes_folder_id && sub.notes_folder_id !== sub.folder_id) {
          targets.push({
            folderId: sub.notes_folder_id,
            semNumber: sem.semester_number,
            subjectName: sub.name,
            subjectSlug: sub.slug,
            type: "Notes",
            color: "from-indigo-500 to-violet-500",
          });
        }
        if (sub.pyqs_folder_id && sub.pyqs_folder_id === sub.folder_id) {
          targets.push({
            folderId: sub.folder_id,
            semNumber: sem.semester_number,
            subjectName: sub.name,
            subjectSlug: sub.slug,
            type: "Resource",
            color: "from-orange-500 to-amber-500",
          });
        }
      }
    }

    if (targets.length === 0) return [];

    // Query folders in parallel
    const fetchPromises = targets.map(async (target) => {
      const query = `'${target.folderId}' in parents and trashed = false`;
      const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name,mimeType,webViewLink,webContentLink,modifiedTime)&supportsAllDrives=true&includeItemsFromAllDrives=true`;

      try {
        const response = await fetch(url);
        if (!response.ok) return [];
        const data = await response.json();
        const files = data.files || [];

        return files.map((file) => ({
          id: file.id,
          title: file.name,
          type: target.type,
          semester: `Semester ${target.semNumber}`,
          semNumber: target.semNumber,
          subject: target.subjectName,
          subjectSlug: target.subjectSlug,
          subInfo: `Sem ${target.semNumber} • ${target.subjectName}`,
          modifiedTime: file.modifiedTime,
          color: target.color,
          viewUrl: file.webViewLink,
          downloadUrl: file.webContentLink,
        }));
      } catch (_err) {
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    const allFiles = results.flat();
    allFiles.sort((a, b) => new Date(b.modifiedTime) - new Date(a.modifiedTime));

    return allFiles.slice(0, 4);
  } catch (error) {
    console.error("Error fetching recent resources:", error);
    return [];
  }
}

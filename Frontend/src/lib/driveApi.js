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
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name,mimeType,webViewLink,webContentLink,modifiedTime)`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Drive API responded with ${response.status}`);
    }

    const data = await response.json();
    return data.files.map(file => ({
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

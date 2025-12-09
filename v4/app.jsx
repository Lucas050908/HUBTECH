import React, { useState } from "react";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setUploadMessage("Ingen fil valgt.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadMessage(""); // ryd tidligere fejl
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Vælg en fil før du uploader.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Upload mislykkedes");

      const data = await response.json();
      setUploadMessage(data.message);
      setPreviewUrl(`http://localhost:3000/${data.filename}`);
    } catch (error) {
      setUploadMessage("Fejl ved upload.");
      console.error("Upload-fejl:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AI Chat</h1>
      <p>Upload billede</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
      <p>{uploadMessage}</p>
      {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: "300px" }} />}
    </div>
  );
};

export default App;
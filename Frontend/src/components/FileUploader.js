const FileUploader = ({ setFile }) => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setFile(formData);
    alert('File uploaded successfully!');
  };

  return (
    <div>
      <input type='file' accept='application/pdf, application/msword, image/*, video/*'
             onChange={handleFileUpload} />
    </div>
  );
};

export default FileUploader;
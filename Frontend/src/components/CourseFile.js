import axios from 'axios';
import { useEffect, useState } from 'react';

const CourseFiles = ({ courseId }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Make a GET request to retrieve course files
    axios.get(`/api/courses/${courseId}/files`)
      .then(response => {
        setFiles(response.data.files);
      })
      .catch(error => {
        console.error('Error fetching course files:', error);
      });
  }, [courseId]);

  return (
    <div>
      <h3>Course Files</h3>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            <a href={file.path} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseFiles;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    // Replace with actual API call to fetch project details
    console.log('Fetching project details for ID:', id);
    setProject({ id, name: 'Sample Project' });
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Project Details</h1>
      <p>ID: {project.id}</p>
      <p>Name: {project.name}</p>
      {/* Display other project details */}
    </div>
  );
}

export default ProjectDetail;

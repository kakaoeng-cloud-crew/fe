import React, { createContext, useState, ReactNode } from 'react';

interface ProjectContextProps {
  projectId: string | null;
  setProjectId: (id: string) => void;
}

export const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [projectId, setProjectId] = useState<string | null>(null);

  return <ProjectContext.Provider value={{ projectId, setProjectId }}>{children}</ProjectContext.Provider>;
};

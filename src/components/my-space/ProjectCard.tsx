import { Project } from "@/api/types";

type Props = {
  project: Project;
}

export const ProjectCard = ({ project }: Props) => {
  return (
  <div className="p-4 shadow-md border-2 border-secondary">
    <h3 className="text-lg">{project.name}</h3>
  </div>
  );
};
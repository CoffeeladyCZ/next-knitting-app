import { Project } from "@/api/types";
import { Card } from "@/components/component-library/Card";
import Image from "next/image";

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <Card
      className="w-64 items-center mx-0"
      hoverClass="hover:bg-secondary/10"
    >
      <Card.Header>
        <Card.Content className="flex flex-col items-center gap-2">
          <div className="w-48 h-48 overflow-hidden mb-2 p-2 mx-auto border-2 border-secondary">
            <Image
              src={project.first_photo?.small_url as string}
              alt={project.name as string}
              width={100}
              height={100}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-lg text-gray-500 text-center">{project.name}</p>
        </Card.Content>
      </Card.Header>
    </Card>
  );
};

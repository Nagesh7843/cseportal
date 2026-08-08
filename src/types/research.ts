export interface ResearchLab {
  id: string;
  name: string;
  head: string;
  location: string;
  activeProjects: number;
  grantsAmount: string;
  description: string;
  image: string;
}

export interface Laboratory {
  id: number;
  roomNumber: string;
  name: string;
  computers: string;
  processor: string;
  ram: string;
  storage: string;
  additionalEquipment: string;
  totalCost: string;
}

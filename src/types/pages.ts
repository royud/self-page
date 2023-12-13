// admin login
export type LoginInputProps = {
  label: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  tryLogin: () => void;
};

// log
export type ModalProps = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  nowModalId: number;
  setNowModalId: React.Dispatch<React.SetStateAction<number>>;
};
export type JournalListProps = {
  nowModalId: number;
  setNowJournalId: React.Dispatch<React.SetStateAction<number>>;
};
export type JournalPostProps = { nowJournalId: number };

// projects
export type ProjectListProps = {
  projectId: number;
  projectTitle: string;
  thumnail: string | undefined;
};
export type YearListProps = {
  year: number;
  projects: ProjectListProps[];
};

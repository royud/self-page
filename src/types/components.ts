import { ViewerProps, EditorProps } from "@toast-ui/react-editor";

// select
export type SelectProps = {
  id: number;
  title: string;
};
export type SelectWrapProps = {
  label: string;
  addList: boolean;
  selectList: SelectProps[];
  value: SelectProps;
  setValue: React.Dispatch<React.SetStateAction<SelectProps>>;
};

// input
export type InputWrapProps = {
  label: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

// Tui
export type EditorWrapProps = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  postId: number;
};
export type EditorContainerProps = Pick<
  EditorWrapProps,
  "value" | "setValue" | "postId"
>;
export interface ForwardEditorProps extends EditorProps {
  onChange: () => void;
}
export type ViewerContainerProps = { content: string };
export interface ForwardViewerProps extends ViewerProps {
  initialValue: string;
}

// header nav
export type NavProps = {
  navId: number;
  title: string;
  route: string;
};
export type NavListProps = Pick<NavProps, "title" | "route">;

// layout
export type LayoutProps = {
  children: React.ReactNode;
};

//button
export type StyledButtonProps = {
  children: string;
  type?: "primary" | "default";
  width?: number;
  height?: number;
  onClick: () => void;
};

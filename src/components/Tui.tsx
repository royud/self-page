import { useState, useEffect, useRef, forwardRef } from "react";
import styled from "styled-components";

import dynamic from "next/dynamic";

import { ViewerProps, EditorProps } from "@toast-ui/react-editor";

const TuiViewer = dynamic(() => import("./TuiWrap").then((m) => m.TuiViewer), {
  ssr: false,
});
const TuiEditor = dynamic(() => import("./TuiWrap").then((m) => m.TuiEditor), {
  ssr: false,
});

const ForwardViewer = forwardRef<ViewerProps>((props, ref) => (
  <TuiViewer {...props} forwardedRef={ref} />
));

const ForwardEditor = forwardRef<EditorProps>((props, ref) => (
  <TuiEditor {...props} forwardedRef={ref} />
));

type ViewerContainerProps = { content: string };

type EditorContainerProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const ViewerContainer = ({ content }: ViewerContainerProps) => {
  const viewRef = useRef();

  useEffect(() => {
    viewRef.current?.getInstance().setMarkdown(content);
  }, [content]);

  return (
    <Wrap>
      <ForwardViewer ref={viewRef} initialValue={content} />
    </Wrap>
  );
};

export const EditorContainer = ({
  value,
  setValue,
  postId,
}: EditorContainerProps) => {
  const editorRef = useRef();

  const [isSetting, setIsSetting] = useState({
    setId: false,
    setText: false,
  });

  useEffect(() => {
    const newObj = {
      ...isSetting,
      setId: true,
    };
    setIsSetting(newObj);
  }, [postId]);

  useEffect(() => {
    if (isSetting.setId) {
      const newObj = {
        ...isSetting,
        setText: true,
      };
      setIsSetting(newObj);
    }
  }, [value]);

  useEffect(() => {
    if (isSetting.setId && isSetting.setText) {
      editorRef.current?.getInstance().setMarkdown(value, false);
      const newObj = {
        setId: false,
        setText: false,
      };
      setIsSetting(newObj);
    }
  }, [isSetting, value, postId]);

  const onChange = () => {
    setValue(editorRef.current.getInstance().getMarkdown());
  };

  return (
    <Wrap>
      <ForwardEditor ref={editorRef} onChange={onChange} />
    </Wrap>
  );
};
const Wrap = styled.div`
  .toastui-editor-contents {
    font-size: 15px;
  }
`;
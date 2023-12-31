import { useState, useEffect, useRef, forwardRef } from "react";
import styled from "styled-components";

import dynamic from "next/dynamic";

import {
  Viewer as ViewerType,
  Editor as EditorType,
} from "@toast-ui/react-editor";
import {
  EditorContainerProps,
  ViewerContainerProps,
  ForwardViewerProps,
  ForwardEditorProps,
} from "@/types/components";

const TuiViewer = dynamic(() => import("./TuiWrap").then((m) => m.TuiViewer), {
  ssr: false,
});
const TuiEditor = dynamic(() => import("./TuiWrap").then((m) => m.TuiEditor), {
  ssr: false,
});

const ForwardViewer = forwardRef<ViewerType | undefined, ForwardViewerProps>(
  function ForwardViewer(props, ref) {
    return <TuiViewer {...props} forwardedRef={ref} />;
  }
);

const ForwardEditor = forwardRef<EditorType | undefined, ForwardEditorProps>(
  function ForwardEditor(props, ref) {
    return <TuiEditor {...props} forwardedRef={ref} />;
  }
);

export const ViewerContainer = ({ content }: ViewerContainerProps) => {
  const viewRef = useRef<ViewerType>();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewRef.current?.getInstance().setMarkdown(content);
    wrapRef.current?.scrollTo({ top: 0 });
  }, [content]);

  return (
    <ViwerWrap ref={wrapRef}>
      <ForwardViewer ref={viewRef} initialValue={content} />
    </ViwerWrap>
  );
};

export const EditorContainer = ({
  value,
  setValue,
  postId,
}: EditorContainerProps) => {
  const editorRef = useRef<EditorType>();

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
    setValue(editorRef.current?.getInstance().getMarkdown());
  };

  return (
    <EditorWrap>
      <ForwardEditor ref={editorRef} onChange={onChange} />
    </EditorWrap>
  );
};
const ViwerWrap = styled.div`
  .toastui-editor-contents {
    font-size: 15px;
  }
  width: 100%;
`;
const EditorWrap = styled.div`
  .toastui-editor-contents {
    font-size: 15px;
  }
  width: 100%;
  height: 100%;
`;

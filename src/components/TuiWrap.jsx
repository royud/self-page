import { Editor, Viewer } from "@toast-ui/react-editor";

import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "@/firebase";
import { useContext } from "react";
import { CustomThemeContext } from "@/pages/_app";

const plugins = [codeSyntaxHighlight];

export const TuiViewer = ({ forwardedRef, ...props }) => {
  const { theme } = useContext(CustomThemeContext);
  return (
    <div
      className={`editor-panel-editor${
        theme == "dark" ? " toastui-editor-dark" : ""
      }`}
    >
      <Viewer
        {...props}
        ref={forwardedRef}
        plugins={plugins}
        extendedAutolinks={true}
      />
    </div>
  );
};

export const TuiEditor = ({ forwardedRef, ...props }) => {
  const { theme } = useContext(CustomThemeContext);

  const addImage = async (blob, callback) => {
    const imageRef = ref(
      storage,
      `images/${blob.lastModifiedDate + blob.name}`
    );

    uploadBytes(imageRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downUrl) =>
        callback(downUrl, blob.name)
      );
    });
  };

  return (
    <div
      className={`editor-panel-editor${
        theme == "dark" ? " toastui-editor-dark" : ""
      }`}
    >
      <Editor
        {...props}
        ref={forwardedRef}
        plugins={plugins}
        previewStyle="vertical"
        extendedAutolinks={true}
        hideModeSwitch={true}
        height="400px"
        hooks={{
          addImageBlobHook: addImage,
        }}
      />
    </div>
  );
};

import {
  Editor,
  Viewer,
  ViewerProps,
  EditorProps,
} from "@toast-ui/react-editor";

import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "@/firebase";

const plugins = [codeSyntaxHighlight];

export const TuiViewer = ({ forwardedRef, ...props }) => (
  <Viewer
    {...props}
    ref={forwardedRef}
    plugins={plugins}
    extendedAutolinks={true}
  />
);

export const TuiEditor = ({ forwardedRef, ...props }) => {
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
  );
};

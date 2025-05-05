import React, { useContext, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { toBase64 } from "../../../../Product Store/frontend/src/utils/toBase64";
import { toast } from "react-toastify";
import { ThemeContext } from "../layouts/RootLayout";

const baseStyle = (theme) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  border: "2px dashed #eeeeee",
  borderRadius: 2,
  backgroundColor: theme === "light" ? "#fafafa" : "#393e46",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
});

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export function DropZone({ setPreview, setSelectedFile, name }) {
  const theme = useContext(ThemeContext).theme;

  async function onDropAccepted(files) {
    const base64Img = await toBase64(files[0]);
    setPreview(base64Img);
    setSelectedFile(base64Img);
  }

  async function onDropRejected() {
    setSelectedFile(undefined);
    setPreview(null);
    return toast.error("Please upload an image (maximum size: 2MB).");
  }
  const maxSize = 2 * 1024 * 1024;
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    multiple: false,
    maxSize,
    accept: { "image/*": [] },
    onDropAccepted,
    onDropRejected,
  });

  const style = useMemo(
    () => ({
      ...baseStyle(theme),
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject, theme]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} name={name} />
        {isDragReject ? (
          "Don't select multiple image or files"
        ) : isDragActive ? (
          <p>File looks good! 👍</p>
        ) : (
          <p>Drag 'n' drop some image here, or click to select image</p>
        )}
      </div>
    </div>
  );
}

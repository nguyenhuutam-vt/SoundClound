"use client";
import { FileWithPath, useDropzone } from "react-dropzone";
import "./theme.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { use, useCallback, useState } from "react";
import { sendRequest, sendRequestUpload } from "@/utils/api";
import { useSession } from "next-auth/react";
import axios from "axios";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload() {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        multiple
      />
    </Button>
  );
}

interface IProps {
  setValue: (value: number) => void;
  trackUpload: {
    fileName: string;
    percent: number;
  };
  setTrackUpload: any;
}

const Step1 = (props: IProps) => {
  //cach lay session tu phia client
  const [percent, setPercent] = useState(0);
  const { data: session } = useSession();
  const { trackUpload } = props;

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length > 0) {
        props.setValue(1);
        // Handle the accepted files
        const audioFile = acceptedFiles[0];
        const formData = new FormData();
        formData.append("fileUpload", audioFile);

        // const chills = await sendRequestUpload<IBackendRes<ITrackTop[]>>({
        //   url: "http://localhost:8000/api/v1/files/upload",
        //   method: "POST",
        //   body: formData,
        //   headers: {
        //     Authorization: `Bearer ${session?.access_token}`,
        //     target_type: "track",
        //   },
        // });
        try {
          const res = await axios.post(
            "http://localhost:8000/api/v1/files/upload",
            formData,
            {
              headers: {
                Authorization: `Bearer ${session?.access_token}`,
                target_type: "track",
              },
              onUploadProgress: (progressEvent: any) => {
                let percentCompleted = Math.floor(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setPercent(percentCompleted);
                props.setTrackUpload({
                  ...trackUpload,
                  fileName: audioFile.name,
                  percent: percentCompleted,
                });
                // do whatever you like with the percentage complete
                // maybe dispatch an action that will update a progress bar or something
              },
            }
          );
          props.setTrackUpload((prevState: any) => ({
            ...prevState,
            uploadedTrackName: res.data.data.fileName,
          }));
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    },
    [session]
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp4"],
    },
  });

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <InputFileUpload />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

export default Step1;

import { sendRequest } from "@/utils/api";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  LinearProgressProps,
  MenuItem,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { CloudUploadIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function LinearWithValueLabel({ percent }: { percent: number }) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={percent} />
    </Box>
  );
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

function InputFileUpload(props: any) {
  const { setInfo, info } = props;
  const { data: session } = useSession();

  const handleUpload = async (image: any) => {
    // Handle file upload logic here
    try {
      const formData = new FormData();
      formData.append("fileUpload", image);

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            target_type: "images",
          },
        }
      );
      setInfo({
        ...info,
        imgUrl: image.name,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files[0]);
    }
  };

  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
}
interface ITrack {
  trackUpload: {
    fileName: string;
    percent: number;
    uploadedTrackName?: string;
  };
}

interface INewTrack {
  title: string;
  description: string;
  trackUrl: string;
  imgUrl: string;
  category: string;
}
const Step2 = (props: ITrack) => {
  const [value, setValue] = React.useState(0);
  const [info, setInfo] = React.useState<INewTrack>({
    title: "",
    description: "",
    trackUrl: "",
    imgUrl: "",
    category: "",
  });
  const { trackUpload } = props;
  useEffect(() => {
    setInfo({
      ...info,
      trackUrl: "Xin-Dung-Lang-Im-Soobin-Hoang-Son-1756615971630.mp3",
    });
  }, [trackUpload]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
    // Do something with the files
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const category = [
    {
      value: "CHILL",
      label: "CHILL",
    },
    {
      value: "WORKOUT",
      label: "WORKOUT",
    },
    {
      value: "PARTY",
      label: "PARTY",
    },
  ];
  const { data: session } = useSession();

  const handleSubmit = async () => {
    // Handle form submission logic here
    const res = await sendRequest<IBackendRes<ITrackTop[]>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks`,
      method: "POST",
      body: {
        title: info.title,
        description: info.description,
        trackUrl: info.trackUrl,
        imgUrl: info.imgUrl,
        category: info.category,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
  };

  return (
    <>
      <div>
        <div>
          <div>Your uploading track: {props.trackUpload.fileName}</div>
          <LinearWithValueLabel percent={props.trackUpload.percent} />
        </div>

        <Grid container spacing={2} mt={5}>
          <Grid
            item
            xs={6}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ height: 250, width: 250, background: "#ccc" }}>
              <div></div>
            </div>
            <div>
              <InputFileUpload setInfo={setInfo} info={info} />
            </div>
          </Grid>
          <Grid item xs={6} md={8}>
            <TextField
              value={info?.title || ""}
              onChange={(e) => {
                setInfo({
                  ...info,
                  title: e.target.value,
                });
              }}
              label="Title"
              variant="standard"
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              variant="standard"
              fullWidth
              margin="dense"
              value={info?.description || ""}
              onChange={(e) => {
                setInfo({
                  ...info,
                  description: e.target.value,
                });
              }}
            />
            <TextField
              sx={{
                mt: 3,
              }}
              id="outlined-select-currency"
              select
              label="Category"
              fullWidth
              variant="standard"
              //   defaultValue="EUR"
              value={info?.category || ""}
              onChange={(e) => {
                setInfo({
                  ...info,
                  category: e.target.value,
                });
              }}
            >
              {category.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="outlined"
              sx={{
                mt: 5,
              }}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Step2;

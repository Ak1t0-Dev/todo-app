import * as React from "react";
import Button from "@mui/material/Button";
import { styled as muistyled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import PriorityBox from "../SelectBoxes/PriorityBox";
import CategoriesChip from "../SelectBoxes/CategoriesChip";
import { ChangeEvent, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { TextField } from "@mui/material";
import axios from "axios";

const BootstrapDialog = muistyled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface Props {
  handlePostChanged: () => void;
}

const Title = styled.input`
  width: 80%;
  font-size: 2rem;
  border: none;
  padding: 0.5rem 1rem;
`;

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 10,
            top: 20,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs({ handlePostChanged }: Props) {
  const [postCategories, setPostCategories] = useState<string[]>([]);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postPriority, setPostPriority] = useState("");
  const [open, setOpen] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const handlePriority = (event: SelectChangeEvent) => {
    setPostPriority(event.target.value);
  };

  const handleContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value);
  };

  const handleCategories = (value: string[]): void => {
    setPostCategories(value);
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setPostTitle(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const resultCreatePost = await createPost();
    if (resultCreatePost) {
      handlePostChanged();
    }
    setPostCategories([]);
    setPostTitle("");
    setPostContent("");
    setPostPriority("");
    setOpen(false);
  };

  const createPost = async (): Promise<Boolean> => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/createpost",
        {
          title: postTitle,
          priority: postPriority,
          categories: postCategories,
          content: postContent,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status) {
        return true;
      } else {
        console.error("Error:", response.data);
        return false;
      }
    } catch (error: any) {
      console.error("Error:", error.response.data);
      return false;
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        CREATE
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Title placeholder="title" onChange={handleTitle} />
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <PriorityBox
            postPriority={postPriority}
            handlePriority={handlePriority}
          />
          <CategoriesChip
            postCategories={postCategories}
            handleCategories={handleCategories}
          />
          <TextField
            id="outlined-multiline-static"
            label="Content"
            multiline
            rows={4}
            defaultValue="Default Value"
            onChange={handleContent}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

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
import { Category } from "../../../types";
import { SelectChangeEvent } from "@mui/material/Select";

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

const Priority = styled.select`
  font-size: 1rem;
`;

const Title = styled.input`
  width: 80%;
  font-size: 2rem;
  border: none;
  padding: 0.5rem 1rem;
`;

const Content = styled.textarea`
  width: 80%;
  font-size: 1rem;
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

export default function CustomizedDialogs() {
  const [postCategories, setPostCategories] = useState<string[]>([]);
  const [selectedcategories, setSelectedcategories] = useState<string[]>([]);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState("");

  const handlePriority = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
  };

  const handleContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value);
  };

  const handleSelectedCategories = (value: string[]): void => {
    setSelectedcategories(value);
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
          <PriorityBox priority={priority} handlePriority={handlePriority} />
          <CategoriesChip
            selectedcategories={selectedcategories}
            handleSelectedCategories={handleSelectedCategories}
          />
          <Content placeholder="content" onChange={handleContent} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

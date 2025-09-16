import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "./base-modal.scss";

interface BaseModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  children: React.ReactNode;
}

export default function BaseModal({
  open,
  title,
  onClose,
  onSubmit,
  submitLabel = "Save",
  children,
}: BaseModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: "dialog-paper" }}
    >
      <DialogTitle component="div" className="dialog-title">
        <div style={{ fontSize: "1.25rem", fontWeight: 500 }}>{title}</div>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        {onSubmit && (
          <Button onClick={onSubmit} variant="contained">
            {submitLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

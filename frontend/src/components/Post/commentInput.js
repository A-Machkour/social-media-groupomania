import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

export default function CommentInput() {
  const handleSubmit = event => {};
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: "flex", alignItems: "flex-end", px: 2, pb: 2 }}
    >
      <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        id="comment"
        label="Commentaire"
        variant="standard"
        fullWidth
        sx={{ mr: 2 }}
      />
      <IconButton aria-label="send" type="submit" size="small" color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  );
}

import React from "react";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

export default function CommentsList(props) {
  return (
    <Collapse in={props.expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>Commentaire 1</Typography>
        <Typography paragraph>Commentaire 2</Typography>
        <Typography paragraph>Commentaire 3</Typography>
      </CardContent>
    </Collapse>
  );
}

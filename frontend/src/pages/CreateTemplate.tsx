import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

const CreateTemplate: React.FC = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Create Template
        </Typography>
        <Paper elevation={3} style={{ padding: "16px" }}>
          Your code here
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateTemplate;

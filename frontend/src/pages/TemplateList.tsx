import { Box, Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import apiClient from "../api/axios";

interface Template {
  id: number;
  name: string;
  description: string;
}

const TemplateList: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    apiClient.get("/templates").then((response) => {
      setTemplates(response.data.templates);
    });
    console.log("🚀 ~ file: TemplateList.tsx:13 ~ templates:", templates);
  }, [templates.length]);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Template List
        </Typography>
        <Paper elevation={3} style={{ padding: "16px" }}>
          Your code here.
        </Paper>
      </Box>
    </Container>
  );
};

export default TemplateList;

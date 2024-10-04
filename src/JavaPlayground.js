import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";
import Editor from "@monaco-editor/react";

const JavaPlayground = () => {
  const [code, setCode] = useState(
    `public class DynamicClass {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOutput("");
    setError("");

    try {
      const response = await fetch("/compile", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: code,
      });

      const result = await response.text();

      if (response.ok) {
        setOutput(result);
      } else {
        setError(result);
      }
    } catch (err) {
      setError("An error occurred while communicating with the server.");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Java Playground
        </Typography>
        <Paper elevation={3} sx={{ mb: 2 }}>
          <Editor
            height="400px"
            defaultLanguage="java"
            defaultValue={code}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </Paper>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
        >
          Compile and Run
        </Button>
        {output && (
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Output:
            </Typography>
            <Typography component="pre" sx={{ whiteSpace: "pre-wrap" }}>
              {output}
            </Typography>
          </Paper>
        )}
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default JavaPlayground;

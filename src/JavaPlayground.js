import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";

const JavaPlayground = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

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
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Java Playground
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            label="Enter Java Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`public class DynamicClass {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
          >
            Compile and Run
          </Button>
        </form>
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

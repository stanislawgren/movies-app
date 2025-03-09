import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const PageNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      height="100vh"
      className="flex flex-col items-center justify-center p-6"
    >
      <Heading fontSize="6xl" fontWeight="bold">
        404
      </Heading>
      <Text fontSize="xl" mt={4}>
        Oops! Page not found.
      </Text>
      <Text mt={2}>Redirecting to homepage in 10 seconds...</Text>
      <Button
        mt={6}
        px={6}
        py={3}
        onClick={() => navigate("/")}
        variant="subtle"
        bgColor={"black"}
        _hover={{ bg: "gray.800" }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default PageNotFound;

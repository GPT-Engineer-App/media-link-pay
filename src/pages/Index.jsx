import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Stack, Textarea, useToast, Image, Link, VStack, Divider, Text } from "@chakra-ui/react";
import { FaLock, FaSignInAlt, FaUserPlus, FaImage, FaLink, FaUnlockAlt, FaPlus } from "react-icons/fa";

const apiBaseUrl = "https://backengine-eouz.fly.dev";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ content: "", imageUrl: "", paywallLink: "" });
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Login failed");
      const data = await response.json();
      setAccessToken(data.accessToken);
      toast({ title: "Login successful", status: "success" });
    } catch (error) {
      toast({ title: error.message, status: "error" });
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Signup failed");
      toast({ title: "Signup successful", status: "success" });
    } catch (error) {
      toast({ title: error.message, status: "error" });
    }
  };

  const handlePostSubmit = () => {
    // Normally you would send a request to the API, but for this example we will just add it to local state.
    setPosts([...posts, newPost]);
    setNewPost({ content: "", imageUrl: "", paywallLink: "" });
    toast({ title: "Post submitted", status: "success" });
  };

  return (
    <Container maxW="container.md" py={8}>
      {!accessToken ? (
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} onClick={handleLogin}>
            Login
          </Button>
          <Button leftIcon={<FaUserPlus />} colorScheme="teal" onClick={handleSignup}>
            Signup
          </Button>
        </Stack>
      ) : (
        <VStack spacing={4} align="stretch">
          <Heading as="h2" size="lg">
            Create a Post
          </Heading>
          <Textarea placeholder="What's on your mind?" value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} />
          <Input placeholder="Image URL" leftIcon={<FaImage />} value={newPost.imageUrl} onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })} />
          <Input placeholder="Paywall Link" leftIcon={<FaLink />} value={newPost.paywallLink} onChange={(e) => setNewPost({ ...newPost, paywallLink: e.target.value })} />
          <Button leftIcon={<FaPlus />} onClick={handlePostSubmit}>
            Post
          </Button>
          <Divider />
          <Heading as="h3" size="md">
            Feed
          </Heading>
          {posts.map((post, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px">
              <Text mb={2}>{post.content}</Text>
              {post.imageUrl && <Image src={post.imageUrl} alt="Post image" />}
              {post.paywallLink && (
                <Link href={post.paywallLink} isExternal>
                  <Button mt={2} rightIcon={<FaUnlockAlt />}>
                    Access Paywalled Content
                  </Button>
                </Link>
              )}
            </Box>
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default Index;

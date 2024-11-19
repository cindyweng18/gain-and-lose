"use client"
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { InputGroup, InputRightElement } from '@chakra-ui/input'
// import { Input } from "@chakra-ui/react"
import {
  Flex,
  Box,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  Input,
  Group,
  InputAddon,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function Home() {
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: "I am a 25 year old female, 5 feet 3 inches height, 120 lbs, and I want to be more fit and reach 100 lbs.",
      });

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error("Error generating respose:", error);
      alert("An error occurred while generating a response. Please try again.");
    }

  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Gain & Lose
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Fill out your information below to get an AI-generated response for your fitness goals ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="age">
                  <FormLabel>Age</FormLabel>
                  <Group attached>
                    <Input type="number" />
                    <InputAddon>years old</InputAddon>
                  </Group>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={'text'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}


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
  createListCollection,
  SelectRoot,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [userSex, setUserSex] = useState('');
  const [feet, setFeet] = useState(0);
  const [inch, setInch] = useState(0);
  const [weight, setWeight] = useState(0);
  const [goal, setGoal] = useState('');

  const sex = createListCollection({
    items:[
      {label: "F", value: "female"},
      {label: "M", value: "male"},
      {label: "O", value: "unknown"}
    ]
  })

  const handleSubmit = async () => {
    const userInput = `Hi, my name is ${name} and I am ${age} years old, ${feet} feet ${inch} inches height, ${weight} lbs, and ${goal}.`
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: userInput,
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
                  <Input placeholder="First Name" type="text" onChange={(e) => setName(e.target.value)}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="age" isRequired>
                  <FormLabel>Age</FormLabel>
                  <Group attached>
                    <Input type="number" onChange={(e) => setAge(e.target.value)}/>
                    <InputAddon>years old</InputAddon>
                  </Group>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                <SelectRoot collection={sex} size="sm" width="100px" onChange={(e) => setUserSex(e.target.value)}>
                  <SelectLabel>Sex</SelectLabel>
                  <SelectTrigger>
                    <SelectValueText placeholder="Sex" />
                  </SelectTrigger>
                  <SelectContent>
                    {sex.items.map((item) => (
                      <SelectItem item={item} key={item.value}>
                          {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
                </FormControl>
              </Box>
            </HStack>
            {/* Have the ability for user to change metrics */}
            <HStack>
              <Box>
                <FormControl id="height-ft" isRequired>
                  <FormLabel>Height (ft) </FormLabel>
                  <Input type="number" onChange={(e) => setFeet(e.target.value)}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="height-in" isRequired>
                  <FormLabel>Height (in)</FormLabel>
                    <Input type="number" onChange={(e) => setInch(e.target.value)}/>
                  </FormControl>
              </Box>
              <Box>
                <FormControl id="weight" isRequired>
                  <FormLabel>Weight (lbs)</FormLabel>
                    <Input type="number" onChange={(e) => setWeight(e.target.value)}/>
                  </FormControl>
              </Box>
            </HStack>
            <FormControl id="goal" isRequired>
              <FormLabel>Fitness Goal</FormLabel>
              <InputGroup>
                <Input placeholder="I want to..." type={'text'} onChange={(e) => setGoal(e.target.value)} />
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleSubmit}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Generate an AI Response!
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}


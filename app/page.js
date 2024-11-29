"use client"
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { InputGroup } from '@chakra-ui/input'
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"
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
  const [responseAI, setResponseAI] = useState([])

  const height = createListCollection({
    items:[
      {label: "ft, in", value: "ft"},
      {label: "cm", value: "cm"},
    ]
  })

  const weightSelect = createListCollection({
    items:[
      {label: "lbs", value: "lbs"},
      {label: "kg", value: "kg"},
    ]
  })

  const sex = createListCollection({
    items:[
      {label: "F", value: "female"},
      {label: "M", value: "male"},
      {label: "O", value: "unknown"}
    ]
  })

  const handleSubmit = async () => {
    const userInput = `Hi, my name is ${name} and I am ${age} years old ${userSex}, ${feet} feet ${inch} inches height, ${weight} lbs, and ${goal}.`
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: userInput,
      });

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      const data = await response.json();
      // console.log(data.recommendations);
      setResponseAI(data.recommendations);
    } catch (error) {
      console.error("Error generating respose:", error);
      alert("An error occurred while generating a response. Please try again.");
    }

  }
  return (
    <>
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
            <HStack>
              <Box>
              <FormControl>
              <InputGroup
                flex="1"
                startElement="https://"
                endElement={
                  <SelectRoot collection={height} size="sm" width="100px" onChange={(e) => setUserSex(e.target.value)}>
                  <SelectLabel>Height</SelectLabel>
                  <SelectTrigger>
                    <SelectValueText placeholder="height" />
                  </SelectTrigger>
                  <SelectContent>
                    {height.items.map((item) => (
                      <SelectItem item={item} key={item.value}>
                          {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
                }
              >
                <Input ps="4.75em" pe="0" placeholder="yoursite.com" />
              </InputGroup>
                
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
            <DialogRoot
              key={"center"}
              size="xl"
              placement={"center"}
              motionPreset="slide-in-bottom"
            >
              <DialogTrigger asChild>
                <Button variant="outline" onClick={handleSubmit}> Generate AI Response! </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle> <Text textStyle="4xl">Fitness Recommendations</Text></DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <Text textStyle="2xl" fontWeight="bold"> Daily Calorie Intake ℹ </Text>
                  <Text textStyle="lg"> {responseAI.dailyCalorieIntake} </Text>
                  <Text textStyle="2xl" fontWeight="bold"> Exercises 🏃</Text>
                  <Text textStyle="lg"> {responseAI.exercise} </Text>
                  <Text textStyle="2xl" fontWeight="bold"> Meal Ideas 🍴 </Text>
                  <Text textStyle="lg"> {responseAI.mealIdeas} </Text>
                  <Text textStyle="2xl" fontWeight="bold"> Tips for Consistency 📑</Text>
                  <Text textStyle="lg"> {responseAI.tipsForConsistency} </Text>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <Button>Save</Button>
                </DialogFooter>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  </>
  );
}


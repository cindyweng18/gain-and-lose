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
import { Switch } from '@/components/ui/switch'

export default function Home() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [userSex, setUserSex] = useState('');
  const [feet, setFeet] = useState(0);
  const [inch, setInch] = useState(0);
  const [weight, setWeight] = useState(0);
  const [goal, setGoal] = useState('');
  const [responseAI, setResponseAI] = useState([]);
  const [checkedHeight, setCheckedHeight] = useState(false);
  const [checkedWeight, setCheckedWeight] = useState(false);
  const [cm, setCm] = useState(0);
  const [weightKg, setWeightKg] = useState(0);
  const [weightLbs, setWeightLbs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    // Change it to be height and weight prompt?
    let heightPrompt;
    let weightPrompt;

    if (checkedHeight) {
      heightPrompt = `${cm} cm`;
    } else {
      heightPrompt = `${feet} feet ${inch} inches`;
    }

    if (checkedWeight) {
      weightPrompt = `${weightKg} kg`;
    } else {
      weightPrompt = `${weightLbs} lbs`;
    }
    
    const userInput = `Hi, my name is ${name} and I am ${age} years old ${userSex}, ${heightPrompt} height, ${weightPrompt}, and ${goal}.`;

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
      setIsLoading(false);
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
                <HStack> 
              <FormLabel>Height</FormLabel>
                   ft <Switch onChange={(e) => {setCheckedHeight(e.target.checked)}}>cm</Switch>
                </HStack>
                    {checkedHeight ? 
                    <FormControl id="height-cm" isRequired>
                      <Group attached>
                        <Input type="number" onChange={(e) => setCm(e.target.value)}/> 
                        <InputAddon>cm</InputAddon>
                      </Group>
                    </FormControl> 
                    : 
                    <HStack> 
                    <Box>
                    <FormControl id="height-ft" isRequired>
                      <Group attached>
                        <Input type="number" onChange={(e) => setFeet(e.target.value)}/>
                        <InputAddon>ft</InputAddon>
                      </Group>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="height-in" isRequired>
                      <Group attached>
                        <Input type="number" onChange={(e) => setInch(e.target.value)}/>
                        <InputAddon>in</InputAddon>
                      </Group>
                      </FormControl>
                  </Box>
                  </HStack>
                  }
              </Box>
              <Box>
              <HStack> 
              <FormLabel> Weight</FormLabel>
                   lbs <Switch onChange={(e) => {setCheckedWeight(e.target.checked)}}>kg</Switch>
                </HStack>
                    {checkedWeight ? 
                    <FormControl id="weight-kg" isRequired>
                      <Group attached>
                        <Input type="number" onChange={(e) => setWeightKg(e.target.value)}/> 
                        <InputAddon>kg</InputAddon>
                      </Group>
                    </FormControl> 
                    : 
                    <FormControl id="weight-lb" isRequired>
                      <Group attached>
                        <Input type="number" onChange={(e) => setWeightLbs(e.target.value)}/> 
                        <InputAddon>lbs</InputAddon>
                      </Group>
                    </FormControl> 
                  }
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
                {isLoading && <div>Loading...</div>} 
                {responseAI && 
                <>
                  <Text textStyle="2xl" fontWeight="bold"> Daily Calorie Intake ℹ </Text>
                  <Text textStyle="lg"> {responseAI.dailyCalorieIntake} </Text>
                  <Text textStyle="2xl" fontWeight="bold"> Exercises 🏃</Text>
                  <Text textStyle="lg"> {responseAI.exercise} </Text>
                  <Text textStyle="lg"> {responseAI.exercises} </Text>
                  <Text textStyle="2xl" fontWeight="bold"> Meal Ideas 🍴 </Text>
                  <Text textStyle="lg"> {responseAI.mealIdeas} </Text>
                  <Text textStyle="2xl" fontWeight="bold"> Tips for Consistency 📑</Text>
                  <Text textStyle="lg"> {responseAI.tipsForConsistency} </Text>
                  </>
}
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


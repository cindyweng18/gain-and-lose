"use client";

import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

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
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field label="Name">
          <Input name="name" />
        </Field>

        <Field label="Weight">
          <Input name="weight" type="number" />
        </Field>

        <Field label="Height (ft)">
          <Input name="height" type="number" />
        </Field>
        <Field label="Height (in)">
          <Input name="height" type="number" />
        </Field>
      </Fieldset.Content>

      <Button onClick={handleSubmit} type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
  );
}


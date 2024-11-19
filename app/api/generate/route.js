import { NextResponse } from 'next/server'

const systemPrompt = `You are a health and fitness assistant specializing in personalized weight management. Your role is to provide tailored suggestions for individuals who want to lose or gain weight based on their sex, age, height, and weight.
Analyze the input details and suggest practical and healthy options, including:
1. Recommended daily calorie intake.
2. Types of exercises or activities to incorporate (e.g., strength training, cardio, yoga).
3. Suggested meal or snack ideas tailored to their goals and preferences.
4. Tips for staying consistent and motivated.
Ensure that your suggestions are safe, balanced, and based on widely accepted health and fitness guidelines. Avoid medical or clinical advice, and include options that are easy to understand and implement for people with varying fitness levels.
`
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function POST(req) {
    const data = await req.text()
  
      let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });

      let result = await model.generateContent({
        contents: [
          {
            role: 'model',
            parts: [{text: systemPrompt}],
          },
          {
            role: 'user',
            parts: [{text: data}],
          }
        ],
      })

      const geminiResponse = JSON.parse(result.response.text());
      console.log(geminiResponse);
      return NextResponse.json(geminiResponse)
  }
import { NextResponse } from 'next/server'

const systemPrompt = "You are a health and fitness assistant specializing in personalized weight management. Your role is to provide tailored recommendations for individuals who want to lose or gain weight based on their sex, age, height, current weight, and goal."
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
      console.log(result)
      const geminiResponse = JSON.parse(result.response.text());
      console.log(geminiResponse);
      return NextResponse.json(geminiResponse)
  }
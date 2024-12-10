import { NextResponse } from 'next/server'

const systemPrompt = `
You are a health and fitness assistant specializing in personalized weight management. Your role is to provide tailored recommendations for individuals who want to lose or gain weight based on their sex, age, height, current weight, and goal weight.

Output the results in a well-structured dictionary format with the following key sections:

calorieIntake: Provide a safe daily calorie range based on the user's weight management goal.
exerciseRecommendations: Suggest exercise types, frequency, and detailed guidance tailored to the user's fitness level and goals.
mealSuggestions: Offer practical meal advice, healthy snack options, and foods or cooking methods to focus on or avoid.
motivationTips: Provide tips for staying consistent and motivated throughout their journey.
Ensure that all suggestions are safe, practical, and based on widely accepted health and fitness guidelines. Avoid medical or clinical advice. The output must be in JSON/dictionary format and formatted for readability.
`
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
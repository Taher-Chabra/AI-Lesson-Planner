import { formInputs } from "@/pages/LessonInput";

const googleAPI: string = import.meta.env.VITE_GEMINI_API;

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function generateContent(promptValues: formInputs) {
  const prompt = `
    Create a detailed lesson plan based on the following parameters:

    - Topic: ${promptValues.topic},
    - Grade Level: ${promptValues.gradeLevel} class,
    - Main Concept/Subtopics: ${promptValues.concepts},
    - Materials Needed: ${promptValues.materialsNeeded},
    - Learning Objectives: ${promptValues.learningObjectives}

    The lesson plan should include:

    1. Introduction: A brief overview to introduce the topic and capture students' interest.
    2. Instructional Activities: Step-by-step activities to teach the main concept and subtopics.
    3. Assessment Methods: Strategies to evaluate student understanding and mastery of the objectives.
    4. Differentiation Strategies: Approaches to accommodate diverse learning styles and needs.
    5. Conclusion: A summary to reinforce the lesson and provide closure.

    Use headings and subheadings where appropriate.
    Use bullet points (*) for lists.
    Use line breaks (\\n) to separate paragraphs and list items.

    Ensure the lesson plan is engaging, age-appropriate, and aligns with the provided learning objectives.

  (Please provide the lesson plan directly without any conversational preamble or closing remarks.)
   `;

  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const response = await fetch(`${API_URL}?key=${googleAPI}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

export default generateContent;
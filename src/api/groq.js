const BASE_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

/**
 * Generates a recipe using the Groq API.
 * @param {string[]} ingredients - List of ingredients the user has.
 * @param {string} craving - Description of what the user is craving.
 * @param {string[]} activeFilters - List of dietary filters.
 * @returns {Promise<Object>} - The generated recipe JSON object.
 */
export async function generateRecipe(ingredients, craving, activeFilters) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('Groq API Key is missing. Please add VITE_GROQ_API_KEY to your .env file.');
  }

  // Build the user prompt dynamically
  let userPrompt = "Generate a unique recipe based on the following:\n";
  
  if (ingredients && ingredients.length > 0) {
    userPrompt += `- Ingredients I have: ${ingredients.join(', ')}\n`;
  }
  
  if (craving) {
    userPrompt += `- I'm craving: ${craving}\n`;
  }
  
  if (activeFilters && activeFilters.length > 0) {
    userPrompt += `- Dietary requirements: ${activeFilters.join(', ')}\n`;
  }

  userPrompt += `
Please respond with exactly 3 distinct recipe options in the JSON shape below. 
- Return a JSON object with a "recipes" key containing an array of 3 recipe objects.
- For each recipe:
  - "haveIt" should be true if the ingredient is in my provided list, otherwise false.
  - "shoppingList" should only contain ingredients I don't have.

JSON Structure:
{
  "recipes": [
    {
      "name": "string",
      "description": "one sentence string",
      "prepTime": "string",
      "cookTime": "string",
      "servings": 0,
      "difficulty": "Easy | Medium | Hard",
      "ingredients": [
        { "name": "string", "amount": "string", "haveIt": boolean }
      ],
      "steps": [
        { "step": 1, "instruction": "string", "duration": 0 }
      ],
      "nutrition": {
        "calories": "string",
        "protein": "string",
        "carbs": "string",
        "fat": "string",
        "fiber": "string"
      },
      "shoppingList": ["string"]
    }
  ]
}
`;

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are Chef AI, an expert culinary assistant. You generate detailed, high-quality recipes. Always provide comprehensive, detailed instructions in the steps to ensure a great result. Always respond with valid JSON only, no markdown, no explanation, just the raw JSON object.'
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to connect to Groq API');
    }

    const data = await response.json();
    const recipeText = data.choices[0].message.content;
    
    try {
      const parsed = JSON.parse(recipeText);
      return parsed.recipes || [];
    } catch (parseError) {
      console.error('Invalid JSON response from Groq:', recipeText);
      throw new Error('The AI generated an invalid recipe format. Please try again.');
    }
  } catch (error) {
    console.error('Groq API Error:', error);
    throw error;
  }
}

/**
 * Scans an image (receipt or pantry) and extracts a list of ingredients.
 * @param {string} base64Image - The base64 encoded image data.
 * @returns {Promise<string[]>} - A list of extracted ingredient names.
 */
export async function scanIngredientsFromImage(base64Image) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const VISION_MODEL = 'llama-3.2-11b-vision-preview';

  if (!apiKey) {
    throw new Error('Groq API Key is missing.');
  }

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: VISION_MODEL,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'List all food ingredients or grocery items found in this image. Respond with a raw JSON array of strings only, e.g. ["apple", "flour"]. If it is a receipt, extract the items purchased. No explanation, no markdown.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        temperature: 0,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to scan image');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : (parsed.ingredients || parsed.items || []);
    } catch (e) {
      console.error('Failed to parse vision response:', content);
      return [];
    }
  } catch (error) {
    console.error('Vision API Error:', error);
    throw error;
  }
}

/**
 * Extracts a list of ingredients from a natural language sentence.
 * @param {string} text - The natural language text/transcript.
 * @returns {Promise<string[]>} - A list of extracted ingredient names.
 */
export async function extractIngredientsFromText(text) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const EXTRACT_MODEL = 'llama-3.3-70b-versatile';

  if (!apiKey) {
    throw new Error('Groq API Key is missing.');
  }

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: EXTRACT_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a culinary data extractor. Extract all food ingredients from the user\'s text. Respond with a raw JSON array of strings only. No explanation, no markdown.'
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to extract ingredients');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : (parsed.ingredients || parsed.items || []);
    } catch (e) {
      return [];
    }
  } catch (error) {
    console.error('Extraction Error:', error);
    return [];
  }
}

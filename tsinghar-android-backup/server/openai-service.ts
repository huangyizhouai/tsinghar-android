import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ArticleContent {
  title: string;
  titleZh: string;
  content: string;
  contentZh: string;
}

export async function generateArticleContent(topic: string, category: string): Promise<ArticleContent> {
  try {
    const prompt = `Generate a comprehensive recovery article about "${topic}" in the category "${category}". 
    The article should be educational, supportive, and focused on pornography addiction recovery.
    
    Please provide both English and Chinese versions with the following structure:
    - English title (professional and engaging)
    - Chinese title (professional translation)
    - English content (800-1200 words, well-structured with practical advice)
    - Chinese content (comprehensive translation maintaining meaning and tone)
    
    Focus on evidence-based information, practical strategies, and encouraging tone.
    Include actionable steps and scientific insights where relevant.
    
    Return the response in JSON format with these exact keys: title, titleZh, content, contentZh`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert in addiction recovery, psychology, and wellness. Create helpful, evidence-based content for people recovering from pornography addiction. Provide both English and Chinese versions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 3000
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      title: result.title || `${topic} - Recovery Guide`,
      titleZh: result.titleZh || `${topic} - 康复指南`,
      content: result.content || 'Content generation failed. Please try again.',
      contentZh: result.contentZh || '内容生成失败。请重试。'
    };
  } catch (error) {
    console.error('Error generating article content:', error);
    throw new Error('Failed to generate article content');
  }
}

export async function generateArticleByCategory(categoryName: string): Promise<ArticleContent> {
  const topicMap: Record<string, string> = {
    'addiction-myths': 'Understanding Addiction Science and Debunking Common Myths',
    'health-effects': 'Physical and Mental Health Recovery Benefits',
    'recovery-strategies': 'Effective Recovery Strategies and Techniques'
  };

  const topic = topicMap[categoryName] || categoryName;
  return generateArticleContent(topic, categoryName);
}
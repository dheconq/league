
import { GoogleGenAI } from "@google/genai";
import { StandingsRow, LeagueType } from "../types";

export const getLeagueAnalysis = async (standings: StandingsRow[], leagueType: LeagueType) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const standingsText = standings.map((s, i) => 
    `${i + 1}. ${s.teamName}: ${s.points}pts (P${s.played}, W${s.won}, GD${s.gd})`
  ).join('\n');

  const prompt = `
    Analyze the current standings for the St Paul's Catholic Seminary "Team ${leagueType}" League:
    
    ${standingsText}
    
    Write a short, engaging summary (max 3 sentences) about who is dominating, who is struggling, and the general competitive atmosphere of the seminary league. Use a slightly formal yet encouraging tone befitting a seminary environment.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The league continues to be competitive with all teams showing great sportsmanship.";
  }
};

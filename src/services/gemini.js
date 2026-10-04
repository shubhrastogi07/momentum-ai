import { GoogleGenAI } from "@google/genai";

console.log(
  "API KEY EXISTS:",
  !!import.meta.env.VITE_GEMINI_API_KEY
);

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const today = new Date().toISOString().split("T")[0];
export async function generateAIPlan(tasks, availableMinutes, startTime) {
  const prompt = `
You are an intelligent productivity planner.

Create a realistic daily schedule for the user.


Today: ${today}
Available time: ${availableMinutes} minutes
Start time: ${startTime}

Tasks:
${JSON.stringify(tasks, null, 2)}

Rules:
1. Prioritize high priority tasks.
2. Prioritize tasks with the closest due dates.
3. A task with both high priority and an approaching due date should be strongly prioritized.
4. Consider each task's estimatedMinutes when building the schedule.
5. Never schedule a task beyond the available time.
6. Never schedule completed tasks.
7. Include short breaks when appropriate.
8. If there are more tasks than available time, select the most important tasks instead of exceeding the available time.
9. Schedule tasks in a logical order rather than simply following the input order.
10. For every scheduled task, provide a short reason explaining why it was selected at that time.
11. If a task cannot fit into the available time, put it in unscheduledTasks and explain why.

Return ONLY valid JSON in this format:

{
  "schedule": [
    {
      "taskId": "task id",
      "title": "task title",
      "startTime": "7:00 PM",
      "endTime": "8:00 PM",
      "reason": "High priority task with an upcoming deadline"
    }
  ]
  "unscheduledTasks": [
    {
      "taskId": "task id",
      "title": "task title",
      "reason": "Not enough available time"
    }
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text;
}
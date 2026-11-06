# GrainLight

GrainLight is an AI prototype I built through Grain of Growth, a rural education initiative I founded in Hunan, China. I built it in using React and TypeScript.

I first designed GrainLight to explain math and English concepts in local dialects. After visiting partner schools and talking with teachers, I realized that a clear explanation was only part of what made a lesson work. The questions teachers asked, the time they gave students to respond, and who participated also mattered.

I expanded the prototype to analyze classroom recordings and give teachers feedback on those three areas. The goal is to help teachers reflect on a lesson and decide what they might change the next time they teach it.

## Run locally

You’ll need **Node.js** and a **Gemini API key**.

1. Clone the repository and open the app folder:

   ```bash
   git clone https://github.com/notymermine/grainlight.git
   cd grainlight/copy-of-grainlight---intelligent-teaching-partner
   npm install
   ```

2. In the app folder, next to `package.json`, create a file named `.env.local` and add your own key:

   ```dotenv
   GEMINI_API_KEY=your_key_here
   ```

   Keep `.env.local` out of GitHub.

3. Start the app:

   ```bash
   npm run dev
   ```

   Open the local URL printed in your terminal.

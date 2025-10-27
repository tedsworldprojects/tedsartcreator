# 🎨 TEDS ART CREATOR v1.0

TEDS ART CREATOR is a sleek, AI-powered prompt generator designed to spark creativity for visual artists. It crafts detailed, high-quality briefs suitable for any AI image generation platform (like Midjourney, DALL-E, etc.), helping to overcome creative blocks and inspire new masterpieces.

![A placeholder image of the TEDS ART CREATOR user interface, showing a generated prompt card with details like Subject, Setting, and a final copyable prompt string. The app has a dark, modern theme with purple and indigo accents.](placeholder.png)

---

## ✨ Key Features

*   **🤖 AI-Powered Inspiration**: Leverages the Google Gemini API to generate unique and imaginative art prompts on demand.
*   **📋 Structured Briefs**: Prompts are delivered in a professional "Art Director's Brief" format, breaking down the idea into clear, actionable components:
    *   **Subject**: The main focus of the artwork.
    *   **Setting**: The environment and atmosphere.
    *   **Artistic Style**: The visual style, including artist influences.
    *   **Lighting & Color**: The mood-setting light and color palette.
    *   **Composition**: The camera angle and shot type.
*   **✂️ One-Click Copy**: A "Final Prompt" string combines all elements into a single, optimized line, ready to be copied and pasted directly into your favorite image generator.
*   **🌐 Offline First (PWA)**: As a Progressive Web App, the core interface is available offline. Once loaded, the app shell is cached, ensuring you can access it anytime, anywhere. (Note: Generating new prompts requires an internet connection).
*   **📱 Fully Responsive**: A clean, modern, and dark-themed UI that looks and works great on any device, from mobile phones to desktop monitors.
*   **💨 Lightweight & Fast**: Built with modern web technologies for a smooth and responsive user experience.

---

## 🚀 How It Works

The application is designed for simplicity and immediate results.

1.  **Launch the App**: Open the web application in your browser.
2.  **Generate a Prompt**: Click the large **"Generate Art Prompt"** button at the bottom of the screen.
3.  **Receive Your Brief**: In moments, a beautifully formatted prompt card will appear, detailing a unique creative concept.
4.  **Copy the Final Prompt**: Use the **"Copy"** button to instantly grab the consolidated prompt string.
5.  **Create!**: Paste the prompt into an AI image generator and watch your idea come to life.

---

## 🛠️ Tech Stack

*   **Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **AI Model**: Google Gemini (`gemini-2.5-flash`) via the [`@google/genai`](https://www.npmjs.com/package/@google/genai) SDK
*   **Offline Functionality**: Implemented as a [Progressive Web App (PWA)](https://web.dev/progressive-web-apps/) using a Service Worker.

---

## ©️ Copyright

&copy; 2025 TEDS WORLD PROJECTS

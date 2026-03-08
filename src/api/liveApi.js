/**
 * Fetches a success/inspirational quote from an external API.
 * This satisfies project requirements for live API key usage.
 */

const API_URL = "https://api.api-ninjas.com/v1/quotes?category=success";

export const fetchSuccessQuote = async () => {
    const apiKey = import.meta.env.VITE_PUBLIC_API_KEY;

    if (!apiKey || apiKey === "DEMO_KEY_123") {
        // Fallback for demo purposes if no real key is provided
        return {
            quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill"
        };
    }

    try {
        const response = await fetch(API_URL, {
            headers: { "X-Api-Key": apiKey }
        });

        if (!response.ok) throw new Error("API call failed");

        const data = await response.json();
        return data[0]; // Returns { quote: "...", author: "...", category: "..." }
    } catch (error) {
        console.error("Live API Error:", error);
        return {
            quote: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        };
    }
};

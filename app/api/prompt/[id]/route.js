import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET Request to fetch a prompt by ID
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate("creator");
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error("Error fetching prompt:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};

// PATCH Request to update a prompt by ID
export const PATCH = async (request, { params }) => {
    try {
        const { prompt, tag } = await request.json();
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response("Prompt Not Found", { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Prompt successfully updated", { status: 200 });
    } catch (error) {
        console.error("Error updating prompt:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};

// DELETE Request to delete a prompt by ID
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt successfully deleted", { status: 200 });
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};

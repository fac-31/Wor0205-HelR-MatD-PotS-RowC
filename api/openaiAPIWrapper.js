export async function getBlurb(client,topic) {

    const content = "Write me a funny poem, under 50 words long, using these words: " + topic + ".";

    const completion = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "assistant",
                content: content
            }
        ],
        store: true
    })

    return completion.choices[0].message.content;
}
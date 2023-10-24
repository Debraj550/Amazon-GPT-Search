import openai
import os
from dotenv import load_dotenv


load_dotenv()
gpt_key = os.getenv("GPT_KEY")
system_message = "The output should be in the following format: 'Input: string, Output: { filters: { name: , no_of_ratings: , discount_price: }, intent: , short_description: , recommendation: }'. 'no_of_ratings' should be an integer between 0 and 4, 'discount_price' should be an integer, and 'short_description' should be a short description of the input string that can be searched on YouTube."


def gpt_response(query: str):
    # Define a prompt for GPT-3, including the user input and the system message
    prompt = f"{system_message} Translate the user input into a search query: {query}"

    # Call the GPT-3 API
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=500,  # You may need to adjust this based on your requirements
        api_key=gpt_key,
    )

    # Extract the generated search query from the response
    search_query = response.choices[0].text.strip()

    # Print the generated search query for demonstration
    print("Generated Search Query:", search_query)
    return search_query

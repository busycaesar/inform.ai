import requests
from duckduckgo_search import DDGS
import trafilatura
from env_vars import llm_url

def get_search_result(query):
    # Get the search result of the query from the internet.
    results = DDGS().text(query, max_results=3)
    content = ''

    for result in results:
        content += get_page_content(result['href'])

    # Store the search result.
    content_store_response = requests.post(
        f'{llm_url}/content/',
        json={"content": content},
        headers={"Content-Type": "application/json"}
        )

    content_store_response = content_store_response.json()

    if not content_store_response['success']:
        raise RuntimeError(content_store_response['message'])

    # Prompt the query with the reference id of the search result.
    query_prompt_response = requests.post(
        f'{llm_url}/prompt/',
        json={"prompt": query},
        headers={"Content-Type": "application/json"}
        )

    query_prompt_response = query_prompt_response.json()

    if not query_prompt_response['success']:
        raise RuntimeError(query_prompt_response['message'])

    # Return the search result.
    return query_prompt_response["data"]

def get_page_content(url):
    return str(trafilatura.fetch_url(url))

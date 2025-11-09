#!/usr/bin/env python3
"""
Test your OpenAI API connection by:
1. Checking that the OPENAI_API_KEY environment variable is set.
2. Listing a few available models.
3. Sending a small 'Hello' message to GPT-4-Turbo.
"""

import os
import sys
from openai import OpenAI, OpenAIError

def main():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("❌ Environment variable OPENAI_API_KEY is not set.")
        print("   Run this first:\n   export OPENAI_API_KEY='sk-...'")
        sys.exit(1)

    client = OpenAI(api_key=api_key)

    try:
        # 1️⃣ List models
        response = client.models.list()
        print("✅ API key works! Showing first few models:")
        for m in response.data[:5]:
            print(f"  - {m.id}")

        # 2️⃣ Simple chat completion test
        print("\n🧠 Sending test message to GPT-4-Turbo...")
        chat = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Hello! Please reply with a short greeting."}
            ],
            max_tokens=20,
        )

        print("✅ Model reply:")
        print(chat.choices[0].message.content.strip())

    except OpenAIError as e:
        print("❌ API call failed:")
        print(e)

if __name__ == "__main__":
    main()

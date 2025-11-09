#!/usr/bin/env python3
"""
Simple script to verify that your OpenAI API key works.

Usage:
    export OPENAI_API_KEY="sk-..."   # set in your shell profile
    python3 test_openai_key.py
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

    try:
        client = OpenAI(api_key=api_key)
        response = client.models.list()
        print("✅ API key works! Available models:")
        for m in response.data[:5]:
            print(f"  - {m.id}")
    except OpenAIError as e:
        print("❌ API call failed:")
        print(e)

if __name__ == "__main__":
    main()

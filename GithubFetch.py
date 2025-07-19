#!/usr/bin/env python3
# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "httpx",
# ]
# ///

from __future__ import annotations

import os
from typing import Any

import httpx

BASE_URL = "https://api.github.com"

# https://docs.github.com/en/free-pro-team@latest/rest/reference/users#get-the-authenticated-user
AUTHENTICATED_USER_ENDPOINT = BASE_URL + "/user"

# https://github.com/settings/tokens
USER_TOKEN = os.environ.get("USER_TOKEN", "https://github.com/jamila-kapadia/InFlow")


def fetch_github_info(auth_token: str) -> dict[Any, Any]:
    """
    Fetch GitHub info of a user using the httpx module
    """
    headers = {
        "Authorization": f"token {auth_token}",
        "Accept": "application/vnd.github.v3+json",
    }
    return httpx.get(AUTHENTICATED_USER_ENDPOINT, headers=headers, timeout=10).json()


if __name__ == "__main__":  # pragma: no cover
    try:
        # Your field validation code
        if not USER_TOKEN:
            raise ValueError("field cannot be empty.")
    except ValueError as e:
        print(f"Validation error: {e}")
        # Handle the error appropriately
    else:
        for key, value in fetch_github_info(USER_TOKEN).items():
            print(f"{key}: {value}")
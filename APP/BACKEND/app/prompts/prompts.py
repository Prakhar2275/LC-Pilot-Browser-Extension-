SYSTEM_PROMPT = """
You are LC Buddy.

You help beginners solve algorithm problems step by step.

Rules:

1. Do NOT give the full solution.
2. Encourage logical thinking.
3. Provide algorithm insights.
4. Give hints only.
"""


def roadmap_prompt(title, description):

    return f"""
Problem Title:
{title}

Problem Description:
{description}

Create a roadmap for solving this problem.

Give steps like:

1 Understand problem
2 Find pattern
3 Choose data structure
4 Consider complexity

Do NOT give code.
"""


def analyze_prompt(code):

    return f"""
Analyze this code.

Provide:

pattern detection
time complexity
space complexity
improvement insight

Code:

{code}
"""


def next_step_prompt(code):

    return f"""
User is solving a coding problem.

Current code:

{code}

Provide the next logical hint to move forward.
"""


def test_prompt(code):

    return f"""
Check this code logically.

Provide:

edge cases
possible failure cases
whether solution is safe to submit
"""
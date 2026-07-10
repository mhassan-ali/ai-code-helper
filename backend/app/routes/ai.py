"""
AI code assistant routes — fix, explain, and optimize code.
These are mock endpoints that simulate AI responses.
Replace the logic with real LLM calls (OpenAI, Anthropic, etc.) in production.
"""

import re
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.routes.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/ai", tags=["AI Assistant"])


# ─── Schemas ───────────────────────────────────────────────────────────────────

class CodeRequest(BaseModel):
    """Request body for all AI endpoints."""
    code: str

class AIResponse(BaseModel):
    """Response body for all AI endpoints."""
    success: bool
    action: str
    result: str
    original_code: str


# ─── Helpers ───────────────────────────────────────────────────────────────────

def _basic_fix(code: str) -> str:
    """Simulate code fixing — applies simple heuristics."""
    fixed = code
    # Add missing semicolons to simple statements (JS/TS style)
    fixed = re.sub(r'(\w+)\s*=\s*(\w+)\s*\n', r'\1 = \2;\n', fixed)
    # Remove double semicolons
    fixed = fixed.replace(";;", ";")
    # Replace == with === in obvious cases
    fixed = re.sub(r'(\w+)\s*==\s*(\w+)', r'\1 === \2', fixed)
    # Add 'const' before bare assignments
    fixed = re.sub(r'^(\s+)(\w+)\s*=\s*', r'\1const \2 = ', fixed, flags=re.MULTILINE, count=3)
    return fixed


def _explain(code: str) -> str:
    """Generate a line-by-line explanation of the code."""
    lines = code.strip().split("\n")
    explanation_lines = [
        "📖 Code Explanation",
        "=" * 40,
        "",
    ]
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if not stripped:
            explanation_lines.append(f"  Line {i}: [blank line]")
            continue

        # Simple heuristic explanations
        if stripped.startswith("import ") or stripped.startswith("from "):
            explanation_lines.append(f"  Line {i}: 📦 Importing a module or dependency.")
        elif stripped.startswith("def ") or stripped.startswith("function "):
            explanation_lines.append(f"  Line {i}: 🔧 Defining a function.")
        elif stripped.startswith("class "):
            explanation_lines.append(f"  Line {i}: 🏗️  Defining a class.")
        elif stripped.startswith("return "):
            explanation_lines.append(f"  Line {i}: ↩️  Returning a value from the function.")
        elif stripped.startswith("if "):
            explanation_lines.append(f"  Line {i}: 🔀 Conditional check — executes block if condition is true.")
        elif stripped.startswith("for ") or stripped.startswith("while "):
            explanation_lines.append(f"  Line {i}: 🔁 Loop — repeats the block multiple times.")
        elif stripped.startswith("print(") or stripped.startswith("console.log("):
            explanation_lines.append(f"  Line {i}: 📤 Outputting data to the console.")
        elif "=" in stripped and not stripped.startswith("//"):
            explanation_lines.append(f"  Line {i}: 💡 Assigning a value to a variable.")
        elif stripped.startswith("//") or stripped.startswith("#"):
            explanation_lines.append(f"  Line {i}: 💬 Comment — non-executable documentation note.")
        else:
            explanation_lines.append(f"  Line {i}: ⚙️  {stripped}")

    explanation_lines.append("")
    explanation_lines.append("─" * 40)
    explanation_lines.append(f"Total: {len(lines)} lines analyzed.")

    return "\n".join(explanation_lines)


def _optimize(code: str) -> str:
    """Simulate code optimization with suggestions."""
    optimized = code
    suggestions = []

    # Replace var with const/let
    if "var " in optimized:
        optimized = optimized.replace("var ", "const ")
        suggestions.append("✅ Replaced 'var' with 'const' (block-scoped, safer)")

    # Suggest optional chaining
    if "." in optimized and "None" in optimized or "null" in optimized:
        suggestions.append("💡 Consider using optional chaining (?.) for safer property access")

    # Suggest const for loops
    if "for (var " in code or "for (let " in code:
        suggestions.append("💡 Use 'for...of' or array methods (.map, .filter) instead of imperative loops")

    # Template literals
    if '"' in optimized and "+" in optimized and "str(" in optimized:
        suggestions.append("💡 Use template literals (backticks) instead of string concatenation")

    # General suggestions
    suggestions.append("✅ Removed unnecessary variable reassignments")
    suggestions.append("✅ Simplified conditional expressions where possible")

    header = "⚡ Optimized Code\n" + "=" * 40 + "\n\n"
    footer = "\n\n" + "─" * 40 + "\n📝 Changes made:\n" + "\n".join(suggestions)

    return header + optimized + footer


# ─── Routes ────────────────────────────────────────────────────────────────────

@router.post("/fix", response_model=AIResponse)
def fix_code(request: CodeRequest, user: User = Depends(get_current_user)):
    """Fix bugs and issues in the provided code."""
    if not request.code.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Code input cannot be empty",
        )
    result = _basic_fix(request.code)
    return AIResponse(
        success=True,
        action="fix",
        result=result,
        original_code=request.code,
    )


@router.post("/explain", response_model=AIResponse)
def explain_code(request: CodeRequest, user: User = Depends(get_current_user)):
    """Explain the provided code line by line."""
    if not request.code.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Code input cannot be empty",
        )
    result = _explain(request.code)
    return AIResponse(
        success=True,
        action="explain",
        result=result,
        original_code=request.code,
    )


@router.post("/optimize", response_model=AIResponse)
def optimize_code(request: CodeRequest, user: User = Depends(get_current_user)):
    """Optimize the provided code for performance and readability."""
    if not request.code.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Code input cannot be empty",
        )
    result = _optimize(request.code)
    return AIResponse(
        success=True,
        action="optimize",
        result=result,
        original_code=request.code,
    )

#!/bin/bash

# Run All Phase 3 Effect Agents
# This script executes all four effect agents in sequence

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "════════════════════════════════════════════════════════════"
echo "Website Builder - Phase 3 Effect Agents"
echo "Running all agents in sequence..."
echo "════════════════════════════════════════════════════════════"
echo ""

# Function to run an agent
run_agent() {
  local agent_name=$1
  echo "──────────────────────────────────────────────────────────"
  echo "Running: $agent_name"
  echo "──────────────────────────────────────────────────────────"

  if node "$SCRIPT_DIR/${agent_name}.js"; then
    echo "✓ $agent_name completed successfully"
  else
    echo "✗ $agent_name failed"
    return 1
  fi

  echo ""

  # Wait 1 second between agents
  sleep 1
}

# Run all agents
run_agent "threejs-agent"
run_agent "shader-agent"
run_agent "canvas-agent"
run_agent "audio-agent"

echo "════════════════════════════════════════════════════════════"
echo "All agents completed!"
echo "════════════════════════════════════════════════════════════"

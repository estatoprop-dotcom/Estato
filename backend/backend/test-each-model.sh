#!/bin/bash

# Test Each OpenRouter Model Individually
# This script tests all 40+ AI models one by one

echo "🧪 Testing Each OpenRouter AI Model"
echo "===================================="
echo ""

# OpenRouter API endpoint
OPENROUTER_URL="https://openrouter.ai/api/v1/chat/completions"

# Get API keys from environment
API_KEYS=(
    "$OPENROUTER_API_KEY_1"
    "$OPENROUTER_API_KEY_2"
    "$OPENROUTER_API_KEY_3"
    "$OPENROUTER_API_KEY_4"
    "$OPENROUTER_API_KEY_5"
    "$OPENROUTER_API_KEY_6"
    "$OPENROUTER_API_KEY_7"
    "$OPENROUTER_API_KEY_8"
    "$OPENROUTER_API_KEY_9"
    "$OPENROUTER_API_KEY_10"
    "$OPENROUTER_API_KEY_11"
    "$OPENROUTER_API_KEY_12"
    "$OPENROUTER_API_KEY_13"
    "$OPENROUTER_API_KEY_14"
    "$OPENROUTER_API_KEY_15"
)

# Find first non-empty API key
API_KEY=""
for key in "${API_KEYS[@]}"; do
    if [ ! -z "$key" ]; then
        API_KEY="$key"
        break
    fi
done

# If no API key found, use test key
if [ -z "$API_KEY" ]; then
    echo "⚠️  No API keys found in environment variables"
    echo "   Using test key (requests will fail but show structure)"
    echo ""
    API_KEY="sk-or-v1-test-key"
fi

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Test message
TEST_MESSAGE="Hello! Respond with just 'OK' if you can read this."

# Counters
TOTAL=0
WORKING=0
FAILED=0
RATE_LIMITED=0

# Arrays for results
WORKING_MODELS=()
FAILED_MODELS=()
RATE_LIMITED_MODELS=()

# Function to test a single model
test_model() {
    local model=$1
    
    # Create JSON request
    local json_data=$(cat <<EOF
{
  "model": "$model",
  "messages": [
    {
      "role": "user",
      "content": "$TEST_MESSAGE"
    }
  ],
  "max_tokens": 50,
  "temperature": 0.7
}
EOF
)
    
    # Make request
    response=$(curl -s -w "\n%{http_code}" \
        -X POST "$OPENROUTER_URL" \
        -H "Authorization: Bearer $API_KEY" \
        -H "Content-Type: application/json" \
        -H "HTTP-Referer: https://estatoprop.com" \
        -H "X-Title: Estato Property App" \
        -d "$json_data" \
        --max-time 30)
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    echo "    Status Code: $http_code"
    
    if [ "$http_code" -eq 200 ]; then
        ai_response=$(echo "$body" | grep -o '"content":"[^"]*"' | head -1 | cut -d'"' -f4)
        actual_model=$(echo "$body" | grep -o '"model":"[^"]*"' | head -1 | cut -d'"' -f4)
        
        echo -e "    ${GREEN}✅ WORKING${NC}"
        echo "    Response: ${ai_response:0:100}..."
        if [ ! -z "$actual_model" ]; then
            echo "    Actual Model: $actual_model"
        fi
        ((WORKING++))
        WORKING_MODELS+=("$model")
    elif [ "$http_code" -eq 429 ] || echo "$body" | grep -qi "rate limit\|quota"; then
        error_msg=$(echo "$body" | grep -o '"message":"[^"]*"' | head -1 | cut -d'"' -f4)
        echo -e "    ${YELLOW}⚠️  RATE LIMITED${NC}"
        echo "    Error: $error_msg"
        ((RATE_LIMITED++))
        RATE_LIMITED_MODELS+=("$model")
    else
        error_msg=$(echo "$body" | grep -o '"message":"[^"]*"' | head -1 | cut -d'"' -f4)
        if [ -z "$error_msg" ]; then
            error_msg=$(echo "$body" | head -c 200)
        fi
        echo -e "    ${RED}❌ FAILED${NC}"
        echo "    Error: $error_msg"
        ((FAILED++))
        FAILED_MODELS+=("$model")
    fi
    
    echo ""
}

# All models organized by tier
declare -A TIERS
TIERS["Tier 1 (Best Quality)"]="meta-llama/llama-3.3-70b-instruct:free google/gemma-3-27b-it:free meta-llama/llama-3.2-3b-instruct:free meta-llama/llama-3.1-8b-instruct:free meta-llama/llama-3-8b-instruct:free mistralai/mixtral-8x7b-instruct:free qwen/qwen-2.5-7b-instruct:free qwen/qwen-2.5-vl-7b-instruct:free"

TIERS["Tier 2 (Stable)"]="mistralai/mistral-7b-instruct:free mistralai/devstral-2512:free google/gemma-3-12b-it:free google/gemma-3-4b-it:free google/gemma-2-9b-it:free google/gemma-7b-it:free nousresearch/hermes-2-pro-llama-3-8b nousresearch/nous-hermes-2-mixtral-8x7b-dpo:free nousresearch/nous-hermes-llama2-13b:free nvidia/nemotron-3-nano-30b-a3b:free qwen/qwen-2-7b-instruct:free deepseek/deepseek-chat:free nex-agi/deepseek-v3.1-nex-n1:free"

TIERS["Tier 3 (Fallbacks)"]="allenai/olmo-3.1-32b-think:free xiaomi/mimo-v2-flash:free arcee-ai/trinity-mini:free microsoft/phi-3-medium-128k-instruct:free openchat/openchat-7b:free huggingfaceh4/zephyr-7b-beta:free cognitivecomputations/dolphin-mixtral-8x7b:free teknium/openhermes-2.5-mistral-7b:free"

TIERS["Tier 4 (Lightweight)"]="undi95/toppy-m-7b:free gryphe/mythomist-7b:free gryphe/mythomax-l2-13b:free koboldai/psyfighter-13b-2:free intel/neural-chat-7b:free pygmalionai/mythalion-13b:free"

TIERS["Tier 5 (Emergency)"]="openrouter/auto undi95/remm-slerp-l2-13b:free mancer/weaver:free lynn/soliloquy-l3:free neversleep/noromaid-20b:free"

# Test all models
for tier in "Tier 1 (Best Quality)" "Tier 2 (Stable)" "Tier 3 (Fallbacks)" "Tier 4 (Lightweight)" "Tier 5 (Emergency)"; do
    echo ""
    echo -e "${CYAN}============================================================${NC}"
    echo -e "${CYAN}$tier${NC}"
    echo -e "${CYAN}============================================================${NC}"
    echo ""
    
    for model in ${TIERS[$tier]}; do
        ((TOTAL++))
        
        echo -e "[$TOTAL] Testing: ${YELLOW}$model${NC}"
        echo "    Endpoint: $OPENROUTER_URL"
        echo "    Request: POST with model=$model"
        
        test_model "$model"
        
        # Small delay to avoid hitting rate limits too fast
        sleep 0.5
    done
done

# Final Summary
echo ""
echo -e "${CYAN}============================================================${NC}"
echo -e "${CYAN}📊 FINAL TEST SUMMARY${NC}"
echo -e "${CYAN}============================================================${NC}"
echo ""
echo "Total Models Tested: $TOTAL"
echo -e "${GREEN}✅ Working: $WORKING${NC}"
echo -e "${YELLOW}⚠️  Rate Limited: $RATE_LIMITED${NC}"
echo -e "${RED}❌ Failed: $FAILED${NC}"
echo ""

if [ $WORKING -gt 0 ]; then
    echo -e "${GREEN}✅ WORKING MODELS ($WORKING):${NC}"
    for model in "${WORKING_MODELS[@]}"; do
        echo -e "   ${GREEN}- $model${NC}"
    done
    echo ""
fi

if [ $RATE_LIMITED -gt 0 ]; then
    echo -e "${YELLOW}⚠️  RATE LIMITED MODELS ($RATE_LIMITED):${NC}"
    for model in "${RATE_LIMITED_MODELS[@]}"; do
        echo -e "   ${YELLOW}- $model${NC}"
    done
    echo ""
fi

if [ $FAILED -gt 0 ]; then
    echo -e "${RED}❌ FAILED MODELS ($FAILED):${NC}"
    for model in "${FAILED_MODELS[@]}"; do
        echo -e "   ${RED}- $model${NC}"
    done
    echo ""
fi

# Recommendations
echo -e "${CYAN}============================================================${NC}"
echo -e "${CYAN}💡 RECOMMENDATIONS${NC}"
echo -e "${CYAN}============================================================${NC}"
echo ""

if [ $WORKING -gt 0 ]; then
    echo -e "${GREEN}✅ You have $WORKING working models!${NC}"
    echo -e "${GREEN}   Update your backend to prioritize these models.${NC}"
    echo ""
fi

if [ $RATE_LIMITED -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $RATE_LIMITED models are rate limited${NC}"
    echo -e "${YELLOW}   These may work later. Try again in 1 hour.${NC}"
    echo ""
fi

if [ $FAILED -gt 0 ]; then
    echo -e "${RED}❌ $FAILED models failed completely${NC}"
    echo -e "${RED}   Consider removing these from your rotation.${NC}"
    echo ""
fi

if [ $WORKING -eq 0 ] && [ "$API_KEY" = "sk-or-v1-test-key" ]; then
    echo -e "${YELLOW}⚠️  No API keys configured!${NC}"
    echo ""
    echo -e "${YELLOW}To test with real API keys:${NC}"
    echo -e "${YELLOW}   1. Set environment variables:${NC}"
    echo -e "${YELLOW}      export OPENROUTER_API_KEY_1='sk-or-v1-...'${NC}"
    echo -e "${YELLOW}      export OPENROUTER_API_KEY_2='sk-or-v1-...'${NC}"
    echo -e "${YELLOW}      (up to OPENROUTER_API_KEY_15)${NC}"
    echo -e "${YELLOW}   2. Re-run this script${NC}"
    echo ""
fi

echo -e "${CYAN}============================================================${NC}"
echo -e "${GREEN}✅ Testing Complete!${NC}"
echo -e "${CYAN}============================================================${NC}"


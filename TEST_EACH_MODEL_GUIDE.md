# 🧪 Test Each OpenRouter Model - Complete Guide

This guide shows you how to test all 40+ OpenRouter AI models individually using curl commands.

---

## 🚀 Quick Start

### Windows (PowerShell)
```powershell
# Set your OpenRouter API keys
$env:OPENROUTER_API_KEY_1 = "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"
$env:OPENROUTER_API_KEY_2 = "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"
# ... add all 15 keys

# Run the test script
cd backend\backend
.\test-each-model.ps1
```

### Linux/Mac (Bash)
```bash
# Set your OpenRouter API keys
export OPENROUTER_API_KEY_1="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"
export OPENROUTER_API_KEY_2="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"
# ... add all 15 keys

# Run the test script
cd backend/backend
chmod +x test-each-model.sh
./test-each-model.sh
```

---

## 📋 Manual Testing with Curl

### Basic Curl Command Structure

```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "HTTP-Referer: https://estatoprop.com" \
  -H "X-Title: Estato Property App" \
  -d '{
    "model": "MODEL_NAME_HERE",
    "messages": [
      {
        "role": "user",
        "content": "Hello! Respond with just OK if you can read this."
      }
    ],
    "max_tokens": 50,
    "temperature": 0.7
  }'
```

---

## 🧪 Test Each Model Individually

### Tier 1: Best Quality Models (8 models)

#### 1. Meta LLaMA 3.3 70B
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/llama-3.3-70b-instruct:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 2. Google Gemma 3 27B
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemma-3-27b-it:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 3. Meta LLaMA 3.2 3B
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/llama-3.2-3b-instruct:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 4. Meta LLaMA 3.1 8B
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/llama-3.1-8b-instruct:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 5. Meta LLaMA 3 8B
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/llama-3-8b-instruct:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 6. Mistral Mixtral 8x7B
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "mistralai/mixtral-8x7b-instruct:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 7. Qwen 2.5 7B
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen/qwen-2.5-7b-instruct:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 8. Qwen 2.5 VL 7B
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen/qwen-2.5-vl-7b-instruct:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

---

### Tier 2: Stable Models (13 models)

#### 9. Mistral 7B
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "mistralai/mistral-7b-instruct:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 10. Mistral Devstral
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "mistralai/devstral-2512:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 11. Google Gemma 3 12B
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemma-3-12b-it:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 12. Google Gemma 3 4B
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemma-3-4b-it:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 13. Nous Hermes 2 Pro LLaMA 3 8B
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nousresearch/hermes-2-pro-llama-3-8b",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 14. Nvidia Nemotron
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nvidia/nemotron-3-nano-30b-a3b:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 15. DeepSeek Chat
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek/deepseek-chat:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 16. DeepSeek V3.1 Nex
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nex-agi/deepseek-v3.1-nex-n1:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

---

### Tier 3: Fallback Models (8 models)

#### 17. AllenAI Olmo 3.1
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "allenai/olmo-3.1-32b-think:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 18. Xiaomi Mimo V2
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "xiaomi/mimo-v2-flash:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

#### 19. Arcee AI Trinity Mini
```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "arcee-ai/trinity-mini:free",
    "messages": [{"role": "user", "content": "Say OK"}],
    "max_tokens": 50
  }'
```

---

## 📊 Understanding Results

### Success Response (200 OK)
```json
{
  "id": "gen-...",
  "model": "meta-llama/llama-3.3-70b-instruct:free",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "OK"
      }
    }
  ]
}
```

### Rate Limit Error (429)
```json
{
  "error": {
    "message": "Rate limit exceeded. Try again in 60 seconds.",
    "code": 429
  }
}
```

### Model Not Available (400/404)
```json
{
  "error": {
    "message": "Model not found or not available",
    "code": 404
  }
}
```

---

## 🎯 What to Do with Results

### If Models Work ✅
1. Note which models are working
2. Update your backend to prioritize these models
3. Remove non-working models from rotation

### If Models Are Rate Limited ⚠️
1. Wait 1 hour and try again
2. These models may work later
3. Keep them in your rotation for future use

### If Models Fail ❌
1. Remove them from your backend configuration
2. They may be:
   - No longer free
   - Deprecated
   - Require special access

---

## 🔧 Troubleshooting

### Issue: All Models Return 401
**Solution:** Check your API keys are correct

### Issue: All Models Return 429
**Solution:** You've hit rate limits. Wait 1 hour.

### Issue: Connection Timeout
**Solution:** Check your internet connection

### Issue: SSL/Certificate Errors
**Solution:** Update curl or use `--insecure` flag (not recommended)

---

## 📝 API Keys Reference

Your 15 OpenRouter API keys:
1. `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`
2. `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`
3. `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`
4. `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`
5. `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`
6. `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`
7. `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`
8. `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`
9. `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`
10. `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`
11. `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`
12. `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`
13. `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`
14. `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`
15. `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`

---

## ✅ Next Steps

1. Run the automated test script
2. Review which models are working
3. Update backend configuration with working models
4. Remove failed models
5. Test AI chat in your Flutter app

---

**Last Updated:** December 28, 2025
**Total Models:** 40+
**Testing Method:** Direct OpenRouter API calls with curl


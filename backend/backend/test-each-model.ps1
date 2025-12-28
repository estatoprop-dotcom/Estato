# Test Each OpenRouter Model Individually
# This script tests all 40+ AI models one by one

Write-Host "🧪 Testing Each OpenRouter AI Model" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# OpenRouter API endpoint
$OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

# Get API keys from environment or use default
$API_KEYS = @(
    $env:OPENROUTER_API_KEY_1,
    $env:OPENROUTER_API_KEY_2,
    $env:OPENROUTER_API_KEY_3,
    $env:OPENROUTER_API_KEY_4,
    $env:OPENROUTER_API_KEY_5,
    $env:OPENROUTER_API_KEY_6,
    $env:OPENROUTER_API_KEY_7,
    $env:OPENROUTER_API_KEY_8,
    $env:OPENROUTER_API_KEY_9,
    $env:OPENROUTER_API_KEY_10,
    $env:OPENROUTER_API_KEY_11,
    $env:OPENROUTER_API_KEY_12,
    $env:OPENROUTER_API_KEY_13,
    $env:OPENROUTER_API_KEY_14,
    $env:OPENROUTER_API_KEY_15
) | Where-Object { $_ -ne $null -and $_ -ne "" }

# If no API keys in environment, use a test key (will fail but show structure)
if ($API_KEYS.Count -eq 0) {
    Write-Host "⚠️  No API keys found in environment variables" -ForegroundColor Yellow
    Write-Host "   Using test key (requests will fail but show structure)" -ForegroundColor Yellow
    Write-Host ""
    $API_KEYS = @("sk-or-v1-test-key")
}

# Use first available API key
$API_KEY = $API_KEYS[0]

# All models organized by tier
$ALL_MODELS = @{
    "Tier 1 (Best Quality)" = @(
        "meta-llama/llama-3.3-70b-instruct:free",
        "google/gemma-3-27b-it:free",
        "meta-llama/llama-3.2-3b-instruct:free",
        "meta-llama/llama-3.1-8b-instruct:free",
        "meta-llama/llama-3-8b-instruct:free",
        "mistralai/mixtral-8x7b-instruct:free",
        "qwen/qwen-2.5-7b-instruct:free",
        "qwen/qwen-2.5-vl-7b-instruct:free"
    )
    "Tier 2 (Stable)" = @(
        "mistralai/mistral-7b-instruct:free",
        "mistralai/devstral-2512:free",
        "google/gemma-3-12b-it:free",
        "google/gemma-3-4b-it:free",
        "google/gemma-2-9b-it:free",
        "google/gemma-7b-it:free",
        "nousresearch/hermes-2-pro-llama-3-8b",
        "nousresearch/nous-hermes-2-mixtral-8x7b-dpo:free",
        "nousresearch/nous-hermes-llama2-13b:free",
        "nvidia/nemotron-3-nano-30b-a3b:free",
        "qwen/qwen-2-7b-instruct:free",
        "deepseek/deepseek-chat:free",
        "nex-agi/deepseek-v3.1-nex-n1:free"
    )
    "Tier 3 (Fallbacks)" = @(
        "allenai/olmo-3.1-32b-think:free",
        "xiaomi/mimo-v2-flash:free",
        "arcee-ai/trinity-mini:free",
        "microsoft/phi-3-medium-128k-instruct:free",
        "openchat/openchat-7b:free",
        "huggingfaceh4/zephyr-7b-beta:free",
        "cognitivecomputations/dolphin-mixtral-8x7b:free",
        "teknium/openhermes-2.5-mistral-7b:free"
    )
    "Tier 4 (Lightweight)" = @(
        "undi95/toppy-m-7b:free",
        "gryphe/mythomist-7b:free",
        "gryphe/mythomax-l2-13b:free",
        "koboldai/psyfighter-13b-2:free",
        "intel/neural-chat-7b:free",
        "pygmalionai/mythalion-13b:free"
    )
    "Tier 5 (Emergency)" = @(
        "openrouter/auto",
        "undi95/remm-slerp-l2-13b:free",
        "mancer/weaver:free",
        "lynn/soliloquy-l3:free",
        "neversleep/noromaid-20b:free"
    )
}

# Test message
$TEST_MESSAGE = "Hello! Respond with just 'OK' if you can read this."

# Counters
$TOTAL = 0
$WORKING = 0
$FAILED = 0
$RATE_LIMITED = 0

# Results storage
$WORKING_MODELS = @()
$FAILED_MODELS = @()
$RATE_LIMITED_MODELS = @()

# Function to test a single model
function Test-Model {
    param(
        [string]$ModelName,
        [string]$ApiKey
    )
    
    $body = @{
        model = $ModelName
        messages = @(
            @{
                role = "user"
                content = $TEST_MESSAGE
            }
        )
        max_tokens = 50
        temperature = 0.7
    } | ConvertTo-Json -Depth 10
    
    $headers = @{
        "Authorization" = "Bearer $ApiKey"
        "Content-Type" = "application/json"
        "HTTP-Referer" = "https://estatoprop.com"
        "X-Title" = "Estato Property App"
    }
    
    try {
        $response = Invoke-WebRequest -Uri $OPENROUTER_URL `
            -Method POST `
            -Headers $headers `
            -Body $body `
            -TimeoutSec 30 `
            -UseBasicParsing `
            -ErrorAction Stop
        
        $statusCode = $response.StatusCode
        $content = $response.Content | ConvertFrom-Json
        
        if ($statusCode -eq 200 -and $content.choices) {
            $aiResponse = $content.choices[0].message.content
            return @{
                Status = "SUCCESS"
                StatusCode = $statusCode
                Response = $aiResponse.Substring(0, [Math]::Min(100, $aiResponse.Length))
                Model = $content.model
            }
        } else {
            return @{
                Status = "FAILED"
                StatusCode = $statusCode
                Error = "No response content"
            }
        }
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        $errorBody = ""
        
        try {
            $stream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $errorBody = $reader.ReadToEnd()
            $errorJson = $errorBody | ConvertFrom-Json
            $errorMessage = $errorJson.error.message
        }
        catch {
            $errorMessage = $_.Exception.Message
        }
        
        if ($statusCode -eq 429 -or $errorMessage -like "*rate limit*" -or $errorMessage -like "*quota*") {
            return @{
                Status = "RATE_LIMITED"
                StatusCode = $statusCode
                Error = $errorMessage
            }
        } else {
            return @{
                Status = "FAILED"
                StatusCode = $statusCode
                Error = $errorMessage
            }
        }
    }
}

# Test all models
foreach ($tier in $ALL_MODELS.Keys | Sort-Object) {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "$tier" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host ""
    
    $models = $ALL_MODELS[$tier]
    
    foreach ($model in $models) {
        $script:TOTAL++
        
        Write-Host "[$script:TOTAL] Testing: " -NoNewline
        Write-Host "$model" -ForegroundColor Yellow
        Write-Host "    Endpoint: $OPENROUTER_URL"
        Write-Host "    Request: POST with model=$model"
        
        $result = Test-Model -ModelName $model -ApiKey $API_KEY
        
        Write-Host "    Status Code: $($result.StatusCode)"
        
        if ($result.Status -eq "SUCCESS") {
            Write-Host "    ✅ " -ForegroundColor Green -NoNewline
            Write-Host "WORKING" -ForegroundColor Green
            Write-Host "    Response: $($result.Response)..."
            if ($result.Model) {
                Write-Host "    Actual Model: $($result.Model)"
            }
            $script:WORKING++
            $script:WORKING_MODELS += $model
        }
        elseif ($result.Status -eq "RATE_LIMITED") {
            Write-Host "    ⚠️  " -ForegroundColor Yellow -NoNewline
            Write-Host "RATE LIMITED" -ForegroundColor Yellow
            Write-Host "    Error: $($result.Error)"
            $script:RATE_LIMITED++
            $script:RATE_LIMITED_MODELS += $model
        }
        else {
            Write-Host "    ❌ " -ForegroundColor Red -NoNewline
            Write-Host "FAILED" -ForegroundColor Red
            Write-Host "    Error: $($result.Error)"
            $script:FAILED++
            $script:FAILED_MODELS += $model
        }
        
        Write-Host ""
        
        # Small delay to avoid hitting rate limits too fast
        Start-Sleep -Milliseconds 500
    }
}

# Final Summary
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "📊 FINAL TEST SUMMARY" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Total Models Tested: $TOTAL"
Write-Host "✅ Working: $WORKING" -ForegroundColor Green
Write-Host "⚠️  Rate Limited: $RATE_LIMITED" -ForegroundColor Yellow
Write-Host "❌ Failed: $FAILED" -ForegroundColor Red
Write-Host ""

if ($WORKING -gt 0) {
    Write-Host "✅ WORKING MODELS ($WORKING):" -ForegroundColor Green
    foreach ($model in $WORKING_MODELS) {
        Write-Host "   - $model" -ForegroundColor Green
    }
    Write-Host ""
}

if ($RATE_LIMITED -gt 0) {
    Write-Host "⚠️  RATE LIMITED MODELS ($RATE_LIMITED):" -ForegroundColor Yellow
    foreach ($model in $RATE_LIMITED_MODELS) {
        Write-Host "   - $model" -ForegroundColor Yellow
    }
    Write-Host ""
}

if ($FAILED -gt 0) {
    Write-Host "❌ FAILED MODELS ($FAILED):" -ForegroundColor Red
    foreach ($model in $FAILED_MODELS) {
        Write-Host "   - $model" -ForegroundColor Red
    }
    Write-Host ""
}

# Recommendations
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "💡 RECOMMENDATIONS" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

if ($WORKING -gt 0) {
    Write-Host "✅ You have $WORKING working models!" -ForegroundColor Green
    Write-Host "   Update your backend to prioritize these models." -ForegroundColor Green
    Write-Host ""
}

if ($RATE_LIMITED -gt 0) {
    Write-Host "⚠️  $RATE_LIMITED models are rate limited" -ForegroundColor Yellow
    Write-Host "   These may work later. Try again in 1 hour." -ForegroundColor Yellow
    Write-Host ""
}

if ($FAILED -gt 0) {
    Write-Host "❌ $FAILED models failed completely" -ForegroundColor Red
    Write-Host "   Consider removing these from your rotation." -ForegroundColor Red
    Write-Host ""
}

if ($WORKING -eq 0 -and $API_KEY -eq "sk-or-v1-test-key") {
    Write-Host "⚠️  No API keys configured!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To test with real API keys:" -ForegroundColor Yellow
    Write-Host "   1. Set environment variables:" -ForegroundColor Yellow
    Write-Host "      `$env:OPENROUTER_API_KEY_1 = 'sk-or-v1-...'" -ForegroundColor Yellow
    Write-Host "      `$env:OPENROUTER_API_KEY_2 = 'sk-or-v1-...'" -ForegroundColor Yellow
    Write-Host "      (up to OPENROUTER_API_KEY_15)" -ForegroundColor Yellow
    Write-Host "   2. Re-run this script" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "✅ Testing Complete!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan


const axios = require('axios');

/**
 * AI Proxy Service with 30+ Free Models
 * Implements smart rotation, fallback, and rate limit handling
 */

// 40+ Free AI Models from OpenRouter (Tier-based priority)
const FREE_AI_MODELS = {
  // Tier 1: Best Quality (Try these first)
  tier1: [
    'meta-llama/llama-3.3-70b-instruct:free',
    'google/gemma-3-27b-it:free',
    'meta-llama/llama-3.2-3b-instruct:free',
    'meta-llama/llama-3.1-8b-instruct:free',
    'meta-llama/llama-3-8b-instruct:free',
    'mistralai/mixtral-8x7b-instruct:free',
    'qwen/qwen-2.5-7b-instruct:free',
    'qwen/qwen-2.5-vl-7b-instruct:free',
  ],
  
  // Tier 2: Stable & Reliable
  tier2: [
    'mistralai/mistral-7b-instruct:free',
    'mistralai/devstral-2512:free',
    'google/gemma-3-12b-it:free',
    'google/gemma-3-4b-it:free',
    'google/gemma-2-9b-it:free',
    'google/gemma-7b-it:free',
    'nousresearch/hermes-2-pro-llama-3-8b',
    'nousresearch/nous-hermes-2-mixtral-8x7b-dpo:free',
    'nousresearch/nous-hermes-llama2-13b:free',
    'nvidia/nemotron-3-nano-30b-a3b:free',
    'qwen/qwen-2-7b-instruct:free',
    'deepseek/deepseek-chat:free',
    'nex-agi/deepseek-v3.1-nex-n1:free',
  ],
  
  // Tier 3: Good Fallbacks
  tier3: [
    'allenai/olmo-3.1-32b-think:free',
    'xiaomi/mimo-v2-flash:free',
    'arcee-ai/trinity-mini:free',
    'microsoft/phi-3-medium-128k-instruct:free',
    'openchat/openchat-7b:free',
    'huggingfaceh4/zephyr-7b-beta:free',
    'cognitivecomputations/dolphin-mixtral-8x7b:free',
    'teknium/openhermes-2.5-mistral-7b:free',
  ],
  
  // Tier 4: Lightweight Fallbacks
  tier4: [
    'undi95/toppy-m-7b:free',
    'gryphe/mythomist-7b:free',
    'gryphe/mythomax-l2-13b:free',
    'koboldai/psyfighter-13b-2:free',
    'intel/neural-chat-7b:free',
    'pygmalionai/mythalion-13b:free',
  ],
  
  // Tier 5: Emergency Fallbacks
  tier5: [
    'openrouter/auto',
    'undi95/remm-slerp-l2-13b:free',
    'mancer/weaver:free',
    'lynn/soliloquy-l3:free',
    'neversleep/noromaid-20b:free',
  ]
};

// Flatten all models into a single array with priority
const ALL_MODELS = [
  ...FREE_AI_MODELS.tier1,
  ...FREE_AI_MODELS.tier2,
  ...FREE_AI_MODELS.tier3,
  ...FREE_AI_MODELS.tier4,
  ...FREE_AI_MODELS.tier5,
];

// Track current model index and failures
let currentModelIndex = 0;
let modelFailures = new Map(); // Track failures per model
let lastSuccessfulModel = ALL_MODELS[0];

// Cache for successful responses (optional)
const responseCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Check if error is rate limit or model unavailable
 */
function isRateLimitOrUnavailable(error) {
  if (!error.response) return false;
  
  const status = error.response.status;
  const errorMessage = error.response.data?.error?.message?.toLowerCase() || '';
  
  // Check for rate limit status codes
  if ([429, 403, 503, 502].includes(status)) {
    return true;
  }
  
  // Check for rate limit messages
  const rateLimitKeywords = [
    'rate limit',
    'too many requests',
    'quota exceeded',
    'model overloaded',
    'capacity',
    'unavailable',
    'temporarily unavailable'
  ];
  
  return rateLimitKeywords.some(keyword => errorMessage.includes(keyword));
}

/**
 * Get next available model with smart rotation
 */
function getNextModel() {
  // Try to use last successful model first
  if (lastSuccessfulModel && modelFailures.get(lastSuccessfulModel) < 3) {
    return lastSuccessfulModel;
  }
  
  // Find next model with least failures
  let attempts = 0;
  while (attempts < ALL_MODELS.length) {
    currentModelIndex = (currentModelIndex + 1) % ALL_MODELS.length;
    const model = ALL_MODELS[currentModelIndex];
    const failures = modelFailures.get(model) || 0;
    
    // Skip models with too many recent failures
    if (failures < 5) {
      return model;
    }
    attempts++;
  }
  
  // If all models have failures, reset and start over
  modelFailures.clear();
  currentModelIndex = 0;
  return ALL_MODELS[0];
}

/**
 * Mark model as failed
 */
function markModelFailed(model) {
  const failures = modelFailures.get(model) || 0;
  modelFailures.set(model, failures + 1);
  
  // Reset failure count after 10 minutes
  setTimeout(() => {
    modelFailures.set(model, Math.max(0, (modelFailures.get(model) || 0) - 1));
  }, 10 * 60 * 1000);
}

/**
 * Mark model as successful
 */
function markModelSuccess(model) {
  lastSuccessfulModel = model;
  modelFailures.set(model, 0);
}

/**
 * Generate cache key for request
 */
function getCacheKey(messages, systemPrompt) {
  const lastUserMessage = messages[messages.length - 1]?.content || '';
  return `${systemPrompt.substring(0, 50)}_${lastUserMessage}`;
}

/**
 * Main AI Chat Function with Smart Rotation
 */
async function sendChatMessage(messages, systemPrompt, options = {}) {
  const {
    maxTokens = 400,
    temperature = 0.6,
    topP = 0.9,
    useCache = true,
  } = options;
  
  // Check cache first
  if (useCache) {
    const cacheKey = getCacheKey(messages, systemPrompt);
    const cached = responseCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log('✅ Cache hit for AI request');
      return {
        success: true,
        message: cached.message,
        model: cached.model,
        cached: true,
      };
    }
  }
  
  // Build full messages array
  const fullMessages = [
    { role: 'system', content: systemPrompt },
    ...messages,
  ];
  
  // Try multiple models with rotation
  let lastError = null;
  const maxAttempts = Math.min(10, ALL_MODELS.length); // Try up to 10 models
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const model = getNextModel();
    
    try {
      console.log(`🤖 Attempting AI request with model: ${model} (Attempt ${attempt + 1}/${maxAttempts})`);
      
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: model,
          messages: fullMessages,
          max_tokens: maxTokens,
          temperature: temperature,
          top_p: topP,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'HTTP-Referer': process.env.APP_URL || 'https://estatoprop.com',
            'X-Title': 'Estato Property Assistant',
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 second timeout
        }
      );
      
      const assistantMessage = response.data.choices[0].message.content;
      
      // Mark model as successful
      markModelSuccess(model);
      
      // Cache the response
      if (useCache) {
        const cacheKey = getCacheKey(messages, systemPrompt);
        responseCache.set(cacheKey, {
          message: assistantMessage,
          model: model,
          timestamp: Date.now(),
        });
      }
      
      console.log(`✅ AI request successful with model: ${model}`);
      
      return {
        success: true,
        message: assistantMessage,
        model: model,
        cached: false,
      };
      
    } catch (error) {
      lastError = error;
      
      // Check if it's a rate limit or unavailable error
      if (isRateLimitOrUnavailable(error)) {
        console.log(`⚠️ Model ${model} rate limited or unavailable, trying next model...`);
        markModelFailed(model);
        continue; // Try next model
      }
      
      // For other errors, log and try next model
      console.error(`❌ Error with model ${model}:`, error.response?.data?.error?.message || error.message);
      markModelFailed(model);
      
      // If it's a 4xx error (except rate limit), don't retry
      if (error.response?.status >= 400 && error.response?.status < 500 && error.response?.status !== 429) {
        break;
      }
    }
  }
  
  // All models failed
  console.error('❌ All AI models failed');
  return {
    success: false,
    error: 'All AI models are currently unavailable. Please try again later.',
    details: lastError?.response?.data?.error?.message || lastError?.message,
  };
}

/**
 * Get available models info
 */
function getModelsInfo() {
  return {
    totalModels: ALL_MODELS.length,
    currentModel: lastSuccessfulModel,
    modelsByTier: {
      tier1: FREE_AI_MODELS.tier1.length,
      tier2: FREE_AI_MODELS.tier2.length,
      tier3: FREE_AI_MODELS.tier3.length,
      tier4: FREE_AI_MODELS.tier4.length,
      tier5: FREE_AI_MODELS.tier5.length,
    },
    failures: Object.fromEntries(modelFailures),
  };
}

/**
 * Clear cache (for admin use)
 */
function clearCache() {
  responseCache.clear();
  console.log('🗑️ AI response cache cleared');
}

/**
 * Reset model failures (for admin use)
 */
function resetFailures() {
  modelFailures.clear();
  currentModelIndex = 0;
  lastSuccessfulModel = ALL_MODELS[0];
  console.log('🔄 Model failures reset');
}

module.exports = {
  sendChatMessage,
  getModelsInfo,
  clearCache,
  resetFailures,
  ALL_MODELS,
};


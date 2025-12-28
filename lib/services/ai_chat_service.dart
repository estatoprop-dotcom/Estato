import 'dart:convert';
import 'package:http/http.dart' as http;
import '../core/constants/app_config.dart';
import 'api_client.dart';

class AIChatService {
  static final AIChatService _instance = AIChatService._internal();
  factory AIChatService() => _instance;
  AIChatService._internal();

  final List<Map<String, String>> _conversationHistory = [];

  List<Map<String, String>> get conversationHistory => _conversationHistory;

  void clearHistory() {
    _conversationHistory.clear();
  }

  Future<String> sendMessage(String userMessage) async {
    try {
      // Add user message to history
      _conversationHistory.add({
        'role': 'user',
        'content': userMessage,
      });

      // Call backend AI proxy instead of OpenRouter directly
      final response = await ApiClient.sendAIMessage(
        message: userMessage,
        conversationHistory: _conversationHistory.sublist(
          0, 
          _conversationHistory.length > 10 ? _conversationHistory.length - 10 : 0
        ).toList(),
        systemPrompt: AppConfig.aiSystemPrompt,
      );

      if (response['success'] == true) {
        final assistantMessage = response['data']['message'] as String;
        
        // Add assistant response to history
        _conversationHistory.add({
          'role': 'assistant',
          'content': assistantMessage,
        });

        return assistantMessage;
      } else {
        throw Exception(response['error'] ?? 'Failed to get AI response');
      }
    } catch (e) {
      // Remove the failed user message from history
      if (_conversationHistory.isNotEmpty && _conversationHistory.last['role'] == 'user') {
        _conversationHistory.removeLast();
      }
      rethrow;
    }
  }

  // Quick property suggestions based on criteria
  Future<String> getPropertySuggestions({
    required String budget,
    required String propertyType,
    required String purpose, // buy/rent
    String? preferredArea,
    String? bedrooms,
  }) async {
    try {
      final response = await ApiClient.getPropertySuggestions(
        budget: budget,
        propertyType: propertyType,
        purpose: purpose,
        preferredArea: preferredArea,
        bedrooms: bedrooms,
      );

      if (response['success'] == true) {
        return response['data']['suggestions'] as String;
      } else {
        throw Exception(response['error'] ?? 'Failed to get property suggestions');
      }
    } catch (e) {
      rethrow;
    }
  }

  // Get area comparison
  Future<String> compareAreas(String area1, String area2) async {
    try {
      final response = await ApiClient.compareAreas(
        area1: area1,
        area2: area2,
      );

      if (response['success'] == true) {
        return response['data']['comparison'] as String;
      } else {
        throw Exception(response['error'] ?? 'Failed to compare areas');
      }
    } catch (e) {
      rethrow;
    }
  }

  // Get price guidance
  Future<String> getPriceGuidance(String propertyType, String area, String size) async {
    try {
      final response = await ApiClient.getPriceGuidance(
        propertyType: propertyType,
        area: area,
        size: size,
      );

      if (response['success'] == true) {
        return response['data']['guidance'] as String;
      } else {
        throw Exception(response['error'] ?? 'Failed to get price guidance');
      }
    } catch (e) {
      rethrow;
    }
  }

  // Get AI rate limit status
  Future<Map<String, dynamic>> getRateLimitStatus() async {
    try {
      final response = await ApiClient.getAIRateLimitStatus();
      if (response['success'] == true) {
        return response['data'] as Map<String, dynamic>;
      } else {
        throw Exception(response['error'] ?? 'Failed to get rate limit status');
      }
    } catch (e) {
      rethrow;
    }
  }
}

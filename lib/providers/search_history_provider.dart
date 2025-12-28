import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SearchHistoryItem {
  final String id;
  final String query;
  final DateTime timestamp;
  final Map<String, String> filters;

  SearchHistoryItem({
    required this.id,
    required this.query,
    required this.timestamp,
    required this.filters,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'query': query,
    'timestamp': timestamp.toIso8601String(),
    'filters': filters,
  };

  factory SearchHistoryItem.fromJson(Map<String, dynamic> json) {
    return SearchHistoryItem(
      id: json['id'] ?? DateTime.now().millisecondsSinceEpoch.toString(),
      query: json['query'] ?? '',
      timestamp: DateTime.parse(json['timestamp']),
      filters: Map<String, String>.from(json['filters'] ?? {}),
    );
  }
}

class SearchHistoryProvider with ChangeNotifier {
  static const String _storageKey = 'search_history';
  static const int _maxHistoryItems = 50;
  
  List<SearchHistoryItem> _searchHistory = [];
  bool _isLoading = false;

  List<SearchHistoryItem> get searchHistory => _searchHistory;
  bool get isLoading => _isLoading;

  SearchHistoryProvider() {
    loadSearchHistory();
  }

  /// Load search history from SharedPreferences
  Future<void> loadSearchHistory() async {
    _isLoading = true;
    notifyListeners();

    try {
      final prefs = await SharedPreferences.getInstance();
      final historyJson = prefs.getString(_storageKey);
      
      if (historyJson != null) {
        final List<dynamic> historyList = json.decode(historyJson);
        _searchHistory = historyList
            .map((item) => SearchHistoryItem.fromJson(item))
            .toList();
        // Sort by timestamp (newest first)
        _searchHistory.sort((a, b) => b.timestamp.compareTo(a.timestamp));
      }
    } catch (e) {
      debugPrint('Error loading search history: $e');
      _searchHistory = [];
    }

    _isLoading = false;
    notifyListeners();
  }

  /// Save search history to SharedPreferences
  Future<void> _saveSearchHistory() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final historyJson = json.encode(
        _searchHistory.map((item) => item.toJson()).toList(),
      );
      await prefs.setString(_storageKey, historyJson);
    } catch (e) {
      debugPrint('Error saving search history: $e');
    }
  }

  /// Add a new search to history
  Future<void> addSearch({
    required String query,
    Map<String, String>? filters,
  }) async {
    if (query.trim().isEmpty) return;

    // Check if same query already exists
    final existingIndex = _searchHistory.indexWhere(
      (item) => item.query.toLowerCase() == query.toLowerCase(),
    );

    // Remove existing if found (we'll add it again at the top)
    if (existingIndex != -1) {
      _searchHistory.removeAt(existingIndex);
    }

    // Add new search at the beginning
    final newItem = SearchHistoryItem(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      query: query,
      timestamp: DateTime.now(),
      filters: filters ?? {},
    );

    _searchHistory.insert(0, newItem);

    // Keep only the last N items
    if (_searchHistory.length > _maxHistoryItems) {
      _searchHistory = _searchHistory.sublist(0, _maxHistoryItems);
    }

    await _saveSearchHistory();
    notifyListeners();
  }

  /// Delete a specific search item
  Future<void> deleteSearch(String id) async {
    _searchHistory.removeWhere((item) => item.id == id);
    await _saveSearchHistory();
    notifyListeners();
  }

  /// Clear all search history
  Future<void> clearAllHistory() async {
    _searchHistory.clear();
    await _saveSearchHistory();
    notifyListeners();
  }

  /// Get recent searches (last 5)
  List<SearchHistoryItem> getRecentSearches({int limit = 5}) {
    return _searchHistory.take(limit).toList();
  }
}

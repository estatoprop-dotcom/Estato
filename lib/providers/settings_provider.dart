import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/api_client.dart';

/// Login activity record
class LoginActivity {
  final String id;
  final String deviceName;
  final String deviceType;
  final String location;
  final String ipAddress;
  final DateTime timestamp;
  final bool isCurrentDevice;

  LoginActivity({
    required this.id,
    required this.deviceName,
    required this.deviceType,
    required this.location,
    required this.ipAddress,
    required this.timestamp,
    this.isCurrentDevice = false,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'deviceName': deviceName,
    'deviceType': deviceType,
    'location': location,
    'ipAddress': ipAddress,
    'timestamp': timestamp.toIso8601String(),
    'isCurrentDevice': isCurrentDevice,
  };

  factory LoginActivity.fromJson(Map<String, dynamic> json) {
    return LoginActivity(
      id: json['id'] ?? '',
      deviceName: json['deviceName'] ?? 'Unknown Device',
      deviceType: json['deviceType'] ?? 'mobile',
      location: json['location'] ?? 'Unknown',
      ipAddress: json['ipAddress'] ?? '',
      timestamp: DateTime.parse(json['timestamp'] ?? DateTime.now().toIso8601String()),
      isCurrentDevice: json['isCurrentDevice'] ?? false,
    );
  }
}

/// Identity verification status
class IdentityVerification {
  final String status; // pending, approved, rejected, not_submitted
  final String? aadhaarNumber;
  final String? panNumber;
  final String? aadhaarImageUrl;
  final String? panImageUrl;
  final DateTime? submittedAt;
  final String? rejectionReason;

  IdentityVerification({
    this.status = 'not_submitted',
    this.aadhaarNumber,
    this.panNumber,
    this.aadhaarImageUrl,
    this.panImageUrl,
    this.submittedAt,
    this.rejectionReason,
  });

  factory IdentityVerification.fromJson(Map<String, dynamic> json) {
    return IdentityVerification(
      status: json['status'] ?? 'not_submitted',
      aadhaarNumber: json['aadhaarNumber'],
      panNumber: json['panNumber'],
      aadhaarImageUrl: json['aadhaarImageUrl'],
      panImageUrl: json['panImageUrl'],
      submittedAt: json['submittedAt'] != null 
          ? DateTime.parse(json['submittedAt']) 
          : null,
      rejectionReason: json['rejectionReason'],
    );
  }
}

class SettingsProvider with ChangeNotifier {
  // Language settings
  String _currentLanguage = 'English';
  static const List<String> supportedLanguages = ['English', 'Hindi', 'Urdu'];
  
  // Privacy settings
  bool _profileVisibility = true;
  bool _showPhoneNumber = false;
  bool _showEmail = false;
  bool _allowMessages = true;
  bool _showOnlineStatus = true;
  bool _dataCollection = true;
  bool _personalizedAds = false;
  String _profileVisibilityLevel = 'Public';
  
  // 2FA settings
  bool _twoFactorEnabled = false;
  List<String> _twoFactorQuestions = [];
  Map<String, String> _twoFactorAnswers = {};
  
  // Login activity
  List<LoginActivity> _loginActivities = [];
  
  // Identity verification
  IdentityVerification _identityVerification = IdentityVerification();
  
  bool _isLoading = false;

  // Getters
  String get currentLanguage => _currentLanguage;
  bool get profileVisibility => _profileVisibility;
  bool get showPhoneNumber => _showPhoneNumber;
  bool get showEmail => _showEmail;
  bool get allowMessages => _allowMessages;
  bool get showOnlineStatus => _showOnlineStatus;
  bool get dataCollection => _dataCollection;
  bool get personalizedAds => _personalizedAds;
  String get profileVisibilityLevel => _profileVisibilityLevel;
  bool get twoFactorEnabled => _twoFactorEnabled;
  List<LoginActivity> get loginActivities => _loginActivities;
  IdentityVerification get identityVerification => _identityVerification;
  bool get isLoading => _isLoading;

  SettingsProvider() {
    loadSettings();
  }

  /// Load all settings from SharedPreferences
  Future<void> loadSettings() async {
    _isLoading = true;
    notifyListeners();

    try {
      final prefs = await SharedPreferences.getInstance();
      
      _currentLanguage = prefs.getString('language') ?? 'English';
      _profileVisibility = prefs.getBool('profileVisibility') ?? true;
      _showPhoneNumber = prefs.getBool('showPhoneNumber') ?? false;
      _showEmail = prefs.getBool('showEmail') ?? false;
      _allowMessages = prefs.getBool('allowMessages') ?? true;
      _showOnlineStatus = prefs.getBool('showOnlineStatus') ?? true;
      _dataCollection = prefs.getBool('dataCollection') ?? true;
      _personalizedAds = prefs.getBool('personalizedAds') ?? false;
      _profileVisibilityLevel = prefs.getString('profileVisibilityLevel') ?? 'Public';
      _twoFactorEnabled = prefs.getBool('twoFactorEnabled') ?? false;
      
      // Load 2FA questions/answers
      final questionsJson = prefs.getString('twoFactorQuestions');
      if (questionsJson != null) {
        _twoFactorQuestions = List<String>.from(json.decode(questionsJson));
      }
      
      final answersJson = prefs.getString('twoFactorAnswers');
      if (answersJson != null) {
        _twoFactorAnswers = Map<String, String>.from(json.decode(answersJson));
      }

      // Load login activities from API
      await loadLoginActivities();
      
      // Load identity verification status
      await loadIdentityVerification();
      
    } catch (e) {
      debugPrint('Error loading settings: $e');
    }

    _isLoading = false;
    notifyListeners();
  }

  /// Save a setting
  Future<void> _saveSetting(String key, dynamic value) async {
    final prefs = await SharedPreferences.getInstance();
    if (value is bool) {
      await prefs.setBool(key, value);
    } else if (value is String) {
      await prefs.setString(key, value);
    }
  }

  /// Change language
  Future<void> setLanguage(String language) async {
    if (!supportedLanguages.contains(language)) return;
    
    _currentLanguage = language;
    await _saveSetting('language', language);
    notifyListeners();
  }

  /// Update privacy settings
  Future<void> updatePrivacySetting(String key, dynamic value) async {
    switch (key) {
      case 'profileVisibility':
        _profileVisibility = value;
        break;
      case 'showPhoneNumber':
        _showPhoneNumber = value;
        break;
      case 'showEmail':
        _showEmail = value;
        break;
      case 'allowMessages':
        _allowMessages = value;
        break;
      case 'showOnlineStatus':
        _showOnlineStatus = value;
        break;
      case 'dataCollection':
        _dataCollection = value;
        break;
      case 'personalizedAds':
        _personalizedAds = value;
        break;
      case 'profileVisibilityLevel':
        _profileVisibilityLevel = value;
        break;
    }
    await _saveSetting(key, value);
    
    // Sync with backend
    await _syncPrivacySettings();
    
    notifyListeners();
  }

  Future<void> _syncPrivacySettings() async {
    try {
      await ApiClient.updatePrivacySettings({
        'profileVisibility': _profileVisibility,
        'showPhoneNumber': _showPhoneNumber,
        'showEmail': _showEmail,
        'allowMessages': _allowMessages,
        'showOnlineStatus': _showOnlineStatus,
        'dataCollection': _dataCollection,
        'personalizedAds': _personalizedAds,
        'profileVisibilityLevel': _profileVisibilityLevel,
      });
    } catch (e) {
      debugPrint('Error syncing privacy settings: $e');
    }
  }

  /// Setup 2FA with security questions
  Future<bool> setup2FA(Map<String, String> questionsAndAnswers) async {
    try {
      _twoFactorQuestions = questionsAndAnswers.keys.toList();
      _twoFactorAnswers = questionsAndAnswers;
      _twoFactorEnabled = true;
      
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('twoFactorQuestions', json.encode(_twoFactorQuestions));
      await prefs.setString('twoFactorAnswers', json.encode(_twoFactorAnswers));
      await prefs.setBool('twoFactorEnabled', true);
      
      // Sync with backend
      await ApiClient.setup2FA(questionsAndAnswers);
      
      notifyListeners();
      return true;
    } catch (e) {
      debugPrint('Error setting up 2FA: $e');
      return false;
    }
  }

  /// Disable 2FA
  Future<void> disable2FA() async {
    _twoFactorEnabled = false;
    _twoFactorQuestions.clear();
    _twoFactorAnswers.clear();
    
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('twoFactorEnabled', false);
    await prefs.remove('twoFactorQuestions');
    await prefs.remove('twoFactorAnswers');
    
    notifyListeners();
  }

  /// Verify 2FA answer
  bool verify2FAAnswer(String question, String answer) {
    final storedAnswer = _twoFactorAnswers[question];
    return storedAnswer?.toLowerCase() == answer.toLowerCase();
  }

  /// Load login activities from API
  Future<void> loadLoginActivities() async {
    try {
      final response = await ApiClient.getLoginActivities();
      if (response['success'] == true) {
        final List<dynamic> data = response['data'] ?? [];
        _loginActivities = data.map((item) => LoginActivity.fromJson(item)).toList();
      } else {
        // Use mock data for now
        _loginActivities = _getMockLoginActivities();
      }
    } catch (e) {
      debugPrint('Error loading login activities: $e');
      _loginActivities = _getMockLoginActivities();
    }
    notifyListeners();
  }

  List<LoginActivity> _getMockLoginActivities() {
    return [
      LoginActivity(
        id: '1',
        deviceName: 'Current Device',
        deviceType: 'mobile',
        location: 'Lucknow, India',
        ipAddress: '192.168.1.1',
        timestamp: DateTime.now(),
        isCurrentDevice: true,
      ),
    ];
  }

  /// Logout from a specific device
  Future<bool> logoutFromDevice(String activityId) async {
    try {
      final response = await ApiClient.logoutFromDevice(activityId);
      if (response['success'] == true) {
        _loginActivities.removeWhere((a) => a.id == activityId);
        notifyListeners();
        return true;
      }
    } catch (e) {
      debugPrint('Error logging out from device: $e');
    }
    return false;
  }

  /// Load identity verification status
  Future<void> loadIdentityVerification() async {
    try {
      final response = await ApiClient.getIdentityVerification();
      if (response['success'] == true && response['data'] != null) {
        _identityVerification = IdentityVerification.fromJson(response['data']);
      }
    } catch (e) {
      debugPrint('Error loading identity verification: $e');
    }
    notifyListeners();
  }

  /// Submit identity verification documents
  Future<Map<String, dynamic>> submitIdentityVerification({
    required String aadhaarNumber,
    required String panNumber,
    required String aadhaarImagePath,
    required String panImagePath,
  }) async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await ApiClient.submitIdentityVerification(
        aadhaarNumber: aadhaarNumber,
        panNumber: panNumber,
        aadhaarImagePath: aadhaarImagePath,
        panImagePath: panImagePath,
      );

      if (response['success'] == true) {
        _identityVerification = IdentityVerification(
          status: 'pending',
          aadhaarNumber: aadhaarNumber,
          panNumber: panNumber,
          submittedAt: DateTime.now(),
        );
      }

      _isLoading = false;
      notifyListeners();
      return response;
    } catch (e) {
      _isLoading = false;
      notifyListeners();
      return {'success': false, 'error': e.toString()};
    }
  }

  /// Request data download
  Future<Map<String, dynamic>> requestDataDownload() async {
    try {
      final response = await ApiClient.requestDataDownload();
      return response;
    } catch (e) {
      return {'success': false, 'error': e.toString()};
    }
  }

  /// Submit account deletion request
  Future<Map<String, dynamic>> submitDeleteAccountRequest({
    required String reason,
    required String feedback,
    required String password,
  }) async {
    try {
      final response = await ApiClient.submitDeleteAccountRequest(
        reason: reason,
        feedback: feedback,
        password: password,
      );
      return response;
    } catch (e) {
      return {'success': false, 'error': e.toString()};
    }
  }
}

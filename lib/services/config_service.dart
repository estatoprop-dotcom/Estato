/// Centralized Configuration Service for Estato App
/// Contains all app-wide configuration constants

class ConfigService {
  // App Info
  static const String appName = 'Estato';
  static const String appTagline = 'लखनऊ का अपना App';
  static const String appVersion = '1.0.0';
  static const String appLogo = 'assets/icons/Estato App Logo.png';
  
  // API Configuration
  static const String baseUrl = 'https://champ-y6eg.onrender.com/api';
  static const String apiBaseUrl = 'https://champ-y6eg.onrender.com/api';
  static const Duration apiTimeout = Duration(seconds: 30);
  
  // Cache Configuration
  static const Duration cacheExpiry = Duration(hours: 24);
  static const int maxCacheSize = 100; // MB
  
  // Pagination
  static const int defaultPageSize = 20;
  static const int maxPageSize = 50;
  
  // Image Configuration
  static const int maxImageSize = 5 * 1024 * 1024; // 5MB
  static const List<String> allowedImageTypes = ['jpg', 'jpeg', 'png', 'webp'];
  static const int thumbnailSize = 300;
  static const int previewSize = 800;
  
  // Property Limits
  static const int maxPropertyImages = 10;
  static const int maxDescriptionLength = 2000;
  static const int minDescriptionLength = 50;
  
  // Search Configuration
  static const int maxSearchHistoryItems = 20;
  static const int searchDebounceMs = 500;
  
  // Map Configuration
  static const double defaultLatitude = 26.8467;
  static const double defaultLongitude = 80.9462;
  static const double defaultZoom = 12.0;
  
  // Contact Info
  static const String supportEmail = 'support@estatoprop.com';
  static const String supportPhone = '+91 9872364476';
  static const String supportPhoneDisplay = '+91 9872364476';
  static const String supportWhatsApp = '919872364476';
  static const String websiteUrl = 'https://estatoprop.com';
  
  // Social Links
  static const String facebookUrl = 'https://facebook.com/estato';
  static const String instagramUrl = 'https://instagram.com/estato';
  static const String twitterUrl = 'https://twitter.com/estato';
  
  // Feature Flags
  static const bool enableAIChat = true;
  static const bool enablePropertyComparison = true;
  static const bool enableEMICalculator = true;
  static const bool enableOfflineMode = false;
  
  // Animation Durations
  static const Duration shortAnimation = Duration(milliseconds: 200);
  static const Duration mediumAnimation = Duration(milliseconds: 350);
  static const Duration longAnimation = Duration(milliseconds: 500);
  
  // Validation Patterns
  static final RegExp emailPattern = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
  static final RegExp phonePattern = RegExp(r'^[6-9]\d{9}$');
  static final RegExp passwordPattern = RegExp(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$');
}

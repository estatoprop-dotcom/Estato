import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../providers/settings_provider.dart';
import '../../providers/search_history_provider.dart';
import '../../utils/app_colors.dart';

class PrivacySettingsScreen extends StatefulWidget {
  const PrivacySettingsScreen({super.key});

  @override
  State<PrivacySettingsScreen> createState() => _PrivacySettingsScreenState();
}

class _PrivacySettingsScreenState extends State<PrivacySettingsScreen> {
  bool _analyticsTracking = true;

  final List<String> _visibilityLevels = ['Public', 'Registered Users Only', 'Private'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Privacy Settings',
          style: GoogleFonts.poppins(fontWeight: FontWeight.w600),
        ),
      ),
      body: Consumer<SettingsProvider>(
        builder: (context, settingsProvider, _) {
          return ListView(
            padding: const EdgeInsets.all(20),
            children: [
              // Profile Privacy Section
              _buildSection(
                'Profile Privacy',
                [
                  _buildResponsiveDropdownTile(
                    'Profile Visibility',
                    'Control who can see your profile',
                    Icons.visibility,
                    settingsProvider.profileVisibilityLevel,
                    _visibilityLevels,
                    (value) {
                      settingsProvider.updatePrivacySetting('profileVisibilityLevel', value);
                    },
                  ),
                  _buildSwitchTile(
                    'Show Phone Number',
                    'Display your phone number on your profile',
                    Icons.phone,
                    settingsProvider.showPhoneNumber,
                    (value) {
                      settingsProvider.updatePrivacySetting('showPhoneNumber', value);
                    },
                  ),
                  _buildSwitchTile(
                    'Show Email Address',
                    'Display your email address on your profile',
                    Icons.email,
                    settingsProvider.showEmail,
                    (value) {
                      settingsProvider.updatePrivacySetting('showEmail', value);
                    },
                  ),
                  _buildSwitchTile(
                    'Show Online Status',
                    'Let others see when you\'re online',
                    Icons.circle,
                    settingsProvider.showOnlineStatus,
                    (value) {
                      settingsProvider.updatePrivacySetting('showOnlineStatus', value);
                    },
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // Communication Privacy Section
              _buildSection(
                'Communication Privacy',
                [
                  _buildSwitchTile(
                    'Allow Messages',
                    'Allow other users to send you messages',
                    Icons.message,
                    settingsProvider.allowMessages,
                    (value) {
                      settingsProvider.updatePrivacySetting('allowMessages', value);
                    },
                  ),
                  _buildActionTile(
                    'Blocked Users',
                    'Manage users you\'ve blocked',
                    Icons.block,
                    () => _showBlockedUsers(),
                  ),
                  _buildActionTile(
                    'Message Requests',
                    'Control who can message you directly',
                    Icons.mail_outline,
                    () => _showMessageRequestSettings(),
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // Data Privacy Section
              _buildSection(
                'Data Privacy',
                [
                  _buildSwitchTile(
                    'Data Collection',
                    'Allow collection of usage data to improve services',
                    Icons.data_usage,
                    settingsProvider.dataCollection,
                    (value) {
                      settingsProvider.updatePrivacySetting('dataCollection', value);
                    },
                  ),
                  _buildSwitchTile(
                    'Personalized Ads',
                    'Show ads based on your interests and activity',
                    Icons.ads_click,
                    settingsProvider.personalizedAds,
                    (value) {
                      settingsProvider.updatePrivacySetting('personalizedAds', value);
                    },
                  ),
                  _buildSwitchTile(
                    'Analytics Tracking',
                    'Help improve the app with anonymous usage analytics',
                    Icons.analytics,
                    _analyticsTracking,
                    (value) {
                      setState(() {
                        _analyticsTracking = value;
                      });
                    },
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // Data Management Section
              _buildSection(
                'Data Management',
                [
                  _buildActionTile(
                    'Download My Data',
                    'Get a copy of all your data',
                    Icons.download,
                    () => _downloadData(settingsProvider),
                  ),
                  _buildActionTile(
                    'Data Retention',
                    'Control how long your data is stored',
                    Icons.schedule,
                    () => _showDataRetentionSettings(),
                  ),
                  _buildActionTile(
                    'Clear Search History',
                    'Delete all your search history',
                    Icons.clear_all,
                    () => _clearSearchHistory(),
                  ),
                  _buildActionTile(
                    'Clear Chat History',
                    'Delete all your chat messages',
                    Icons.chat_bubble_outline,
                    () => _clearChatHistory(),
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // Legal Section
              _buildSection(
                'Legal',
                [
                  _buildActionTile(
                    'Privacy Policy',
                    'Read our privacy policy',
                    Icons.policy,
                    () => Navigator.pushNamed(context, '/privacy'),
                  ),
                  _buildActionTile(
                    'Terms of Service',
                    'Read our terms of service',
                    Icons.description,
                    () => Navigator.pushNamed(context, '/terms'),
                  ),
                  _buildActionTile(
                    'Cookie Policy',
                    'Learn about our cookie usage',
                    Icons.cookie,
                    () => _showCookiePolicy(),
                  ),
                ],
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildSection(String title, List<Widget> children) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: GoogleFonts.poppins(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: AppColors.primary,
          ),
        ),
        const SizedBox(height: 12),
        Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.grey[200]!),
          ),
          child: Column(children: children),
        ),
      ],
    );
  }

  Widget _buildSwitchTile(
    String title,
    String subtitle,
    IconData icon,
    bool value,
    ValueChanged<bool> onChanged,
  ) {
    return SwitchListTile(
      title: Text(
        title,
        style: GoogleFonts.poppins(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
        ),
      ),
      subtitle: Text(
        subtitle,
        style: GoogleFonts.poppins(
          fontSize: 12,
          color: AppColors.textSecondary,
        ),
        maxLines: 2,
        overflow: TextOverflow.ellipsis,
      ),
      secondary: Icon(icon, color: AppColors.primary),
      value: value,
      onChanged: onChanged,
      activeColor: AppColors.primary,
    );
  }

  Widget _buildActionTile(
    String title,
    String subtitle,
    IconData icon,
    VoidCallback onTap,
  ) {
    return ListTile(
      leading: Icon(icon, color: AppColors.primary),
      title: Text(
        title,
        style: GoogleFonts.poppins(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
        ),
      ),
      subtitle: Text(
        subtitle,
        style: GoogleFonts.poppins(
          fontSize: 12,
          color: AppColors.textSecondary,
        ),
        maxLines: 2,
        overflow: TextOverflow.ellipsis,
      ),
      trailing: const Icon(Icons.chevron_right, color: Colors.grey),
      onTap: onTap,
    );
  }

  // Fixed responsive dropdown tile
  Widget _buildResponsiveDropdownTile(
    String title,
    String subtitle,
    IconData icon,
    String value,
    List<String> options,
    ValueChanged<String?> onChanged,
  ) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        children: [
          Icon(icon, color: AppColors.primary),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.poppins(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: GoogleFonts.poppins(
                    fontSize: 12,
                    color: AppColors.textSecondary,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
            decoration: BoxDecoration(
              color: AppColors.primary.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: DropdownButton<String>(
              value: value,
              underline: const SizedBox(),
              isDense: true,
              icon: const Icon(Icons.arrow_drop_down, size: 20),
              style: GoogleFonts.poppins(
                fontSize: 12,
                fontWeight: FontWeight.w500,
                color: AppColors.primary,
              ),
              items: options.map((option) {
                return DropdownMenuItem(
                  value: option,
                  child: Text(
                    option,
                    style: GoogleFonts.poppins(
                      fontSize: 12,
                      color: AppColors.textPrimary,
                    ),
                  ),
                );
              }).toList(),
              onChanged: onChanged,
            ),
          ),
        ],
      ),
    );
  }

  void _showBlockedUsers() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        height: MediaQuery.of(context).size.height * 0.7,
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Blocked Users',
              style: GoogleFonts.poppins(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppColors.primary,
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.block,
                      size: 64,
                      color: Colors.grey[300],
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'No blocked users',
                      style: GoogleFonts.poppins(
                        fontSize: 16,
                        color: Colors.grey[600],
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Users you block will appear here',
                      style: GoogleFonts.poppins(
                        fontSize: 14,
                        color: Colors.grey[500],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showMessageRequestSettings() {
    String selectedValue = 'everyone';
    
    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          title: Text(
            'Message Request Settings',
            style: GoogleFonts.poppins(fontWeight: FontWeight.w600),
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              RadioListTile<String>(
                title: Text('Everyone', style: GoogleFonts.poppins()),
                value: 'everyone',
                groupValue: selectedValue,
                activeColor: AppColors.primary,
                onChanged: (value) {
                  setDialogState(() => selectedValue = value!);
                },
              ),
              RadioListTile<String>(
                title: Text('Registered Users Only', style: GoogleFonts.poppins()),
                value: 'registered',
                groupValue: selectedValue,
                activeColor: AppColors.primary,
                onChanged: (value) {
                  setDialogState(() => selectedValue = value!);
                },
              ),
              RadioListTile<String>(
                title: Text('No One', style: GoogleFonts.poppins()),
                value: 'none',
                groupValue: selectedValue,
                activeColor: AppColors.primary,
                onChanged: (value) {
                  setDialogState(() => selectedValue = value!);
                },
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Cancel', style: GoogleFonts.poppins()),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Message settings updated', style: GoogleFonts.poppins()),
                    backgroundColor: AppColors.success,
                  ),
                );
              },
              style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary),
              child: Text('Save', style: GoogleFonts.poppins(color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }

  void _downloadData(SettingsProvider provider) async {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Row(
          children: [
            Icon(Icons.download, color: AppColors.primary),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                'Download My Data',
                style: GoogleFonts.poppins(fontWeight: FontWeight.w600),
              ),
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'We\'ll prepare a copy of your data including:',
              style: GoogleFonts.poppins(),
            ),
            const SizedBox(height: 12),
            _buildDataItem('Profile information'),
            _buildDataItem('Property listings'),
            _buildDataItem('Search history'),
            _buildDataItem('Saved properties'),
            _buildDataItem('Chat messages'),
            _buildDataItem('Booking history'),
            const SizedBox(height: 16),
            Text(
              'The download link will be sent to your email within 24 hours.',
              style: GoogleFonts.poppins(
                fontSize: 12,
                color: Colors.grey[600],
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel', style: GoogleFonts.poppins()),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context);
              final result = await provider.requestDataDownload();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(
                    result['success'] == true
                        ? 'Data download request submitted! Check your email.'
                        : 'Request submitted. You\'ll receive an email soon.',
                    style: GoogleFonts.poppins(),
                  ),
                  backgroundColor: AppColors.success,
                ),
              );
            },
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary),
            child: Text('Request Download', style: GoogleFonts.poppins(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  Widget _buildDataItem(String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          Icon(Icons.check_circle, size: 16, color: AppColors.success),
          const SizedBox(width: 8),
          Expanded(
            child: Text(text, style: GoogleFonts.poppins(fontSize: 14)),
          ),
        ],
      ),
    );
  }

  void _showDataRetentionSettings() {
    String selectedRetention = '1year';
    
    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          title: Text(
            'Data Retention',
            style: GoogleFonts.poppins(fontWeight: FontWeight.w600),
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Choose how long to keep your data:',
                style: GoogleFonts.poppins(),
              ),
              const SizedBox(height: 16),
              RadioListTile<String>(
                title: Text('1 Year', style: GoogleFonts.poppins()),
                value: '1year',
                groupValue: selectedRetention,
                activeColor: AppColors.primary,
                onChanged: (value) {
                  setDialogState(() => selectedRetention = value!);
                },
              ),
              RadioListTile<String>(
                title: Text('2 Years', style: GoogleFonts.poppins()),
                value: '2years',
                groupValue: selectedRetention,
                activeColor: AppColors.primary,
                onChanged: (value) {
                  setDialogState(() => selectedRetention = value!);
                },
              ),
              RadioListTile<String>(
                title: Text('Forever', style: GoogleFonts.poppins()),
                value: 'forever',
                groupValue: selectedRetention,
                activeColor: AppColors.primary,
                onChanged: (value) {
                  setDialogState(() => selectedRetention = value!);
                },
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Cancel', style: GoogleFonts.poppins()),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Data retention updated', style: GoogleFonts.poppins()),
                    backgroundColor: AppColors.success,
                  ),
                );
              },
              style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary),
              child: Text('Save', style: GoogleFonts.poppins(color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }

  void _clearSearchHistory() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Text(
          'Clear Search History',
          style: GoogleFonts.poppins(fontWeight: FontWeight.w600),
        ),
        content: Text(
          'Are you sure you want to clear all your search history? This action cannot be undone.',
          style: GoogleFonts.poppins(),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel', style: GoogleFonts.poppins()),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Provider.of<SearchHistoryProvider>(context, listen: false).clearAllHistory();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Search history cleared', style: GoogleFonts.poppins()),
                  backgroundColor: AppColors.success,
                ),
              );
            },
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            child: Text('Clear', style: GoogleFonts.poppins(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  void _clearChatHistory() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Text(
          'Clear Chat History',
          style: GoogleFonts.poppins(fontWeight: FontWeight.w600),
        ),
        content: Text(
          'Are you sure you want to clear all your chat messages? This action cannot be undone.',
          style: GoogleFonts.poppins(),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel', style: GoogleFonts.poppins()),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Chat history cleared', style: GoogleFonts.poppins()),
                  backgroundColor: AppColors.success,
                ),
              );
            },
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            child: Text('Clear', style: GoogleFonts.poppins(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  void _showCookiePolicy() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        height: MediaQuery.of(context).size.height * 0.7,
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Cookie Policy',
                  style: GoogleFonts.poppins(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primary,
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'What are Cookies?',
                      style: GoogleFonts.poppins(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Cookies are small text files that are stored on your device when you visit our app. They help us provide you with a better experience.',
                      style: GoogleFonts.poppins(fontSize: 14, color: Colors.grey[700]),
                    ),
                    const SizedBox(height: 20),
                    Text(
                      'How We Use Cookies',
                      style: GoogleFonts.poppins(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    _buildCookieItem('Essential Cookies', 'Required for the app to function properly'),
                    _buildCookieItem('Analytics Cookies', 'Help us understand how you use the app'),
                    _buildCookieItem('Preference Cookies', 'Remember your settings and preferences'),
                    _buildCookieItem('Marketing Cookies', 'Used to show relevant advertisements'),
                    const SizedBox(height: 20),
                    Text(
                      'Managing Cookies',
                      style: GoogleFonts.poppins(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'You can control and manage cookies through your device settings. Note that disabling certain cookies may affect the functionality of the app.',
                      style: GoogleFonts.poppins(fontSize: 14, color: Colors.grey[700]),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCookieItem(String title, String description) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(Icons.cookie, size: 20, color: AppColors.primary),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.poppins(fontWeight: FontWeight.w600),
                ),
                Text(
                  description,
                  style: GoogleFonts.poppins(fontSize: 12, color: Colors.grey[600]),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

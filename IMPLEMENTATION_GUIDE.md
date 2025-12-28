# Estato App - Implementation Guide for UI Enhancements

## Quick Start

This guide explains how to use the new UI components and animations in your app.

---

## 🎨 Using Animation Components

### 1. **Page Transitions**

The app now automatically uses smooth transitions for all routes. No additional code needed!

```dart
// Navigate to any screen - smooth transition is automatic
Navigator.pushNamed(context, '/profile');
```

### 2. **Bounce Button**

For any tappable widget that needs scale feedback:

```dart
import 'package:estato/core/animations.dart';

BounceButton(
  onTap: () {
    // Your action
  },
  child: YourWidget(),
)
```

### 3. **Fade In Animation**

For elements that should fade in on screen load:

```dart
FadeInAnimation(
  duration: Duration(milliseconds: 500),
  delay: Duration(milliseconds: 200),
  slideOffset: Offset(0, 0.05), // Optional slide
  child: YourWidget(),
)
```

### 4. **Shimmer Loading**

For loading states:

```dart
ShimmerLoading(
  isLoading: isLoadingData,
  child: Container(
    height: 200,
    color: Colors.grey[300],
  ),
)
```

### 5. **Pulse Animation**

For badges or attention-grabbing elements:

```dart
PulseAnimation(
  animate: hasNotification,
  child: Icon(Icons.notifications),
)
```

---

## 🎯 Using Button Components

### 1. **Animated Gradient Button** (Primary CTA)

```dart
import 'package:estato/widgets/animated_button.dart';

AnimatedGradientButton(
  text: 'Submit Property',
  icon: Icons.add_home,
  onPressed: () {
    // Your action
  },
  isLoading: isSubmitting,
  gradientColors: [Colors.purple, Colors.pink], // Optional
  enableGlow: true,
  enableHaptic: true,
)
```

### 2. **Animated Outlined Button** (Secondary Action)

```dart
AnimatedOutlinedButton(
  text: 'Cancel',
  icon: Icons.close,
  onPressed: () {
    Navigator.pop(context);
  },
  color: AppColors.primary,
)
```

### 3. **Animated Icon Button**

```dart
AnimatedIconButton(
  icon: Icons.favorite,
  onPressed: () {
    // Toggle favorite
  },
  color: Colors.red,
  backgroundColor: Colors.red.withOpacity(0.1),
  showBadge: true,
  badgeText: '5',
  tooltip: 'Favorites',
)
```

### 4. **Animated FAB**

```dart
AnimatedFAB(
  icon: Icons.add,
  label: 'Add Property',
  extended: true,
  onPressed: () {
    Navigator.pushNamed(context, '/add-property');
  },
  gradientColors: [AppColors.secondary, AppColors.primary],
)
```

---

## 🃏 Using Card Components

### 1. **Glass Card**

For modern glass-morphism effect:

```dart
import 'package:estato/widgets/premium_card.dart';

GlassCard(
  padding: EdgeInsets.all(20),
  borderRadius: 20,
  child: Column(
    children: [
      // Your content
    ],
  ),
)
```

### 2. **Premium Property Card**

Already integrated in the home screen. To use elsewhere:

```dart
PremiumPropertyCard(
  id: property.id,
  title: property.title,
  location: property.location,
  price: '₹50 Lac',
  priceLabel: '/month',
  imageUrl: property.images.first,
  propertyType: 'Apartment',
  transactionType: 'Rent',
  bedrooms: 3,
  bathrooms: 2,
  size: 1200,
  isFeatured: true,
  isFavorite: false,
  onTap: () {
    // Navigate to detail
  },
  onFavoriteToggle: () {
    // Toggle favorite
  },
  index: 0, // For staggered animations
)
```

### 3. **Quick Action Card**

For dashboard quick actions:

```dart
QuickActionCard(
  icon: Icons.calculate,
  title: 'EMI Calculator',
  color: AppColors.primary,
  onTap: () {
    Navigator.pushNamed(context, '/emi-calculator');
  },
)
```

---

## 🎭 Animation Best Practices

### 1. **Dispose Controllers**

Always dispose animation controllers:

```dart
@override
void dispose() {
  _controller.dispose();
  super.dispose();
}
```

### 2. **Use Curves**

Choose appropriate curves:
- `Curves.easeOutCubic` - Most transitions
- `Curves.easeInOut` - Toggles
- `Curves.easeOutBack` - Bouncy effects

### 3. **Duration Guidelines**

- **Micro**: 100-150ms (button press)
- **Short**: 200-300ms (state changes)
- **Medium**: 350-400ms (page transitions)
- **Long**: 500-800ms (complex animations)

### 4. **Haptic Feedback**

Add haptic feedback to interactive elements:

```dart
import 'package:flutter/services.dart';

onTap: () {
  HapticFeedback.selectionClick(); // Light
  // or
  HapticFeedback.lightImpact(); // Light impact
  // or
  HapticFeedback.mediumImpact(); // Medium impact
  
  // Your action
}
```

---

## 🎨 Color System

Use the app's color constants:

```dart
import 'package:estato/utils/app_colors.dart';

// Primary colors
AppColors.primary
AppColors.primaryDark
AppColors.primaryLight
AppColors.primaryUltraLight

// Secondary colors
AppColors.secondary
AppColors.secondaryDark
AppColors.secondaryLight

// Gradients
AppColors.primaryGradient // [primary, primaryDark]
AppColors.secondaryGradient // [secondary, secondaryDark]

// Status colors
AppColors.success
AppColors.error
AppColors.warning
AppColors.info

// Text colors
AppColors.textPrimary
AppColors.textSecondary
AppColors.textLight
```

---

## 🏗️ Custom Animations

### Creating a Custom Animated Widget

```dart
class MyAnimatedWidget extends StatefulWidget {
  @override
  State<MyAnimatedWidget> createState() => _MyAnimatedWidgetState();
}

class _MyAnimatedWidgetState extends State<MyAnimatedWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(milliseconds: 300),
      vsync: this,
    );
    
    _animation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic),
    );
    
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Opacity(
          opacity: _animation.value,
          child: Transform.scale(
            scale: _animation.value,
            child: child,
          ),
        );
      },
      child: YourWidget(),
    );
  }
}
```

---

## 📱 Responsive Design

### Screen Size Helpers

```dart
final screenWidth = MediaQuery.of(context).size.width;
final screenHeight = MediaQuery.of(context).size.height;

// Responsive padding
final padding = screenWidth < 600 ? 16.0 : 24.0;

// Responsive font size
final fontSize = screenWidth < 600 ? 14.0 : 16.0;
```

### Breakpoints

```dart
// Mobile
if (screenWidth < 600) {
  // Mobile layout
}

// Tablet
else if (screenWidth < 900) {
  // Tablet layout
}

// Desktop
else {
  // Desktop layout
}
```

---

## 🎯 Common Patterns

### 1. **Loading State with Shimmer**

```dart
Widget build(BuildContext context) {
  return isLoading
      ? ShimmerLoading(
          isLoading: true,
          child: Container(
            height: 200,
            decoration: BoxDecoration(
              color: Colors.grey[300],
              borderRadius: BorderRadius.circular(16),
            ),
          ),
        )
      : YourContentWidget();
}
```

### 2. **Error State**

```dart
if (hasError) {
  return Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(Icons.error_outline, size: 64, color: AppColors.error),
        SizedBox(height: 16),
        Text(
          'Something went wrong',
          style: GoogleFonts.poppins(
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 24),
        AnimatedGradientButton(
          text: 'Retry',
          icon: Icons.refresh,
          onPressed: () => loadData(),
        ),
      ],
    ),
  );
}
```

### 3. **Empty State**

```dart
if (items.isEmpty) {
  return Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(
          Icons.inbox_outlined,
          size: 80,
          color: Colors.grey[400],
        ),
        SizedBox(height: 16),
        Text(
          'No items found',
          style: GoogleFonts.poppins(
            fontSize: 18,
            color: AppColors.textSecondary,
          ),
        ),
      ],
    ),
  );
}
```

### 4. **Staggered List Animation**

```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return FadeInAnimation(
      delay: Duration(milliseconds: index * 50),
      slideOffset: Offset(0, 0.05),
      child: ItemWidget(item: items[index]),
    );
  },
)
```

---

## 🔧 Troubleshooting

### Animation Not Smooth

1. Check if you're disposing controllers properly
2. Ensure you're using `vsync: this` with `TickerProviderStateMixin`
3. Avoid heavy computations during animations
4. Use `const` constructors where possible

### Haptic Feedback Not Working

1. Test on a physical device (not emulator)
2. Check device settings for haptic feedback
3. Ensure proper import: `import 'package:flutter/services.dart';`

### Images Not Loading

1. Check internet connection
2. Verify image URLs are valid
3. Use `CachedNetworkImage` with error widget
4. Implement proper placeholder

---

## 📚 Additional Resources

### Documentation
- [Flutter Animation Docs](https://flutter.dev/docs/development/ui/animations)
- [Material Design 3](https://m3.material.io/)
- [Google Fonts](https://fonts.google.com/)

### Code Examples
- Check `lib/screens/splash_screen.dart` for complex animations
- See `lib/screens/home/home_screen.dart` for integration examples
- Review `lib/widgets/premium_card.dart` for card patterns

---

## ✅ Checklist for New Screens

When creating a new screen:

- [ ] Use smooth page transitions (automatic with current setup)
- [ ] Add haptic feedback to interactive elements
- [ ] Implement loading states with shimmer
- [ ] Add error states with retry button
- [ ] Include empty states
- [ ] Use premium button components
- [ ] Add fade-in animations for content
- [ ] Test on both light and dark themes
- [ ] Ensure proper null safety
- [ ] Dispose all animation controllers

---

## 🎉 You're All Set!

The Estato app now has a complete UI enhancement system. Use these components to maintain consistency and create a premium user experience throughout the app.

For questions or issues, refer to the source code in:
- `lib/core/animations.dart`
- `lib/widgets/animated_button.dart`
- `lib/widgets/premium_card.dart`

Happy coding! 🚀


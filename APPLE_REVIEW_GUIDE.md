# Apple Review Guide - TsingHar (清花) Recovery App

## Demo Account for Apple Reviewers

### Option 1: Direct Login
**Username:** `apple_reviewer`  
**Password:** `Demo2025!`

### Option 2: One-Click Demo Access (Recommended)
Use the **"Apple Review Demo Account"** button on the login page for instant access without entering credentials.

This demo account includes:
- 15-day active streak with pre-populated data
- Sample forum posts demonstrating UGC features
- Completed milestones showing progress tracking
- Personal recovery reasons and goals
- Full access to all app features

## App Overview

TsingHar is a bilingual (English/Chinese) recovery and wellness application focused on addiction recovery, particularly pornography addiction. The app provides:

- Progress tracking with streak counters
- Community forum for peer support  
- Meditation and mindfulness tools
- Achievement system with milestones
- Educational content library
- Privacy-focused design

## UGC Safety Compliance (Guideline 1.2)

We have implemented all 5 required safety mechanisms:

### 1. User Agreement & Terms
- Mandatory Terms & Privacy dialog shown on first launch
- Clear community guidelines and content policies
- No tolerance policy for objectionable content explicitly stated

### 2. Content Filtering
- Automatic profanity detection and filtering
- Spam pattern recognition
- Harassment content detection
- Self-harm content monitoring with support resources

### 3. Report Abuse System
- Three-dot menu on every post allows reporting
- Multiple report categories (spam, harassment, hate speech, etc.)
- Reports logged for 24-hour moderation review
- Clear feedback to users about report status

### 4. Block User Functionality
- Block user option available from post menu
- Blocked users' content filtered from view
- Local storage implementation for immediate effect

### 5. 24-Hour Moderation Policy
- Commitment to review all reports within 24 hours
- Clear policy statement in Help > Safety section
- Email contact for urgent safety concerns: contact@huangyizhouai.cn

## Content Moderation Features

Located in Help > Safety tab:
- Detailed safety policy explanation
- Community guidelines
- User safety tools documentation
- 24-hour moderation commitment
- Contact information for support

## Login & Navigation

Three testing options available:
- **"Apple Review Demo Account"** button - One-click access to full demo account with 15-day progress
- "Skip Login (Test)" button - Creates temporary 5-day progress session
- Regular login with demo credentials (apple_reviewer / Demo2025!)

## Logout Bug Fix

Resolved logout responsiveness issue on iPad Air 5 & iPhone 13 mini:
- Enhanced error handling for network failures
- Fallback local cleanup if server request fails
- Force navigation to login page with timeout
- Clear all cached data and local storage

## Key Features to Test

1. **Authentication System**
   - Login with demo account
   - Skip login for quick testing
   - Logout functionality (now responsive on all devices)

2. **UGC Safety Features**
   - Create a test post (content filtering active)
   - Report a post using three-dot menu
   - Block a user from post menu
   - View safety policy in Help section

3. **Core App Features**
   - Dashboard with streak tracking
   - Progress milestones and achievements
   - Community forum with sample posts
   - Educational content library
   - Meditation tools and panic button

4. **Compliance Elements**
   - Terms agreement on first launch
   - Safety policy documentation
   - Report/block functionality
   - Content moderation active

## Technical Implementation

- React TypeScript frontend
- Express.js backend with PostgreSQL
- Real-time content filtering
- Session-based authentication
- Bilingual support (English/Chinese)
- Mobile-responsive design

## Contact

For any questions during review process:
**Email:** contact@huangyizhouai.cn

---

*This app promotes mental wellness and recovery in a safe, moderated environment with comprehensive user protection measures.*
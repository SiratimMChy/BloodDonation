# 🎭 Hemovia Demo System

## 📋 Overview
Hemovia has a comprehensive demo system that allows visitors to explore all platform features without making any changes. Demo users are stored in the database and fetched dynamically.

## 🔐 Demo User Credentials

### Demo Donor
- **Email:** `donor@hemovia.com`
- **Password:** `Demo@123`
- **Role:** Donor
- **Access:** Donor dashboard and all donor features

### Demo Admin
- **Email:** `admin@hemovia.com`
- **Password:** `Demo@123`
- **Role:** Admin
- **Access:** Admin dashboard and all admin features

## 🚫 Demo Restrictions

### What Demo Users Can Do:
- ✅ Visit all pages
- ✅ View all dashboards
- ✅ See all data
- ✅ Access all buttons and interfaces

### What Demo Users Cannot Do:
- ❌ Create new requests
- ❌ Edit any data
- ❌ Delete any data
- ❌ Change user status
- ❌ Update profiles
- ❌ Confirm donations

## 🎯 How Demo System Works

### 1. Database Integration
- Demo users are stored in MongoDB database
- Fetched dynamically when "Try Demo Login" is clicked
- Auto-fills login form with selected demo user credentials

### 2. Login Process
- Click "Try Demo Login" button on login page
- System fetches demo users from database
- Select Demo Donor or Demo Admin
- Credentials are auto-filled in the form
- Click "Sign In" to login

### 3. Demo Badge
- Demo users see a floating badge in the top-right corner
- Badge indicates current demo user type
- Only visible when logged in as demo user

### 4. Restriction Messages
- Any action attempt shows a restriction message
- Messages explain demo limitations
- All messages in English

## 🛠️ Technical Implementation

### Backend Requirements
```javascript
// Add to your Express.js server
app.get('/demo-users', async (req, res) => {
  const demoEmails = ['donor@hemovia.com', 'admin@hemovia.com'];
  const demoUsers = await usersCollection.find({
    email: { $in: demoEmails }
  }).toArray();
  res.json(demoUsers);
});
```

### Frontend Files Structure
```
src/
├── Hooks/
│   └── useDemoRestriction.js # Demo restriction logic
└── Components/
    └── DemoUserBadge/
        └── DemoUserBadge.jsx # Demo user indicator
```

### Key Functions
- `isDemoUser(email)` - Check if user is demo user
- `getDemoUserType(email)` - Get demo user type (DONOR/ADMIN)
- `checkDemoRestriction()` - Show restriction message and block action
- `fetchDemoUsers()` - Fetch demo users from database

### Components with Demo Restrictions
- ✅ **AddRequest** - Blocks new request creation
- ✅ **MyRequest** - Blocks request deletion
- ✅ **AllRequest** - Blocks status changes and deletions
- ✅ **AllUsers** - Blocks user status and role changes
- ✅ **ViewRequest** - Blocks donation confirmation
- ✅ **Profile** - Blocks profile updates

## 🎨 User Experience

### Visual Indicators
1. **Demo Badge**: Floating animated badge in top-right corner
2. **Restriction Messages**: Professional SweetAlert2 messages
3. **Auto-fill**: Seamless credential filling
4. **English Language**: All messages in English

### User Flow
1. **Visit Login Page** → Go to login page
2. **Click Demo Login** → Click "Try Demo Login" button
3. **Loading** → System fetches demo users from database
4. **Select Demo Type** → Choose Demo Donor or Demo Admin
5. **Auto-fill** → Credentials automatically filled in form
6. **Login** → Click "Sign In" to complete login
7. **Explore Platform** → View all features with restrictions
8. **Try Actions** → See restriction messages when attempting changes

## 🔄 Database Setup

### Demo Users in MongoDB
```javascript
{
  name: 'Demo Donor',
  email: 'donor@hemovia.com',
  role: 'donor',
  status: 'active',
  district: 'Dhaka',
  upazila: 'Dhanmondi',
  bloodGroup: 'O+',
  imageUrl: 'placeholder-image-url'
}
```

### Firebase Authentication
- Demo users must also exist in Firebase Auth
- Same email and password: `Demo@123`
- Can be created manually in Firebase Console

## 🎯 Benefits

### For Users
- Test platform without registration
- View all features safely
- No risk of affecting real data
- Smooth auto-fill experience

### For Developers
- Real data remains protected
- Easy user experience testing
- Perfect for demonstrations
- Database-driven flexibility

## 🚀 Future Enhancements

- [ ] Demo data reset feature
- [ ] Guided tour system
- [ ] Demo video integration
- [ ] Multi-language support
- [ ] Demo analytics tracking

---

**Note**: This demo system is completely safe and does not affect real data. Visitors can confidently explore the platform knowing their actions are restricted and monitored.
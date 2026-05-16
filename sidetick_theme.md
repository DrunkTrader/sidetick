Use the landing pages UI theme for all pages until specified otherwise.

# Landing Page
Theme : cartoonish and playful with light theme using red, green, white, blue and purple color palette. 

Note :
1. No emojis should be used
2. Add a blinking red dot next to the sidetick logo indicating indian trading markets are open (mon to friday : 9:15 AM to 3:30 PM) else a black dot
3. Must be responsive for mobile and desktop view.

## 1. Nav Bar
Sticky Navbar with these :
### Left side
- Logo (Sidetick)
### Central
- Home
- Resources
- Courses

### Right
- Login (Button -> gives a pop up with options to login with Google or Telegram )

## 2. Hero Section
### Top Eyebrow Text
`TradingView Automation • Pine Script • Dhan API`

### Main Headline
Large , bold, clean typography - "Mini Quant"
Then smaller supporting line:

```
Learn to automate your trading workflows using Pine Script and Dhan API.
```
## 3. Stats Section
Small rounded Rectangular Card with stats:
- 1000+ Happy Students
- 4.9 Star Rating on Youtube
- 500+ Automation Scripts
- 24/7 Support

### CTA Section
Primary button:

```
Enroll Now (triggers login modal)
```

Secondary subtle button:

```
View Curriculum
```

#### Trust Strip Below CTA
`11 Modules • 22 Hours • Automation Scripts Included`

### Images
- [ ] Hero Image :  A stylized trading terminal with floating charts, code snippets, and a friendly robot hand adjusting a graph. The style is clean and vector-based, matching the brand colors.

## 4. Community Section
A flash card with these components:
- Heading: Join our community
- Subtext: Be a part of a growing community of traders and developers. 
- CTA Button: Discord, Instagram, Youtube

## 5. Contact / Lead Form Section
Format  : Flash card (bottom of page, before footer) & centered

#### Purpose:
- Lead capture. (Name, Email, Mobile Number, Message, Submit button)

#### Subcomponents:

- InputField
- Textarea
- SubmitButton

## 6. Footer

#### Subcomponents:

- FooterLinks (Resources, Courses, About)
- LegalLinks (Terms, Privacy, Refund policy)
- SocialLinks (Telegram, Youtube, X(twitter), Discord)

#### Content:

- Terms
- Privacy
- Refund policy
- Branding



# Login Page
- Sign in using Google or Telegram
- after login redirect to user dashboard.

# User Dashboard
- Must be responsive
- UI theme : follows the landing page theme, but courses section is like youtube interface but use sidetick theme color instead of black background. 
    - video thumbnail
    - video title
    - duration of video

- Sub Heading: Welcome {user.name}

- Navigation Bar (top, sticky)
    - Sidetick Logo ()
    - Home
    - Resources
    - Courses
    - Burger Menu
        - Purchases (should take to purchases page if user is enrolled in any course else show message "You are not enrolled in any course" and a button to "View Courses")
        - Settings (takes to user settings where it shows :name, email, phone number, profile picture, linked telegram account and option to change these settings)
        - Logout (Button that logs the user out and redirects to the landing page)



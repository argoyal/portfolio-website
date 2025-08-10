# Firebase Setup for Portfolio Application

This guide will help you set up Firebase to power your portfolio application with dynamic data.

## Prerequisites

- A Firebase account
- Basic knowledge of Firebase Console

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "portfolio-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location for your database
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "portfolio-web")
6. Copy the Firebase configuration object

## Step 4: Configure Environment Variables

1. Copy `firebase-config.example` to `.env.local`
2. Fill in your Firebase configuration values:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Step 5: Set Up Firestore Collections

Create the following collections in your Firestore database:

### 1. achievements
Documents with fields:
- `date` (string): Date of achievement
- `title` (string): Achievement title
- `description` (string): Achievement description
- `category` (string): Category (e.g., "Blog", "Career")
- `link` (string, optional): External link

### 2. experiences
Documents with fields:
- `company` (string): Company name
- `role` (string): Job title
- `period` (string): Time period (e.g., "June 2021 - Present")
- `description` (array): Array of job responsibilities and achievements
- `startDate` (string): Start date for sorting
- `endDate` (string, optional): End date
- `current` (boolean): Whether currently employed

### 3. skills
Documents with fields:
- `name` (string): Skill name
- `category` (string): Skill category (e.g., "Programming Languages", "Cloud & DevOps", "Frameworks")
- `proficiency` (number): Skill proficiency level (0-100)
- `icon` (string, optional): Icon representation (e.g., "JS", "PY", "AWS")

**Sample documents:**
```json
{
  "name": "Python",
  "category": "Programming Languages",
  "proficiency": 95,
  "icon": "PY"
}

{
  "name": "JavaScript",
  "category": "Programming Languages", 
  "proficiency": 85,
  "icon": "JS"
}

{
  "name": "AWS",
  "category": "Cloud & DevOps",
  "proficiency": 90,
  "icon": "AWS"
}

{
  "name": "Kubernetes",
  "category": "Cloud & DevOps",
  "proficiency": 88,
  "icon": "K8S"
}

{
  "name": "React",
  "category": "Frameworks",
  "proficiency": 80,
  "icon": "⚛️"
}

{
  "name": "Django",
  "category": "Frameworks",
  "proficiency": 92,
  "icon": "🐍"
}
```

### 4. education
Documents with fields:
- `institution` (string): School/university name
- `degree` (string): Degree type
- `field` (string): Field of study
- `period` (string): Time period
- `description` (string, optional): Additional details
- `gpa` (string, optional): GPA if applicable
- `startDate` (string): Start date for sorting (YYYY-MM-DD format)

### 5. products
Documents with fields:
- `title` (string): Product name
- `description` (string): Product description
- `image` (string): Image URL
- `technologies` (array): Array of technology strings
- `project_url` (string, optional): Project URL (GitHub, live demo, or documentation)
- `featured` (boolean): Whether to feature this product
- `category` (string): Product category
- `startDate` (string, optional): Start date for sorting (YYYY-MM-DD format)

### 6. aboutContent
Documents with fields:
- `section` (string): Content section identifier
- `content` (string): Content text
- `lastUpdated` (string): Last update timestamp
- `order` (number): Display order (lower numbers appear first)

**Sample document:**
```json
{
  "section": "Introduction",
  "content": "<p>I am a seasoned technology leader with a proven track record of successfully leading teams of 60+ professionals and delivering high-quality, impactful projects. As an ex-entrepreneur, I thrive in product-driven environments and have navigated the full lifecycle of building, scaling, and exiting a startup. With deep expertise in DevOps, cloud environments, and the Python stack, I take a holistic approach to technology. My strong grasp of systems architecture enables me to design and implement scalable, efficient solutions that align with business objectives. 'Analyzing real-world problems, curating solutions, and implementing them through the digital platform is my passion'-this philosophy drives me in every endeavor. Whether it's architecting robust infrastructure, optimizing cloud operations, or mentoring teams to deliver excellence, I am committed to leveraging technology for meaningful impact.</p><p>At Calance, I am setting up a Digital and Emerging Technology practice, specialising in DevOps defined approach for Software delivery. I have been a key asset in bridging the gaps that existed between US Sales and Development center based out of India. I have developed exceptional relationships with some of the key people resembling Fortune 500 brands. I have been extensively involved in enabling AWS partnership for Calance, predominantly around Generative AI. I have learned how to build teams, manage people, shape culture, develop relationships with customers, sell enterprise products, and build state of the art infrastructure systems using Kubernetes and AWS.</p><p>Throughout my career, I've focused on building and scaling technology platforms, establishing best practices for development teams, and driving digital transformation initiatives in various organizations.</p>",
  "lastUpdated": "2024-01-01",
  "order": 1
}
```

**Additional sections you can add:**
```json
{
  "section": "Early Career",
  "content": "<p>Your early career story and background...</p>",
  "lastUpdated": "2024-01-01",
  "order": 2
}

{
  "section": "Current Role",
  "content": "<p>Your current position and responsibilities...</p>",
  "lastUpdated": "2024-01-01",
  "order": 3
}
```

## Step 6: Add Sample Data

Here are some example documents to get you started:

### Sample Achievement
```json
{
  "date": "February, 2025",
  "title": "NEW BLOG OUT",
  "description": "Wrote a new blog highlighting my observations on Generative AI enabled software development.",
  "category": "Blog",
  "link": "https://arpitgoyalkgp.medium.com/"
}
```

### Sample Experience
```json
{
  "company": "Calance",
  "role": "Manager - Digital & Emerging Technologies",
  "period": "June 2021 - Present",
  "description": [
    "Establishing digital and emerging technologies practice",
    "Leading cross-functional teams to deliver innovative solutions for enterprise clients",
    "Managing AWS partnership and Generative AI initiatives",
    "Building and scaling technology platforms"
  ],
  "startDate": "2021-06-01",
  "endDate": null,
  "current": true
}
```

### Sample Skill
```json
{
  "name": "Python",
  "category": "Programming",
  "proficiency": 9
}
```

### Sample Education
```json
{
  "institution": "IIT Kharagpur",
  "degree": "Bachelor of Technology",
  "field": "Computer Science and Engineering",
  "period": "2014-2018",
  "description": "Graduated with honors, specialized in software engineering",
  "startDate": "2014-08-01"
}
```

### Sample Product
```json
{
  "title": "Portfolio Website",
  "description": "Modern portfolio website built with Next.js and Firebase",
  "image": "https://example.com/portfolio.jpg",
  "technologies": ["Next.js", "React", "Firebase", "Tailwind CSS"],
  "project_url": "https://portfolio.example.com",
  "featured": true,
  "category": "Web Development"
}
```

### Sample About Content
```json
{
  "section": "myStory",
  "content": "<p>I am a seasoned technology leader with a proven track record of successfully leading teams of 60+ professionals and delivering high-quality, impactful projects. As an ex-entrepreneur, I thrive in product-driven environments and have navigated the full lifecycle of building, scaling, and exiting a startup. With deep expertise in DevOps, cloud environments, and the Python stack, I take a holistic approach to technology. My strong grasp of systems architecture enables me to design and implement scalable, efficient solutions that align with business objectives. 'Analyzing real-world problems, curating solutions, and implementing them through the digital platform is my passion'-this philosophy drives me in every endeavor. Whether it's architecting robust infrastructure, optimizing cloud operations, or mentoring teams to deliver excellence, I am committed to leveraging technology for meaningful impact.</p><p>At Calance, I am setting up a Digital and Emerging Technology practice, specialising in DevOps defined approach for Software delivery. I have been a key asset in bridging the gaps that existed between US Sales and Development center based out of India. I have developed exceptional relationships with some of the key people resembling Fortune 500 brands. I have been extensively involved in enabling AWS partnership for Calance, predominantly around Generative AI. I have learned how to build teams, manage people, shape culture, develop relationships with customers, sell enterprise products, and build state of the art infrastructure systems using Kubernetes and AWS.</p><p>Throughout my career, I've focused on building and scaling technology platforms, establishing best practices for development teams, and driving digital transformation initiatives in various organizations.</p>",
  "lastUpdated": "2024-01-01"
}
```

## Step 7: Security Rules (Optional)

For production, consider adding security rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true;
      allow write: if false; // Only allow writes from Firebase Console
    }
  }
}
```

## Step 8: Test Your Application

1. Start your development server: `npm run dev`
2. Navigate to your portfolio pages
3. Check the browser console for any Firebase connection errors
4. Verify that data is loading from Firebase

## Troubleshooting

### Common Issues:

1. **"Firebase App named '[DEFAULT]' already exists"**
   - This usually means Firebase is being initialized multiple times
   - Check that you're only importing the Firebase config once

2. **"Missing or insufficient permissions"**
   - Ensure your Firestore security rules allow read access
   - Check that your Firebase config is correct

3. **Data not loading**
   - Verify your collection names match exactly
   - Check that documents have the correct field names
   - Ensure your environment variables are loaded

### Debug Tips:

- Use Firebase Console to verify your data structure
- Check browser console for error messages
- Use `console.log()` to debug data fetching
- Verify environment variables are loaded correctly

## Next Steps

- Customize the data structure to match your needs
- Add more collections for additional content
- Implement caching strategies for better performance
- Set up Firebase Analytics to track usage
- Consider implementing user authentication for admin features

## Resume PDF Integration

To enable the resume download functionality:

1. **Upload your resume PDF to Firebase Storage**:
   - Go to Firebase Console → Storage
   - Create a new bucket if needed
   - Upload your resume PDF file
   - Make it publicly accessible

2. **Update the download function** in `app/about/page.tsx`:
   ```typescript
   const handleDownloadResume = async () => {
     try {
       const response = await fetch('YOUR_FIREBASE_STORAGE_URL/resume.pdf')
       const blob = await response.blob()
       const url = window.URL.createObjectURL(blob)
       const a = document.createElement('a')
       a.href = url
       a.download = 'Arpit_Goyal_Resume.pdf'
       document.body.appendChild(a)
       a.click()
       window.URL.revokeObjectURL(url)
       document.body.removeChild(a)
     } catch (error) {
       console.error('Error downloading resume:', error)
       alert('Failed to download resume. Please try again.')
     }
   }
   ```

3. **Alternative**: Host your PDF on a CDN or cloud storage service and update the download URL directly.

## Support

If you encounter issues:
1. Check the [Firebase Documentation](https://firebase.google.com/docs)
2. Review the [Next.js Documentation](https://nextjs.org/docs)
3. Check the browser console for error messages
4. Verify your Firebase configuration and data structure

## Skills Collection

Create a collection called `skills` with the following document structure:

```json
{
  "name": "Python",
  "category": "Programming Languages",
  "proficiency": 90,
  "icon": "py",
  "lastUpdated": "2024-01-15T10:00:00Z"
}
```

### Icon Field Values

The `icon` field should use the skill identifiers from [skill-icons.dev](https://skillicons.dev). Here are some common examples:

- **Programming Languages**: `py` (Python), `js` (JavaScript), `ts` (TypeScript), `java`, `cpp`, `csharp`, `go`, `rust`, `php`, `ruby`, `swift`, `kotlin`
- **Frameworks & Libraries**: `react`, `vue`, `angular`, `django`, `flask`, `spring`, `express`, `laravel`, `rails`, `nextjs`, `nuxtjs`
- **Databases**: `mysql`, `postgresql`, `mongodb`, `redis`, `sqlite`, `oracle`, `sqlserver`
- **Cloud & DevOps**: `aws`, `azure`, `gcp`, `docker`, `kubernetes`, `terraform`, `jenkins`, `gitlab`, `github`
- **Tools & IDEs**: `vscode`, `intellij`, `eclipse`, `vim`, `git`, `postman`, `figma`, `photoshop`
- **Operating Systems**: `linux`, `windows`, `macos`, `ubuntu`, `centos`, `debian`

### Sample Skills Documents

```json
// Python
{
  "name": "Python",
  "category": "Programming Languages",
  "proficiency": 90,
  "icon": "py",
  "lastUpdated": "2024-01-15T10:00:00Z"
}

// Django
{
  "name": "Django",
  "category": "Web Frameworks",
  "proficiency": 85,
  "icon": "django",
  "lastUpdated": "2024-01-15T10:00:00Z"
}

// React
{
  "name": "React",
  "category": "Frontend Frameworks",
  "proficiency": 80,
  "icon": "react",
  "lastUpdated": "2024-01-15T10:00:00Z"
}

// PostgreSQL
{
  "name": "PostgreSQL",
  "category": "Databases",
  "proficiency": 75,
  "icon": "postgresql",
  "lastUpdated": "2024-01-15T10:00:00Z"
}

// Docker
{
  "name": "Docker",
  "category": "DevOps",
  "proficiency": 70,
  "icon": "docker",
  "lastUpdated": "2024-01-15T10:00:00Z"
}
```

### How It Works

The application automatically generates skill icon URLs using the format:
```
https://skillicons.dev/icons?i={icon}
```

For example:
- `icon: "py"` → `https://skillicons.dev/icons?i=py`
- `icon: "react"` → `https://skillicons.dev/icons?i=react`
- `icon: "django"` → `https://skillicons.dev/icons?i=django`

This provides professional, consistent skill icons that automatically match your skill names and look great on your portfolio!

# Firebase Setup Guide

## Collections Structure

### 1. achievements
- `id` (auto-generated): Unique identifier
- `date` (string): Date in "MM, YYYY" format (e.g., "January, 2024")
- `title` (string): Achievement title
- `description` (string): Achievement description
- `category` (string): Category (e.g., "Career", "Blog")
- `link` (string, optional): External link URL

### 2. experiences
- `id` (auto-generated): Unique identifier
- `company` (string): Company name
- `role` (string): Job role/title
- `period` (string): Time period (e.g., "2021-2024")
- `description` (array): Array of description points
- `startDate` (string): Start date for sorting (YYYY-MM-DD format)
- `endDate` (string, optional): End date (YYYY-MM-DD format)
- `current` (boolean): Whether this is the current position

### 3. skills
- `id` (auto-generated): Unique identifier
- `name` (string): Skill name
- `category` (string): Skill category
- `proficiency` (number): Proficiency level (1-100)
- `icon` (string, optional): Icon identifier

### 4. education
- `id` (auto-generated): Unique identifier
- `institution` (string): Institution name
- `degree` (string): Degree type
- `field` (string): Field of study
- `period` (string): Time period
- `description` (string, optional): Additional description
- `gpa` (string, optional): GPA score
- `startDate` (string): Start date for sorting (YYYY-MM-DD format)

### 5. products
- `id` (auto-generated): Unique identifier
- `title` (string): Product/project title
- `description` (string): Product description
- `image` (string): Image URL
- `technologies` (array): Array of technology names
- `project_url` (string, optional): Project URL
- `featured` (boolean): Whether to feature on homepage
- `category` (string): Product category
- `startDate` (string, optional): Start date for sorting (YYYY-MM-DD format)

### 6. about_content
- `id` (auto-generated): Unique identifier
- `section` (string): Content section identifier
- `content` (string): Content text
- `lastUpdated` (string): Last update timestamp
- `order` (number): Display order

### 7. personal_details
- `id` (auto-generated): Unique identifier
- `email` (string): Primary email address
- `location` (string): Location (e.g., "Gurugram, India")
- `profile_picture_url` (string, optional): URL to profile picture image
- `logo_picture_url` (string, optional): URL to logo image for navigation
- `github` (string, optional): GitHub profile URL
- `twitter` (string, optional): Twitter profile URL
- `facebook` (string, optional): Facebook profile URL
- `linkedin` (string, optional): LinkedIn profile URL
- `instagram` (string, optional): Instagram profile URL
- `stackoverflow` (string, optional): Stack Overflow profile URL

## Sample Data

### personal_details collection
```json
{
  "email": "arpitgoyal.iitkgp@gmail.com",
  "location": "Gurugram, India",
  "profile_picture_url": "https://example.com/profile-picture.jpg",
  "logo_picture_url": "https://example.com/logo.png",
  "github": "https://github.com/argoyal",
  "twitter": "https://twitter.com/_arpitgoyal_",
  "facebook": "https://facebook.com/arpitgoyal.iitkgp/",
  "linkedin": "https://www.linkedin.com/in/arpitgoyaliitkgp/",
  "instagram": "https://www.instagram.com/_._appy_._/",
  "stackoverflow": "https://stackoverflow.com/users/4719293/arpit-goyal"
}
```

## Notes
- All social media fields are optional - only display icons for URLs that exist
- The personal_details collection should have only one document
- Use the fetchPersonalDetails() function to retrieve personal information
- The component will automatically hide social media icons if the corresponding URL is not provided

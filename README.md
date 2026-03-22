# Angel Rose Dugaduga's Autobiography Website

A modern, responsive autobiography website built with **Spring Boot**, **Thymeleaf**, and enhanced with the **Lavender Dreams** color palette for a cozy and inviting user experience.

## 🌟 Features

- **Modern Spring Boot Architecture**: Java-based backend with MVC pattern
- **Thymeleaf Templates**: Server-side rendering for optimal SEO
- **Lavender Dreams Color Palette**: Unique, cozy purple theme (#b794f6, #7c3aed)
- **Enhanced UI/UX**:
  - Multi-layer card shadows with glass-morphism effects
  - Staggered entrance animations
  - Interactive 3D card tilt effects
  - Floating image animations
  - Enhanced mobile menu with backdrop blur
- **Mobile-First Design**: Touch-optimized with swipe gestures
- **Accessibility**: WCAG AA compliant with full keyboard navigation, ARIA labels, and screen reader support
- **Responsive**: Breakpoints for all devices (320px to 1440px+)
- **Interactive Gallery**: Lightbox with keyboard navigation and touch swipe
- **Smooth Animations**: Scroll-triggered effects, parallax background, typing effect

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

1. **Java Development Kit (JDK) 17 or higher**
   - Download from: https://adoptium.net/ or https://www.oracle.com/java/technologies/downloads/
   - Verify installation: `java -version`

2. **Apache Maven 3.6+**
   - Download from: https://maven.apache.org/download.cgi
   - Follow installation guide: https://maven.apache.org/install.html
   - Verify installation: `mvn --version`

## 🚀 Getting Started

### 1. Clone or Navigate to the Project

```bash
cd c:/Users/Justin/Documents/projects/DUGADUGA---WEBSITE
```

### 2. Build the Project

```bash
mvn clean install
```

### 3. Run the Application

```bash
mvn spring-boot:run
```

Or run the JAR file directly:

```bash
java -jar target/autobiography-2.0.0.jar
```

### 4. Open in Browser

Navigate to: **http://localhost:8080**

The website will be running on port 8080 by default.

## 📁 Project Structure

```
DUGADUGA---WEBSITE/
├── src/
│   ├── main/
│   │   ├── java/com/angelrose/autobiography/
│   │   │   ├── AutobiographyApplication.java          # Main Spring Boot application
│   │   │   ├── controller/
│   │   │   │   └── HomeController.java                # MVC Controller
│   │   │   └── model/
│   │   │       ├── PersonalInfo.java                   # Personal information model
│   │   │       ├── Education.java                       # Education model
│   │   │       ├── SocialLink.java                     # Social media links model
│   │   │       ├── AlbumImage.java                     # Gallery images model
│   │   │       └── NavigationLink.java                 # Navigation model
│   │   └── resources/
│   │       ├── application.properties                   # Spring Boot configuration
│   │       ├── static/
│   │       │   ├── css/
│   │       │   │   ├── main.css                        # Core styles & color palette
│   │       │   │   ├── components.css                  # Component-specific styles
│   │       │   │   ├── animations.css                  # Animation effects
│   │       │   │   └── responsive.css                  # Media queries
│   │       │   ├── js/
│   │       │   │   ├── navigation.js                   # Navigation & smooth scrolling
│   │       │   │   ├── animations.js                   # Scroll & typing animations
│   │       │   │   ├── gallery.js                      # Lightbox & swipe gestures
│   │       │   │   └── interactions.js                 # Scroll-to-top & interactions
│   │       │   └── images/                             # All images and videos
│   │       └── templates/
│   │           ├── index.html                          # Main page template
│   │           ├── layout.html                         # Base layout template
│   │           └── fragments/
│   │               ├── header.html                     # Header fragment
│   │               ├── footer.html                     # Footer fragment
│   │               └── sections/                       # Section fragments
│   │                   ├── home.html
│   │                   ├── about.html
│   │                   ├── education.html
│   │                   ├── life.html
│   │                   ├── hobbies.html
│   │                   ├── albums.html
│   │                   └── contact.html
└── pom.xml                                              # Maven dependencies
```

## 🎨 Lavender Dreams Color Palette

This website features a unique, cozy purple color scheme that avoids generic AI purples:

- **Primary Purple**: `#b794f6` - Soft lavender
- **Dark Purple**: `#7c3aed` - Rich violet
- **Darker Purple**: `#5b21b6` - Deep plum
- **Light Purple**: `#ddd6fe` - Pale lavender
- **Ultra Light Purple**: `#ede9fe` - Almost white lavender
- **Accent Mauve**: `#c084fc` - Warm mauve
- **Warm Pink**: `#f0abfc` - Soft pink highlights
- **Cream White**: `#faf8ff` - Warm white with purple tint

## ✨ UI/UX Enhancements

### Card Layouts
- Multi-layer shadows for depth perception
- Glass-morphism effects with backdrop blur
- Gradient borders that animate on hover
- 3D transforms on mouse movement
- Rounded corners (32px) for softer aesthetic

### Animations
- Staggered entrance animations (alternating left/right slides)
- Floating animations for images
- Shimmer loading effect
- Mouse-tracking card tilt
- Smooth cubic-bezier transitions

### Mobile Improvements
- Larger touch targets (minimum 44x44px)
- Swipe gestures for gallery navigation
- Enhanced mobile menu with backdrop blur
- Touch-friendly spacing and padding
- Pull-to-refresh visual feedback

### Accessibility
- ARIA labels and semantic HTML5
- Skip-to-content link
- Keyboard navigation with focus trap
- Screen reader support
- WCAG AA color contrast (4.5:1)
- Support for prefers-reduced-motion
- Support for prefers-contrast: high

## 🛠️ Configuration

### Port Configuration

To change the default port (8080), edit `src/main/resources/application.properties`:

```properties
server.port=8090
```

### Enable Thymeleaf Caching (Production)

For production deployment, enable Thymeleaf caching in `application.properties`:

```properties
spring.thymeleaf.cache=true
```

## 📦 Building for Production

### Build JAR file

```bash
mvn clean package
```

The JAR file will be created in `target/autobiography-2.0.0.jar`

### Run Production Build

```bash
java -jar target/autobiography-2.0.0.jar
```

## 🌐 Deployment Options

### 1. Traditional Servlet Container (Tomcat, Jetty)
Deploy the built JAR file to any servlet container.

### 2. Cloud Platforms
- **Heroku**: Use Heroku's Java buildpack
- **AWS Elastic Beanstalk**: Deploy as a Java application
- **Google Cloud Platform**: Use App Engine or Cloud Run
- **Azure**: Deploy to Azure App Service

### 3. Docker (Optional)

Create a `Dockerfile`:

```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/autobiography-2.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Build and run:

```bash
docker build -t autobiography-app .
docker run -p 8080:8080 autobiography-app
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Application starts on port 8080
- [ ] Homepage loads at http://localhost:8080
- [ ] All 7 sections render with correct content
- [ ] All images and video display properly
- [ ] Lavender Dreams color scheme applied
- [ ] Smooth scrolling works between sections
- [ ] Hamburger menu toggles on mobile (resize browser)
- [ ] Active navigation link highlights on scroll
- [ ] Gallery lightbox opens and closes
- [ ] Keyboard navigation works (Tab, Enter, ESC, arrows)
- [ ] Swipe gestures work (test on mobile/tablet)
- [ ] Scroll-to-top button appears after scrolling
- [ ] Typing effect animates on home section
- [ ] All animations trigger on scroll
- [ ] Social links open in new tabs
- [ ] Footer shows correct year
- [ ] Responsive design works at all breakpoints

### Browser Testing

Test on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Chrome (Android)
- Mobile Safari (iOS)

## 📝 Original Files

The following original files have been preserved:
- `index.html` - Original static HTML
- `styles.css` - Original CSS
- `script.js` - Original JavaScript
- `Images/` - Original media assets

These files are no longer used but kept for reference.

## 🤝 Contributing

This is a personal autobiography website. Direct contributions are not accepted, but you're welcome to fork and adapt for your own projects.

## 📄 License

© 2026 Angel Rose Dugaduga. All rights reserved.

## 🎯 Technology Stack

- **Backend**: Spring Boot 3.2.2
- **Template Engine**: Thymeleaf
- **Build Tool**: Maven
- **Java Version**: 17
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Fonts**: Google Fonts (Inter)
- **Icons**: Font Awesome 6.0
- **Design**: Mobile-first responsive design

## 💡 Tips

1. **Hot Reload**: Spring DevTools is included. Changes to templates will auto-reload.
2. **CSS Changes**: Edit files in `src/main/resources/static/css/` and refresh browser.
3. **JavaScript Changes**: Edit files in `src/main/resources/static/js/` and refresh browser.
4. **Content Updates**: Modify data in `HomeController.java` and restart the application.

## 🐛 Troubleshooting

### Application won't start
- Verify Java 17+ is installed: `java -version`
- Check if port 8080 is available
- Review console logs for errors

### Images not displaying
- Check that files are in `src/main/resources/static/images/`
- Verify file names match (case-sensitive)
- Clear browser cache

### Styles not loading
- Check CSS file paths in `index.html`
- Verify files are in `src/main/resources/static/css/`
- Clear browser cache and hard refresh (Ctrl+Shift+R)

---

**Built with ❤️ and Spring Boot by Angel Rose Dugaduga**

🌸 Featuring the exclusive **Lavender Dreams** color palette 🌸

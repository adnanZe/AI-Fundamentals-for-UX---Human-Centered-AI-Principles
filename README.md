# AI Fundamentals for UX - Human-Centered AI Principles

> An interactive demonstration platform showcasing best practices for integrating AI into user experiences with a human-centered approach.

[![Angular](https://img.shields.io/badge/Angular-21.0-red.svg)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Features Documentation](#features-documentation)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About

This project is an interactive educational platform demonstrating **Human-Centered AI Principles** in UX design. It showcases three core patterns for AI integration:

1. **AI Form Completion** - Smart form suggestions with user control
2. **AI Loading States** - Transparent AI processing visualization
3. **Undo Timeline** - Action history management for AI-assisted workflows

Built with Angular 21 using modern standalone components, signals, and best practices for creating transparent, controllable, and user-friendly AI experiences.

## ✨ Features

### 🤖 AI Form Completion

- Real-time AI suggestions with confidence indicators
- Visual overlay for suggested values
- Accept/reject feedback mechanism
- Form state management with signals

### ⏳ AI Loading States

- Multiple loading pattern demonstrations
- Transparent AI process visualization
- Step-by-step progress indicators
- Comparison view between different loading approaches

### ⏮️ Undo Timeline

- Action history tracking
- Visual timeline representation
- Undo/redo functionality
- Action metadata display

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher) - [Download here](https://nodejs.org/)
- **npm** (v10.x or higher) - Comes with Node.js
- **Angular CLI** (optional, for development) - `npm install -g @angular/cli`

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "AI Foundamentals for UX"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm run ng version
   ```

## 💻 Usage

### Development Server

Start the local development server:

```bash
npm start
```

Then open your browser and navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to GitHub Pages

Deploy the application to GitHub Pages:

```bash
npm run deploy
```

## 📁 Project Structure

```
src/
├── app/
│   ├── features/                      # Feature modules
│   │   ├── ai-form-completion/        # AI form completion feature
│   │   │   ├── components/
│   │   │   │   ├── ai-suggestion-overlay/
│   │   │   │   ├── confidence-indicator/
│   │   │   │   ├── feedback-buttons/
│   │   │   │   └── profile-form/
│   │   │   ├── models/                # TypeScript interfaces
│   │   │   └── services/              # Business logic
│   │   │
│   │   ├── ai-loading-states/         # Loading patterns feature
│   │   │   ├── components/
│   │   │   │   ├── comparison-view/
│   │   │   │   ├── simple-loading/
│   │   │   │   └── transparent-loading/
│   │   │   ├── models/
│   │   │   └── services/
│   │   │
│   │   └── undo-timeline/             # Action history feature
│   │       ├── components/
│   │       ├── models/
│   │       └── services/
│   │
│   ├── pages/                         # Page components
│   │   └── home.component.ts
│   │
│   ├── app.config.ts                  # Application configuration
│   ├── app.ts                         # Root component
│   └── app.html                       # Root template
│
├── index.html                         # Main HTML file
├── main.ts                           # Application entry point
└── styles.css                        # Global styles
```

## 📚 Features Documentation

### AI Form Completion

The AI Form Completion feature demonstrates how to integrate AI suggestions into forms while maintaining user control:

- **Confidence Indicators**: Visual feedback on AI suggestion reliability
- **Suggestion Overlay**: Non-intrusive display of AI recommendations
- **Feedback System**: Users can accept or reject suggestions
- **State Management**: Reactive form state with Angular signals

**Key Components:**

- `ProfileFormComponent` - Main form container
- `AiSuggestionOverlayComponent` - Suggestion display
- `ConfidenceIndicatorComponent` - Confidence visualization
- `FeedbackButtonsComponent` - User feedback controls

### AI Loading States

Demonstrates different approaches to showing AI processing:

- **Simple Loading**: Basic loading spinner
- **Transparent Loading**: Detailed step-by-step progress
- **Comparison View**: Side-by-side pattern comparison

**Key Principles:**

- Transparency in AI processing
- Progress indication
- User awareness of AI activity

### Undo Timeline

Implements action history management:

- **Action Tracking**: Records all user actions
- **Visual Timeline**: Chronological action display
- **Undo/Redo**: Navigate through action history
- **Metadata Display**: Shows action details and timestamps

## 🛠️ Development

### Code Style

This project follows strict TypeScript and Angular best practices:

- **Standalone Components**: All components use the standalone API
- **Signals**: State management with Angular signals
- **OnPush Change Detection**: Optimized performance
- **Type Safety**: Strict TypeScript configuration

### Code Scaffolding

Generate new components:

```bash
ng generate component feature-name/components/component-name
```

Generate services:

```bash
ng generate service feature-name/services/service-name
```

For more options:

```bash
ng generate --help
```

### Prettier Configuration

Code formatting is configured with Prettier:

```json
{
  "printWidth": 100,
  "singleQuote": true
}
```

Format code:

```bash
npx prettier --write .
```

## 🧪 Testing

### Unit Tests

Run unit tests with Vitest:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

### Test Coverage

Generate coverage report:

```bash
npm test -- --coverage
```

## 🚢 Deployment

### GitHub Pages

The project includes automated deployment to GitHub Pages:

```bash
npm run deploy
```

This command:

1. Builds the project with the correct base href
2. Deploys to the `gh-pages` branch

### Manual Deployment

For other hosting platforms:

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the `dist/human-centered-ai-principles/browser/` folder to your hosting service

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Follow the code style guidelines**
   - Use English for all code and comments
   - Follow Angular best practices
   - Use standalone components
   - Implement signals for state management
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Code Guidelines

- All code must be in **English** (variables, functions, comments, documentation)
- Use **standalone components** (no NgModules)
- Prefer **signals** over traditional state management
- Set `changeDetection: ChangeDetectionStrategy.OnPush`
- Use `input()` and `output()` functions instead of decorators
- Use native control flow (`@if`, `@for`, `@switch`)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- UX design community for AI best practices
- All contributors to this project

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev/)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [Human-Centered AI Principles](https://hai.stanford.edu/)
- [Google's AI Design Guidelines](https://pair.withgoogle.com/)

---

**Made with ❤️ for better AI user experiences**

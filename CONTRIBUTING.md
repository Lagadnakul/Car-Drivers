# Contributing to Car Drivers

Thank you for considering contributing to the Car Drivers project! This document outlines the guidelines for contributing to this repository.

## 🌟 Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## 🔄 Workflow

1. **Fork the Repository**: Start by forking the repository to your GitHub account.
2. **Clone Locally**: Clone your forked repository to your local machine.
3. **Create a Branch**: Create a branch for your feature or bugfix.
4. **Make Changes**: Make your changes, following the code style guidelines.
5. **Test**: Test your changes thoroughly.
6. **Commit**: Commit your changes with a descriptive commit message.
7. **Push**: Push your changes to your fork.
8. **Pull Request**: Open a pull request from your fork to the main repository.

## 🌿 Branching Strategy

- `main`: The production branch, contains the stable code.
- `develop`: The development branch, contains the latest features.
- `feature/<feature-name>`: For new features.
- `bugfix/<bug-name>`: For bug fixes.
- `hotfix/<issue-name>`: For critical fixes.

## 📝 Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

## 🧪 Testing

- Write tests for new features and bug fixes.
- Ensure all tests pass before submitting a pull request.

## 📋 Pull Request Process

1. Update the README.md with details of changes if applicable.
2. Update the CHANGELOG.md with details of changes if applicable.
3. The PR will be reviewed by maintainers, who may request changes.
4. Once approved, the PR will be merged.

## 🚀 Development Setup

### Prerequisites
- Node.js (v18+)
- MongoDB
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
# Create a .env file with your configuration
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Admin Panel Setup
```bash
cd admin/Car-driver
npm install
npm run dev
```

## 🔧 Code Style

- Follow ESLint configuration
- Use prettier for code formatting
- Write meaningful comments
- Follow the existing code style

## 🙏 Thank You!

Your contributions to this project are greatly appreciated. Together, we can make Car Drivers even better!

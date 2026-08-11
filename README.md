

# GDG USAR Website

This repository contains the source code for the Google Developer Groups (GDG) USAR website.
https://www.sanity.io/plugins/next-sanity

## Folder Structure
```
GDG_USAR_website/
├── src/                  # Source files
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── styles/         # CSS/SCSS files
│   └── assets/         # Images, fonts, etc.
├── public/             # Static files
├── config/             # Configuration files
├── .env               # Environment variables
└── README.md          # Documentation
```

## Setup Environment

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Git

### Installation Steps
1. Clone the repository:
```bash
git clone https://github.com/aryanbuilds/GDG_USAR_website.git
cd GDG_USAR_website
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start development server:
```bash
npm run dev
```

## Important Notes
- Always create new branches for features/fixes
- Follow commit message conventions
- Keep dependencies updated
- Run tests before pushing code

## Crucial Files
- `package.json`: Contains project dependencies and scripts
- `.env`: Environment variables (don't commit this file)
- `.gitignore`: Lists files/folders to ignore in version control
- `src/index.js`: Application entry point
- `src/App.js`: Main application component
- `config/webpack.config.js`: Webpack configuration

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.

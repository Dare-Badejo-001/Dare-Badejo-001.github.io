1. GitHub Copilot
2. Live Server (ritwickdey.LiveServer)
3. Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
4. Prettier - Code formatter (esbenp.prettier-vscode)
5. Markdown All in One (yzhang.markdown-all-in-one)
6. Polacode (pnp.polacode)
7. Bracket Pair Colorizer 2 (CoenraadS.bracket-pair-colorizer-2)


code --install-extension ritwickdey.LiveServer
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension yzhang.markdown-all-in-one
code --install-extension pnp.polacode
code --install-extension CoenraadS.bracket-pair-colorizer-2


# Initialize npm
npm init -y

# Install Tailwind CSS and dependencies
npm install -D tailwindcss postcss autoprefixer

# Generate Tailwind config
npx tailwindcss init -p



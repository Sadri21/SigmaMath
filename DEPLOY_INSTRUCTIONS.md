# Deployment & Running Instructions

## 1. Local Setup (Node.js & Nest.js)

This project has been updated to use the **Nest.js** framework with Node.js.

1.  **Open Terminal** in this folder.
2.  Run the following command to install the required dependencies:
    ```bash
    npm install
    ```

## 2. Running Locally

To start the server in development mode:

```bash
npm run start:dev
```

- Once started, open your browser and visit: [http://localhost:3000](http://localhost:3000)
- You should see the "Sigma Geometry" quiz application running.

## 3. Push to GitHub

To save your code to your GitHub repository:

1.  **Stage and Commit changes**:
    ```bash
    git add .
    git commit -m "Setup Nest.js project structure"
    ```

2.  **Push to GitHub**:
    ```bash
    git push -u origin main
    ```

## 4. Deployment to the Web

Since this is now a Node.js application (server-side), it cannot be hosted on GitHub Pages (which is for static sites only). You should use a Node.js hosting provider.

### Recommended: Render, Railway, or Heroku
Most offer a free tier for hobby projects.

**Example for [Render.com](https://render.com):**
1.  Push your latest code to GitHub.
2.  Create a new **Web Service** on Render.
3.  Connect your GitHub repository.
4.  Use the following settings:
    - **Build Command**: `npm install && npm run build`
    - **Start Command**: `npm run start:prod`
5.  Click **Create Web Service**.

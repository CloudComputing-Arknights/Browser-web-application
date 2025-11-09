# Cloud Computing Team Arknights: Web UI


## Deployment

The project is live at:

V0.app: 

**[https://vercel.com/chunyu-jins-projects/v0-exchange-rates](https://vercel.com/chunyu-jins-projects/v0-exchange-rates)**

Google Cloud Run:

**[https://browser-web-application-177030329297.europe-west1.run.app/](https://browser-web-application-177030329297.europe-west1.run.app/)**

Google Cloud Storage (replace our-bucket-name with your bucket name):

**[https://our-bucket-name.storage.googleapis.com/index.html](https://our-bucket-name.storage.googleapis.com/index.html)**


## Getting Started

Follow these steps to set up and run the project locally:

1. Clone this repository

2. Install `pnpm` if you haven't installed it yet:
   - Visit [https://pnpm.io/installation](https://pnpm.io/installation) for installation instructions
   - Alternatively, you can install it using npm:
     ```bash
     npm install -g pnpm
     ```

3. Install project dependencies:
   ```bash
   pnpm install
   pnpm add serve
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. In your browser, go to [http://localhost:3000](http://localhost:3000) to view the app locally.

6. To verify that the static export works before deploying to Google Cloud Storage, build and serve the static files locally:
   ```bash
   pnpm build
   pnpm start
   ```

7. Again, open [http://localhost:3000](http://localhost:3000) in your browser to ensure the static export runs correctly.

8. If everything works as expected, upload the contents of the `/out` folder to your Google Cloud Storage bucket. Then, navigate to `https://your-bucket-name.storage.googleapis.com/index.html` in your browser (ensure the bucket allows public access).


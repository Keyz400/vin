# Vinjak Stream

Vinjak Stream is a single-page movie listing and search web application that allows users to browse, search, and explore movie details. The app integrates with TMDB and YTS APIs to fetch movie information, images, and torrents.

---

## Features

- **Movie Categories**: Browse movies by different categories using dynamic buttons.
- **Search Functionality**: Search for movies with auto-suggestions.
- **Movie Grid View**: Displays movie posters in a responsive grid layout.
- **GIF Logo**: Adds an animated GIF logo for branding.
- **Light/Dark Mode**: A toggle button for switching between light and dark themes.
- **Responsive Design**: Works seamlessly across all screen sizes.

---

## Installation and Usage

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/vinjak-stream.git
cd vinjak-stream

2. Setup Dependencies

Ensure you have a basic HTTP server installed (e.g., live-server, http-server, or use a local development environment like VS Code's Live Server extension).

3. Run the Application

Open the index.html file in your browser, or start a simple server:

npx live-server

4. View in Browser

The app will open in your default browser. If not, navigate to:

http://127.0.0.1:8080


---

File Structure

vinjak-stream/
├── index.html           # Main HTML file
├── css/
│   └── Home.css         # CSS for styling the app
├── js/
│   └── app.js           # Main JavaScript for functionality
├── assets/
│   ├── logo.gif         # GIF logo for branding
│   └── placeholder.png  # Placeholder image for movies
├── README.md            # Project documentation


---

APIs Used

TMDB API: Fetch movie details, categories, and images.

YTS API: Fetch torrent links for movies.



---

Customization

You can modify the API keys or endpoints by updating the app.js file:

const TMDB_API_KEY = 'your-tmdb-api-key';
const YTS_API_URL = 'https://yts.mx/api/v2/';

Replace the placeholder values with your API credentials.


---

License

This project is licensed under the MIT License. See the LICENSE file for details.


---

Contributions

Contributions are welcome! Please open an issue or submit a pull request for enhancements or bug fixes.


---

Author

Developed by Your Name. For queries, reach out at your.email@example.com.

**Instructions:**
- Replace placeholders like `yourusername`, `your-tmdb-api-key`, and `your.email@example.com` with your actual GitHub username, TMDB API key, and contact email.
- Save the file as `README.md` and include it in the project folder before uploading to GitHub.

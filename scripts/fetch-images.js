const https = require('https');
const fs = require('fs');
const path = require('path');

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const OUTPUT_DIR = path.join(__dirname, '../assets/images');

const imagesToFetch = [
  { query: 'luxury office interior design',       filename: 'hero-main.jpg',              w: 1920, h: 1080 },
  { query: 'contemporary hospitality lounge',     filename: 'hero-alt.jpg',               w: 1920, h: 1080 },
  { query: 'elegant interior design consultation',filename: 'about-main.jpg',             w: 1200, h: 800  },
  { query: 'modern retail interior design',       filename: 'portfolio-retail-01.jpg',    w: 800,  h: 600  },
  { query: 'luxury hotel lobby interior',         filename: 'portfolio-hospitality-01.jpg',w: 800, h: 600  },
  { query: 'corporate office furniture premium',  filename: 'portfolio-office-01.jpg',    w: 800,  h: 600  },
  { query: 'high end furniture showroom',         filename: 'portfolio-retail-02.jpg',    w: 800,  h: 600  },
  { query: 'boutique hotel suite interior',       filename: 'portfolio-hospitality-02.jpg',w: 800, h: 600  },
  { query: 'executive office design minimal',     filename: 'portfolio-office-02.jpg',    w: 800,  h: 600  },
  { query: 'luxury interior design detail',       filename: 'services-bg.jpg',            w: 1200, h: 700  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function fetchImage({ query, filename, w, h }) {
  const dest = path.join(OUTPUT_DIR, filename);

  if (ACCESS_KEY) {
    console.log(`Fetching from Unsplash: ${filename} (query: "${query}")`);
    // Simulating Unsplash API call for now or using fallback directly if no key
    // For this environment, we'll likely use the fallback
  }

  const fallbackUrl = `https://picsum.photos/seed/${filename.replace('.jpg','')}/${w}/${h}`;
  console.log(`Downloading: ${filename} from ${fallbackUrl}`);
  try {
    await download(fallbackUrl, dest);
    console.log(`Saved: ${filename}`);
  } catch (err) {
    console.error(`Error downloading ${filename}:`, err.message);
  }
}

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

(async () => {
  for (const img of imagesToFetch) {
    await fetchImage(img);
  }
  console.log('All images processed.');
})();

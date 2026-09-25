import fs from 'fs';
import path from 'path';

interface PageMeta {
  title: string;
  description: string;
  path: string;
  h1: string;
  h2: string;
  lead: string;
}

const defaultBaseUrl = 'https://northmountainvillageleakdetectionaz.com';

// Detect custom domain from public/CNAME or environment
let activeBaseUrl = defaultBaseUrl;
const cnamePath = path.resolve(process.cwd(), 'public', 'CNAME');
if (fs.existsSync(cnamePath)) {
  const cnameContent = fs.readFileSync(cnamePath, 'utf8').trim();
  if (cnameContent && !cnameContent.startsWith('#')) {
    activeBaseUrl = `https://${cnameContent.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`;
    console.log(`Detected custom domain from CNAME: ${activeBaseUrl}`);
  }
}

const pages: Record<string, PageMeta> = {
  'water-leak': {
    title: 'Water Leak Detection | North Mountain Village, Phoenix',
    description: 'Emergency slab leak detection & acoustic water pipe locating in North Mountain Village Phoenix AZ. Non-invasive diagnostics. Call (602) 836-3562 for 24/7 service.',
    path: '/water-leak',
    h1: 'Water & Slab Leak Detection in North Mountain Village, Phoenix',
    h2: 'Non-Invasive Acoustic & Thermal Water Pipe Locating',
    lead: '24/7 Professional emergency slab leak locating, acoustic ground microphone testing, and water bill spike diagnostics across zip codes 85029, 85022, 85023, and 85053.'
  },
  'gas-leak': {
    title: 'Gas Leak Detection | North Mountain Village, Phoenix',
    description: '24/7 emergency natural gas leak detection & pipe pressure testing in North Mountain Village Phoenix. Fast response & safety shutoff. Call (602) 836-3562.',
    path: '/gas-leak',
    h1: 'Emergency Gas Leak Detection in North Mountain Village, Phoenix',
    h2: '24/7 Gas Pipe Pressure Decay Testing & Sniffer Diagnostics',
    lead: 'Immediate combustible gas sniffing, emergency shutoff support, and line integrity certification for homes and businesses across North Mountain Village and Phoenix AZ.'
  },
  'about': {
    title: 'About Us | Leak Detection Pro Phoenix AZ',
    description: 'Learn about Leak Detection Pro in North Mountain Village, Phoenix AZ. Connecting property owners with licensed leak detection specialists. Call (602) 836-3562.',
    path: '/about',
    h1: 'About Leak Detection Pro - North Mountain Village, Phoenix',
    h2: 'Connecting Property Owners with Certified Leak Detection Specialists',
    lead: 'Dedicated referral network based in North Mountain Village (85029) ensuring rapid dispatch of pre-screened Arizona ROC licensed contractors with advanced diagnostic technology.'
  },
  'contact': {
    title: 'Contact Us | Leak Detection Pro Phoenix AZ',
    description: 'Contact Leak Detection Pro at 2810 W Sahuaro Dr, Phoenix AZ 85029. 24/7 dispatch across North Mountain Village zip codes 85029, 85022, 85023. Call (602) 836-3562.',
    path: '/contact',
    h1: 'Contact Leak Detection Pro - North Mountain Village',
    h2: '24/7 Emergency Dispatch & Schedule Diagnostic Service',
    lead: 'Located at 2810 W Sahuaro Dr, Phoenix, AZ 85029. Serving North Mountain Village, Moon Valley, and North Phoenix. Call (602) 836-3562 anytime.'
  },
  'privacy': {
    title: 'Privacy Policy | Leak Detection Pro',
    description: 'Review the privacy policy for Leak Detection Pro. Learn how we handle consumer inquiries, contact details, and quote requests in Phoenix, AZ.',
    path: '/privacy',
    h1: 'Privacy Policy - Leak Detection Pro',
    h2: 'Consumer Data Protection & Information Handling Practices',
    lead: 'Clear, transparent privacy practices detailing how contact details, service requests, and quotes are securely processed.'
  },
  'disclaimer': {
    title: 'Legal Disclaimers | Leak Detection Pro',
    description: 'Important legal disclaimers, licensing disclosures, and terms for Leak Detection Pro contractor referral services in Phoenix and Maricopa County.',
    path: '/disclaimer',
    h1: 'Legal Disclaimers & Licensing Disclosures',
    h2: 'Independent Contractor Network Notice for Phoenix & Maricopa County',
    lead: 'Important terms governing our marketing and referral services connecting homeowners with independent Arizona licensed plumbing contractors.'
  }
};

const distDir = path.resolve(process.cwd(), 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html not found! Run vite build first.');
  process.exit(1);
}

let baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// If custom domain is active, update base URLs in index.html
if (activeBaseUrl !== defaultBaseUrl) {
  baseHtml = baseHtml.replaceAll(defaultBaseUrl, activeBaseUrl);
  fs.writeFileSync(indexHtmlPath, baseHtml, 'utf8');

  // Also update sitemap.xml in dist
  const distSitemap = path.join(distDir, 'sitemap.xml');
  if (fs.existsSync(distSitemap)) {
    const sitemapContent = fs.readFileSync(distSitemap, 'utf8').replaceAll(defaultBaseUrl, activeBaseUrl);
    fs.writeFileSync(distSitemap, sitemapContent, 'utf8');
  }

  // Also update robots.txt in dist
  const distRobots = path.join(distDir, 'robots.txt');
  if (fs.existsSync(distRobots)) {
    const robotsContent = fs.readFileSync(distRobots, 'utf8').replaceAll(defaultBaseUrl, activeBaseUrl);
    fs.writeFileSync(distRobots, robotsContent, 'utf8');
  }

  // Also update llms.txt in dist
  const distLlms = path.join(distDir, 'llms.txt');
  if (fs.existsSync(distLlms)) {
    const llmsContent = fs.readFileSync(distLlms, 'utf8').replaceAll(defaultBaseUrl, activeBaseUrl);
    fs.writeFileSync(distLlms, llmsContent, 'utf8');
  }
}

// Ensure .nojekyll exists in dist for GitHub Pages
fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf8');

// Ensure CNAME exists in dist if present in public and contains a valid domain
if (fs.existsSync(cnamePath)) {
  const cnameVal = fs.readFileSync(cnamePath, 'utf8').trim();
  if (cnameVal && !cnameVal.startsWith('#')) {
    fs.writeFileSync(path.join(distDir, 'CNAME'), cnameVal.replace(/^https?:\/\//, '').replace(/\/+$/, ''), 'utf8');
  }
}

// Ensure root vercel.json is also copied into dist
const rootVercelJson = path.resolve(process.cwd(), 'vercel.json');
if (fs.existsSync(rootVercelJson)) {
  fs.copyFileSync(rootVercelJson, path.join(distDir, 'vercel.json'));
}

// Ensure 404.html exists in dist
fs.writeFileSync(path.join(distDir, '404.html'), baseHtml, 'utf8');

// Generate static index.html for each route
for (const [route, meta] of Object.entries(pages)) {
  const routeDir = path.join(distDir, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  const canonicalUrl = `${activeBaseUrl}${meta.path}`;
  let routeHtml = baseHtml;

  // Replace Title
  routeHtml = routeHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);

  // Replace Meta Description
  routeHtml = routeHtml.replace(
    /<meta\s+name="description"\s+content="[^"]*"/i,
    `<meta name="description" content="${meta.description}"`
  );

  // Replace Canonical Link
  routeHtml = routeHtml.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"/i,
    `<link rel="canonical" href="${canonicalUrl}"`
  );

  // Replace OpenGraph
  routeHtml = routeHtml.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"/i,
    `<meta property="og:title" content="${meta.title}"`
  );
  routeHtml = routeHtml.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"/i,
    `<meta property="og:description" content="${meta.description}"`
  );
  routeHtml = routeHtml.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"/i,
    `<meta property="og:url" content="${canonicalUrl}"`
  );

  // Replace Twitter
  routeHtml = routeHtml.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"/i,
    `<meta name="twitter:title" content="${meta.title}"`
  );
  routeHtml = routeHtml.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"/i,
    `<meta name="twitter:description" content="${meta.description}"`
  );

  // Replace Pre-rendered crawl H1, H2 and lead in <div id="root">
  routeHtml = routeHtml.replace(
    /<h1[^>]*>[\s\S]*?<\/h1>/i,
    `<h1 style="font-size: 32px; font-weight: 800; margin-bottom: 16px; line-height: 1.25;">${meta.h1}</h1>`
  );
  routeHtml = routeHtml.replace(
    /<h2[^>]*>[\s\S]*?<\/h2>/i,
    `<h2 style="font-size: 20px; color: white; margin-bottom: 12px; font-weight: 700;">${meta.h2}</h2>`
  );

  const routeFilePath = path.join(routeDir, 'index.html');
  fs.writeFileSync(routeFilePath, routeHtml, 'utf8');
  console.log(`Generated static entry: ${route}/index.html`);
}

console.log('Successfully generated all pre-rendered static route files.');

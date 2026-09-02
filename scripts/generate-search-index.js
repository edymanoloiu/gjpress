#!/usr/bin/env node
/**
 * Generează public/search-index.json din posts-index.
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = process.cwd();

const DIACRITICS = { ă: 'a', â: 'a', î: 'i', ș: 's', ț: 't', ş: 's', Ă: 'a', Â: 'a', Î: 'i', Ș: 's', Ț: 't', Ş: 's' };
function norm(t) {
	return String(t || '')
		.split('')
		.map((c) => DIACRITICS[c] || c)
		.join('')
		.toLowerCase();
}

function loadPublication() {
	const t = fs.readFileSync(path.join(ROOT, 'src/data/publication.js'), 'utf8');
	const domain = (t.match(/canonicalDomain:\s*['"]([^'"]+)/) || [])[1];
	const city = (t.match(/city:\s*['"]([^'"]+)/) || [])[1];
	const county = (t.match(/county:\s*['"]([^'"]+)/) || [])[1];
	return { domain, city, county };
}

const pub = loadPublication();
const entries = [];

const indexCandidates = [
	path.join(ROOT, 'lib/postsIndex.json'),
	path.join(ROOT, 'public/posts-index.json'),
];
let posts = [];
for (const indexPath of indexCandidates) {
	if (!fs.existsSync(indexPath)) continue;
	const raw = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
	if (Array.isArray(raw)) {
		posts = raw;
	} else if (raw && typeof raw === 'object') {
		posts = Object.entries(raw).map(([slug, data]) => ({ slug, ...(data || {}) }));
	}
	break;
}
if (!posts.length) {
	const postsDir = path.join(ROOT, 'posts');
	if (fs.existsSync(postsDir)) {
		posts = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md')).map((f) => {
			const slug = f.replace(/\.md$/, '');
			const { data } = matter(fs.readFileSync(path.join(postsDir, f), 'utf8'));
			return { slug, ...data };
		});
	}
}

function newsPath(post) {
	return `/post/${post.slug}/`;
}

for (const post of posts) {
	if (!post.slug) continue;
	entries.push({
		title: post.title,
		description: post.excerpt || '',
		contentType: 'news',
		city: pub.city,
		county: pub.county,
		category: post.cate,
		tags: post.tags || [],
		date: post.date,
		slug: post.slug,
		url: newsPath(post),
		_search: norm([post.title, post.excerpt, post.cate, ...(post.tags || [])].filter(Boolean).join(' ')),
	});
}

const out = path.join(ROOT, 'public/search-index.json');
fs.writeFileSync(out, JSON.stringify(entries));
console.log(`search-index: ${entries.length} intrări → ${out}`);

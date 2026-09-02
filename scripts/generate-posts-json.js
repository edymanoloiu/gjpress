// scripts/generate-posts-json.js
// Builds a small lib/postsIndex.js (frontmatter only) + copies full .md to public/_posts/
// so the Cloudflare Worker bundle stays under 64 MiB (no giant postsRawContent.js).

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');
const indexOutPath = path.join(process.cwd(), 'lib', 'postsIndex.js');
const publicPostsDir = path.join(process.cwd(), 'public', '_posts');
const legacyRawPath = path.join(process.cwd(), 'lib', 'postsRawContent.js');

/** Only fields needed for listings / getAllPosts (keeps Worker bundle smaller than full YAML dump). */
const INDEX_STORE_KEYS = new Set([
	'postFormat',
	'trending',
	'story',
	'title',
	'excerpt',
	'featureImg',
	'thumb',
	'cate',
	'cate_bg',
	'cate_img',
	'author_name',
	'author_img',
	'author_bio',
	'author_social',
	'author_desg',
	'date',
	'post_views',
	'post_share',
	'read_time',
	'featureImgSrc',
	'isPromo',
	'topPost',
	'tags',
	'gallery',
	'videoLink',
	'audioLink',
	'quoteText',
	'hasScript',
	'hasOwnScript',
	'script',
]);

function pickForIndex(data) {
	const o = {};
	for (const key of INDEX_STORE_KEYS) {
		if (data[key] === undefined || data[key] === null) continue;
		let v = data[key];
		if (key === 'author_bio' && typeof v === 'string' && v.length > 450) {
			v = `${v.slice(0, 450)}…`;
		}
		o[key] = v;
	}
	return o;
}

async function generatePostsIndex() {
	fs.mkdirSync(publicPostsDir, { recursive: true });

	const files = fs.readdirSync(postsDirectory);
	const postsIndex = {};

	for (const filename of files) {
		if (!filename.endsWith('.md')) continue;
		const slug = filename.replace(/\.md$/, '');
		const fullPath = path.join(postsDirectory, filename);
		const raw = fs.readFileSync(fullPath, 'utf8');
		const { data } = matter(raw);
		postsIndex[slug] = JSON.parse(JSON.stringify(pickForIndex(data)));
		fs.copyFileSync(fullPath, path.join(publicPostsDir, filename));
	}

	const compact = JSON.stringify(postsIndex);
	const banner = `// Auto-generated: frontmatter index only. Article bodies: /_posts/<slug>.md (run npm run generate:posts).\n`;
	fs.writeFileSync(indexOutPath, `${banner}export default ${compact};\n`);

	if (fs.existsSync(legacyRawPath)) {
		fs.unlinkSync(legacyRawPath);
	}

	console.log(`✅ Generated lib/postsIndex.js (${Object.keys(postsIndex).length} posts) + public/_posts/*.md`);
}

generatePostsIndex().catch((err) => {
	console.error(err);
	process.exit(1);
});

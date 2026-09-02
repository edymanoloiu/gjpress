import matter from 'gray-matter';
import postsIndex from './postsIndex.js';

function getPostSlugsInternal() {
	return Object.keys(postsIndex || {});
}

/**
 * Read raw markdown for a post. Prefer local filesystem (dev / Node SSR); otherwise fetch static asset.
 */
async function readPostMarkdown(slug, origin) {
	const filename = `${slug.replace(/\.md$/, '')}.md`;

	try {
		const { readFileSync, existsSync } = await import('fs');
		const { join } = await import('path');
		const localPath = join(process.cwd(), 'public', '_posts', filename);
		if (existsSync(localPath)) {
			return readFileSync(localPath, 'utf8');
		}
		const postsPath = join(process.cwd(), 'posts', filename);
		if (existsSync(postsPath)) {
			return readFileSync(postsPath, 'utf8');
		}
	} catch {
		// fs unavailable (e.g. some edge bundles)
	}

	const base = (origin || process.env.NEXT_PUBLIC_SITE_URL || 'https://gjpress.ro').replace(
		/\/$/,
		''
	);
	const url = `${base}/_posts/${encodeURIComponent(filename)}`;
	const res = await fetch(url, { redirect: 'follow' });
	if (!res.ok) {
		return null;
	}
	return res.text();
}

export function getPostSlugs() {
	return getPostSlugsInternal();
}

/**
 * @param {string} [options.origin] - e.g. https://gjpress.ro from request (required for body fetch on Cloudflare when fs has no files)
 */
export async function getPostBySlug(slug, fields = [], options = {}) {
	const slugStr =
		typeof slug === 'string' ? slug : Array.isArray(slug) ? slug[0] : String(slug || '');
	const realSlug = slugStr.replace(/\.md$/, '');
	const needContent = fields.includes('content');

	let data = postsIndex[realSlug];
	let parsedFromDisk = null;

	if (!data) {
		const raw = await readPostMarkdown(realSlug, options.origin);
		if (!raw) {
			return {};
		}
		parsedFromDisk = matter(raw);
		data = parsedFromDisk.data || {};
	}

	if (needContent) {
		let parsed = parsedFromDisk;
		if (!parsed) {
			const raw = await readPostMarkdown(realSlug, options.origin);
			if (!raw) {
				return {};
			}
			parsed = matter(raw);
		}
		const items = {};
		fields.forEach((field) => {
			if (field === 'slug') {
				items[field] = realSlug;
			}
			if (field === 'content') {
				items[field] = parsed.content;
			}
			if (field !== 'slug' && field !== 'content') {
				if (typeof parsed.data[field] !== 'undefined') {
					items[field] = parsed.data[field];
				} else if (typeof data[field] !== 'undefined') {
					items[field] = data[field];
				}
			}
		});
		return items;
	}

	const items = {};
	fields.forEach((field) => {
		if (field === 'slug') {
			items[field] = realSlug;
		}
		if (field !== 'slug' && field !== 'content' && typeof data[field] !== 'undefined') {
			items[field] = data[field];
		}
	});

	return items;
}

export function getAllPosts(fields = []) {
	const slugs = getPostSlugsInternal();

	return slugs
		.map((slug) => {
			const data = postsIndex[slug];
			if (!data) return null;
			const items = {};
			fields.forEach((field) => {
				if (field === 'slug') {
					items[field] = slug;
				}
				if (field !== 'slug' && typeof data[field] !== 'undefined') {
					items[field] = data[field];
				}
			});
			return items;
		})
		.filter(Boolean);
}

export async function getFileContentBySlug(slug, options = {}) {
	const slugStr =
		typeof slug === 'string' ? slug : Array.isArray(slug) ? slug[0] : String(slug || '');
	const realSlug = slugStr.replace(/\.md$/, '');
	const raw = await readPostMarkdown(realSlug, options.origin);
	if (!raw) {
		return {};
	}
	return matter(raw);
}

export function getPostCreationDate(slug) {
	const slugStr =
		typeof slug === 'string' ? slug : Array.isArray(slug) ? slug[0] : String(slug || '');
	const realSlug = slugStr.replace(/\.md$/, '');
	const data = postsIndex[realSlug];
	if (!data || !data.date) {
		return null;
	}
	return {
		createdAt: new Date(data.date).toISOString(),
	};
}

export function getAllPostsSlugs() {
	return getPostSlugsInternal().map((slug) => slug.replace(/\.md$/, ''));
}

import publication from '../../src/data/publication.js';

export function getCanonicalUrl(pathname) {
	const base = publication.canonicalDomain.replace(/\/$/, '');
	if (!pathname || pathname === '/') return `${base}/`;
	const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
	return path.endsWith('/') ? `${base}${path}` : `${base}${path}/`;
}

export function absoluteUrl(pathOrUrl) {
	if (!pathOrUrl) return getCanonicalUrl(publication.defaultSocialImage);
	if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
	const base = publication.canonicalDomain.replace(/\/$/, '');
	return `${base}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

export function robotsDirective({ indexable } = {}) {
	const allow = indexable ?? publication.isIndexable;
	if (!allow) return 'noindex, nofollow';
	return 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
}

export default { getCanonicalUrl, absoluteUrl, robotsDirective };

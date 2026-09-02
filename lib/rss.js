import RSS from 'rss';
import { isRecomandarePost } from './recomandarePosts.js';

export function generateRssFeed(posts) {
	const feed = new RSS({
		title: 'GJ Press | Cele mai importante știri din Târgu Jiu. Află tot ce contează, azi, în Târgu Jiu.',
		description: 'GJ Press este site-ul de știri locale din Târgu Jiu, unde găsești rapid cele mai importante informații despre oraș și județ. Publicăm zilnic noutăți din comunitate, administrație, evenimente culturale și sportive, totul într-un stil clar și accesibil, pentru ca locuitorii din Gorj să fie mereu la curent cu ce se întâmplă.',
		site_url: 'https://gjpress.ro',
		feed_url: 'https://gjpress.ro/rss.xml',
		language: 'ro',
		image_url: 'https://gjpress.ro/images/cropped_image.png'
	});

	posts.forEach(post => {
		feed.item({
			title: post.title,
			description: post.excerpt,
			url: `${feed.site_url.replace(/\/$/, '')}${isRecomandarePost(post) ? '/recomandare/' : '/post/'}${post.slug}`,
			date: post.date,
			categories: post.tags,
			enclosure: {
				url: post.featureImg,
				type: 'image/jpeg',
			},
		});
	});

	return feed.xml({ indent: true });
}

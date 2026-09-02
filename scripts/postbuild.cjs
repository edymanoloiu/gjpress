// scripts/postbuild.cjs

const fs = require("fs");
const path = require("path");

const { generateRssFeed } = require("../lib/rss.js");
const { getAllPostsSync } = require("../lib/buildPosts.cjs");

// Cloudflare deploys the "out" folder
const outDir = path.join(__dirname, "..", "out");
const publicDir = path.join(__dirname, "..", "public");

// Ensure out directory exists
if (!fs.existsSync(outDir)) {
	fs.mkdirSync(outDir, { recursive: true });
}

// 1️⃣ Copy next-sitemap output (sitemap.xml, robots.txt, sitemap-0.xml, etc.)
if (fs.existsSync(publicDir)) {
	const files = fs.readdirSync(publicDir);

	const sitemapFiles = files.filter(
		(file) =>
			file.startsWith("sitemap") ||
			file.includes("sitemap") ||
			file === "robots.txt"
	);

	sitemapFiles.forEach((file) => {
		fs.copyFileSync(path.join(publicDir, file), path.join(outDir, file));
		console.log("📌 Copied:", file);
	});
}

// 2️⃣ Generate RSS feed inside "out/"
try {
	const posts = getAllPostsSync([
		"slug",
		"title",
		"excerpt",
		"date",
		"tags",
		"featureImg",
	]);

	const sorted = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
	const xml = generateRssFeed(sorted);

	fs.writeFileSync(path.join(outDir, "rss.xml"), xml);
	fs.writeFileSync(path.join(outDir, "feed.rss"), xml);

	console.log("✅ RSS files written to 'out/'");
	console.log("📂 Final out/ contents:", fs.readdirSync(outDir));
} catch (err) {
	console.error("❌ postbuild failed:", err);
	process.exit(1);
}

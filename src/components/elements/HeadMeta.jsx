import Head from 'next/head'
import { useRouter } from 'next/router'


const SITE_URL = 'https://gjpress.ro'
const defaultDesc =
	'„GJ Press” este platforma digitală dedicată locuitorilor din Drobeta-Turnu Severin și celor interesați de viața orașului de pe malul Dunării. Aici găsești zilnic știri locale, evenimente importante, informații utile, interviuri și povești despre oameni și locuri care dau identitate comunității. Cu un conținut echilibrat, accesibil și actualizat constant, „GJ Press” devine ghidul tău zilnic pentru tot ce contează în Severin – de la administrație și cultură până la stil de viață și inițiative locale.'

/**
 * SEO tags via next/head so they reliably appear in SSR HTML (OpenNext / Pages Router).
 * Optional article* props apply when ogType is "article".
 */
const HeadMeta = ({
	metaTitle,
	metaDesc,
	metaImg,
	canonicalUrl,
	keywords,
	ogType = 'website',
	ogTitle,
	ogDescription,
	ogImage,
	ogUrl,
	articlePublishedTime,
	articleModifiedTime,
	articleSection,
	jsonLd,
}) => {
	const description = metaDesc || defaultDesc
	const title = metaTitle
	const image = ogImage || metaImg
	const router = useRouter()
	const routePath = router.asPath ? router.asPath.split('#')[0].split('?')[0] : '/'
	const normalizedRoutePath = !routePath || routePath === '/' ? '' : routePath.startsWith('/') ? routePath : `/${routePath}`
	const routeUrl = `${SITE_URL}${normalizedRoutePath}`
	const canonical = canonicalUrl || ogUrl || routeUrl || SITE_URL
	const openGraphUrl = ogUrl || canonical
	const twTitle = ogTitle || title
	const twDesc = ogDescription || description
	const twImage = image

	const jsonLdString =
		jsonLd && typeof jsonLd === 'object' ? JSON.stringify(jsonLd) : null

	return (
		<Head>
			<meta charSet="utf-8" />
			<meta httpEquiv="x-ua-compatible" content="ie=edge" />
			<meta name="description" content={description} />
			<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			{keywords ? <meta name="keywords" content={keywords} /> : null}
			<title>{title}</title>

			{canonical ? <link rel="canonical" href={canonical} key="canonical" /> : null}

			<meta property="og:locale" content="ro_RO" />
			{openGraphUrl ? <meta property="og:url" content={openGraphUrl} /> : null}
			<meta property="og:site_name" content={SITE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')} />
			<meta property="og:type" content={ogType} />
			<meta property="og:title" content={ogTitle || title} />
			<meta property="og:description" content={ogDescription || description} />
			{image ? <meta property="og:image" content={image} /> : null}
			{articlePublishedTime ? (
				<meta property="article:published_time" content={articlePublishedTime} />
			) : null}
			{articleModifiedTime ? (
				<meta property="article:modified_time" content={articleModifiedTime} />
			) : null}
			{articleSection ? <meta property="article:section" content={articleSection} /> : null}

			<meta name="ai-content" content={ogType === 'article' ? 'ai-assisted; human-reviewed' : 'not-applicable'} />
			<meta name="ai-image" content="generated-or-stock-or-own" />
			<meta name="editorial-responsibility" content="Weboratory Capital SRL" />
			<meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
			<meta name="twitter:title" content={twTitle} />
			<meta name="twitter:description" content={twDesc} />
			{twImage ? <meta name="twitter:image" content={twImage} /> : null}

			<link rel="icon" href="/images/cropped_image.png" type="image/png" />
			<link rel="apple-touch-icon" href="/images/cropped_image.png" />

			{jsonLdString ? (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: jsonLdString }}
					key="article-jsonld"
				/>
			) : null}
		</Head>
	)
}

export default HeadMeta

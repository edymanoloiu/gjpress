/**
 * Configurație centrală a publicației.
 * Domeniul canonic este explicit — nu se deduce din headere HTTP.
 */

const publication = {
	publicationName: "GJ Press",
	publicationTagline: "Gorjul, fără ocolișuri",
	canonicalDomain: "https://gjpress.ro",
	city: "Târgu Jiu",
	county: "Gorj",
	region: "Sud-Vest",
	latitude: 45.034,
	longitude: 23.274,
	locale: 'ro-RO',
	language: 'ro',
	timezone: 'Europe/Bucharest',
	logo: '/images/logo.png',
	defaultSocialImage: '/images/logo.png',
	favicon: '/images/cropped_image.png',
	editorialEmail: 'contact@weboratory.ro',
	legalCompanyName: 'Weboratory Capital SRL',
	publisherInformation: {
		name: 'Weboratory Capital SRL',
		email: 'contact@weboratory.ro',
		website: 'https://www.weboratory.ro',
	},
	socialProfiles: [],
	foundingDate: '2024-01-01',
	coverageArea: "Județul Gorj, România",
	editorialPositioning:
		"Publicație locală cu identitate jurnalistică puternică, concentrată pe actualitatea județului Gorj, sectorul energetic și deciziile care afectează comunitatea.",
	nearbyLocalities: ["Motru", "Rovinari", "Târgu Cărbunești", "Bumbești-Jiu", "Turceni"],
	mapProvider: 'openstreetmap',
	mapsEnabled: true,
	environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	isIndexable: process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview' && process.env.CF_PAGES_BRANCH !== 'preview',
	localCate: "Azi in Targu Jiu",
	categorySlug: "azi-in-targu-jiu",
	tagMinIndexCount: 5,
	correctionEmail: 'contact@weboratory.ro',
	ogLocale: 'ro_RO',
	seo: {
		title: "GJ Press - Știri din Gorj și Târgu Jiu",
		titleTemplate: "%s | GJ Press",
		description:
			"Știri din Gorj și Târgu Jiu. Actualitate, energie, administrație, economie, trafic, evenimente și informații din comunitățile județului Gorj.",
		homepageH1: "Știri din Gorj și Târgu Jiu",
		homepageIntro:
			"Cele mai importante informații din Târgu Jiu și județul Gorj, cu atenție specială pentru energie, administrație, economie și subiectele care contează pentru comunitate.",
		openGraph: {
			type: "website",
			siteName: "GJ Press",
			title: "GJ Press - Știri și informații din Gorj",
			description:
				"Actualitatea din Târgu Jiu și Gorj, cu accent pe energie, administrație, economie și problemele comunității.",
			locale: "ro_RO",
		},
		twitter: {
			card: "summary_large_image",
			title: "GJ Press - Știrile Gorjului",
			description:
				"Informații relevante din Târgu Jiu și județul Gorj, de la energie și administrație până la viața comunității.",
		},
		schema: {
			type: "NewsMediaOrganization",
			name: "GJ Press",
			alternateName: "GJPress.ro",
			areaServed: "Județul Gorj, România",
		},
	},
};

export default publication;

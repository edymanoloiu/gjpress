import Image from "next/image";
import Link from "next/link";
import SocialLink from "../../data/social/SocialLink.json";
import publication from "../../data/publication";

const FooterOne = () => {
	return (
		<footer className="page-footer bg-grey-dark-key">
			<div className="container">
				{/* End of .footer-top */}
				<div className="footer-mid">
					<div className="row align-items-center">
						<div className="col-md">
							<div className="footer-logo-container">
								<Link href="/">
									<Image
										src={publication.favicon || "/images/cropped_image.png"}
										alt={`${publication.publicationName} - Logo`}
										className="footer-logo"
										width={86}
										height={86}
									/>
								</Link>
							</div>
							{/* End of .brand-logo-container */}
						</div>
						{/* End of .col-md-6 */}
						<div className="col-md-auto">
							<div className="footer-social-share-wrapper">
								<div className="footer-social-share">
									<div className="axil-social-title">Unde ne gasesti</div>
									<ul className="social-share social-share__with-bg">
										<li>
											<a href="https://web.facebook.com/profile.php?id=61560279465691">
												<i className={SocialLink.fb.icon} />
											</a>
										</li>
										<li>
											<a href={SocialLink.twitter.url}>
												<i className={SocialLink.twitter.icon} />
											</a>
										</li>
									</ul>
								</div>
							</div>
							{/* End of .footer-social-share-wrapper */}
						</div>
						{/* End of .col-md-6 */}
					</div>
					{/* End of .row */}
				</div>
				{/* End of .footer-mid */}
				<div className="footer-bottom">
					{/* End of .footer-bottom-links */}
					<ul id="menu-footer-bottom-menu" className="footer-bottom-links">
						<li>
							<Link href="/reteaua-weboratory">Rețeaua Weboratory</Link>
						</li>
						<li>
							<Link href="/termeni-si-conditii">Termeni și Condiții de utilizare</Link>
						</li>
						<li>
							<Link href="/gdpr">Politica de Confidențialitate (GDPR)</Link>
						</li>
						<li>
							<Link href="/cookies">Politica de Cookies</Link>
						</li>
					</ul>
					<p className="axil-copyright-txt">
						© {new Date().getFullYear()}. Site realizat de Weboratory Capital. - Acest site utilizează tehnologii AI pentru generarea și procesarea conținutului. Pot exista erori. Informațiile sunt oferite ca atare.
					</p>
				</div>
				{/* End of .footer-bottom */}
			</div>
			{/* End of .container */}
		</footer>
	);
};

export default FooterOne;

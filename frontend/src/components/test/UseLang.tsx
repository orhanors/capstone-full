import React from "react";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
const UseLang = () => {
	const { t } = useTranslation();
	return (
		<div>
			<nav>
				<div className='navbar-brand'>
					<a className='navbar-item' href='/'>
						<strong>{t("parent.app_name")}</strong>
					</a>
					<p>{t("hello_user", { user: "Orhan" })}</p>
				</div>

				{/* If we want to use html we can use trans */}
				<Trans i18nKey='footer'>
					Demo for a <a href='https://phrase.com/blog'>Phrase blog</a>{" "}
					article.
					<br />
					Created with React, i18next, and Bulma.
				</Trans>
			</nav>
		</div>
	);
};

export default UseLang;

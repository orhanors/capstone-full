import React from "react";
import { useTranslation } from "react-i18next";
import { withTranslation, WithTranslation } from "react-i18next";
const Test: React.FC<WithTranslation> = (props) => {
	const { t } = useTranslation();
	return (
		<div>
			<h1>{t("app_name")}</h1>
		</div>
	);
};

export default withTranslation()(Test);

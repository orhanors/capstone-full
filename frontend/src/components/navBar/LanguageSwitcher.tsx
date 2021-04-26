import React, { ForwardRefRenderFunction } from "react";
import { useTranslation } from "react-i18next";
import "./language.scss";
import EnFlag from "../../assets/imgs/en.svg";
import TrFlag from "../../assets/imgs/tr.svg";

interface Props {
	ref: React.MutableRefObject<HTMLDivElement>;
}
const LanguageSwitcher: ForwardRefRenderFunction<HTMLDivElement, Props> = (
	props
) => {
	const { i18n } = useTranslation();
	const handleLanguageChange = (e: any) => {
		i18n.changeLanguage(e.target.id);
	};

	return (
		<div ref={props.ref} className='language-container'>
			<ul>
				<li id='en' onClick={handleLanguageChange}>
					<img src={EnFlag} alt='flag' /> English
				</li>
				<li id='tr' onClick={handleLanguageChange}>
					<img src={TrFlag} alt='flag' /> Türkçe
				</li>
			</ul>
		</div>
	);
};

export default LanguageSwitcher;

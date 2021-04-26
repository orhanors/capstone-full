import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/imgs/logo.png";
import FacebookLogo from "../../assets/icons/FacebookLogo";
import InstagramLogo from "../../assets/icons/InstagramLogo";
import SearchIcon from "../../assets/icons/SearchIcon";
import UserIcon from "../../assets/icons/UserIcon";
import CartIcon from "../../assets/icons/CartIcon";
import { FaBars } from "react-icons/fa";
import "./navbar.scss";
import ProductsSidebar from "../productsSidebar/ProductsSidebar";
import { useDispatch } from "react-redux";
import { setProductSidebar } from "../../store/productSidebar/productSide";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import { setSearchSidebar } from "../../store/searchSidebar/searchSide";
import SearchSidebar from "../searchSidebar/SearchSidebar";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { BsChevronCompactDown, BsChevronCompactRight } from "react-icons/bs";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import EnFlag from "../../assets/imgs/en.svg";
import TrFlag from "../../assets/imgs/tr.svg";
import { isAuthUser } from "../../utils/auth";
import { useHistory, Link } from "react-router-dom";
import CommonDropdown from "../_common/dropdown/CommonDropdown";
import { USER_PAGES, SELLER_PAGES } from "../../utils/userPages";
import { logout } from "../../store/user/user";
function NavBar() {
	const history = useHistory();
	const { i18n, t } = useTranslation();
	const dispatch = useDispatch();

	const [showLanguages, setShowLanguages] = useState(false);
	const { productSidebar, searchSidebar, user } = useSelector(
		(store) => store
	);
	const navRef = useRef<HTMLDivElement>(null);
	const langSwitcherRef = useRef(null);
	const iconColor = "gray";
	const [userHovered, setUserHovered] = useState(false);
	const [productHovered, setProductHovered] = useState(false);
	const handleResponsive = () => {
		if (
			navRef.current!.className ===
			"nav-container d-flex justify-content-between"
		) {
			navRef.current!.classList.add("responsive");
		} else {
			navRef.current!.className =
				"nav-container d-flex justify-content-between";
		}
	};

	const handleUserRoute = () => {
		if (!isAuthUser()) {
			history.push("/login");
		}
	};

	const handleLogout = () => {
		dispatch(logout());
		setUserHovered(false);
	};

	useEffect(() => {
		if (!isAuthUser()) {
			history.push("/login");
		}
	}, [user.data.name]);
	const getDropdown = (dropdownEntries: any) => {
		return (
			<CommonDropdown>
				<ul>
					{Object.entries(dropdownEntries).map(
						([key, value]: [key: any, value: any]) => {
							const link =
								value.split(" ")[0].toLowerCase() +
								value.split(" ").splice(1, 1).join("");

							return (
								<li key={key + value}>
									{" "}
									<Link to={link}>{value}</Link>{" "}
								</li>
							);
						}
					)}

					<li onClick={handleLogout}>Log out</li>
				</ul>
			</CommonDropdown>
		);
	};
	useOnClickOutside(langSwitcherRef, () => setShowLanguages(false));
	return (
		<>
			{
				//@ts-ignore
				showLanguages && <LanguageSwitcher ref={langSwitcherRef} />
			}
			<div
				ref={navRef}
				className='nav-container container d-flex justify-content-between'>
				<div className='nav-portion d-flex justify-content-between'>
					<span className='nav-icon mx-2'>
						<FacebookLogo color={iconColor} />
					</span>
					<span className='nav-icon mx-2'>
						<InstagramLogo color={iconColor} />
					</span>

					<span
						className='nav-icon mx-2'
						onClick={() => setShowLanguages(!showLanguages)}>
						<img
							alt='lng'
							className='flag mb-1 mr-1'
							src={i18n.language === "en" ? EnFlag : TrFlag}
						/>{" "}
						{i18n.language}{" "}
						<span className='dropdown-arrow'>
							{showLanguages ? (
								<BsChevronCompactDown />
							) : (
								<BsChevronCompactRight />
							)}
						</span>{" "}
					</span>
				</div>
				<div className='nav-portion d-flex align-items-center justify-content-center'>
					<Link to='/products' className='nav-item-text mx-3 grow'>
						{t("navbar.products")}
					</Link>
				</div>

				<div className='nav-portion d-flex align-items-center justify-content-center'>
					<Link to='/about' className='nav-item-text mx-3 grow'>
						{t("navbar.about")}
					</Link>
				</div>
				<div className='nav-portion d-flex justify-content-between'>
					<Link to='/'>
						<img className='logo' alt='logo' src={Logo} />
					</Link>
				</div>
				<div className='nav-portion d-flex justify-content-between mt-1'>
					<Link to='/blog' className='nav-item-text mx-3 grow'>
						{t("navbar.blog")}
					</Link>
					<Link to='/contact' className='nav-item-text mx-3 grow'>
						{t("navbar.contact")}
					</Link>
				</div>
				<div className='nav-portion d-flex justify-content-between mt-3'>
					<span
						onClick={() => dispatch(setSearchSidebar())}
						className='nav-icon mx-2'>
						<SearchIcon color={iconColor} />
					</span>
					<span
						onClick={handleUserRoute}
						onMouseOver={() => setUserHovered(true)}
						onMouseLeave={() => setUserHovered(false)}
						className='nav-icon mx-2'>
						<UserIcon color={iconColor} />
						{userHovered && (
							<span>
								{user.data.role &&
									getDropdown(
										user.data.role === "seller"
											? SELLER_PAGES
											: USER_PAGES
									)}
							</span>
						)}
					</span>
					<span
						onClick={() => dispatch(setProductSidebar())}
						className='cart-icon nav-icon mx-2'>
						<CartIcon color={iconColor} />
					</span>
				</div>
				{productSidebar && <ProductsSidebar />}
				{searchSidebar && <SearchSidebar />}
				<span
					onClick={handleResponsive}
					className='nav-icon nav-toggle-icon mx-2'>
					<FaBars color={iconColor} />
				</span>
			</div>
		</>
	);
}

export default NavBar;

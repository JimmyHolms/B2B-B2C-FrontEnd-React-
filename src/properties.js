export const search_engine_id = "010585577490472451097:cei9kfj3qpa";
export const google_api_key = "AIzaSyANwmDtmwFNbT9G1YEQztPIUScdsxsP1cE";

let baseUrl = "";

export const meveo_path = "/meveo";
export const provider = "DEMO";

export const wiki_url = "https://app.assembla.com/spaces/meveo/wiki";
export const community_url = "https://app.assembla.com/spaces/meveo/messages";
export const about_url = "/about";

export const index_url = baseUrl + "/";
export const faq_url = baseUrl + "/faq";
export const email_verification_url = baseUrl + "/email-verification";
export const how_it_works_url = baseUrl + "/how-it-works";
export const signin_url = baseUrl + "/signin";
export const signup_url = baseUrl + "/signup";
export const create_client_url = baseUrl + "/signup/create-client";
export const forgot_password_url = baseUrl + "/forgot-password";
export const reset_password_url = baseUrl + "/reset-password";
export const contact_url = baseUrl + "/contact";

export const dashboard_url = baseUrl + "/client/dashboard";
export const search_url = baseUrl + "/client/search";
export const client_profil_url = baseUrl + "/client/profil";
export const my_usage_url = baseUrl + "/client/myusage";
export const my_offers_url = baseUrl + "/client/myOffers";
export const my_bills_url = baseUrl + "/client/myBills";
export const my_options_url = baseUrl + "/client/myOptions";
export const my_account_url = baseUrl + "/client/myAccount";
export const available_offers_url = baseUrl + "/client/offers";
export const offer_cancellation_url = baseUrl + "/client/offer-cancellation";
export const follow_order_url = baseUrl + "/client/follow-order";

export const termination_reason = "TERM_REASON_1";

export function list_languages() {
	var langList = ["FRA", "ENG"];
	return langList;
}

export const list_civilities = ["M", "MLLES", "MLLE", "MM", "MME", "MMES"];

export const list_payment_methods = ["CHECK", "DIRECTDEBIT", "TIP", "WIRETRANSFER", "CARD"];

export const list_countries = [{
		code: "AF",
		description: "Afghanistan"
	}, {
		code: "AL",
		description: "Albania"
	}, {
		code: "DZ",
		description: "Algeria"
	}, {
		code: "AS",
		description: "American Samoa"
	}, {
		code: "AD",
		description: "Andorra"
	}, {
		code: "AO",
		description: "Angola"
	}, {
		code: "AI",
		description: "Anguilla"
	}, {
		code: "AG",
		description: "Antigua and Barbuda"
	}, {
		code: "AR",
		description: "Argentina"
	}, {
		code: "AM",
		description: "Armenia"
	}, {
		code: "AW",
		description: "Aruba"
	}, {
		code: "AU",
		description: "Australia"
	}, {
		code: "AT",
		description: "Austria"
	}, {
		code: "AZ",
		description: "Azerbaijan"
	}, {
		code: "BH",
		description: "Bahrain"
	}, {
		code: "BD",
		description: "Bangladesh"
	}, {
		code: "BB",
		description: "Barbados"
	}, {
		code: "BY",
		description: "Belarus"
	}, {
		code: "BE",
		description: "Belgium"
	}, {
		code: "BZ",
		description: "Belize"
	}, {
		code: "BJ",
		description: "Benin"
	}, {
		code: "BM",
		description: "Bermuda"
	}, {
		code: "BT",
		description: "Bhutan"
	}, {
		code: "BO",
		description: "Bolivia"
	}, {
		code: "BA",
		description: "Bosnia and Herzegovina"
	}, {
		code: "BW",
		description: "Botswana"
	}, {
		code: "BV",
		description: "Bouvet Island"
	}, {
		code: "BR",
		description: "Brazil"
	}, {
		code: "IO",
		description: "British Indian Ocean Territory"
	}, {
		code: "VG",
		description: "British Virgin Islands"
	}, {
		code: "BN",
		description: "Brunei Darussalam"
	}, {
		code: "BG",
		description: "Bulgaria"
	}, {
		code: "BF",
		description: "Burkina Faso"
	}, {
		code: "MM",
		description: "Burma"
	}, {
		code: "BI",
		description: "Burundi"
	}, {
		code: "KH",
		description: "Cambodia"
	}, {
		code: "CM",
		description: "Cameroun"
	}, {
		code: "CA",
		description: "Canada"
	}, {
		code: "CV",
		description: "Cape Verde"
	}, {
		code: "KY",
		description: "Cayman Islands"
	}, {
		code: "CF",
		description: "Central African Republic"
	}, {
		code: "TD",
		description: "Chad"
	}, {
		code: "CL",
		description: "Chile"
	}, {
		code: "CN",
		description: "China"
	}, {
		code: "CX",
		description: "Christmas Island"
	}, {
		code: "CC",
		description: "Cocos (Keeling) Islands"
	}, {
		code: "CO",
		description: "Colombia"
	}, {
		code: "KM",
		description: "Comoros"
	}, {
		code: "CD",
		description: "Congo, Democratic Republic of th"
	}, {
		code: "CG",
		description: "Congo, Republic of the"
	}, {
		code: "CK",
		description: "Cook Islands"
	}, {
		code: "CR",
		description: "Costa Rica"
	}, {
		code: "CI",
		description: "Cote Ivoire"
	}, {
		code: "HR",
		description: "Croatia"
	}, {
		code: "CU",
		description: "Cuba"
	}, {
		code: "CY",
		description: "Cyprus"
	}, {
		code: "CZ",
		description: "Czech Republic"
	}, {
		code: "DK",
		description: "Danemark"
	}, {
		code: "DJ",
		description: "Djibouti"
	}, {
		code: "DM",
		description: "Dominica"
	}, {
		code: "DO",
		description: "Dominican Republic"
	}, {
		code: "TL",
		description: "East timor"
	}, {
		code: "EC",
		description: "Ecuador"
	}, {
		code: "EG",
		description: "Egypt"
	}, {
		code: "SV",
		description: "El Salvador"
	}, {
		code: "GQ",
		description: "Equatorial Guinea"
	}, {
		code: "ER",
		description: "Eritrea"
	}, {
		code: "EE",
		description: "Estonia"
	}, {
		code: "ET",
		description: "Ethiopia"
	}, {
		code: "FK",
		description: "Falkland Islands (Islas Malvinas)"
	}, {
		code: "FO",
		description: "Faroe Islands"
	}, {
		code: "FJ",
		description: "Fiji"
	}, {
		code: "FI",
		description: "Finland"
	}, {
		code: "FR",
		description: "France"
	}, {
		code: "GR",
		description: "French Guiana"
	}, {
		code: "PF",
		description: "French Polynesia"
	}, {
		code: "TF",
		description: "French Southern and Antarctic La"
	}, {
		code: "GA",
		description: "Gabon"
	}, {
		code: "GE",
		description: "Georgia"
	}, {
		code: "DE",
		description: "Germany"
	}, {
		code: "GH",
		description: "Ghana"
	}, {
		code: "GI",
		description: "Gibraltar"
	}, {
		code: "GR",
		description: "Greece"
	}, {
		code: "GL",
		description: "Greenland"
	}, {
		code: "GD",
		description: "Grenada"
	}, {
		code: "GP",
		description: "Guadeloupe"
	}, {
		code: "GU",
		description: "Guam"
	}, {
		code: "GT",
		description: "Guatemala"
	}, {
		code: "GN",
		description: "Guinea"
	}, {
		code: "GW",
		description: "Guinea-Bissau"
	}, {
		code: "GY",
		description: "Guyana"
	}, {
		code: "HT",
		description: "Haiti"
	}, {
		code: "HM",
		description: "Heard Island and McDonald Island"
	}, {
		code: "VA",
		description: "Holy See Vatican City"
	}, {
		code: "HN",
		description: "Honduras"
	}, {
		code: "HK",
		description: "Hong Kong (SAR)"
	}, {
		code: "HU",
		description: "Hungary"
	}, {
		code: "IS",
		description: "Iceland"
	}, {
		code: "IN",
		description: "India"
	}, {
		code: "ID",
		description: "Indonesia"
	}, {
		code: "IR",
		description: "Iran"
	}, {
		code: "IQ",
		description: "Iraq"
	}, {
		code: "IE",
		description: "Ireland"
	}, {
		code: "IL",
		description: "Israel"
	}, {
		code: "IT",
		description: "Italy"
	}, {
		code: "JM",
		description: "Jamaica"
	}, {
		code: "JP",
		description: "Japan"
	}, {
		code: "JO",
		description: "Jordan"
	}, {
		code: "KZ",
		description: "Kazakhstan"
	}, {
		code: "KE",
		description: "Kenya"
	}, {
		code: "KI",
		description: "Kiribati"
	}, {
		code: "KP",
		description: "Korea, North"
	}, {
		code: "KR",
		description: "Korea, South"
	}, {
		code: "KW",
		description: "Kuwait"
	}, {
		code: "KG",
		description: "Kyrgyzstan"
	}, {
		code: "LA",
		description: "Laos"
	}, {
		code: "LV",
		description: "Latvia"
	}, {
		code: "LB",
		description: "Lebanon"
	}, {
		code: "LS",
		description: "Lesotho"
	}, {
		code: "LR",
		description: "Liberia"
	}, {
		code: "LY",
		description: "Libya"
	}, {
		code: "LI",
		description: "Liechtenstein"
	}, {
		code: "LT",
		description: "Lithuania"
	}, {
		code: "LU",
		description: "Luxembourg"
	}, {
		code: "MO",
		description: "Macao"
	}, {
		code: "MK",
		description: "Macedonia, The Former Yugoslav R"
	}, {
		code: "MG",
		description: "Madagascar"
	}, {
		code: "MW",
		description: "Malawi"
	}, {
		code: "MY",
		description: "Malaysia"
	}, {
		code: "MV",
		description: "Maldives"
	}, {
		code: "ML",
		description: "Mali"
	}, {
		code: "MT",
		description: "Malta"
	}, {
		code: "MH",
		description: "Marshall Islands"
	}, {
		code: "MQ",
		description: "Martinique"
	}, {
		code: "MR",
		description: "Mauritania"
	}, {
		code: "MU",
		description: "Mauritius"
	}, {
		code: "YT",
		description: "Mayotte"
	}, {
		code: "MX",
		description: "Mexico"
	}, {
		code: "FM",
		description: "Micronesia, Federated States of"
	}, {
		code: "MD",
		description: "Moldova"
	}, {
		code: "MC",
		description: "Monaco"
	}, {
		code: "MN",
		description: "Mongolia"
	}, {
		code: "MS",
		description: "Montserrat"
	}, {
		code: "MA",
		description: "Morocco"
	}, {
		code: "MZ",
		description: "Mozambique"
	}, {
		code: "NA",
		description: "Namibia"
	}, {
		code: "NR",
		description: "Nauru"
	}, {
		code: "NP",
		description: "Nepal"
	}, {
		code: "NL",
		description: "Netherlands"
	}, {
		code: "AN",
		description: "Netherlands Antilles"
	}, {
		code: "NC",
		description: "New Caledonia"
	}, {
		code: "NZ",
		description: "New Zealand"
	}, {
		code: "NI",
		description: "Nicaragua"
	}, {
		code: "NE",
		description: "Niger"
	}, {
		code: "NG",
		description: "Nigeria"
	}, {
		code: "NU",
		description: "Niue"
	}, {
		code: "NF",
		description: "Norfolk Island"
	}, {
		code: "MP",
		description: "Northern Mariana Islands"
	}, {
		code: "NO",
		description: "Norway"
	}, {
		code: "OM",
		description: "Oman"
	}, {
		code: "PK",
		description: "Pakistan"
	}, {
		code: "PW",
		description: "Palau"
	}, {
		code: "PS",
		description: "Palestinian Territory, Occupied"
	}, {
		code: "PA",
		description: "Panama"
	}, {
		code: "PG",
		description: "Papua New Guinea"
	}, {
		code: "PY",
		description: "Paraguay"
	}, {
		code: "PE",
		description: "Peru"
	}, {
		code: "PH",
		description: "Philippines"
	}, {
		code: "PN",
		description: "Pitcairn Islands"
	}, {
		code: "PL",
		description: "Poland"
	}, {
		code: "PT",
		description: "Portugal"
	}, {
		code: "PR",
		description: "Puerto Rico"
	}, {
		code: "QA",
		description: "Qatar"
	}, {
		code: "RO",
		description: "Romania"
	}, {
		code: "RU",
		description: "Russia"
	}, {
		code: "RW",
		description: "Rwanda"
	}, {
		code: "RE",
		description: "Réunion"
	}, {
		code: "SH",
		description: "Saint Helena"
	}, {
		code: "KN",
		description: "Saint Kitts and Nevis"
	}, {
		code: "LC",
		description: "Saint Lucia"
	}, {
		code: "PM",
		description: "Saint Pierre and Miquelon"
	}, {
		code: "VC",
		description: "Saint Vincent and Grenadines"
	}, {
		code: "WS",
		description: "Samoa"
	}, {
		code: "SM",
		description: "San Marino"
	}, {
		code: "SA",
		description: "Saudi Arabia"
	}, {
		code: "SN",
		description: "Senegal"
	}, {
		code: "SC",
		description: "Seychelles"
	}, {
		code: "SL",
		description: "Sierra Leone"
	}, {
		code: "SG",
		description: "Singapore"
	}, {
		code: "SK",
		description: "Slovakia"
	}, {
		code: "SI",
		description: "Slovenia"
	}, {
		code: "SB",
		description: "Solomon Islands"
	}, {
		code: "SO",
		description: "Somalia"
	}, {
		code: "ZA",
		description: "South Africa"
	}, {
		code: "GS",
		description: "South Georgia and the South Sand"
	}, {
		code: "ES",
		description: "Spain"
	}, {
		code: "LK",
		description: "Sri Lanka"
	}, {
		code: "SD",
		description: "Sudan"
	}, {
		code: "SR",
		description: "Suriname"
	}, {
		code: "SJ",
		description: "Svalbard"
	}, {
		code: "SZ",
		description: "Swaziland"
	}, {
		code: "SE",
		description: "Sweden"
	}, {
		code: "CH",
		description: "Switzerland"
	}, {
		code: "SY",
		description: "Syria"
	}, {
		code: "ST",
		description: "São Tomé and Príncipe"
	}, {
		code: "TW",
		description: "Taiwan"
	}, {
		code: "TJ",
		description: "Tajikistan"
	}, {
		code: "TZ",
		description: "Tanzania"
	}, {
		code: "TH",
		description: "Thailand"
	}, {
		code: "BS",
		description: "The Bahamas"
	}, {
		code: "GM",
		description: "The Gambia"
	}, {
		code: "TG",
		description: "Togo"
	}, {
		code: "TK",
		description: "Tokelau"
	}, {
		code: "TO",
		description: "Tonga"
	}, {
		code: "TT",
		description: "Trinidad and Tobago"
	}, {
		code: "TN",
		description: "Tunisia"
	}, {
		code: "TR",
		description: "Turkey"
	}, {
		code: "TM",
		description: "Turkmenistan"
	}, {
		code: "TC",
		description: "Turks and Caicos Islands"
	}, {
		code: "TV",
		description: "Tuvalu"
	}, {
		code: "UG",
		description: "Uganda"
	}, {
		code: "UA",
		description: "Ukraine"
	}, {
		code: "AE",
		description: "United Arab Emirates"
	}, {
		code: "GB",
		description: "United Kingdom"
	}, {
		code: "US",
		description: "United States"
	}, {
		code: "UM",
		description: "United States Minor Outlying Isl"
	}, {
		code: "UY",
		description: "Uruguay"
	}, {
		code: "UZ",
		description: "Uzbekistan"
	}, {
		code: "VU",
		description: "Vanuatu"
	}, {
		code: "VE",
		description: "Venezuela"
	}, {
		code: "VN",
		description: "Vietnam"
	}, {
		code: "VI",
		description: "Virgin Islands"
	}, {
		code: "WF",
		description: "Wallis and Futuna"
	}, {
		code: "YE",
		description: "Yemen"
	}, {
		code: "YU",
		description: "Yugoslavia"
	}, {
		code: "ZM",
		description: "Zambia"
	}, {
		code: "ZW",
		description: "Zimbabwe"
	}];

// Offer methods
export const FETCH_OFFERS = "FETCH_OFFERS";

// Subscription methods
export const FETCH_SUBSCRIPTIONS = "FETCH_SUBSCRIPTIONS";
export const FETCH_SUBSCRIPTION_BY_CODE = "FETCH_SUBSCRIPTION_BY_CODE";
export const SUBSCRIPTION_CREATE = "SUBSCRIPTION_CREATE";
export const SUBSCRIPTION_TERMINATE = "SUBSCRIPTION_TERMINATE";

// Customer methods
export const GET_CURRENT_CUSTOMER = "GET_CURRENT_CUSTOMER";
export const LOGIN_USER = "LOGIN_USER";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const SIGNUP_CUSTOMER = "SIGNUP_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const LOGOUT_CURRENT_CUSTOMER = "LOGOUT_CURRENT_CUSTOMER"
export const UPDATE_USER = "UPDATE_USER";

//Billing Account methods
export const FETCH_BILLINGACCOUNT = "FETCH_BILLINGACCOUNT";
// Usage methods
export const FETCH_MYUSAGES = "FETCH_MYUSAGES";
export const FETCH_USAGESLIST = "FETCH_USAGESLIST";
// Bill methods
export const FETCH_MYINVOICE = "FETCH_MYINVOICE";
export const FETCH_MYINVOICES = "FETCH_MYINVOICES";
export const FETCH_PAYMENTS = "FETCH_PAYMENTS";

//Payment methods
export const CREATE_NEWPAYMENT ="CREATE_NEWPAYMENT";
// Service methods
export const SERVICE_SUBSCRIBE = "SERVICE_SUBSCRIBE";
export const SERVICE_TERMINATE = "SERVICE_TERMINATE";

// Service Details methods
export const FETCH_INCOMPATIBLE_SERVICE_DETAILS = "FETCH_INCOMPATIBLE_SERVICE_DETAILS";

// Termination Reasons methods
export const TERMINATION_REASONS_LIST = "TERMINATION_REASONS_LIST";

// Order Tracking methods
export const TRACK_ORDER = "TRACK_ORDER";
export const LIST_PENDING_ORDERS = "LIST_PENDING_ORDERS";



export function startMethod(actionMethod) {
	return actionMethod + '_START';
}

export function successMethod(actionMethod) {
	return actionMethod + '_SUCCESS';
}

export function errorMethod(actionMethod) {
	return actionMethod + '_ERROR';
}

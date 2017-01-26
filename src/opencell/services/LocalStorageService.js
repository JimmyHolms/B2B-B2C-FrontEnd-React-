import Store from 'store';
import SelfCareError from '../SelfCareError';

class LocalStorageService {
	constructor(){
		if(!Store.enabled){
			throw new SelfCareError('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
		}
	}

	get(key, defaultValue) {
		return Store.get(key, defaultValue);
	}

	set(key, value) {
		Store.set(key, value);
	}

	remove(key) {
		Store.remove(key);
	}

	getCurrentCustomer() {
		return this.get("currentCustomer");
	}

	setCurrentCustomer(customer, credentials) {
		this.set("currentCustomer", customer);
		this.setCredentials(credentials);
	}
	getGuestOffer()
	{
		return this.get("currentGuestOffer");
	}
	setGuestOffer(offer)
	{
		this.set("currentGuestOffer",offer);
	}
	getGuestServices()
	{
		return this.get("currentGuestServices");
	}
	setGuestSerivces(services)
	{
		this.set("currentGuestServices",services);
	}

	getCredentials() {
		return this.get("credentials");
	}

	setCredentials(credentials) {
		return this.set("credentials", btoa(credentials.username + ":" + credentials.password));
	}
		
	getSelfCredentials() {
		return btoa("selfcare.default:selfcare.default");
	}	

	removeGuestOfferInfo(){
		this.remove("currentGuestOffer");
		this.remove("currentGuestServices");
	}

	removeCurrentCustomer() {
		this.remove("currentCustomer");
		this.remove("credentials");
	}
}

const localStorageService = new LocalStorageService();

export default localStorageService;
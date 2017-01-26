import Action from './Action';
import * as ActionMethods from './ActionMethods';
import CatalogManagementService from '../services/CatalogManagementService';
import OfferService from '../services/OfferService';
import Offer from '../model/catalog/Offer';
import LocalStorageService from '../services/LocalStorageService';

export function fetchOffers() {
	const action = new Action(ActionMethods.FETCH_OFFERS, function () {
		let offerList = [];
		CatalogManagementService.listOffers().then(result => {
			const offerPromises = [];
			result.map(offer => offerPromises.push(OfferService.find(offer.id)));
			return Promise.all(offerPromises);
		}).then(offers => {
			offers = offers || [];
			offers.map(offerDto => {
				const {actionStatus} = offerDto;
				if (actionStatus == null || actionStatus.status === "FAIL") {
					this.fail(actionStatus);
				} else {
					offerList.push(new Offer(offerDto));
				}
			});
			this.success(offerList);
		}).catch(error => {
			this.fail(error);
		});
	});

	action.execute();
}

export function setOfflineOffer(offer,services)
{
	LocalStorageService.setGuestOffer(offer);
	LocalStorageService.setGuestSerivces(services);
}

export function getOfflineOffer()
{
	let guestOffer={"offer":{},"services":[]};
	const currentGuestOffer = LocalStorageService.getGuestOffer();
	if(currentGuestOffer)
	{
		guestOffer.offer = currentGuestOffer;
		guestOffer.services = LocalStorageService.getGuestServices();
		LocalStorageService.removeGuestOfferInfo();
		return guestOffer;
	}
	return "";
}
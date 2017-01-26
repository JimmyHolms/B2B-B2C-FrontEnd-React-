export default class Guest {
	constructor(guest) {
		guest = guest || {}

		this.username = guest.username || '';
		this.email = guest.email || '';
		this.password = guest.password || '';
		this.name = guest.name ||{title: '', firstName:'', lastName:''};
	}
}

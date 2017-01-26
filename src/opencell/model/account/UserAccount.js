export default class UserAccount {
    constructor(billingAccount) {
        billingAccount = billingAccount || {};

        const { userAccounts = {} } = billingAccount;
        const { userAccount = [] } = userAccounts || {};
        const activeUserAccountsList = userAccount.filter( ua => ua.status === 'ACTIVE' );
        const newestStatusDate = Math.max.apply(Math, activeUserAccountsList.map( ua => ua.statusDate ));
        const userAccountDetails = activeUserAccountsList.find( ua => ua.statusDate === newestStatusDate ) || {};

        this.code = userAccountDetails.code;
        this.description = userAccountDetails.description;
        this.externalRef1 = userAccountDetails.externalRef1;
        this.externalRef2 = userAccountDetails.externalRef2;
        this.name = userAccountDetails.name;
        this.address = userAccountDetails.address;
        this.customFields = userAccountDetails.customFields;
        this.billingAccount = userAccountDetails.billingAccount;
        this.subscriptionDate = userAccountDetails.subscriptionDate;
        this.terminationDate = userAccountDetails.terminationDate;
        this.status = userAccountDetails.status;
        this.statusDate = userAccountDetails.statusDate;
        this.terminationReason = userAccountDetails.terminationReason;
        this.subscriptions = [];
    }

}
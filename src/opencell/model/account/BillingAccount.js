import UserAccount from './UserAccount';

export default class BillingAccount {
    constructor(customerAccount) {
        customerAccount = customerAccount || {};

        const { billingAccounts = {} } = customerAccount;
        const { billingAccount = [] } = billingAccounts || {};
        const activeBillingAccountList = billingAccount.filter( ba => ba.status === 'ACTIVE' );
        const newestStatusDate = Math.max.apply(Math, activeBillingAccountList.map( ba => ba.statusDate ));
        const billingAccountDetails = activeBillingAccountList.find( ba => ba.statusDate === newestStatusDate ) || {};

        this.code = billingAccountDetails.code;
        this.description = billingAccountDetails.description;
        this.externalRef1 = billingAccountDetails.externalRef1;
        this.externalRef2 = billingAccountDetails.externalRef2;
        this.name = billingAccountDetails.name;
        this.address = billingAccountDetails.address;
        this.customFields = billingAccountDetails.customFields;
        this.customerAccount = billingAccountDetails.customerAccount;
        this.billingCycle = billingAccountDetails.billingCycle;
        this.country = billingAccountDetails.country;
        this.language = billingAccountDetails.language;
        this.paymentMethod = billingAccountDetails.paymentMethod;
        this.nextInvoiceDate = billingAccountDetails.nextInvoiceDate;
        this.subscriptionDate = billingAccountDetails.subscriptionDate;
        this.terminationDate = billingAccountDetails.terminationDate;
        this.paymentTerms = billingAccountDetails.paymentTerms;
        this.electronicBilling = billingAccountDetails.electronicBilling;
        this.status = billingAccountDetails.status;
        this.statusDate = billingAccountDetails.statusDate;
        this.terminationReason = billingAccountDetails.terminationReason;
        this.email = billingAccountDetails.email;
        this.bankCoordinates = billingAccountDetails.bankCoordinates;
        this.invoices = billingAccountDetails.invoices;
        this.userAccount = new UserAccount(billingAccountDetails);

    }

}
import BillingAccount from './BillingAccount';

export default class CustomerAccount {
    constructor(customer) {
        customer = customer || {};

        if (customer.code == null || customer.code.trim() === '') {
            throw new SelfCareError("Customer code is invalid.");
        }

        const { customerAccounts = {} } = customer;
        const { customerAccount = [] } = customerAccounts || {};
        const activeCustomerAccountList = customerAccount.filter( ca => ca.status === 'ACTIVE' );
        const newestStatusDate = Math.max.apply(Math, activeCustomerAccountList.map( ca => ca.dateStatus ));
        const customerAccountDetails = activeCustomerAccountList.find( ca => ca.dateStatus === newestStatusDate ) || {};

        this.code = customerAccountDetails.code;
        this.description = customerAccountDetails.description;
        this.externalRef1 = customerAccountDetails.externalRef1;
        this.externalRef2 = customerAccountDetails.externalRef2;
        this.name = customerAccountDetails.name;
        this.address = customerAccountDetails.address;
        this.customFields = customerAccountDetails.customFields;
        this.customer = customerAccountDetails.customer;
        this.currency = customerAccountDetails.currency;
        this.language = customerAccountDetails.language;
        this.status = customerAccountDetails.status;
        this.paymentMethod = customerAccountDetails.paymentMethod;
        this.creditCategory = customerAccountDetails.creditCategory;
        this.dateStatus = customerAccountDetails.dateStatus;
        this.dateDunningLevel = customerAccountDetails.dateDunningLevel;
        this.contactInformation = customerAccountDetails.contactInformation;
        this.dunningLevel = customerAccountDetails.dunningLevel;
        this.mandateIdentification = customerAccountDetails.mandateIdentification;
        this.mandateDate = customerAccountDetails.mandateDate;
        this.balance = customerAccountDetails.balance;
        this.terminationDate = customerAccountDetails.terminationDate;
        this.billingAccount = new BillingAccount(customerAccountDetails);

    }

}
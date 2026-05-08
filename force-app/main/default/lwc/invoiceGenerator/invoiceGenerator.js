import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveInvoice from '@salesforce/apex/InvoiceController.saveInvoice';
import { LightningElement } from 'lwc';

export default class InvoiceGenerator extends NavigationMixin(LightningElement) {

    opportunityId = '';

    isStep1 = true;
    isStep2 = false;

    lineItems = [
    { id: 1, product: '', quantity: 0, price: 0 }
   ];

    handleChange(event) {
        this.opportunityId = event.target.value;
    }

    handleClick() {
        if (!this.opportunityId) {
            alert('Please Enter Opportunity Id');
            return;
        }

        this.isStep1 = false;
        this.isStep2 = true;
    }

    goBack() {
        this.isStep1 = true;
        this.isStep2 = false;
    }
    get totalAmount() {
    let total = 0;

    this.lineItems.forEach(item => {
        const qty = parseFloat(item.quantity) || 0;
        const price = parseFloat(item.price) || 0;

        total += qty * price;
    });
     return total;
    }
async saveInvoice() {

    try {

        const result = await saveInvoice({
            opportunityId: this.opportunityId,
            items: this.lineItems
        });

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Invoice Created Successfully',
                variant: 'success'
            })
        );

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: result,
                objectApiName: 'Invoice__c',
                actionName: 'view'
            }
        });

    } catch(error) {

        let message = 'Unknown error';

        if(error.body && error.body.message) {
            message = error.body.message;
        }

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: message,
                variant: 'error'
            })
        );
    }
}
downloadPdf() {

    let content = `
        <html>
        <head>
            <title>Invoice PDF</title>
        </head>
        <body>
            <h1>Invoice</h1>
            <hr/>

            <h3>Opportunity Id:</h3>
            <p>${this.opportunityId}</p>

            <h3>Line Items</h3>

            <table border="1" cellpadding="5" cellspacing="0">
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
    `;

    this.lineItems.forEach(item => {

        const total = item.quantity * item.price;

        content += `
            <tr>
                <td>${item.product}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
                <td>${total}</td>
            </tr>
        `;
    });

    content += `
            </table>

            <h2>Total Amount: ${this.totalAmount}</h2>

        </body>
        </html>
    `;

    const blob = new Blob([content], { type: 'application/pdf' });

    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);

    link.download = 'Invoice.pdf';

    link.click();
}
   addRow() {
    const newItem = {
        id: this.lineItems.length + 1,
        product: '',
        quantity: 0,   
        price: 0       
    };

    this.lineItems = [...this.lineItems, newItem];
}

handleItemChange(event) {

    const id = Number(event.target.dataset.id);
    const field = event.target.dataset.field;

    let value = event.target.value;

    if (field === 'quantity' || field === 'price') {
        value = value ? parseFloat(value) : 0;
    }

    this.lineItems = this.lineItems.map(item => {

        if (item.id === id) {

            return {
                ...item,
                [field]: value
            };
        }

        return item;
    });

    console.log(JSON.stringify(this.lineItems));
}
}
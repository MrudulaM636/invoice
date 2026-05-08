public with sharing class InvoiceController {

    @AuraEnabled
    public static Id saveInvoice(Id opportunityId, List<LineItemWrapper> items) {

        try {

            if (items == null || items.isEmpty()) {
                throw new AuraHandledException('No line items provided');
            }

            Invoice__c inv = new Invoice__c();
            inv.Name = 'Test Invoice';

            // inv.Opportunity__c = opportunityId;

            Decimal total = 0;

            for (LineItemWrapper item : items) {
                if (item != null && item.quantity != null && item.price != null) {
                    total += item.quantity * item.price;
                }
            }

            inv.Total_Amount__c = total;

            insert inv;

            List<Invoice_Line_Item__c> lineItems = new List<Invoice_Line_Item__c>();

            for (LineItemWrapper item : items) {

                Invoice_Line_Item__c li = new Invoice_Line_Item__c();

                li.Name = 'Line Item';

                li.Invoice__c = inv.Id;

                li.ProductName__c = item.product;

                li.Quantity__c = item.quantity;

                li.Price__c = item.price;

                lineItems.add(li);
            }

            insert lineItems;

            return inv.Id;

        } catch (Exception e) {

            throw new AuraHandledException(e.getMessage());
        }
    }
public class LineItemWrapper {

    @AuraEnabled
    public String product { get; set; }

    @AuraEnabled
    public Decimal quantity { get; set; }

    @AuraEnabled
    public Decimal price { get; set; }
}
}
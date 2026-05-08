Invoice Generator LWC
Overview

Invoice Generator is a Lightning Web Component (LWC) application developed in Salesforce to create Invoice records along with multiple Invoice Line Items dynamically from the UI.

The application allows users to:

Enter an Opportunity Id
Add multiple product line items
Calculate total invoice amount dynamically
Save Invoice and Invoice Line Items
Redirect to the created Invoice record page after successful creation
Features
Multi-step invoice creation flow
Dynamic Add Row functionality
Real-time total amount calculation
Salesforce Apex integration
Toast messages for success and error handling
Navigation to created Invoice record
Dynamic line item handling
Technologies Used
Salesforce Lightning Web Components (LWC)
Apex
JavaScript
HTML
Salesforce Custom Objects
Custom Objects Used
Invoice__c

Stores Invoice details.

Fields:

Name
Opportunity__c
TotalAmount__c
Invoice_Line_Item__c

Stores Invoice line items.

Fields:

ProductName__c
Quantity__c
Price__c
Invoice__c (Lookup to Invoice__c)
Apex Controller
InvoiceController.cls

Responsible for:

Creating Invoice record
Creating related Invoice Line Item records
Returning created Invoice Id
LWC Components
invoiceGenerator
HTML
Opportunity input
Dynamic line item form
Add Row button
Save Invoice button
JavaScript

Handles:

Dynamic row addition
Input handling
Total calculation
Apex method call
Navigation after save
Functional Flow
User enters Opportunity Id
User clicks Next
User adds line items
Total amount is calculated automatically
User clicks Save Invoice
Invoice and related line items are created
User is redirected to created Invoice record page
Deployment Steps
Deploy Apex Class
Deploy LWC Component
Add component to Lightning App/Page
Assign object permissions
Test functionality

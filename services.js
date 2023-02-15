"use strict";
exports.__esModule = true;
exports.Services = void 0;
var contactsArray_1 = require("./contactsArray");
var Services = /** @class */ (function () {
    function Services() {
    }
    Services.prototype.addContact = function (newPerson) {
        contactsArray_1.people.unshift(newPerson);
    };
    Services.prototype.deleteDetails = function (id) {
        var toDelete = this.getContactById(id);
        contactsArray_1.people.splice(contactsArray_1.people.indexOf(toDelete), 1);
    };
    Services.prototype.updateContact = function (id, editedContact) {
        var toEdit = this.getContactById(id);
        toEdit.name = editedContact.name;
        toEdit.email = editedContact.email;
        toEdit.mobile = editedContact.mobile;
        toEdit.landline = editedContact.landline;
        toEdit.website = editedContact.website;
        toEdit.address = editedContact.address;
    };
    Services.prototype.getContactById = function (id) {
        return contactsArray_1.people.find(function (contact) {
            return contact.id == id;
        });
    };
    return Services;
}());
exports.Services = Services;

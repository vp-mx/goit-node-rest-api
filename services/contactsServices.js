import Contact from "../db/models/Contact.js";

/**
 * Lists all contacts from the database.
 */
async function listContacts() {
  return await Contact.findAll();
}

/**
 * Gets a contact by its ID.
 */
async function getContactById(contactId) {
  return await Contact.findByPk(contactId);
}

/**
 * Removes a contact by its ID.
 */
async function removeContact(contactId) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) {
    return null;
  }
  await contact.destroy();
  return contact;
}

/**
 * Adds a new contact to the database.
 */
async function addContact(data) {
  return await Contact.create(data);
}

/**
 * Updates an existing contact.
 */
async function updateContact(contactId, data) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) {
    return null;
  }
  return await contact.update(data);
}

/**
 * Updates the favorite status of a contact.
 */
async function updateStatusContact(contactId, body) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) {
    return null;
  }
  return await contact.update(body);
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

import Contact from "../db/models/Contact.js";

/**
 * Lists all contacts from the database for a specific owner.
 * Supports pagination and favorite filtering.
 */
async function listContacts(owner, { page = 1, limit = 20, favorite }) {
  const offset = (page - 1) * limit;
  const where = { owner };
  
  if (favorite !== undefined) {
    where.favorite = favorite === "true";
  }

  return await Contact.findAll({
    where,
    limit: Number(limit),
    offset: Number(offset),
  });
}

/**
 * Gets a contact by its ID for a specific owner.
 */
async function getContactById(contactId, owner) {
  return await Contact.findOne({ where: { id: contactId, owner } });
}

/**
 * Removes a contact by its ID for a specific owner.
 */
async function removeContact(contactId, owner) {
  const contact = await Contact.findOne({ where: { id: contactId, owner } });
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
 * Updates an existing contact for a specific owner.
 */
async function updateContact(contactId, data, owner) {
  const contact = await Contact.findOne({ where: { id: contactId, owner } });
  if (!contact) {
    return null;
  }
  return await contact.update(data);
}

/**
 * Updates the favorite status of a contact for a specific owner.
 */
async function updateStatusContact(contactId, body, owner) {
  const contact = await Contact.findOne({ where: { id: contactId, owner } });
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

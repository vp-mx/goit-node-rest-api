import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

/**
 * Controller for getting all contacts.
 */
export const getAllContacts = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const { page, limit, favorite } = req.query;
    const contacts = await contactsService.listContacts(owner, { page, limit, favorite });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for getting a single contact by ID.
 */
export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: owner } = req.user;
    const result = await contactsService.getContactById(id, owner);
    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for deleting a contact.
 */
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: owner } = req.user;
    const result = await contactsService.removeContact(id, owner);
    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for creating a new contact.
 */
export const createContact = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const result = await contactsService.addContact({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for updating an existing contact.
 */
export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }
    const { id: owner } = req.user;
    const result = await contactsService.updateContact(id, req.body, owner);
    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for updating a contact's favorite status.
 */
export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { id: owner } = req.user;
    const result = await contactsService.updateStatusContact(id, body, owner);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

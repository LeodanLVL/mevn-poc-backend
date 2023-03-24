const { request, response } = require("express");
const Provider = require("../models/Provider");

const getProviders = async (req = request, resp = response) => {
  try {
    const providers = await Provider.find();

    return resp.json({
      ok: true,
      data: providers,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "You have to call an admin",
      error,
    });
  }
};

const getProviderById = async (req = request, resp = response) => {
  try {
    const { id } = req.params;
    const provider = (await Provider.findById(id)) || false;

    // Check if there is not a provider
    if (!provider) {
      return resp.json({
        ok: false,
        data: null,
        msg: `We could not find an element with this id(${id})`,
      });
    }

    return resp.json({
      ok: true,
      data: provider,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Contacte al admin",
      error,
    });
  }
};

const insertProvider = async (req = request, resp = response) => {
  try {
    const provider = await Provider.create({ ...req.body });

    return resp.json({ ok: true, data: provider });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Contacte al admin",
      error,
    });
  }
};

const updateProvider = async (req = request, resp = response) => {
  try {
    const { id } = req.params;
    const provider = (await Provider.findById(id)) || false;

    console.log(provider);
    if (!!provider) {
      const updatedProvider = await Provider.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return resp.json({ ok: true, data: updatedProvider });
    }
    return resp.status(404).json({
      ok: true,
      data: null,
      msg: `We could not find an element with this id(${id})`,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Contacte al admin",
      error,
    });
  }
};

const deleteProvider = async (req, resp) => {
  try {
    const { id } = req.params;
    const provider = (await Provider.findById(id)) || false;
    if (!!provider) {
      const deleted = await Provider.findByIdAndDelete(id, { new: true });
      return resp.json({ ok: true, data: deleted });
    }
    return resp.status(404).json({
      ok: true,
      data: null,
      msg: `We could not find the provider with the id ${id}`,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Contacte al admin",
      error,
    });
  }
};

module.exports = {
  getProviders,
  getProviderById,
  insertProvider,
  updateProvider,
  deleteProvider,
};

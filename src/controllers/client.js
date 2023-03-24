const { request, response } = require("express");

const Client = require("../models/Client");

const getClients = async (req = request, resp = response) => {
  try {
    const clients = await Client.find().populate("providers", "name");
    return resp.json({
      ok: true,
      data: clients,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Call an admin",
      error,
    });
  }
};

const getClientById = async (req = request, resp = response) => {
  try {
    const { id } = req.params;
    const client = (await Client.findById(id).populate("providers", "name", "Provider")) || false;

    return resp.json({
      ok: true,
      data: client,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Call an admin",
      error,
    });
  }
};

const insertClient = async (req = request, resp = response) => {
  try {
    const client = await Client.create({ ...req.body });

    return resp.json({
      ok: true,
      data: client,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Call an admin",
      error,
    });
  }
};

const updateClient = async (req = request, resp = response) => {
  try {
    const { id } = req.params;
    const client = (await Client.findById(id)) || false;

    if (!client) {
      return resp.json({
        ok: false,
        msg: `We couldn't find an element with this id(${id})`,
      });
    }
    const updateC = await Client.updateOne(client, req.body);
    return resp.json({
      ok: true,
      data: null,
      msg: "all validations passed",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Call an admin",
      error,
    });
  }
};

const deleteClient = async (req = request, resp = response) => {
  try {
    const { id } = req.params;
    const client = (await Client.findById(id)) || false;

    if (!!client) {
      const deleteC = await Client.deleteOne(client);
      console.log("Client deleted");
    }
    return resp.json({
      ok: true,
      msg: `Client deleted`,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Call an admin",
      error,
    });
  }
};

module.exports = {
  getClients,
  getClientById,
  insertClient,
  updateClient,
  deleteClient,
};

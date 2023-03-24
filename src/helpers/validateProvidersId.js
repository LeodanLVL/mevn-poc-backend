const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");
function isArrayOfMonogoId(req = request, resp = response) {
  const { providers: providersListId } = req.body;

  for (const provider of providersListId) {
    const { id } = provider;
    if (!isValidObjectId(id)) {
      return false;
    }
  }
  return true;
}

module.exports = { isArrayOfMonogoId };

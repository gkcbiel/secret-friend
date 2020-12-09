const { v4: uuidV4 } = require("uuid");

require("../resources/db/connection")();

const SecretModel = require("../resources/db/models/Secret");

module.exports = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
};

module.exports.create = async (event) => {
  const { name, email } = JSON.parse(event.body);
  const externalId = uuidV4();
  const adminKey = uuidV4();

  try {
    await SecretModel.create({
      owner: name,
      ownerEmail: email,
      externalId,
      adminKey,
    });

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        id: externalId,
        adminKey,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
      }),
    };
  }
};

module.exports.get = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

    const { id: externalId } = event.pathParameters
    const incomingAdminkKey = event.headers['admin-key']

  try {
    const { participants, adminKey, drawResult } = await SecretModel.findOne({
        externalId,
    }).select('-_id participants adminKey drawResult').lean()

    const isAdmin = !!(incomingAdminkKey && incomingAdminkKey === adminKey)


    const result = {
        participants,
        hasDrew: !!drawResult.length,
        isAdmin,
    }

    return{
        statuscode:200,
        body: JSON.stringify(result),
    }

  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
      }),
    };
  }
};

module.exports.put = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
      }),
    };
  }
};

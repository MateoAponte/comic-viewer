import AWS from 'aws-sdk';
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const tableName = 'comic-rating-bd';

exports.handler = async (event) => {
  // console.log('LOCAL EVENT: ' + JSON.stringify(event));

  const httpMethod = event.httpMethod;
  const body = JSON.parse(event.body).data;

  if (httpMethod === 'POST' && event.path === '/rating') {
    return setRating(body);
  } else if (httpMethod === 'GET' && event.path === '/rating') {
    return getAllRatings();
  } else if (httpMethod === 'PUT' && event.path === '/rating') {
    return updateRating(body);
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Unsupported method or path' }),
    };
  }
};

const getItemById = async (id) => {
  try {
    const item = await dynamoDb
      .get({
        TableName: tableName,
        Key: {
          user_id: id,
          index: id,
        },
      })
      .promise();

    return Object.keys(item?.Item || {}).length > 0 ? null : item.Item;
  } catch (error) {
    throw {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

const setRating = async (body) => {
  const params = {
    TableName: tableName,
    Item: {
      user_id: body.user.toString(),
      index: body.user.toString(),
      rating: body.rating,
    },
  };

  const existingItem = await getItemById(body.user.toString());
  console.log(
    'PUT: ' + body.rating,
    'HAS ITEM: ' + JSON.stringify(existingItem)
  );

  if (existingItem !== undefined) {
    try {
      await dynamoDb.put(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Rating set successfully' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error.message }),
      };
    }
  } else {
    return await updateRating(body);
  }
};

const getAllRatings = async () => {
  const params = {
    TableName: tableName,
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

const updateRating = async (body) => {
  const existingItem = await getItemById(body.user.toString());
  console.log(
    'UPDATE ITEM: ' + JSON.stringify(existingItem),
    'RATING: ' + body.rating
  );

  if (existingItem !== undefined) {
    try {
      const data = await dynamoDb
        .update({
          TableName: tableName,
          Key: {
            user_id: body.user.toString(),
            index: body.user.toString(),
          },
          UpdateExpression: 'set rating = :rating',
          ExpressionAttributeValues: {
            ':rating': JSON.stringify({
              ...existingItem?.rating,
              rating: JSON.parse(body.rating).rating,
            }),
          },
        })
        .promise();

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Rating updated successfully',
          ...data,
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error.message }),
      };
    }
  }
};

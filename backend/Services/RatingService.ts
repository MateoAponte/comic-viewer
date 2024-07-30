import { HttpMethods } from '../types/Http/HttpMethods';
import { HttpRoutes } from '../types/Http/HttpRoutes';
import { HttpCode } from '../types/Http/HttpCode';
import { Service } from '../types/Service';
import { Response } from '../types/Response';
import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export class RatingService implements Service {
  private tableName: string = 'comic-rating-bd';
  constructor() {}

  public async getAll() {
    const params = {
      TableName: this.tableName,
      AttributesToGet: ['rating'],
    };

    try {
      const data = await dynamoDb.scan(params).promise();
      const parsedData = data.Items?.map((item) => JSON.parse(item.rating));

      console.log('GET ALL: ' + JSON.stringify(parsedData));
      return {
        statusCode: HttpCode.GOOD,
        body: JSON.stringify(parsedData),
      };
    } catch (error) {
      return {
        statusCode: HttpCode.BAD,
        body: JSON.stringify({
          message: error.message,
        }),
      };
    }
  }

  public async getItemById(id: number, comicId: number) {
    console.log('ID: ' + id, ' - COMIC ID: ' + comicId);

    try {
      const item = await dynamoDb
        .get({
          TableName: this.tableName,
          Key: {
            user_id: id,
            index: comicId,
          },
        })
        .promise();

      console.log('GET ITEM BY ID: ' + JSON.stringify(item));

      return Object.keys(item?.Item || {}).length <= 0 ? null : item.Item;
    } catch (error) {
      return {
        statusCode: HttpCode.BAD,
        body: JSON.stringify({
          message: error.message,
        }),
      };
    }
  }

  public async deleteRatedById(event) {
    const query =
      event.multiValueQueryStringParameters.comicId &&
      event.queryStringParameters;
    console.log('QUERY: ' + JSON.stringify(query));

    try {
      await dynamoDb
        .delete({
          TableName: this.tableName,
          Key: {
            user_id: query.userId.toString(),
            index: query.comicId.toString(),
          },
        })
        .promise();

      return {
        statusCode: HttpCode.GOOD,
        body: JSON.stringify({
          message: 'Deleted by Id',
          data: query.comicId,
        }),
      };
    } catch (error) {
      return {
        statusCode: HttpCode.BAD,
        body: JSON.stringify({
          message: error.message,
        }),
      };
    }
  }

  public async updateRating(body): Promise<Response> {
    const existingItem = await this.getItemById(
      body.user.toString(),
      JSON.parse(body.rating).num.toString()
    );
    console.log(
      'UPDATE ITEM: ' + JSON.stringify(existingItem),
      'RATING: ' + body.rating
    );

    if (existingItem !== undefined) {
      try {
        const data = await dynamoDb
          .update({
            TableName: this.tableName,
            Key: {
              user_id: body.user.toString(),
              index: JSON.parse(body.rating).num.toString(),
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
          statusCode: HttpCode.GOOD,
          body: JSON.stringify({
            message: 'Rating updated successfully',
            data: data,
          }),
        };
      } catch (error) {
        return {
          statusCode: HttpCode.BAD,
          body: JSON.stringify({
            message: error.message,
          }),
        };
      }
    } else {
      return {
        statusCode: HttpCode.BAD,
        body: JSON.stringify({
          message: "The element doesnt exist's",
        }),
      };
    }
  }

  public async setRating(body): Promise<Response> {
    const params = {
      TableName: this.tableName,
      Item: {
        user_id: body.user.toString(),
        index: JSON.parse(body.rating).num.toString(),
        rating: body.rating,
      },
    };

    const existingItem = await this.getItemById(
      body.user.toString(),
      JSON.parse(body.rating).num.toString()
    );
    console.log(
      'SET: ' + JSON.stringify(body.rating),
      'HAS ITEM: ' + JSON.stringify(existingItem)
    );

    if (existingItem !== undefined) {
      try {
        await dynamoDb.put(params).promise();

        const updatedItem =
          (await this.getItemById(
            body.user.toString(),
            JSON.parse(body.rating).num.toString()
          )) || {};

        return {
          statusCode: HttpCode.GOOD,
          body: JSON.stringify({
            ...JSON.parse(updatedItem?.rating),
          }),
        };
      } catch (error) {
        return {
          statusCode: HttpCode.BAD,
          body: JSON.stringify({
            message: error.message,
          }),
        };
      }
    } else {
      return await this.updateRating(body);
    }
  }

  public async init(event) {
    if (event.path === HttpRoutes.Rating) {
      try {
        console.log('HTTP METHOD: ' + event.httpMethod);

        switch (event.httpMethod) {
          case HttpMethods.GET:
            return await this.getAll();
          case HttpMethods.POST:
            return await this.setRating(JSON.parse(event.body).data);
          case HttpMethods.DELETE:
            const deleteV = await this.deleteRatedById(event);
            return deleteV;
          case HttpMethods.PATCH:
            return await this.updateRating(JSON.parse(event.body).data);
          default:
            return {
              statusCode: HttpCode.NO_CONTENT,
              body: JSON.stringify({
                message: 'Http Methods not valid',
              }),
            };
        }
      } catch (err) {
        console.error('RatingService error:', err);
        return {
          statusCode: HttpCode.BAD,
          body: JSON.stringify({
            message: 'Error handling request',
            error: err.message || 'Unknown error',
          }),
        };
      }
    } else {
      return {
        statusCode: HttpCode.BAD,
        body: JSON.stringify({
          message: "Path doesn't is related to the Rating Service",
        }),
      };
    }
  }
}

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
    };

    try {
      const data = await dynamoDb.scan(params).promise();
      return {
        statusCode: HttpCode.GOOD,
        message: JSON.stringify(data.Items),
      };
    } catch (error) {
      return {
        statusCode: HttpCode.BAD,
        message: JSON.stringify({ message: error.message }),
      };
    }
  }

  public async getItemById(id: number, comicId: number) {
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
        message: JSON.stringify({ message: error.message }),
      };
    }
  }

  public async deleteRatedById() {
    return {
      statusCode: HttpCode.GOOD,
      message: 'Delete by Id',
    };
  }

  public async updateRating(body): Promise<Response> {
    const existingItem = await this.getItemById(
      body.user.toString(),
      JSON.parse(body.rating).num
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
          message: JSON.stringify({
            content: 'Rating updated successfully',
            ...data,
          }),
        };
      } catch (error) {
        return {
          statusCode: HttpCode.BAD,
          message: JSON.stringify({ message: error.message }),
        };
      }
    } else {
      return {
        statusCode: HttpCode.BAD,
        message: "The element doesnt exist's",
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
      JSON.parse(body.rating).num
    );
    if (existingItem !== undefined) {
      console.log(
        'SET: ' + body.rating,
        'HAS ITEM: ' + JSON.stringify(existingItem)
      );
      try {
        await dynamoDb.put(params).promise();
        return {
          statusCode: HttpCode.GOOD,
          message: JSON.stringify({ message: 'Rating set successfully' }),
        };
      } catch (error) {
        return {
          statusCode: HttpCode.BAD,
          message: JSON.stringify({ message: error.message }),
        };
      }
    } else {
      return await this.updateRating(body);
    }
  }

  public async init(event) {
    if (event.path === HttpRoutes.Rating) {
      const body = JSON.parse(event.body).data;
      try {
        switch (event.httpMethod) {
          case HttpMethods.GET:
            return await this.getAll();
          case HttpMethods.POST:
            return await this.setRating(body);
          case HttpMethods.DELETE:
            return await this.deleteRatedById();
          case HttpMethods.PATCH:
            return await this.updateRating(body);
          default:
            return {
              statusCode: HttpCode.NO_CONTENT,
              message: '',
            };
        }
      } catch (err) {
        console.error('RatingService error:', err);
        return {
          statusCode: HttpCode.BAD,
          message: 'Error handling request',
          error: err.message || 'Unknown error',
        };
      }
    } else {
      return {
        statusCode: HttpCode.BAD,
        message: '',
      };
    }
  }
}

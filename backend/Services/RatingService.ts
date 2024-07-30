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
        body: {
          message: JSON.stringify({ message: error.message }),
        },
      };
    }
  }

  public async getItemById(id: number, comicId: number) {
    console.log('ID: ' + Number, ' - COMIC ID: ' + comicId);

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
        body: {
          message: JSON.stringify({ message: error.message }),
        },
      };
    }
  }

  public async deleteRatedById() {
    return {
      statusCode: HttpCode.GOOD,
      body: {
        message: 'Delete by Id',
      },
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
          body: {
            message: 'Rating updated successfully',
            data: data,
          },
        };
      } catch (error) {
        return {
          statusCode: HttpCode.BAD,
          body: {
            message: JSON.stringify({ message: error.message }),
          },
        };
      }
    } else {
      return {
        statusCode: HttpCode.BAD,
        body: {
          message: JSON.stringify({ message: "The element doesnt exist's" }),
        },
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
          body: {
            message: JSON.stringify({ message: 'Rating set successfully' }),
          },
        };
      } catch (error) {
        return {
          statusCode: HttpCode.BAD,
          body: {
            message: JSON.stringify({ message: error.message }),
          },
        };
      }
    } else {
      return await this.updateRating(body);
    }
  }

  public async init(event) {
    if (event.path === HttpRoutes.Rating) {
      try {
        switch (event.httpMethod) {
          case HttpMethods.GET:
            return await this.getAll();
          case HttpMethods.POST:
            return await this.setRating(JSON.parse(event.body).data);
          case HttpMethods.DELETE:
            return await this.deleteRatedById();
          case HttpMethods.PATCH:
            return await this.updateRating(JSON.parse(event.body).data);
          default:
            return {
              statusCode: HttpCode.NO_CONTENT,
              body: {
                message: JSON.stringify({ message: 'Http Methods not valid' }),
              },
            };
        }
      } catch (err) {
        console.error('RatingService error:', err);
        return {
          statusCode: HttpCode.BAD,
          body: {
            message: 'Error handling request',
            error: err.message || 'Unknown error',
          },
        };
      }
    } else {
      return {
        statusCode: HttpCode.BAD,
        body: {
          message: "Path doesn't is related to the Rating Service",
        },
      };
    }
  }
}

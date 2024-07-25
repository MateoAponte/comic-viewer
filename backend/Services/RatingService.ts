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
        code: HttpCode.GOOD,
        message: JSON.stringify(data.Items),
      };
    } catch (error) {
      return {
        code: HttpCode.BAD,
        message: JSON.stringify({ message: error.message }),
      };
    }
  }

  public async getItemById(id: number) {
    try {
      const item = await dynamoDb
        .get({
          TableName: this.tableName,
          Key: {
            user_id: id,
            index: id,
          },
        })
        .promise();

      return Object.keys(item?.Item || {}).length > 0 ? null : item.Item;
    } catch (error) {
      return {
        code: HttpCode.BAD,
        message: JSON.stringify({ message: error.message }),
      };
    }
  }

  public async deleteRatedById() {
    return {
      code: HttpCode.GOOD,
      message: 'Delete by Id',
    };
  }

  public async updateRating(body): Promise<Response> {
    const existingItem = await this.getItemById(body.user.toString());
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
          code: HttpCode.GOOD,
          message: JSON.stringify({
            content: 'Rating updated successfully',
            ...data,
          }),
        };
      } catch (error) {
        return {
          code: HttpCode.BAD,
          message: JSON.stringify({ message: error.message }),
        };
      }
    } else {
      return {
        code: HttpCode.BAD,
        message: "The element doesnt exist's",
      };
    }
  }

  public async setRating(body): Promise<Response> {
    const params = {
      TableName: this.tableName,
      Item: {
        user_id: body.user.toString(),
        index: body.user.toString(),
        rating: body.rating,
      },
    };

    const existingItem = await this.getItemById(body.user.toString());
    console.log(
      'PUT: ' + body.rating,
      'HAS ITEM: ' + JSON.stringify(existingItem)
    );

    if (existingItem !== undefined) {
      try {
        await dynamoDb.put(params).promise();
        return {
          code: HttpCode.GOOD,
          message: JSON.stringify({ message: 'Rating set successfully' }),
        };
      } catch (error) {
        return {
          code: HttpCode.BAD,
          message: JSON.stringify({ message: error.message }),
        };
      }
    } else {
      return await this.updateRating(body);
    }
  }

  public init(event) {
    if (event.path === HttpRoutes.Rating) {
      switch (event.method) {
        case HttpMethods.GET:
          return this.getAll();
        case HttpMethods.POST:
          return this.setRating(event);
        case HttpMethods.DELETE:
          return this.deleteRatedById();
        case HttpMethods.PATCH:
          return this.updateRating(event.body);
      }
      return {
        code: HttpCode.NO_CONTENT,
        message: '',
      };
    } else {
      return {
        code: HttpCode.BAD,
        message: '',
      };
    }
  }
}

import { Logger, NotFoundException } from '@nestjs/common';
import { AbtractDocument } from './abstract.schema';
import {
  Connection,
  FilterQuery,
  Model,
  SaveOptions,
  UpdateQuery,
} from 'mongoose';
import { randomUUID } from 'crypto';
export abstract class AbstractRepository<TDocument extends AbtractDocument> {
  protected readonly logger: Logger;

  constructor(
    private readonly connection: Connection,
    private readonly model: Model<TDocument>,
  ) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      id: randomUUID(),
      ...document,
    });

    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>) {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not foud with filter query', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findByIdAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn('Document not foud with filter query', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    return this.model.findByIdAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
      upsert: true,
    });
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id });
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}

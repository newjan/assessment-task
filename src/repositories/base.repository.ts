import { injectable, unmanaged } from 'inversify';
import { Model, Document, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';

/**
 * This Repository class is the base repository. It is an abstract class because it can only be
 * extended. This class is written to support Mongoose.
 *
 * The model property is the Mongoose model in this case.
 */
@injectable()
export default abstract class BaseRepository<T extends Document> {
  protected readonly model: Model<T>;

  constructor(@unmanaged() model: Model<T>) {
    this.model = model;
  }

  public async findOne(
    filter: FilterQuery<T>,
    options?: Record<string, any>,
  ): Promise<T | null> {
    const doc: T | null = await this.model.findOne(filter, options).exec();
    return doc;
  }

  public async find(
    filter: FilterQuery<T>,
    options?: Record<string, any>,
  ): Promise<T[]> {
    const docs: T[] = await this.model.find(filter, options).exec();
    return docs;
  }

  public async findById(id: string, options?: Record<string, any>): Promise<T | null> {
    const doc: T | null = await this.model.findById(id, options).exec();
    return doc;
  }

  public async findAll(filter: FilterQuery<T> = {}, options?: Record<string, any>): Promise<T[]> {
    const docs: T[] = await this.model.find(filter, options).exec();
    return docs;
  }


  public async create(data: Partial<T>): Promise<T> {
    if (!data) {
      throw new Error('Empty object provided');
    }

    const doc: T = await this.model.create(data);
    return doc;
  }

  public async removeMany(
    filter: FilterQuery<T>,
    options?: Record<string, any>,
  ) {
    await this.model.deleteMany(filter, options).exec();
  }

  public async dropIndexes() {
    // You can implement index dropping logic if needed
  }

  public async update(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    const updatedDoc: T | null = await this.model.findOneAndUpdate(filter, update, {
      new: true, // Return the updated document
      ...options, // Additional options like upsert, timestamps, etc.
    }).exec();

    return updatedDoc;
  }
}

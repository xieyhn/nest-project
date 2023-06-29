import { FindOneOptions, FindOptionsWhere, Repository, SaveOptions } from 'typeorm'

export abstract class TypeormCRUDService<Entity> {
  abstract repository: Repository<Entity>

  findOne(options: FindOneOptions<Entity>) {
    return this.repository.findOne(options)
  }

  findOneBy(where: FindOptionsWhere<Entity>) {
    return this.repository.findOneBy(where)
  }

  save(entity: Entity, options?: SaveOptions) {
    return this.repository.save(entity, options)
  }
}

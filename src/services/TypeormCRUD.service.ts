import type { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository, SaveOptions } from 'typeorm'

export abstract class TypeormCRUDService<Entity> {
  abstract repository: Repository<Entity>

  findOne(options: FindOneOptions<Entity>) {
    return this.repository.findOne(options)
  }

  findOneBy(where: FindOptionsWhere<Entity>) {
    return this.repository.findOneBy(where)
  }

  find(options?: FindManyOptions<Entity>) {
    return this.repository.find(options)
  }

  findBy(where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]) {
    return this.repository.findBy(where)
  }

  findAndCount(options?: FindManyOptions<Entity>) {
    return this.repository.findAndCount(options)
  }

  findAndCountBy(where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]) {
    return this.repository.findAndCountBy(where)
  }

  save(entity: Entity, options?: SaveOptions) {
    return this.repository.save(entity, options)
  }
}

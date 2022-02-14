interface BaseRepositoryInterface<T> {
  index(): Promise<T[]>;

  get(id: number, column: string): Promise<T>;

  delete(id: number): Promise<boolean>;
}

type BaseRepositoryInterfaceType<T> = BaseRepositoryInterface<T>;

export default BaseRepositoryInterfaceType;

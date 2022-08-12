import {
    Model,
    HydratedDocument,
    QueryWithHelpers,
} from 'mongoose'

export interface PaginationHelper<TDoc> {
    paginate(this: QueryWithHelpers<any, HydratedDocument<TDoc>>, page: number, perPage: number): QueryWithHelpers<any, HydratedDocument<TDoc>>
}

export type WithPagination<TDoc> = Model<
    TDoc,
    PaginationHelper<TDoc>
>

import CollectionModel from "../../model/CollectionModel";

class CollectionService {
  async getCollectionService() {
    const collections = await CollectionModel.find();
    return collections;
  }

  async insertBulkCollectionService(data: {
    name: string
  }[]) {
    const addedData = await CollectionModel.insertMany(data);
    return addedData;
  }
}

export const { getCollectionService, insertBulkCollectionService } = new CollectionService();
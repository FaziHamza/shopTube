import Dexie from 'dexie';

interface dbModel {
  id?: number;
  screenName: string;
  applicationId: string;
  type: string;
  data: any;
}

export class DataService {
  private db: MyDatabase;

  constructor() {
    this.db = new MyDatabase();
  }

  async saveData(screenName: string, applicationId: string, type: string, data: any): Promise<void> {
    const obj = { screenName: screenName, applicationId: applicationId, type: type, data: data };
    await this.db.myTable.add(obj);
    this.getNodes(applicationId, screenName, type);
  }

  async getNodes(applicationId: string, screenName: string, type: string): Promise<any[]> {
    let check = await this.db.myTable
      .where('applicationId')
      .equals(applicationId)
      .and(node => node.screenName === screenName && node.type === type)
      .toArray();
    return check;
  }

  async deleteDb(applicationId: string, screenName: string, type: string): Promise<void> {
    await this.db.myTable.where({ applicationId: applicationId, screenName: screenName, type: type }).delete();
    console.log("Data successfully deleted");
  }

  async addData(screenName: string, applicationId: string, type: string, data: any): Promise<void> {
    const obj = { screenName: screenName, applicationId: applicationId, type: type, data: data };

    // Use the put method to insert or update the record based on the primary key
    await this.db.myTable.put(obj);

    this.getNodes(applicationId, screenName, type);
  }
}

class MyDatabase extends Dexie {
  myTable: Dexie.Table<dbModel, number>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      myTable: '++id,screenName,applicationId,type,data', // Include applicationId as an indexed field
    }).upgrade(async (trans) => {
      // Ensure the applicationId field is indexed
      await trans.table('myTable').toCollection().modify((record) => {
        record.applicationId; // This read will ensure the index is created
      });
    });

    this.myTable = this.table('myTable');
  }
}

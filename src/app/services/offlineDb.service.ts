import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { dbModel } from "../models/dbModel";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private db: MyDatabase;

  constructor() {
    this.db = new MyDatabase();
  }
  async saveData(screenName: string, data: any): Promise<void> {

    const obj = { screenName: screenName, data: data };
    await this.db.myTable.add(obj);
    // await this.db.myTable.put({
    //   tableName,
    //   data,
    // });
    this.getNodes(screenName);
    // this.deleteDb(screenName);
  }
  async getNodes(screenName: any) {

    let check = await this.db.myTable.where('screenName').equals(screenName).toArray();
    return check;
  }

  async deleteDb(screenName: any) {

    this.db.myTable.where('screenName').equals(screenName).delete().then(() => {
      console.log("Database successfully deleted");
    }).catch((error) => {
      console.log("Error deleting database:", error);
    });

    // this.db.delete().then(() => {
    //   console.log("Database successfully deleted");
    // }).catch((error) => {
    //   console.log("Error deleting database:", error);
    // });
  }

}


class MyDatabase extends Dexie {
  myTable: Dexie.Table<dbModel, number>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      myTable: '++id,screenName',
    });
    this.myTable = this.table('myTable');
  }

}

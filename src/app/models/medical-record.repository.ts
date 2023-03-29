import { Injectable } from "@angular/core";
import { ResponseModel } from "./response.model";
import { RestDataSource } from "./rest.datasource";
import { MedicalRecord as MedicalRecord } from "./medical-record.model";

@Injectable()
export class MedicalRecordRepository {
  private _medicalRecord: MedicalRecord[] = [];
  listReady: boolean = false;

  constructor(private dataSource: RestDataSource) {}

  getMedicalRecord(): MedicalRecord[] {
    return this._medicalRecord;
  }

  async setMedicalRecord(query?: string) {
    this.listReady = false;
    if (query) {
      this._medicalRecord = await this.dataSource
        .searchMedicalRecord(query)
        .toPromise();
    } else {
      this._medicalRecord = await this.dataSource
        .getMedicalRecord()
        .toPromise();
    }
    this.listReady = true;
  }

  getItem(id: string): MedicalRecord {
    return { ...this._medicalRecord.find((trn) => trn._id === id)! };
  }

  async saveMedicalRecord(item: MedicalRecord) {
    // If it does not have id, then create a new item
    if (item._id === null || item._id === "" || item._id === undefined) {
      const response = await this.dataSource
        .insertMedicalRecord(item)
        .toPromise();
      if (response._id) {
        this._medicalRecord.push(response);
      } else {
        const error = response as ResponseModel;
        alert(`Error: ${error.message}`);
      }
    } else {
      const response: ResponseModel = await this.dataSource
        .updateMedicalRecord(item)
        .toPromise();
      if (response.success === true) {
        this._medicalRecord.splice(
          this._medicalRecord.findIndex((trn) => trn._id === item._id),
          1,
          item
        );
      } else {
        alert(`Error: ${response.message}`);
      }
    }
  }

  deleteMedicalRecord(id: string) {
    this.dataSource.deleteMedicalRecord(id).subscribe((response) => {
      if (response.success) {
        this._medicalRecord.splice(
          this._medicalRecord.findIndex((trn) => trn._id === id),
          1
        );
      } else {
        alert(`Error: ${response.message}`);
      }
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/models/auth.service";
import { MedicalRecord } from "src/app/models/medical-record.model";
import { MedicalRecordRepository } from "src/app/models/medical-record.repository";
import { toLocaleString } from "src/app/utils";

@Component({
  selector: "app-medical-record-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class MedicalRecordListComponent implements OnInit {
  title = "Medical Record List";

  constructor(
    private auth: AuthService,
    private repository: MedicalRecordRepository
  ) {}

  async ngOnInit(): Promise<void> {
    await this.repository.setMedicalRecord(this.auth.userId);
  }

  get medicalRecordList(): MedicalRecord[] {
    return this.repository.getMedicalRecord();
  }

  get isReady(): boolean {
    return this.repository.listReady;
  }

  toLocaleString(value: any) {
    return toLocaleString(value);
  }

  deleteMethod(id: string) {
    if (confirm("Are you sure?")) {
      this.repository.deleteMedicalRecord(id);
    }
  }

  get isPatient(): boolean {
    return this.auth.userRole === "patient" ? true : false;
  }
}

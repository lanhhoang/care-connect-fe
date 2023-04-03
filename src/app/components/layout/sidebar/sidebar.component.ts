import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "src/app/models/auth.service";
import { ActivatedRoute } from "@angular/router";
import { MedicalRecord } from "../../../models/medical-record.model";
import { MedicalRecordRepository } from "../../../models/medical-record.repository";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  @Input() title?: string;
  editing: boolean = false;
  isProfilePage: boolean = false;

  sideTitles = ["Account Information", "Medical Record", "Add Medical Record","Search Medical Record","Schedule","User List"];
  constructor(
    public auth: AuthService,
    private activeRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.editing = this.activeRoute.snapshot.params["mode"] === "edit";
    this.isProfilePage = this.activeRoute.snapshot.routeConfig.path === "user/profile";
    console.log("test if true profile page = " + this.isProfilePage); 
  }

  get isPatient() : boolean{
    console.log("role =---- " + this.auth.userRole);
    return this.auth.userRole === "patient" ? true : false;
  }
}

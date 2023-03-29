import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LayoutModule } from "../layout/layout.module";
import { SharedModule } from "../shared/shared.module";
import { MedicalRecordComponent } from "src/app/medical-record/medical-record.component";
import { SearchPageComponent } from "src/app/search-page/search-page.component";
import { AddEditComponent } from "src/app/add-edit/add-edit.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    SharedModule,
    LayoutModule,
  ],
  declarations: [MedicalRecordComponent, SearchPageComponent, AddEditComponent],
  exports: [MedicalRecordComponent, SearchPageComponent, AddEditComponent],
})
export class MedicalRecordModule {}

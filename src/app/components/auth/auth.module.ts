import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AuthComponent } from "./auth.component";
import { RegisterComponent } from "./register.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule, SharedModule],
  declarations: [AuthComponent, RegisterComponent],
  providers: [],
})
export class AuthModule {}

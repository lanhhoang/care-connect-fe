import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthService } from "./auth.service";
import { RestDataSource } from "./rest.datasource";
import { UserRepository } from "./user.repository";

@NgModule({
  imports: [HttpClientModule],
  providers: [RestDataSource, AuthService, UserRepository],
})
export class ModelModule {}

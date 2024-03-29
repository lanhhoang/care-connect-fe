import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { ToastService } from "../services/toast.service";
import { ResponseModel } from "./response.model";
import { RestDataSource } from "./rest.datasource";
import { User } from "./user.model";

@Injectable()
export class UserRepository {
  private _users: User[] = [];
  private _user: User = new User();
  page: number = 1;
  limit: number = 10;
  nextPage: number;
  prevPage: number;
  totalPage: number;
  listReady: boolean = false;
  profileReady: boolean = false;

  constructor(
    private dataSource: RestDataSource,
    private toast: ToastService
  ) {}

  getUsers(): User[] {
    return this._users;
  }

  setEmptyUsers() {
    this._users = [];
  }

  async setSearchedUsers(query?: string) {
    this.listReady = false;
    this._users = await lastValueFrom(this.dataSource.searchUser(query));
    this.totalPage = 1;
    this.listReady = true;
  }

  async setUsers() {
    this.listReady = false;
    this.dataSource.getUserList(this.page, this.limit).subscribe((response) => {
      this._users = response.data;
      this.page = response.page;
      this.limit = response.limit;
      this.nextPage = response.nextPage;
      this.prevPage = response.prevPage;
      this.totalPage = response.totalPage;
    });
    this.listReady = true;
  }

  get getUser(): User {
    return this._user;
  }

  setUserProfile() {
    this.profileReady = false;
    this.dataSource.getUserProfile().subscribe((data) => {
      this._user = data;
      this.profileReady = true;
    });
  }

  async setUser(id: string) {
    this._user = await lastValueFrom(this.dataSource.getUser(id));
  }

  async saveUser(user: User) {
    let response;

    if (["", null, undefined].includes(user._id)) {
      response = await lastValueFrom(this.dataSource.addUser(user));
      this.toast.show(response.message, {
        className: `bg-${response.success ? "success" : "danger"} text-light`,
        delay: 15000,
      });
    } else {
      this.dataSource.updateUser(user).subscribe((resp) => {
        response = resp as ResponseModel;
        this.toast.show(response.message, {
          className: `bg-${response.success ? "success" : "danger"} text-light`,
          delay: 15000,
        });
      });
    }

    return response;
  }
}

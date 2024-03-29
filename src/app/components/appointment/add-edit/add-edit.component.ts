import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Appointment } from "src/app/models/appointment.model";
import { AppointmentRepository } from "src/app/models/appointment.repository";
import { AuthService } from "src/app/models/auth.service";
import { isNotEmpty, toTimestamp } from "src/app/utils";

@Component({
  selector: "app-appointment-add-edit",
  templateUrl: "./add-edit.component.html",
  styleUrls: ["./add-edit.component.scss"],
})
export class AppointmentAddEditComponent implements OnInit {
  title: string = "Create new Appointment";
  isSubmitted: boolean = false;
  editing: boolean = false;
  appointment: Appointment = new Appointment();
  statuses: object = {
    scheduled: "Scheduled",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  constructor(
    private repository: AppointmentRepository,
    private router: Router,
    private auth: AuthService,
    private activeRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    await this.repository.setAppointments();

    // Delete
    if (this.activeRoute.snapshot.params["mode"] === "delete") {
      this.deleteItem(this.activeRoute.snapshot.params["id"]);
    }

    this.editing = this.activeRoute.snapshot.params["mode"] === "edit";

    // Edit
    if (this.editing) {
      this.appointment = this.repository.getAppointment(
        this.activeRoute.snapshot.params["id"]
      );
    }
  }

  get isEmployee(): boolean {
    return ["admin", "doctor", "nurse"].includes(this.auth.userRole);
  }

  get isPurposeValid(): boolean {
    return isNotEmpty(this.appointment.purpose);
  }

  get isScheduledAtValid(): boolean {
    return (
      (this.appointment.scheduledAt !== null &&
        toTimestamp(this.appointment.scheduledAt) >=
          toTimestamp(new Date().toString())) ||
      this.editing
    );
  }

  getCurrentDateTimeISO(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const hour = ("0" + now.getHours()).slice(-2);
    const minute = ("0" + now.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hour}:${minute}`;
  }

  async save(form: NgForm) {
    this.isSubmitted = true;

    if (this.isPurposeValid && this.isScheduledAtValid) {
      if (!this.editing) {
        this.appointment.owner = this.auth.userId;
      }

      const id = await this.repository.saveAppointment(this.appointment);
      if (id) {
        this.router.navigateByUrl(`/appointments/show/${id}`);
      } else {
        this.router.navigateByUrl("/appointments/list");
      }
    }
  }

  private deleteItem(id: string) {
    this.repository.deleteAppointment(id);
    this.router.navigateByUrl("/appointments/list");
  }
}

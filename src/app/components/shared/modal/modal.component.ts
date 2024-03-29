import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  onOKClick() {
    this.modal.close("Ok click");
  }
}

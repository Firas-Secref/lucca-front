import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDividerModule} from "@angular/material/divider";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";
import {MatBadgeModule} from "@angular/material/badge";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {InputTextModule} from "primeng/inputtext";
import {MatSelectModule} from "@angular/material/select";
import {OrderListModule} from "primeng/orderlist";
import {DropdownModule} from "primeng/dropdown";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatLine, MatNativeDateModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {TimelineModule} from "primeng/timeline";
import {CardModule} from "primeng/card";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SelectButtonModule} from "primeng/selectbutton";
import {CalendarModule} from "primeng/calendar";
import {FieldsetModule} from "primeng/fieldset";
import {DividerModule} from "primeng/divider";
import {CheckboxModule} from "primeng/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {TableModule} from "primeng/table";
import {ChipsModule} from "primeng/chips";
import {FullCalendarModule} from "@fullcalendar/angular";
import {NavbarComponent} from "./navbar/navbar.component";
import {SideBarComponent} from "./side-bar/side-bar.component";
import {HeaderComponent} from "./header/header.component";
import {TwoFirstLettersPipe} from "./pipes/two-first-letters.pipe";
import {PasswordModule} from "primeng/password";

const sharedModules = [
  CommonModule,
  RippleModule,
  ToastModule,
  HttpClientModule,
  RouterModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCheckboxModule,
  MatDividerModule,
  ScrollingModule,
  SidebarModule,
  ButtonModule,
  MatExpansionModule,
  MatMenuModule,
  MatToolbarModule,
  AvatarModule,
  BadgeModule,
  MatBadgeModule,
  MatListModule,
  MatCardModule,
  ScrollPanelModule,
  InputTextModule,
  MatSelectModule,
  OrderListModule,
  DropdownModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  ReactiveFormsModule,
  DialogModule,
  TimelineModule,
  CardModule,
  InputTextareaModule,
  SelectButtonModule,
  CalendarModule,
  FieldsetModule,
  DividerModule,
  CheckboxModule,
  FullCalendarModule,
  MatChipsModule,
  ChipsModule,
  TableModule,
  FormsModule,
  PasswordModule,
  MatLine
  ];

@NgModule({
  declarations: [
    SideBarComponent,
    NavbarComponent,
    HeaderComponent,
    TwoFirstLettersPipe,
  ],
  imports: sharedModules,
  exports: [...sharedModules, TwoFirstLettersPipe, NavbarComponent, SideBarComponent]
})
export class SharedModule { }

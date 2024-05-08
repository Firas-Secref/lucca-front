import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../users-feature/services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserResponseDto} from "../../../../core/enpoints/response/UserResponseDto";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit{

  notes!: any[];
  currentUser!: UserResponseDto
  newNoteModal = false;
  newNoteForm!: FormGroup;
  constructor(private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder, private toastService: MessageService) {
  }
  ngOnInit(): void {
    this.getEmployeeById();
    this.initForm();
  }

  getEmployeeById(){
    this.userService.getUserById(Number(this.route.snapshot.paramMap.get('employeeId'))).subscribe(user=>{
      console.log(user)
      this.currentUser = user;
      this.notes = user.notes.map(note=>({
        ...note,
        user: `${user.firstname} ${user.lastname}`
      }));
      console.log(this.notes)
    })
  }

  getCurrentPeriod(){
    return `${new Date().getFullYear()} - SEMESTER ${(new Date().getMonth()+1) / 6 <1 ? 1 : 2}`
  }

  openNewNoteModal(){
    this.newNoteModal = true
  }


  submitNote() {
    const note = {
      username: this.currentUser.username,
      note: {
        note: parseInt(this.newNoteForm.value.note),
        period: this.newNoteForm.value.period
      }
    }

    this.userService.addNoteToEmployee(note).subscribe(data=>{
      console.log(data);
      this.getEmployeeById();
      this.newNoteForm.reset()
      this.newNoteModal = false
      this.toastService.add({severity:'success', summary: 'Success', detail: "Note Saved"});
    })

  }

  initForm(){
    this.newNoteForm = this.fb.group({
      period: [this.getCurrentPeriod(), [Validators.required]],
      note: [0, [Validators.required]],
    })
  }
}

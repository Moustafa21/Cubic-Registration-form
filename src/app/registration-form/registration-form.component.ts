import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from '../Service/branch.service';
import { branch } from '../model/branches';
import { TranslateService } from '@ngx-translate/core';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;
  branches: any[] = [];
  currentLanguage: string = 'en';
  public files: any[] = [];

  constructor(private fb: FormBuilder, 
    private branchService: BranchService, 
    private translate: TranslateService) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      branch: ['', Validators.required],
      attachments: [[]] 
    });

    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches() {
    this.branchService.getBranches().subscribe((data: any) => {
      this.branches = data.result; 
    });
  }

  

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
  changeLanguage(language: string) {
    this.translate.use(language);
  }


  public dropped(files: NgxFileDropEntry[]) {
    this.files = []; // Clear previous files
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
              this.files.push({
                name: droppedFile.relativePath,
                type: 'image',
                imageUrl: reader.result,
              });
            };
            reader.readAsDataURL(file);
          } else {
            this.files.push({
              name: droppedFile.relativePath,
              type: 'file',
            });
          }
        });
      } else {
        // If it's a folder
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
    this.registrationForm.patchValue({
      attachments: this.files
    });
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
}

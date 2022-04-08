import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'kd-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public type: any;
  public list: Record<string, any>[] = [
    { name: 'Cinibot', checked: false },
    { name: 'IT Solutions', checked: false },
    { name: 'Logistics ERP', checked: false },
    { name: 'Others', checked: false }
  ];
  countryCodes: any = [];
  countryCode: number = 91;
  constructor(public dialogRef: MatDialogRef<ContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactComponent,
    private httpClient: HttpClient) {
    const contactType = localStorage.getItem('contactType');
    for (const type of this.list) {
      type.checked = (type.name === contactType);
    }
    this.getCountryCodes();
  }



  public ngOnInit(): void {
    this.type = this.data.type;
  }

  public close(): void {
    this.dialogRef.close();
  }

  getCountryCodes() {
    const url = 'assets/json/countries.json';
    this.httpClient.get(url).subscribe(data => {
      this.countryCodes = data;
      console.log(this.countryCodes);
    })

  }

}

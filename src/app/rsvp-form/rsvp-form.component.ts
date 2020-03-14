import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rsvp-form',
  templateUrl: './rsvp-form.component.html',
  styleUrls: ['./rsvp-form.component.css']
})
export class RsvpFormComponent implements OnInit {

  fullname :string;
  email :string;
  phone :string;
  address1 :string;
  address2 :string;
  city :string;
  state :string;
  town :string;
  zip :string;
  country :string;

  constructor() { }

  ngOnInit() {
  }

  //

  submitAddress(event) {
    let data = {
      full_name: this.fullname,
      email_address: this.email,
      phone_number: this.phone,
      address_1: this.address1,
      address_2: this.address2,
      city: this.city,
      state: this.state,
      town: this.town,
      zip: this.zip,
      country: this.country
    };
    console.log(data);

    var jqxhr = $.ajax({
      url: 'https://script.google.com/macros/s/AKfycby-4VIE9kGWDRWTIbLhKmfbeCPEFjO37fp4aTob3OI6MirVc3ct/exec',
      method: "GET",
      dataType: "json",
      data: data
    }).success(
      // do something
    );
  }

}

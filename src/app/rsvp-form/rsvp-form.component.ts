import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { AlertService } from '../services/alert.service';

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

  constructor(
    private alerter: AlertService
  ) { }

  ngOnInit() {
    let that = this;
    this.clearForm();
    $("#submitAnother").click(function() {
      that.clearForm();
      $("#thankYouMessage").slideUp(400, function() {
        $("#formHolder").slideDown();
      });
    })
  }

  clearForm() {
    this.fullname = '';
    this.email = '';
    this.phone = '';
    this.address1 = '';
    this.address2 = '';
    this.state = '';
    this.town = '';
    this.zip = '';
    this.country = '';
  }

  submitAddress(event) {
    let data = {
      time: new Date(),
      full_name: this.fullname,
      email_address: this.email,
      phone_number: this.phone,
      address_1: this.address1,
      address_2: this.address2,
      state: this.state,
      town: this.town,
      zip: this.zip,
      country: this.country
    };

    var that = this;
    var submit = $("#submitText");
    var submitLoading = $("#submitLoading");

    submitLoading.show();
    submit.hide();

    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycby-4VIE9kGWDRWTIbLhKmfbeCPEFjO37fp4aTob3OI6MirVc3ct/exec',
      method: "GET",
      dataType: "json",
      data: data,
      success: function() {
        let en = "Your address has been successfully submitted!";
        let vi = "Địa chỉ của bạn đã được gửi thành công!";
        let message = "<span class='en'>"+en+"</span><span class='vi'>"+vi+"</span>"
        that.alerter.success(message);
        $("#formHolder").slideUp(1000, function() {
          $("#thankYouMessage").slideDown();
        });
      },
      error: function() {
        let en = "Something went wrong submitting your address, please try again later.";
        let vi = "Đã xảy ra lỗi khi gửi địa chỉ của bạn, vui lòng thử lại sau.";
        let message = "<span class='en'>"+en+"</span><span class='vi'>"+vi+"</span>"
        that.alerter.error(message)
      },
      complete: function() {
        submitLoading.hide();
        submit.show();
      }
    });
  }

}

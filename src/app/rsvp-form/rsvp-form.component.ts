import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { AlertService } from '../services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rsvp-form',
  templateUrl: './rsvp-form.component.html',
  styleUrls: ['./rsvp-form.component.css']
})
export class RsvpFormComponent implements OnInit {

  addressForm: FormGroup;
  submitted = false;

  constructor(
    private alerter: AlertService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() { 
    let that = this;
    $("#submitAnother").click(function() {
      that.addressForm.reset();
      that.submitted = false;
      $("#thankYouMessage").slideUp(400, function() {
        $("#formHolder").slideDown();
      });
    });

    this.addressForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.email],
      phone: [''],
      address1: ['', [Validators.required]],
      address2: [''],
      state: ['', Validators.required],
      town: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  get f() { return this.addressForm.controls; }

  submitAddress() {
    console.log(this.addressForm.value);
    this.submitted = true;
    if (this.addressForm.invalid) {
        return;
    }
    
    let data = {
      time: new Date(),
      ...this.addressForm.value
    };
    console.log(data);

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

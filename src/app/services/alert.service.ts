import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  defaultTimeout = 5000;

  constructor() { }

  addAlert(type: string, bold: string, message: string, timeout = this.defaultTimeout) {
    let alert = $('<div class="alert alert-'+type+' alert-dismissible fade show" role="alert">'+
    '    <strong>'+bold+'</strong>'+message+
    '    <button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
    '    <span aria-hidden="true">&times;</span>'+
    '    </button>'+
    '</div>');
    $("#alertArea").append(alert);
    setTimeout(function() {
        ($(alert) as any).alert('close');
    }, timeout);
    
  }

  success(message: string, timeout = this.defaultTimeout) {
      this.addAlert("success", "<span class='en'>Success!</span><span class='vi'>Sự thành công!</span> ", message, timeout);
  }

  error(message: string, timeout = this.defaultTimeout) {
      this.addAlert("danger", "<span class='en'>Error!</span><span class='vi'>Lỗi!</span> ", message, timeout);
  }
}

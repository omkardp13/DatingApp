import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  private accountService=inject(AccountService);
  private toastr=inject(ToastrService);
  
  @Output() cancelRegister=new EventEmitter();

  model:any={}
  
  ngOnInit() {
   
  }
 

  register()
  {
    this.accountService.register(this.model).subscribe({
      next:response =>
        {
          console.log(response);
          this.cancel();
        },
        error:error =>this.toastr.error(error.error)
    });

  }

  cancel()
  {
    this.cancelRegister.emit(false);
    console.log('cancelled');

  }
}

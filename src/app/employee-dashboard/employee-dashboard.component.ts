import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.module';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  EmployeeObj:EmployeeModel=new EmployeeModel;
  formValue!:FormGroup;
  showAdd!:boolean;
  showUpdate!:boolean;
  employeeData!:any;
  constructor(private api:ApiService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      name:[''],
      email:[''],
      
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
   this.formValue.reset();
   this.showAdd=true;
   this.showUpdate=false;
  }
  postEmployeeDetails(){
   this.EmployeeObj.name=this.formValue.value.name;
   this.EmployeeObj.email=this.formValue.value.email;
   
   this.api.postEmployee(this.EmployeeObj).subscribe(res=>{
     console.log(res);
     let ref=document.getElementById('cancel')
    ref?.click();
     alert('Employee Added Successfully');
     this.formValue.reset();
     this.getAllEmployee();
   });
  }
  updateEmployeeDetails(){
    this.EmployeeObj.name=this.formValue.value.name;
    this.EmployeeObj.email=this.formValue.value.email;
    
    this.api.updateEmployee(this.EmployeeObj,this.EmployeeObj.id)
    .subscribe(res=>{
      alert('Employee Updated Successfully')
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
  EditEmployeeDetails(item:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.EmployeeObj.id=item.id;
    this.formValue.controls['name'].setValue(item.name);;
    this.formValue.controls['email'].setValue(item.email);
  }
  DeleteEmployee(item:any){
    this.api.deleteEmployee(item.id).subscribe(res=>{
      alert('Employee Deleted');
      this.getAllEmployee();
    })

  }
  getAllEmployee(){
   this.api.getEmployee().subscribe(res=>{
     this.employeeData=res;
   })
  }
}

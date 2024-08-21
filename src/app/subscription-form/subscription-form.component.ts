import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscriberService } from '../services/subscriber.service';



@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {

  isSubscribed : boolean = false;

  constructor(private subService : SubscriberService, ){}

  ngOnInit(): void {

  }


  onSubmit(formVal : Sub){
    const subData : Sub = {
      name : formVal.name,
      email : formVal.email
    }

    this.subService.checkSubs(subData.email).subscribe(val => {
      if(val.empty){
        this.subService.addSubs(formVal);
        this.isSubscribed = true;
      }else{
        alert('Email already used')
      }
    })

  }
}

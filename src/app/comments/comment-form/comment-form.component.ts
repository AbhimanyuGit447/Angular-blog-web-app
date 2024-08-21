import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriberService } from 'src/app/services/subscriber.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {

  routerURL : any = '';

  constructor(private subService : SubscriberService, public route : ActivatedRoute){

    this.route.params.subscribe(val => {
      this.routerURL = val;
    })
  }

  onSubmit(formVal : any){
    const subData : any = {
      name : formVal.name,
      comment : formVal.comment
    }

    console.log(subData);


    this.subService.addComment( subData , this.routerURL);

  }

}

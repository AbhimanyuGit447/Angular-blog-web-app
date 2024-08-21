import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriberService } from 'src/app/services/subscriber.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  globalPostUrl : any = null;

  comments : any[] = [];

  constructor( private subscriberService : SubscriberService, public route : ActivatedRoute){
    this.route.params.subscribe(val => {
      this.globalPostUrl = val;
    })
  }

  ngOnInit() {

    console.log('1111');

    this.subscriberService.loadComments(this.globalPostUrl).subscribe(
      (comments) => {
        this.comments = comments;
        console.log(this.comments); // Check the comments fetched
      },
      (error) => {
        console.error("Error fetching comments: ", error);
      }
    );


  }

}

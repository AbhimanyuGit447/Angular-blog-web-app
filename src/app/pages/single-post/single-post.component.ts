import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  postData : any;
  similarpost : any[] = [];

  constructor(private postService : PostService, private route : ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.params.subscribe(val => {

      this.postService.countViews(val['id']);

      this.postService.loadOnePost(val['id']).subscribe(post => {
        this.postData = post;
        this.loadSimilarPosts(this.postData.category.categoryId);
      })
    })



  }


  loadSimilarPosts(catId : any){
    this.postService.loadSimilar(catId).subscribe(val => {
      this.similarpost = val;
    })
  }
}

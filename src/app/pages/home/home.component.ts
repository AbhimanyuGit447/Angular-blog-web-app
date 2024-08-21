import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  featuredPostArray : any[] = [];
  latestPostArray : any[] = [];

  numbers: number[] = [5,10,15,20];
  selectedNumber: number = 5;

  reversedArray : any[] = [];


  constructor(private postService : PostService){


    this.postService.loadFeaturedData(this.selectedNumber).subscribe(val  => {
      this.featuredPostArray = val;

    })

    this.postService.loadLatest().subscribe(val => {
      this.latestPostArray = val;
      this.reversedArray = this.latestPostArray.reverse();
    })
  }

  onNumberChange(event: Event) {

    const target = event.target as HTMLSelectElement;
    this.selectedNumber = Number(target.value);
    this.postService.loadFeaturedData(this.selectedNumber).subscribe(val  => {
      this.featuredPostArray = val;
      console.log(this.featuredPostArray);

    })
  }

}

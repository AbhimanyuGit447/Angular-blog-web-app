import { Injectable } from '@angular/core';
import { Sub } from '../models/sub';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {




  constructor(private afs : AngularFirestore, public route : ActivatedRoute) { }

  addSubs(subData : Sub){
    this.afs.collection('subscribers').add(subData).then(() => {
      console.log('sub saved');

    })
  }

  checkSubs(subEmail : any){
   return this.afs.collection('subscribers', ref => ref.where('email', '==', subEmail)).get()
  }

  addComment(subData : any, url : any){
    this.afs.collection('comments').add({
      postId: url, // Reference to the specific post
      comment: subData.comment,
      name: subData.name,
      timestamp: firebase.default.firestore.FieldValue.serverTimestamp(),
    }).then(
     () => {
      console.log('success');

     }
    )
  }

  loadComments(url : any)  {

   return this.afs.collection('comments', ref => ref.where('postId', '==', url).orderBy('timestamp', 'asc')).snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    })
   )
  }


}

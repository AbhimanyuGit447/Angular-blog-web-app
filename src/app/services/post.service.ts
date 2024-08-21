import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app';
import { map } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public angularFS : AngularFirestore) { }


  loadFeaturedData(limit : number){
    return this.angularFS.collection('posts', ref => ref.where('isFeatured', '==', true).limit(limit) ).snapshotChanges().pipe(
       map(actions => {
        return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;

           return {id, data}
         })
       })
     )
   }

   loadLatest(){
    return this.angularFS.collection('posts', ref => ref.orderBy('createdAt')).snapshotChanges().pipe(
      map(actions => {
       return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, data}
        })
      })
    )
   }

   loadCategoryPosts(categoryId : any){
    return this.angularFS.collection('posts', ref => ref.where('category.categoryId', '==', categoryId).limit(4) ).snapshotChanges().pipe(
      map(actions => {
       return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, data}
        })
      })
    )
   }


   loadOnePost(postId : any){
    return this.angularFS.doc(`posts/${postId}`).valueChanges();
   }

   loadSimilar(catId : any){
    return this.angularFS.collection('posts', ref => ref.where('category.categoryId', '==', catId).limit(4) ).snapshotChanges().pipe(
      map(actions => {
       return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, data}
        })
      })
    )
   }

   countViews(postId : any){



    const viewsCount = {
      views : firebase.default.firestore.FieldValue.increment(1)
    }

    this.angularFS.doc(`posts/${postId}`).update(viewsCount).then(() => {
      console.log('v updated');

    })
   }




  }





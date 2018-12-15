import {Component  , OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {Post} from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector : 'app-post-list',
  templateUrl : './post-list.component.html',
  styleUrls : ['./post-list.component.css']
})






export class PostListComponent implements OnInit , OnDestroy{
 /* posts = [
    {title: 'First Post', content: 'This is first post'},
    {title: 'Second Post', content: 'This is second post'},
    {title: 'THird Post', content: 'This is third post' }
  ];*/
   posts : Post[] = [];
   private postsSub : Subscription;
 constructor (public postService: PostService) {}
 ngOnInit()
 {
   this.postService.getPosts();

   this.postsSub =  this.postService.getPostUpdatedListener()
   .subscribe((post: Post[]) => {
     this.posts = post;
   });



 }
onDelete(postId : string){
  this.postService.deletePost(postId);
}
 ngOnDestroy(){
   this.postsSub.unsubscribe();
 }
}

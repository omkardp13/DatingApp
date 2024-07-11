import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { Member } from 'src/app/_models/member';
import { MembersServisce } from 'src/app/_services/members.service';



@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  private memberService = inject(MembersServisce);
  private route = inject(ActivatedRoute);

  member?: Member;
  images:GalleryItem[]=[];

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    console.log('Username:', username); // Debugging log
    if (!username) {
      console.error("Username parameter not found in route");
      return;
    }

    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        member.photos.map(p =>{
          this.images.push(new ImageItem({src:p.url,thumb:p.url}))
        }

        )
      },
      error: err => console.error(`Failed to load member: ${err}`)
    });
  }
}

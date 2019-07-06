import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';

import { TopStories, Query } from '../types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  stories: TopStories[];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<any>({
        query: gql`
          {
            hn {
              topStories(limit: 30) {
                id
                title
                url
                score
                by {
                  id
                }
                time
                timeISO
                descendants
              }
            }
          }
        `
      })
      .valueChanges.subscribe(res => {
        console.log(res);
        if (res) {
          this.extractData(res.data.hn.topStories);
        } else {
          console.log("Not yet");
        }
      });
  }

  extractData(response) {
    console.log(response);
    if (response) {
      let stories: TopStories[] = [];
      response.forEach(story => {
        stories.push({
          id: story.id,
          title: story.title,
          url: story.url,
          newUrl: story.url ? this.shortenUrl(story.url) : story.url,
          score: story.score,
          by: story.by["id"],
          time: this.getTimeDiff(story.timeISO),
          timeIso: story.timeISO,
          descendants: story.descendants
        });
      });
      this.stories = stories;
      console.log(stories);
    }
  }

  getTimeDiff(time1) {
    const timeNow = Date.now();
    const datePosted = new Date(time1).getTime();
    let timeDiff = (timeNow - datePosted) / 1000;
    timeDiff /= 60 * 60;
    console.log(timeDiff);
    if (timeDiff < 1)
     {
      return `${Math.ceil(timeDiff * 60)
      } minutes`
    } else if ( timeDiff >= 24 )
     {
      if (Math.floor(timeDiff / 24) > 1) 
      {
        return `${Math.floor(timeDiff / 24)} days`;
      }
      return `${Math.floor(timeDiff / 24)
      } day`;
    } else if ( timeDiff === 24) {
      return '1 day';
    } else {
      if (Math.floor(timeDiff) > 1) {
        return `${Math.floor(timeDiff)} hours`;
      }
      return `${Math.floor(timeDiff)} hour`;
    }
  }

  shortenUrl(url) {
    return url.replace(/(^\w+:|^)\/\/(w{3}.)*/, "").split('/')[0];
  }
}

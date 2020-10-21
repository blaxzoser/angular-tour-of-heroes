import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../../hero.service';
import { MessageService } from '../../message.service';

import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  selectedHero: Hero;
  heroes:  Observable<Hero[]>;
  selectedId: number;

  constructor(private heroService: HeroService,
              private messageService: MessageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.heroes = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = +params.get('id');
        return this.heroService.getHeroes();

      })
    );
  }
}

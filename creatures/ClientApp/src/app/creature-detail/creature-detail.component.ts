import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-creature-detail',
  templateUrl: './creature-detail.component.html'
})
export class CreatureDetailComponent implements OnInit {
    creature;
    events

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.http.get<CreatureWithKin>(this.baseUrl + 'api/creatures/' + params.get('moniker')).subscribe(result => {
                this.creature = result;
            }, error => console.error(error));
        });
        this.route.paramMap.subscribe(params => {
            this.http.get<Event>(this.baseUrl + 'api/creatures/' + params.get('moniker') + '/events').subscribe(result => {
                this.events = result;
            }, error => console.error(error));
        });
    }

    lifeStageString(ls: LifeStage): string {
        switch (ls) {
            case LifeStage.Unborn:
                return "Unborn"
            case LifeStage.Baby:
                return "Baby"
            case LifeStage.Child:
                return "Child"
            case LifeStage.Adolescent:
                return "Adolescent"
            case LifeStage.Youth:
                return "Youth"
            case LifeStage.Adult:
                return "Adult"
            case LifeStage.Old:
                return "Old"
            case LifeStage.Ancient:
                return "Ancient"
        }
    }

    histEventTypeString(histEvent: HistEventType): string {
        switch (histEvent) {
            case HistEventType.Conceived:
                return "Conceived"
            case HistEventType.Spliced:
                return "Spliced"
            case HistEventType.Engineered:
                return "Engineered"
            case HistEventType.Cloned:
                return "Cloned"

            case HistEventType.Born:
                return "Born"
            case HistEventType.Aged:
                return "Aged"
            case HistEventType.Exported:
                return "Exported"
            case HistEventType.Imported:
                return "Imported"
            case HistEventType.Died:
                return "Died"
            case HistEventType.BecamePregnant:
                return "Became Pregnant"
            case HistEventType.Impregnated:
                return "Impregnated"
            case HistEventType.ChildBorn:
                return "Child Born"
            case HistEventType.CloneSource:
                return "Clone Source"
            case HistEventType.WarpedOut:
                return "Warped Out"
            case HistEventType.WarpedIn:
                return "Warped In"

            case HistEventType.LaidByMother:
                return "Laid By Mother"
            case HistEventType.LaidAnEgg:
                return "Laid An Egg"
            case HistEventType.Photographed:
                return "Photographed"
        }
    }
}

interface CreatureWithKin {

    moniker: string;
    name: string;

    birthdate: string;

    parent1Moniker: string;
    parent1Name: string;

    parent2Moniker: string;
    parent2Name: string;

    childrenMonikers: [string];
    childrenNames: [string];
}

interface Event {
    moniker: string;
    histEventType: HistEventType;
    lifeStage: LifeStage;
    photo: string;
    moniker1: string;
    moniker2: string;
    timeUTC: number;
    tickAge: number;
    userText: string;
    worldName: string;
    worldTick: number;
    worldId: string;
}

enum LifeStage {
    Unborn = 0,
    Baby = 1,
    Child = 2,
    Adolescent = 3,
    Youth = 4,
    Adult = 5,
    Old = 6,
    Ancient = 7,
}

enum HistEventType{
    Conceived = 0,
    Spliced = 1,
    Engineered = 2,
    Cloned = 14,

    Born = 3,
    Aged = 4,
    Exported = 5,
    Imported = 6,
    Died = 7,
    BecamePregnant = 8,
    Impregnated = 9,
    ChildBorn = 10,
    CloneSource = 15,
    WarpedOut = 16,
    WarpedIn = 17,

    LaidByMother = 11,
    LaidAnEgg = 12,
    Photographed = 13,
}
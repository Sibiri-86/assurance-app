import {Component, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-config',
    template: `
        <a href="#" id="layout-config-button" class="layout-config-button" (click)="onConfigButtonClick($event)">
            <i class="pi pi-cog"></i>
        </a>
        <div id="layout-config" class="layout-config" [ngClass]="{'layout-config-exit-done': !app.configDialogActive,
        'layout-config-enter-done': app.configDialogActive}" [@children]="app.configDialogActive ? 'visibleAnimated' : 'hiddenAnimated'">
            <div class="layout-config-content">
                <a href="#" class="layout-config-close" (click)="onConfigCloseClick($event)">
                    <i class="pi pi-times"></i>
                </a>
                <p-tabView id="config-form-tabs">
                    <p-tabPanel header="Component Themes">
                        <div class="p-grid">
                            <div class="p-col p-xl-2" *ngFor="let componentTheme of componentThemes">
                                <a href="#" class="layout-config-option layout-config-option-image ui-shadow-1"
                                   (click)="app.changeComponentTheme($event,componentTheme.file, componentTheme.scheme)">
                                    <img src="assets/layout/images/configurator/theme/{{componentTheme.image}}"
                                         alt="{{componentTheme.name}}"/>
                                    <i class="pi pi-check"
                                       *ngIf="componentTheme.file === app.theme && componentTheme.scheme === app.scheme"></i>
                                </a>
                            </div>
                        </div>
                    </p-tabPanel>
                    <p-tabPanel header="Layout Themes">
                        <div class="p-grid">
                            <div class="p-col p-xl-2" *ngFor="let layoutTheme of layoutThemes">
                                <a href="#" class="layout-config-option layout-config-option-image ui-shadow-1"
                                   (click)="app.changeLayoutTheme($event,layoutTheme.file, layoutTheme.componentTheme, layoutTheme.scheme)">
                                    <img src="assets/layout/images/configurator/layout/{{layoutTheme.image}}"
                                         alt="{{layoutTheme.name}}"/>
                                    <i class="pi pi-check" *ngIf="layoutTheme.file === app.layout"></i>
                                </a>
                            </div>
                        </div>
                    </p-tabPanel>
                    <p-tabPanel header="Menu Modes">
                        <div class="p-grid">
                            <div class="p-col p-col-fixed">
                                <a href="#" class="layout-config-option layout-config-option-light"
                                   (click)="app.changeLayoutMode($event,'horizontal')">
                                    <img src="assets/layout/images/configurator/menu/horizontal.png" alt="prestige"  style="width:100%"/>
                                    <i class="pi pi-check" *ngIf="app.layoutMode === 'horizontal'"></i>
                                </a>
                            </div>
                            <div class="p-col p-col-fixed">
                                <a href="#" class="layout-config-option layout-config-option-image layout-config-option-light ui-shadow-1"
                                   (click)="app.changeLayoutMode($event,'overlay')">
                                    <img src="assets/layout/images/configurator/menu/overlay.png" alt="prestige"  style="width:100%"/>
                                    <i class="pi pi-check" *ngIf="app.layoutMode !== 'horizontal'"></i>
                                </a>
                            </div>
                        </div>
                    </p-tabPanel>
                </p-tabView>
            </div>
        </div>
    `,
    animations: [
        trigger('children', [
            state('hiddenAnimated', style({
                opacity: 0,
                transform: ' translateX(-50%) translateY(-50%)'
            })),
            state('visibleAnimated', style({
                opacity: 1,
                transform: 'translateX(-50%) translateY(-50%) scale(1)',
            })),
            transition('visibleAnimated => hiddenAnimated', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('150ms cubic-bezier(0, 0, 0.2, 1)'))
        ])
    ]
})
export class AppConfigComponent implements OnInit {

    layoutThemes: any;

    componentThemes: any;

    constructor(public app: AppComponent) {}

    ngOnInit() {
        this.componentThemes = [
            {name: 'Amber Accent', file: 'amber', scheme: 'accent', image: 'amber-accent.svg'},
            {name: 'Amber Light', file: 'amber', scheme: 'light', image: 'amber-light.svg'},
            {name: 'Amber Dark', file: 'amber', scheme: 'dark', image: 'amber-dark.svg'},
            {name: 'Blue Accent', file: 'blue', scheme: 'accent', image: 'blue-accent.svg'},
            {name: 'Blue Light', file: 'blue', scheme: 'light', image: 'blue-light.svg'},
            {name: 'Blue Dark', file: 'blue', scheme: 'dark', image: 'blue-dark.svg'},
            {name: 'Blue Gray Accent', file: 'bluegray', scheme: 'accent', image: 'bluegray-accent.svg'},
            {name: 'Blue Gray Light', file: 'bluegray', scheme: 'light', image: 'bluegray-light.svg'},
            {name: 'Blue Gray Dark', file: 'bluegray', scheme: 'dark', image: 'bluegray-dark.svg'},
            {name: 'Brown Accent', file: 'brown', scheme: 'accent', image: 'brown-accent.svg'},
            {name: 'Brown Light', file: 'brown', scheme: 'light', image: 'brown-light.svg'},
            {name: 'Brown Dark', file: 'brown', scheme: 'dark', image: 'brown-dark.svg'},
            {name: 'Cyan Accent', file: 'cyan', scheme: 'accent', image: 'cyan-accent.svg'},
            {name: 'Cyan Light', file: 'cyan', scheme: 'light', image: 'cyan-light.svg'},
            {name: 'Cyan Dark', file: 'cyan', scheme: 'dark', image: 'cyan-dark.svg'},
            {name: 'Deep Orange Accent', file: 'deeporange', scheme: 'accent', image: 'deeporange-accent.svg'},
            {name: 'Deep Orange Light', file: 'deeporange', scheme: 'light', image: 'deeporange-light.svg'},
            {name: 'Deep Orange Dark', file: 'deeporange', scheme: 'dark', image: 'deeporange-dark.svg'},
            {name: 'Gray Accent', file: 'gray', scheme: 'accent', image: 'gray-accent.svg'},
            {name: 'Gray Light', file: 'gray', scheme: 'light', image: 'gray-light.svg'},
            {name: 'Gray Dark', file: 'gray', scheme: 'dark', image: 'gray-dark.svg'},
            {name: 'Green Accent', file: 'green', scheme: 'accent', image: 'green-accent.svg'},
            {name: 'Green Light', file: 'green', scheme: 'light', image: 'green-light.svg'},
            {name: 'Green Dark', file: 'green', scheme: 'dark', image: 'green-dark.svg'},
            {name: 'Indigo Accent', file: 'indigo', scheme: 'accent', image: 'indigo-accent.svg'},
            {name: 'Indigo Light', file: 'indigo', scheme: 'light', image: 'indigo-light.svg'},
            {name: 'Indigo Dark', file: 'indigo', scheme: 'dark', image: 'indigo-dark.svg'},
            {name: 'Lime Accent', file: 'lime', scheme: 'accent', image: 'lime-accent.svg'},
            {name: 'Lime Light', file: 'lime', scheme: 'light', image: 'lime-light.svg'},
            {name: 'Lime Dark', file: 'lime', scheme: 'dark', image: 'lime-dark.svg'},
            {name: 'Pink Accent', file: 'pink', scheme: 'accent', image: 'pink-accent.svg'},
            {name: 'Pink Light', file: 'pink', scheme: 'light', image: 'pink-light.svg'},
            {name: 'Pink Dark', file: 'pink', scheme: 'dark', image: 'pink-dark.svg'},
            {name: 'Deep Blue Accent', file: 'deepblue', scheme: 'accent', image: 'deepblue-accent.svg'},
            {name: 'Deep Blue Light', file: 'deepblue', scheme: 'light', image: 'deepblue-light.svg'},
            {name: 'Deep Blue Dark', file: 'deepblue', scheme: 'dark', image: 'deepblue-dark.svg'},
            {name: 'Deep Purple Accent', file: 'deeppurple', scheme: 'accent', image: 'deeppurple-accent.svg'},
            {name: 'Deep Purple Light', file: 'deeppurple', scheme: 'light', image: 'deeppurple-light.svg'},
            {name: 'Deep Purple Dark', file: 'deeppurple', scheme: 'dark', image: 'deeppurple-dark.svg'},
            {name: 'Teal Accent', file: 'teal', scheme: 'accent', image: 'teal-accent.svg'},
            {name: 'Teal Light', file: 'teal', scheme: 'light', image: 'teal-light.svg'},
            {name: 'Teal Dark', file: 'teal', scheme: 'dark', image: 'teal-dark.svg'},
            {name: 'Purple Accent', file: 'purple', scheme: 'accent', image: 'purple-accent.svg'},
            {name: 'Purple Light', file: 'purple', scheme: 'light', image: 'purple-light.svg'},
            {name: 'Purple Dark', file: 'purple', scheme: 'dark', image: 'purple-dark.svg'},
            {name: 'Turquoise Accent', file: 'turquoise', scheme: 'accent', image: 'turquoise-accent.svg'},
            {name: 'Turquoise Light', file: 'turquoise', scheme: 'light', image: 'turquoise-light.svg'},
            {name: 'Turquoise Dark', file: 'turquoise', scheme: 'dark', image: 'turquoise-dark.svg'},
        ];

        this.layoutThemes = [
            {name: 'Aloe', file: 'layout-aloe', image: 'aloe.png', componentTheme: 'turquoise', scheme: 'accent'},
            {name: 'Aqua', file: 'layout-aqua', image: 'aqua.png', componentTheme: 'cyan', scheme: 'dark'},
            {name: 'Bangkok', file: 'layout-bangkok', image: 'bangkok.png', componentTheme: 'turquoise', scheme: 'accent'},
            {name: 'Canvas', file: 'layout-canvas', image: 'canvas.png', componentTheme: 'deepblue', scheme: 'light'},
            {name: 'Cross', file: 'layout-cross', image: 'cross.png', componentTheme: 'purple', scheme: 'dark'},
            {name: 'Dream', file: 'layout-dream', image: 'dream.png', componentTheme: 'teal', scheme: 'light'},
            {name: 'Emerald', file: 'layout-emerald', image: 'emerald.png', componentTheme: 'teal', scheme: 'light'},
            {name: 'Focus', file: 'layout-focus', image: 'focus.png', componentTheme: 'turquoise', scheme: 'dark'},
            {name: 'Forest', file: 'layout-forest', image: 'forest.png', componentTheme: 'turquoise', scheme: 'light'},
            {name: 'Fractal', file: 'layout-fractal', image: 'fractal.png', componentTheme: 'teal', scheme: 'dark'},
            {name: 'Gem', file: 'layout-gem', image: 'gem.png', componentTheme: 'amber', scheme: 'accent'},
            {name: 'Green', file: 'layout-green', image: 'green.png', componentTheme: 'green', scheme: 'light'},
            {name: 'Indigo', file: 'layout-indigo', image: 'indigo.png', componentTheme: 'indigo', scheme: 'light'},
            {name: 'Joshua', file: 'layout-joshua', image: 'joshua.png', componentTheme: 'pink', scheme: 'dark'},
            {name: 'Laser', file: 'layout-laser', image: 'laser.png', componentTheme: 'indigo', scheme: 'light'},
            {name: 'Lime', file: 'layout-lime', image: 'lime.png', componentTheme: 'lime', scheme: 'dark'},
            {name: 'Maze', file: 'layout-maze', image: 'maze.png', componentTheme: 'deeporange', scheme: 'dark'},
            {name: 'Metro', file: 'layout-metro', image: 'metro.png', componentTheme: 'gray', scheme: 'light'},
            {name: 'Milan', file: 'layout-milan', image: 'milan.png', componentTheme: 'gray', scheme: 'dark'},
            {name: 'Night', file: 'layout-night', image: 'night.png', componentTheme: 'bluegray', scheme: 'light'},
            {name: 'Osterreich', file: 'layout-osterreich', image: 'osterreich.png', componentTheme: 'cyan', scheme: 'light'},
            {name: 'Palm', file: 'layout-palm', image: 'palm.png', componentTheme: 'teal', scheme: 'dark'},
            {name: 'Deep Purple', file: 'layout-deeppurple', image: 'deeppurple.png', componentTheme: 'deeppurple', scheme: 'light'},
            {name: 'Petroleum', file: 'layout-petroleum', image: 'petroleum.png', componentTheme: 'gray', scheme: 'accent'},
            {name: 'Rose', file: 'layout-rose', image: 'rose.png', componentTheme: 'pink', scheme: 'light'},
            {name: 'Sand', file: 'layout-sand', image: 'sand.png', componentTheme: 'brown', scheme: 'dark'},
            {name: 'Steel', file: 'layout-steel', image: 'steel.png', componentTheme: 'blue', scheme: 'light'},
            {name: 'Summer', file: 'layout-summer', image: 'summer.png', componentTheme: 'teal', scheme: 'accent'},
            {name: 'Turquoise', file: 'layout-turquoise', image: 'turquoise.png', componentTheme: 'turquoise', scheme: 'accent'},
            {name: 'Urban', file: 'layout-urban', image: 'urban.png', componentTheme: 'deepblue', scheme: 'accent'},
        ];
    }

    onConfigButtonClick(event) {
        this.app.configDialogActive = true;
        event.preventDefault();
    }

    onConfigCloseClick(event) {
        this.app.configDialogActive = false;
        event.preventDefault();
    }
}

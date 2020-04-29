import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-config',
    template: `
        <div id="layout-config" class="layout-config" [ngClass]="{'layout-config-active': app.configDialogActive}" (click)="app.configClick=true">
            <div class="layout-config-content">
				<a href="#" id="layout-config-button" class="layout-config-button" (click)="onConfigButtonClick($event)">
					<i class="pi pi-cog"></i>
				</a>
                <a href="#" class="layout-config-close" (click)="onConfigCloseClick($event)">
                    <i class="pi pi-times"></i>
                </a>
                <p-tabView id="config-form-tabs">
                    <p-tabPanel header="Layout Customization">
						<h1>Wrapper Modes</h1>
						<div class="p-grid">
							<div class="p-col p-col-fixed">
								<a href="#" class="layout-config-option" [ngClass]="{'selected': app.wrapperMode === false}"
								   (click)="app.changeWrapperMode($event, false)">
									<img src="assets/layout/images/configurator/wrapper/Boxed.png" alt="prestige"  style="width:100%"/>
									<i class="pi pi-check" *ngIf="app.wrapperMode === false"></i>
								</a>
							</div>
							<div class="p-col p-col-fixed">
								<a href="#" class="layout-config-option"  [ngClass]="{'selected': app.wrapperMode === true}"
								   (click)="app.changeWrapperMode($event, true)">
									<img src="assets/layout/images/configurator/wrapper/FullWidth.png" alt="prestige"  style="width:100%"/>
									<i class="pi pi-check" *ngIf="app.wrapperMode === true"></i>
								</a>
							</div>
						</div>

						<h1>Menu Modes</h1>
						<div class="p-grid">
							<div class="p-col p-col-fixed">
								<a href="#" class="layout-config-option" [ngClass]="{'selected': app.layoutMode === 'horizontal'}"
								   (click)="app.changeLayoutMode($event,'horizontal')">
									<img src="assets/layout/images/configurator/menu/horizontal.png" alt="prestige"  style="width:100%"/>
									<i class="pi pi-check" *ngIf="app.layoutMode === 'horizontal'"></i>
								</a>
							</div>
							<div class="p-col p-col-fixed">
								<a href="#" class="layout-config-option"  [ngClass]="{'selected': app.layoutMode === 'overlay'}"
								   (click)="app.changeLayoutMode($event,'overlay')">
									<img src="assets/layout/images/configurator/menu/overlay.png" alt="prestige"  style="width:100%"/>
									<i class="pi pi-check" *ngIf="app.layoutMode !== 'horizontal'"></i>
								</a>
							</div>
						</div>

						<h1>Colored Themes</h1>
                        <div class="p-grid">
                            <div class="p-col p-col-fixed colors" *ngFor="let l of layoutThemesColored">
                                <a href="#" class="layout-config-option" [ngClass]="{'selected': app.layout === l.file}" [title]="l.name"
								   [ngStyle]="{'background-image': 'linear-gradient(to right, ' + l.color1 +','+ l.color2+')'} "
								   (click)="app.changeLayoutTheme($event,l.file, l.componentTheme, l.scheme)">
                                    <i class="pi pi-check" *ngIf="l.file === app.layout"></i>
                                </a>
                            </div>
                        </div>

						<h1>Image Themes</h1>
						<div class="p-grid">
							<div class="p-col p-col-fixed colors" *ngFor="let l of layoutThemesImage">
								<a href="#" class="layout-config-option" [ngClass]="{'selected': app.layout === l.file}" [title]="l.name"
								   (click)="app.changeLayoutTheme($event,l.file, l.componentTheme, l.scheme)">
									<img src="assets/layout/images/configurator/layout/{{l.image}}" alt="{{l.name}}"/>
									<i class="pi pi-check" *ngIf="l.file === app.layout"></i>
								</a>
							</div>
						</div>
                    </p-tabPanel>

                    <p-tabPanel header="Component Themes">
                        <div class="p-grid">
                            <div class="p-col p-col-fixed colors" *ngFor="let componentTheme of componentThemes">
                                <a href="#" class="layout-config-option"
                                   [ngClass]="{'selected': componentTheme.file === app.theme && componentTheme.scheme === app.scheme}"
                                   (click)="app.changeComponentTheme($event,componentTheme.file, componentTheme.scheme)">
                                    <img src="assets/layout/images/configurator/theme/{{componentTheme.image}}"
                                         alt="{{componentTheme.name}}"/>
                                    <i class="pi pi-check"
                                       *ngIf="componentTheme.file === app.theme && componentTheme.scheme === app.scheme"></i>
                                </a>
                            </div>
                        </div>
                    </p-tabPanel>
                </p-tabView>
            </div>
        </div>
    `
})
export class AppConfigComponent implements OnInit {

    layoutThemesColored: any;

    layoutThemesImage: any;

    componentThemes: any;

    constructor(public app: AppMainComponent) {}

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
            {name: 'Deep Purple Accent', file: 'deeppurple', scheme: 'accent', image: 'deeppurple-accent.svg'},
            {name: 'Deep Purple Light', file: 'deeppurple', scheme: 'light', image: 'deeppurple-light.svg'},
            {name: 'Deep Purple Dark', file: 'deeppurple', scheme: 'dark', image: 'deeppurple-dark.svg'},
            {name: 'Green Accent', file: 'green', scheme: 'accent', image: 'green-accent.svg'},
            {name: 'Green Light', file: 'green', scheme: 'light', image: 'green-light.svg'},
            {name: 'Green Dark', file: 'green', scheme: 'dark', image: 'green-dark.svg'},
            {name: 'Indigo Accent', file: 'indigo', scheme: 'accent', image: 'indigo-accent.svg'},
            {name: 'Indigo Light', file: 'indigo', scheme: 'light', image: 'indigo-light.svg'},
            {name: 'Indigo Dark', file: 'indigo', scheme: 'dark', image: 'indigo-dark.svg'},
            {name: 'Light Blue Accent', file: 'lightblue', scheme: 'accent', image: 'lightblue-accent.svg'},
            {name: 'Light Blue Light', file: 'lightblue', scheme: 'light', image: 'lightblue-light.svg'},
            {name: 'Light Blue Dark', file: 'lightblue', scheme: 'dark', image: 'lightblue-dark.svg'},
            {name: 'Light Green Accent', file: 'lightgreen', scheme: 'accent', image: 'lightgreen-accent.svg'},
            {name: 'Light Green Light', file: 'lightgreen', scheme: 'light', image: 'lightgreen-light.svg'},
            {name: 'Light Green Dark', file: 'lightgreen', scheme: 'dark', image: 'lightgreen-dark.svg'},
            {name: 'Lime Accent', file: 'lime', scheme: 'accent', image: 'lime-accent.svg'},
            {name: 'Lime Light', file: 'lime', scheme: 'light', image: 'lime-light.svg'},
            {name: 'Lime Dark', file: 'lime', scheme: 'dark', image: 'lime-dark.svg'},
            {name: 'Orange Accent', file: 'orange', scheme: 'accent', image: 'orange-accent.svg'},
            {name: 'Orange Light', file: 'orange', scheme: 'light', image: 'orange-light.svg'},
            {name: 'Orange Dark', file: 'orange', scheme: 'dark', image: 'orange-dark.svg'},
            {name: 'Pink Accent', file: 'pink', scheme: 'accent', image: 'pink-accent.svg'},
            {name: 'Pink Light', file: 'pink', scheme: 'light', image: 'pink-light.svg'},
            {name: 'Pink Dark', file: 'pink', scheme: 'dark', image: 'pink-dark.svg'},
            {name: 'Purple Accent', file: 'purple', scheme: 'accent', image: 'purple-accent.svg'},
            {name: 'Purple Light', file: 'purple', scheme: 'light', image: 'purple-light.svg'},
            {name: 'Purple Dark', file: 'purple', scheme: 'dark', image: 'purple-dark.svg'},
            {name: 'Teal Accent', file: 'teal', scheme: 'accent', image: 'teal-accent.svg'},
            {name: 'Teal Light', file: 'teal', scheme: 'light', image: 'teal-light.svg'},
            {name: 'Teal Dark', file: 'teal', scheme: 'dark', image: 'teal-dark.svg'},
            {name: 'Yellow Accent', file: 'yellow', scheme: 'accent', image: 'yellow-accent.svg'},
            {name: 'Yellow Light', file: 'yellow', scheme: 'light', image: 'yellow-light.svg'},
            {name: 'Yellow Dark', file: 'yellow', scheme: 'dark', image: 'yellow-dark.svg'}
        ];

        this.layoutThemesImage = [
            {name: 'Aqua', file: 'layout-aqua', image: 'aqua.png', componentTheme: 'cyan', scheme: 'light'},
            {name: 'Arecaceae', file: 'layout-arecaceae', image: 'arecaceae.png', componentTheme: 'green', scheme: 'light'},
            {name: 'Canvas', file: 'layout-canvas', image: 'canvas.png', componentTheme: 'indigo', scheme: 'light'},
            {name: 'Cross', file: 'layout-cross', image: 'cross.png', componentTheme: 'brown', scheme: 'light'},
            {name: 'Dream', file: 'layout-dream', image: 'dream.png', componentTheme: 'teal', scheme: 'light'},
            {name: 'Emerald', file: 'layout-emerald', image: 'emerald.png', componentTheme: 'bluegray', scheme: 'light'},
            {name: 'Focus', file: 'layout-focus', image: 'focus.png', componentTheme: 'bluegray', scheme: 'light'},
            {name: 'Forest', file: 'layout-forest', image: 'forest.png', componentTheme: 'teal', scheme: 'light'},
            {name: 'Fractal', file: 'layout-fractal', image: 'fractal.png', componentTheme: 'teal', scheme: 'light'},
            {name: 'Gem', file: 'layout-gem', image: 'gem.png', componentTheme: 'amber', scheme: 'light'},
            {name: 'Grass', file: 'layout-grass', image: 'grass.png', componentTheme: 'lightgreen', scheme: 'light'},
            {name: 'Jungfraujoch', file: 'layout-jungfraujoch', image: 'jungfraujoch.png', componentTheme: 'lightblue', scheme: 'light'},
            {name: 'Mackenzie', file: 'layout-mackenzie', image: 'mackenzie.png', componentTheme: 'bluegray', scheme: 'light'},
            {name: 'Madrid', file: 'layout-madrid', image: 'madrid.png', componentTheme: 'bluegray', scheme: 'light'},
            {name: 'Marble', file: 'layout-marble', image: 'marble.png', componentTheme: 'purple', scheme: 'light'},
            {name: 'Metro', file: 'layout-metro', image: 'metro.png', componentTheme: 'bluegray', scheme: 'light'},
            {name: 'Milan', file: 'layout-milan', image: 'milan.png', componentTheme: 'bluegray', scheme: 'light'},
            {name: 'Mist', file: 'layout-mist', image: 'mist.png', componentTheme: 'cyan', scheme: 'light'},
            {name: 'Osterreich', file: 'layout-osterreich', image: 'osterreich.png', componentTheme: 'cyan', scheme: 'light'},
            {name: 'Palm', file: 'layout-palm', image: 'palm.png', componentTheme: 'bluegray', scheme: 'light'},
            {name: 'Polygon', file: 'layout-polygon', image: 'polygon.png', componentTheme: 'lightblue', scheme: 'light'},
            {name: 'Sand', file: 'layout-sand', image: 'sand.png', componentTheme: 'brown', scheme: 'light'},
            {name: 'Stone', file: 'layout-stone', image: 'stone.png', componentTheme: 'lightgreen', scheme: 'light'},
            {name: 'Wood', file: 'layout-wood', image: 'wood.png', componentTheme: 'green', scheme: 'light'}
        ],
        this.layoutThemesColored = [
            {name: 'Amber', file: 'layout-amber', color1: '#FFB300', color2: '#FF6F00', componentTheme: 'amber', scheme: 'light'},
            {name: 'Amethyst', file: 'layout-amethyst', color1: '#8E24AA', color2: '#5E35B1', componentTheme: 'purple', scheme: 'light'},
            {name: 'Blue', file: 'layout-blue', color1: '#1E88E5', color2: '#0D47A1', componentTheme: 'blue', scheme: 'light'},
            {name: 'Blue Grey', file: 'layout-bluegray', color1: '#546E7A', color2: '#263238', componentTheme: 'bluegray', scheme: 'light'},
            {name: 'Brown', file: 'layout-brown', color1: '#6D4C41', color2: '#3E2723', componentTheme: 'brown', scheme: 'light'},
            {name: 'Cyan', file: 'layout-cyan', color1: '#00ACC1', color2: '#006064', componentTheme: 'cyan', scheme: 'light'},
            {name: 'Deep Orange', file: 'layout-deeporange', color1: '#F4511E',
                color2: '#BF360C', componentTheme: 'deeporange', scheme: 'light'},
            {name: 'Deep Purple', file: 'layout-deeppurple', color1: '#5E35B1',
                color2: '#311B92', componentTheme: 'deeppurple', scheme: 'light'},
            {name: 'Fate', file: 'layout-fate', color1: '#3949AB', color2: '#D81B60', componentTheme: 'blue', scheme: 'light'},
            {name: 'Green', file: 'layout-green', color1: '#43A047', color2: '#1B5E20', componentTheme: 'green', scheme: 'light'},
            {name: 'Indigo', file: 'layout-indigo', color1: '#3949AB', color2: '#1A237E', componentTheme: 'indigo', scheme: 'light'},
            {name: 'Light Blue', file: 'layout-lightblue', color1: '#039BE5',
                color2: '#01579B', componentTheme: 'lightblue', scheme: 'light'},
            {name: 'Light Green', file: 'layout-lightgreen', color1: '#7CB342',
                color2: '#33691E', componentTheme: 'lightgreen', scheme: 'light'},
            {name: 'Lime', file: 'layout-lime', color1: '#C0CA33', color2: '#827717', componentTheme: 'lime', scheme: 'light'},
            {name: 'Midnight', file: 'layout-midnight', color1: '#2c3640', color2: '#15202b', componentTheme: 'blue', scheme: 'light'},
            {name: 'Orange', file: 'layout-orange', color1: '#FB8C00', color2: '#E65100', componentTheme: 'orange', scheme: 'light'},
            {name: 'Pink', file: 'layout-pink', color1: '#D81B60', color2: '#880E4F', componentTheme: 'pink', scheme: 'light'},
            {name: 'Purple', file: 'layout-purple', color1: '#8E24AA', color2: '#4A148C', componentTheme: 'purple', scheme: 'light'},
            {name: 'Rhyme', file: 'layout-rhyme', color1: '#1E88E5', color2: '#8E24AA', componentTheme: 'blue', scheme: 'light'},
            {name: 'Smoke', file: 'layout-smoke', color1: '#6c757d', color2: '#343a40', componentTheme: 'lightgreen', scheme: 'light'},
            {name: 'Soul', file: 'layout-soul', color1: '#1E88E5', color2: '#311B92', componentTheme: 'blue', scheme: 'light'},
            {name: 'Steel', file: 'layout-steel', color1: '#43464B', color2: '#212325', componentTheme: 'lightgreen', scheme: 'light'},
            {name: 'Teal', file: 'layout-teal', color1: '#00897B', color2: '#004D40', componentTheme: 'teal', scheme: 'light'},
            {name: 'Yellow', file: 'layout-yellow', color1: '#FDD835', color2: '#F57F17', componentTheme: 'yellow', scheme: 'light'}
        ];
    }

    onConfigButtonClick(event) {
        this.app.configDialogActive = !this.app.configDialogActive;
        this.app.configClick = true;
        event.preventDefault();
    }

    onConfigCloseClick(event) {
        this.app.configDialogActive = false;
        event.preventDefault();
    }
}

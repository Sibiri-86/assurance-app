import {Component, OnInit} from '@angular/core';
import { AppComponent } from './app.component';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-config',
    template: `
         <a style="cursor: pointer" id="layout-config-button" class="layout-config-button" (click)="onConfigButtonClick($event)">
            <i class="pi pi-cog"></i>
        </a>
        <div class="layout-config" [ngClass]="{'layout-config-active': appMain.configDialogActive}" (click)="appMain.onConfigClick()">
            <h5>Menu Type</h5>
            <div class="p-field-radiobutton">
                <p-radioButton name="menuMode" value="horizontal" [(ngModel)]="app.layoutMode" inputId="mode1"></p-radioButton>
                <label for="mode1">Horizontal</label>
            </div>
            <div class="p-field-radiobutton">
                <p-radioButton name="menuMode" value="overlay" [(ngModel)]="app.layoutMode" inputId="mode2"></p-radioButton>
                <label for="mode2">Overlay</label>
            </div>
            <hr />

            <h5>Wrapper Mode</h5>
            <div class="p-field-radiobutton">
                <p-radioButton name="wrapMode" [value]="false" [(ngModel)]="app.wrapperMode" inputId="wrapMode1"></p-radioButton>
                <label for="wrapMode1">Boxed</label>
            </div>
            <div class="p-field-radiobutton">
                <p-radioButton name="wrapMode" [value]="true" [(ngModel)]="app.wrapperMode" inputId="wrapMode2"></p-radioButton>
                <label for="wrapMode2">Filled</label>
            </div>

            <hr />

            <h5>Input Style</h5>
            <div class="p-field-radiobutton">
                <p-radioButton name="inputStyle" value="outlined" [(ngModel)]="app.inputStyle" inputId="inputStyle1"></p-radioButton>
                <label for="inputStyle1">Outlined</label>
            </div>
            <div class="p-field-radiobutton">
                <p-radioButton name="inputStyle" value="filled" [(ngModel)]="app.inputStyle" inputId="inputStyle2"></p-radioButton>
                <label for="inputStyle2">Filled</label>
            </div>

            <hr />

            <h5>Ripple Effect</h5>
			<p-inputSwitch [ngModel]="app.ripple" (onChange)="appMain.onRippleChange($event)"></p-inputSwitch>

            <hr />

            <h5>Layout Theme</h5>

            <div class="p-field-radiobutton">
                <p-radioButton inputId="layoutColored" name="menuColor"  value="color" [(ngModel)]="layoutColorMode" (onClick)="changeMenuColorMode('color')"></p-radioButton>
                <label for="layoutColored">Colored</label>
            </div>
            <div class="p-field-radiobutton">
                <p-radioButton inputId="layoutImage" name="menuColor" value="image" [(ngModel)]="layoutColorMode" (onClick)="changeMenuColorMode('image')"></p-radioButton>
                <label for="layoutImage">Custom</label>
            </div>
            <div class="layout-themes">
                <div *ngFor="let l of layoutThemes">
                    <a style="cursor: pointer" (click)="changeLayoutTheme($event, l.file, l.componentTheme)" [title]="l.name" [ngStyle]="{'background-image': 'linear-gradient(to right, ' + l.color1 +','+ l.color2+')'} ">
                        <img *ngIf="layoutColorMode === 'image'" src="assets/layout/images/configurator/layout/{{l.image}}" alt="{{l.name}}"/>    
                    </a>
                </div>
            </div>
            <h5>Theme Colors</h5>
            <div class="layout-themes">
                <div *ngFor="let t of componentThemes">
                    <a style="cursor: pointer" (click)="changeComponentTheme(t.file)" [title]="t.name" [ngStyle]="{'background-color': t.color}"></a>
                </div>
            </div>
    `
})
export class AppConfigComponent implements OnInit {

    layoutThemesColored: any;

    layoutThemesImage: any;

    componentThemes: any;

    layoutColorMode = "color"

    layoutThemes: any;

    constructor(public appMain: AppMainComponent, public app: AppComponent) {}

    ngOnInit() {
        this.componentThemes = [
            {name: 'Amber Accent', file: 'amber', color: '#FFC107'},
            {name: 'Blue Accent', file: 'blue', color: '#2196F3'},
            {name: 'Blue Gray Accent', file: 'bluegray', color: '#607D8B'},
            {name: 'Brown Accent', file: 'brown', color: '#795548'},
            {name: 'Cyan Accent', file: 'cyan', color: '#00BCD4'},
            {name: 'Deep Orange Accent', file: 'deeporange', color: '#FF5722'},
            {name: 'Deep Purple Accent', file: 'deeppurple', color: '#673AB7'},
            {name: 'Green Accent', file: 'green', color: '#4CAF50'},
            {name: 'Indigo Accent', file: 'indigo', color: '#3F51B5'},
            {name: 'Light Blue Accent', file: 'lightblue', color: '#03A9F4'},
            {name: 'Light Green Accent', file: 'lightgreen', color: '#8BC34A'},
            {name: 'Lime Accent', file: 'lime', color: '#CDDC39'},
            {name: 'Orange Accent', file: 'orange', color: '#FF9800'},
            {name: 'Pink Accent', file: 'pink', color: '#E91E63'},
            {name: 'Purple Accent', file: 'purple', color: '#9C27B0'},
            {name: 'Teal Accent', file: 'teal', color: '#00796B'},
            {name: 'Yellow Accent', file: 'yellow', color: '#FFEB3B'},
        ];

        this.layoutThemesImage = [
            {name: 'Aqua', file: 'layout-aqua', image: 'aqua.png', componentTheme: 'cyan'},
            {name: 'Arecaceae', file: 'layout-arecaceae', image: 'arecaceae.png', componentTheme: 'green'},
            {name: 'Canvas', file: 'layout-canvas', image: 'canvas.png', componentTheme: 'indigo'},
            {name: 'Cross', file: 'layout-cross', image: 'cross.png', componentTheme: 'brown'},
            {name: 'Dream', file: 'layout-dream', image: 'dream.png', componentTheme: 'teal'},
            {name: 'Emerald', file: 'layout-emerald', image: 'emerald.png', componentTheme: 'bluegray'},
            {name: 'Focus', file: 'layout-focus', image: 'focus.png', componentTheme: 'bluegray'},
            {name: 'Forest', file: 'layout-forest', image: 'forest.png', componentTheme: 'teal'},
            {name: 'Fractal', file: 'layout-fractal', image: 'fractal.png', componentTheme: 'teal'},
            {name: 'Gem', file: 'layout-gem', image: 'gem.png', componentTheme: 'amber'},
            {name: 'Grass', file: 'layout-grass', image: 'grass.png', componentTheme: 'lightgreen'},
            {name: 'Jungfraujoch', file: 'layout-jungfraujoch', image: 'jungfraujoch.png', componentTheme: 'lightblue'},
            {name: 'Mackenzie', file: 'layout-mackenzie', image: 'mackenzie.png', componentTheme: 'bluegray'},
            {name: 'Madrid', file: 'layout-madrid', image: 'madrid.png', componentTheme: 'bluegray'},
            {name: 'Marble', file: 'layout-marble', image: 'marble.png', componentTheme: 'purple'},
            {name: 'Metro', file: 'layout-metro', image: 'metro.png', componentTheme: 'bluegray'},
            {name: 'Milan', file: 'layout-milan', image: 'milan.png', componentTheme: 'bluegray'},
            {name: 'Mist', file: 'layout-mist', image: 'mist.png', componentTheme: 'cyan'},
            {name: 'Osterreich', file: 'layout-osterreich', image: 'osterreich.png', componentTheme: 'cyan'},
            {name: 'Palm', file: 'layout-palm', image: 'palm.png', componentTheme: 'bluegray'},
            {name: 'Polygon', file: 'layout-polygon', image: 'polygon.png', componentTheme: 'lightblue'},
            {name: 'Sand', file: 'layout-sand', image: 'sand.png', componentTheme: 'brown'},
            {name: 'Stone', file: 'layout-stone', image: 'stone.png', componentTheme: 'lightgreen'},
            {name: 'Wood', file: 'layout-wood', image: 'wood.png', componentTheme: 'green'}
        ],
        this.layoutThemesColored = [
            {name: 'Amber', file: 'layout-amber', color1: '#FFB300', color2: '#FF6F00', componentTheme: 'amber'},
            {name: 'Amethyst', file: 'layout-amethyst', color1: '#8E24AA', color2: '#5E35B1', componentTheme: 'purple'},
            {name: 'Blue', file: 'layout-blue', color1: '#1E88E5', color2: '#0D47A1', componentTheme: 'blue'},
            {name: 'Blue Grey', file: 'layout-bluegray', color1: '#546E7A', color2: '#263238', componentTheme: 'bluegray'},
            {name: 'Brown', file: 'layout-brown', color1: '#6D4C41', color2: '#3E2723', componentTheme: 'brown'},
            {name: 'Cyan', file: 'layout-cyan', color1: '#00ACC1', color2: '#006064', componentTheme: 'cyan'},
            {name: 'Deep Orange', file: 'layout-deeporange', color1: '#F4511E',
                color2: '#BF360C', componentTheme: 'deeporange'},
            {name: 'Deep Purple', file: 'layout-deeppurple', color1: '#5E35B1',
                color2: '#311B92', componentTheme: 'deeppurple'},
            {name: 'Fate', file: 'layout-fate', color1: '#3949AB', color2: '#D81B60', componentTheme: 'blue'},
            {name: 'Green', file: 'layout-green', color1: '#43A047', color2: '#1B5E20', componentTheme: 'green'},
            {name: 'Indigo', file: 'layout-indigo', color1: '#3949AB', color2: '#1A237E', componentTheme: 'indigo'},
            {name: 'Light Blue', file: 'layout-lightblue', color1: '#039BE5',
                color2: '#01579B', componentTheme: 'lightblue'},
            {name: 'Light Green', file: 'layout-lightgreen', color1: '#7CB342',
                color2: '#33691E', componentTheme: 'lightgreen'},
            {name: 'Lime', file: 'layout-lime', color1: '#C0CA33', color2: '#827717', componentTheme: 'lime'},
            {name: 'Midnight', file: 'layout-midnight', color1: '#2c3640', color2: '#15202b', componentTheme: 'blue'},
            {name: 'Orange', file: 'layout-orange', color1: '#FB8C00', color2: '#E65100', componentTheme: 'orange'},
            {name: 'Pink', file: 'layout-pink', color1: '#D81B60', color2: '#880E4F', componentTheme: 'pink'},
            {name: 'Purple', file: 'layout-purple', color1: '#8E24AA', color2: '#4A148C', componentTheme: 'purple'},
            {name: 'Rhyme', file: 'layout-rhyme', color1: '#1E88E5', color2: '#8E24AA', componentTheme: 'blue'},
            {name: 'Smoke', file: 'layout-smoke', color1: '#6c757d', color2: '#343a40', componentTheme: 'lightgreen'},
            {name: 'Soul', file: 'layout-soul', color1: '#1E88E5', color2: '#311B92', componentTheme: 'blue'},
            {name: 'Steel', file: 'layout-steel', color1: '#43464B', color2: '#212325', componentTheme: 'lightgreen'},
            {name: 'Teal', file: 'layout-teal', color1: '#00897B', color2: '#004D40', componentTheme: 'teal'},
            {name: 'Yellow', file: 'layout-yellow', color1: '#FDD835', color2: '#F57F17', componentTheme: 'yellow'}
        ];

        this.layoutThemes = this.layoutThemesColored;
    }

    changeMenuColorMode(mode) {
        if (mode === 'color') {
            this.layoutThemes = this.layoutThemesColored;
        }
        else {
            this.layoutThemes = this.layoutThemesImage;
        }
    }

    changeWrapperMode(event, mode) {
        this.app.wrapperMode = mode;
        console.log(this.app.wrapperMode)
        event.preventDefault();
    }

    changeLayoutMode(event, mode) {
        this.app.layoutMode = mode;
        event.preventDefault();
    }

    changeComponentTheme(theme) {
        this.app.theme = theme;
        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const href = 'assets/theme/theme-' + theme + '.css';

        this.replaceLink(themeLink, href);

        event.preventDefault();
    }

    changeLayoutTheme(event, color, theme) {
        this.app.layout = color;
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const href = 'assets/layout/css/' + color + '.css';

        this.replaceLink(layoutLink, href);

        this.changeComponentTheme(theme);

        event.preventDefault();
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    onConfigButtonClick(event) {
        this.appMain.configDialogActive = !this.appMain.configDialogActive;
        this.appMain.configClick = true;
        event.preventDefault();
    }

    onConfigCloseClick(event) {
        this.appMain.configDialogActive = false;
        event.preventDefault();
    }
}

import { Component, HostListener, ViewEncapsulation,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactComponent } from './contact/contact.component';
import { enableRipple } from '@syncfusion/ej2-base';



enableRipple(true);

@Component({
  selector: 'kd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {


  public menuList: Record<string, any>[] = [
    { menu: 'Home', isSelect: true },
    { menu: 'Products', isSelect: false },
    { menu: 'Services', isSelect: false },
    { menu: 'About Us', isSelect: false },
  ];
  public scrWidth: number;
  public note: boolean = false;
  public isShow: boolean = false;
  public topPosToStartShowing: number = 100;
  public isMenu = 'Home';

  constructor(private dialog: MatDialog) {}

  @HostListener('window:scroll')
  public scroll(): void {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isShow = scrollPosition >= this.topPosToStartShowing;
  }

  public selectMenu(i: number): void {
    this.menuList.forEach((item: Record<string, any>) => {
      item.isSelect = false;
    });
    this.menuList[i].isSelect = true;
    document
      .getElementById(this.menuList[i].menu)
      .scrollIntoView({ behavior: 'smooth' });
  }

  public selectTitle(menu: string): void {
    this.isMenu = menu;
    if (menu == 'Cinibot' || menu == 'ItSolutions' || menu == 'LogisticsERP') {
      this.isMenu = 'Products';
    }
    setTimeout(() => {
      document.getElementById(menu).scrollIntoView({ behavior: 'smooth' });
    });
  }

  public selectMobMenu(i: number): void {
    this.menuList.forEach((item: Record<string, any>) => {
      item.isSelect = false;
    });
    this.menuList[i].isSelect = true;
    document
      .getElementById(this.menuList[i].menu + '_mob')
      .scrollIntoView({ behavior: 'smooth' });
  }

  public selectMobileMenu(menu: string): void {
    setTimeout(() => {
      document
        .getElementById(menu + '_mob')
        .scrollIntoView({ behavior: 'smooth' });
    });
  }

  public parallaxScroll(): void {
    document.getElementById('Products').scrollIntoView({ behavior: 'smooth' });
  }

  public openDialog(type: any): void {
    localStorage.setItem('contactType', type);
    const dialogRef = this.dialog.open(ContactComponent, {
      panelClass: 'custom-dialog-container',
      data: { type: 'web' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public openMobileDialog(type: any): void {
    localStorage.setItem('contactType', type);
    const dialogRef = this.dialog.open(ContactComponent, {
      panelClass: 'custom-dialog-container-mobile',
      data: { type: 'mobile' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public gotoTop(): void {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  public visit(): void {
    this.openSite('https://cinibot.klartdigi.in/');
  }

  public openSite(link: string): void {
    window.open(link);
  }

  public refreshPage(): void {
    window.location.reload();
  }

  
}

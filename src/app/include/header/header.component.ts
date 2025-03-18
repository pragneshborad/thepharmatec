import {
  Component, ElementRef, Renderer2, ViewChild, AfterViewInit, HostListener
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('menuBtn') menuBtn!: ElementRef;
  @ViewChild('navbarSection') navbarSection!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;

  isHeaderHidden = false;   // Controls header visibility
  isButtonVisible = true;   // Controls button visibility
  lastScrollTop = 0;

  private globalClickListener: (() => void) | null = null;

  constructor(private renderer: Renderer2, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const fragment = this.router.getCurrentNavigation()?.extras.fragment;
        if (fragment) {
          setTimeout(() => {
            const element = document.getElementById(fragment);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    });
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  // Scroll to a section with smooth scrolling
  scrollToSection(sectionId: string) {
    if (this.router.url === '/') {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          this.closeMenu();
        }
      }, 300);
    } else {
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        setTimeout(() => {
          this.closeMenu();
        }, 500);
      });
    }
  }

  // Scroll to the footer
  scrollToFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
      this.closeMenu();
    }
  }

  // Detects scroll direction and hides/shows header accordingly
   // Scroll detection for header & button visibility
   @HostListener('window:scroll', [])
   onWindowScroll(): void {
     const scrollTop = window.scrollY || document.documentElement.scrollTop;

     if (!this.menuBtn?.nativeElement?.classList.contains('active')) {
       // Hides header when scrolling down, shows when scrolling up
       if (scrollTop > this.lastScrollTop + 10) {
         this.isHeaderHidden = true;
         this.isButtonVisible = false;  // Hide button when scrolling down
       } else if (scrollTop < this.lastScrollTop - 10) {
         this.isHeaderHidden = false;
         this.isButtonVisible = true;   // Show button when scrolling up
       }
     }

     this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
   }

  toggleMenu() {
    const menu = this.menuBtn.nativeElement;
    const navbar = this.navbarSection.nativeElement;
    const overlay = this.overlay.nativeElement;

    const isOpen = menu.classList.contains('active');

    if (isOpen) {
      this.closeMenu();
    } else {
      menu.classList.add('active');
      this.renderer.setStyle(navbar, 'display', 'block');
      this.renderer.setStyle(overlay, 'display', 'block');
      document.body.style.overflow = 'hidden';

      this.globalClickListener = this.renderer.listen('document', 'click', (event: Event) => {
        if (!navbar.contains(event.target) && !menu.contains(event.target)) {
          this.closeMenu();
        }
      });

      const links = navbar.querySelectorAll('a');
      links.forEach((link: any) => {
        this.renderer.listen(link, 'click', () => {
          setTimeout(() => {
            document.body.style.overflow = '';
          }, 500);
        });
      });
    }
  }

  closeMenu() {
    if (this.menuBtn) {
      this.menuBtn.nativeElement.classList.remove('active');
      this.renderer.setStyle(this.navbarSection.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.overlay.nativeElement, 'display', 'none');
      document.body.style.overflow = '';

      if (this.globalClickListener) {
        this.globalClickListener();
        this.globalClickListener = null;
      }
    }
  }
}

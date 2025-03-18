import {Component,OnInit,AfterViewInit,ViewChild,ElementRef,} from '@angular/core';
import Swiper from 'swiper';
import {Autoplay,FreeMode,Navigation,Pagination,Scrollbar,EffectFade,} from 'swiper/modules';


declare var WOW: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer1', { static: false })swiperContainer1:any;
  @ViewChild('swiperContainer2', { static: false })swiperContainer2:any;
  @ViewChild('swiperContainer3', { static: false })swiperContainer3:any;
  @ViewChild('swiperColumn1', { static: false }) swiperColumn1:any;
  @ViewChild('swiperColumn2', { static: false }) swiperColumn2:any;
  @ViewChild('swiperColumn3', { static: false }) swiperColumn3:any;

  @ViewChild('overlay') overlay: any;
  isOverlayVisible: boolean = false;

  swiper1: any;
  swiper2: any;
  swiper3: any;
  swiperColumn1Instance: any;
  swiperColumn2Instance: any;
  swiperColumn3Instance: any;

  isVisible: boolean = false;
  isExpanded: boolean = false;

  ngOnInit(): void {
    new WOW().init();
  }

  toggleOverlay() {
    this.isOverlayVisible = !this.isOverlayVisible;
  }

  closeOverlay() {
    this.isOverlayVisible = false;
  }

  ngAfterViewInit(): void {
    this.initSwiper1();
    this.initSwiper2();
    this.initSwiper3();

    this.initVerticalSwipers();
    this.initVerticalSwipers1();
    this.initVerticalSwipers2();
  }
  scrollToFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }
  /** Initialize Horizontal Swiper */
  initSwiper1() {
    this.swiper1 = new Swiper(this.swiperContainer1.nativeElement, {
      modules: [Navigation, Pagination, Scrollbar, Autoplay, EffectFade],
      spaceBetween: 0,
      slidesPerView: 'auto',
      slideToClickedSlide: true,
      speed: 2000,
      slidesPerGroup: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 1000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      },
      freeMode: false,
      navigation: {
        prevEl: '.swiper-button-prev.s_1_swiper_nav_prev',
        nextEl: '.swiper-button-next.s_1_swiper_nav_next',
      },
      pagination: {
        el: '.swiper-pagination.s_1_pagination',
        type: 'fraction',
      },
      scrollbar: {
        el: '.swiper-scrollbar.s_1_swiper_scrollbar',
        draggable: true,
      },
    });


    const observer1 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.swiper1?.autoplay?.start();
          } else {
            this.swiper1?.autoplay?.stop();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer1.observe(this.swiperContainer1.nativeElement);
  }

  initSwiper2() {
    this.swiper2 = new Swiper(this.swiperContainer2.nativeElement, {
      direction: 'horizontal',
      slidesPerView: 'auto',
      spaceBetween: 25,
      loop: true,
      speed: 4000,
      freeMode: {
        enabled: true,
        sticky: false,
        momentum: false,
      },
      autoplay: {
        delay: 0,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      },
      allowTouchMove: true,
      modules: [Autoplay, FreeMode],
    });

    const observer5 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.swiper2?.autoplay?.start();
            }, 500);
          } else {
            this.swiper2?.autoplay?.stop();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer5.observe(this.swiperContainer2.nativeElement);
  }

  initSwiper3() {
    this.swiper3 = new Swiper(this.swiperContainer3.nativeElement, {
      direction: 'horizontal',
      slidesPerView: 1.5,
      spaceBetween: 25,
      loop: true,
      speed: 4000,
      freeMode: {
        enabled: true,
        sticky: false,
        momentum: false,
      },
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      allowTouchMove: true,
      modules: [Autoplay, FreeMode],
    });

    const observer5 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.swiper3?.autoplay?.start();
            }, 500);
          } else {
            this.swiper3?.autoplay?.stop();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer5.observe(this.swiperContainer3.nativeElement);
  }
  initVerticalSwipers() {
    this.swiperColumn1Instance = new Swiper(this.swiperColumn1.nativeElement, {
      direction: 'vertical',
      slidesPerView: 'auto',
      spaceBetween: 25,
      loop: true,
      speed: 2500,
      freeMode: {
        enabled: true,
        momentum: false,
      },
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
      allowTouchMove: false,
      modules: [Autoplay, FreeMode],
    });

    const observer2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.swiperColumn1Instance?.autoplay?.start();
            }, 500);
          } else {
            this.swiperColumn1Instance?.autoplay?.stop();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer2.observe(this.swiperColumn1.nativeElement);
  }

  initVerticalSwipers1() {
    this.swiperColumn3Instance = new Swiper(this.swiperColumn3.nativeElement, {
      direction: 'vertical',
      slidesPerView: 'auto',
      spaceBetween: 25,
      loop: true,
      speed: 2500,
      freeMode: {
        enabled: true,
        momentum: false,
      },
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
      allowTouchMove: false,
      modules: [Autoplay, FreeMode],
    });

    const observer3 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.swiperColumn3Instance?.autoplay?.start();
            }, 500);
          } else {
            this.swiperColumn3Instance?.autoplay?.stop();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer3.observe(this.swiperColumn3.nativeElement);
  }

  initVerticalSwipers2() {
    this.swiperColumn2Instance = new Swiper(this.swiperColumn2.nativeElement, {
      direction: 'vertical',
      slidesPerView: 'auto',
      spaceBetween: 25,
      loop: true,
      speed: 2500,
      freeMode: {
        enabled: true,
        momentum: false,
      },
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        reverseDirection: true,
      },
      allowTouchMove: false,
      modules: [Autoplay, FreeMode],
    });

    const observer4 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.swiperColumn2Instance?.autoplay?.start();
            }, 500);
          } else {
            this.swiperColumn2Instance?.autoplay?.stop();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer4.observe(this.swiperColumn2.nativeElement);
  }


  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }


  toggleContent(): void {
    this.isExpanded = !this.isExpanded;
  }

}

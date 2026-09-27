"use client";

import Script from "next/script";
import ActivitySearchBar from "./components/ActivitySearchBar";
import KarnishCinematicIntro from "./components/KarnishCinematicIntro";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      {/* Cinematic Airplane + Cloth Reveal Intro (Plays once per browser session) */}
      <KarnishCinematicIntro />

      {/* Cursor */}
      <div className="cursor"></div>
      {/* Progress scroll totop */}
      <div className="progress-wrap cursor-pointer">
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
        </svg>
      </div>
      {/* Smooth-wrapper */}
      <div id="smooth-wrapper">
        {/* Navbar */}
        <Navbar />
        <div id="smooth-content">
          <main className="o-hidden">
            {/* Parallax Image */}
            <header className="full-height valign">
              <div className="background bg-img" data-background="assets/img/hero/pattern-bg.png"></div>
              <div className="container">
                <div className="row">
                  <div className="col-lg-5 valign">
                    <div className="cont">
                      <h6>Karnish Tourism</h6>
                      <h2 className="text-white"><span>Discover the world <i>with our guide.</i></span></h2>
                      <p>Turn your dream destinations into reality with our expert guidance. From hidden we create just for you.</p>
                      <a href="/tours" className="butn-arrow2"> <span className="btn-text">View tours</span> <span className="arrow-wrap"><span className="arrow-inner"><i className="ti-arrow-right"></i><i className="ti-arrow-right"></i></span> </span></a>
                    </div>
                  </div>
                  <div className="col-lg-6 offset-lg-1">
                    <div className="flex main-marq">
                      <div className="slide-vertical st1 mr-20">
                        <div className="box">
                          <div className="img"> <img src="/images/a1.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/a2.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/a3.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/a4.jpg" alt="" /> </div>
                        </div>
                        <div className="box">
                          <div className="img"> <img src="/images/a1.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/a2.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/a3.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/a4.jpg" alt="" /> </div>
                        </div>
                      </div>
                      <div className="slide-vertical st2">
                        <div className="box">
                          <div className="img"> <img src="/images/a.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/c.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/e.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/f.jpg" alt="" /> </div>
                        </div>
                        <div className="box">
                          <div className="img"> <img src="/images/a.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/c.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/e.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/f.jpg" alt="" /> </div>
                        </div>
                      </div>
                      <div className="slide-vertical st3 ml-20">
                        <div className="box">
                          <div className="img"> <img src="/images/1.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/2.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/3.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/4.jpg" alt="" /> </div>
                        </div>
                        <div className="box">
                          <div className="img"> <img src="/images/1.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/2.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/3.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/4.jpg" alt="" /> </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="star1"> <img src="/images/star2.png" alt="" /> </div>
              <div className="star2 duru-slide-right"><img src="/images/flight-down.png" alt="" /></div>
              <div className="star3"><img src="/images/flight-up.png" alt="" /> </div>
              <div className="star4 duru-rotate-on-scroll"> <img src="/images/bg-compass.png" alt="" /></div>
            </header>
            <ActivitySearchBar />
            {/* About 2 */}
            <div className="about2 section-padding bg-white" data-background="assets/img/bg.png">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="about2-img">
                      <div className="main-img img-cover duru-slide-down"> <img src="/images/a4.jpg" alt="" /> </div>
                      <div className="main-img img-cover duru-slide-up "> <img src="/images/a2.jpg" alt="" /> </div>
                    </div>
                  </div>
                  <div className="col-md-5 offset-md-1">
                    <div className="section-subtitle wow fadeInRight">Karnish Tourism</div>
                    <div className="section-title d-rotate wow"><span className="rotate-text">Discover the world <i>with our guide</i></span></div>
                    <p className="wow fadeInRight" data-wow-delay=".3s">Discover the world with comfort and unforgettable experiences. Let us guide your next adventure!</p>
                    <ul className="listo mb-30">
                      <li className="wow fadeInUp" data-wow-delay=".1s"> <i className="fa-pro fa-light fa-earth-americas"></i> Global Destinations </li>
                      <li className="wow fadeInUp" data-wow-delay=".2s"> <i className="fa-pro fa-light fa-route"></i> Expert Guidance </li>
                      <li className="wow fadeInUp" data-wow-delay=".3s"> <i className="fa-pro fa-light fa-shield-heart"></i> Safe Travels </li>
                      <li className="wow fadeInUp" data-wow-delay=".4s"> <i className="fa-pro fa-light fa-hotel"></i> Luxury Lodging </li>
                    </ul>
                    <div className="customers d-flex align-items-center">
                      <div className="c-img d-flex align-items-center wow fadeInUp" data-wow-delay=".8s">
                        <ul className="d-flex duru-mask-reveal-horizontal">
                          <li><img src="/images/tst1.jpg" alt="" /></li>
                          <li><img src="/images/tst2.jpg" alt="" /></li>
                          <li><img src="/images/tst3.jpg" alt="" /></li>
                        </ul>
                        <div className="c-text headline pera-content">
                          <h3><b className="counter">9,500</b>+</h3> <span>Positive Reviews</span>
                        </div>
                      </div>
                      <a href="#" className="butn-arrow wow fadeInUp" data-wow-delay=".8s"> <span className="btn-text">Read more</span> <span className="arrow-wrap">
                          <span className="arrow-inner">
                            <i className="ti-arrow-right"></i>
                            <i className="ti-arrow-right"></i>
                          </span> </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-text-style duru-slide-right">Karnish Tourism</div>
            </div>
            {/* Tours */}
            <section className="tours stsec section-padding">
              <div className="container">
                <div className="row justify-content-between">
                  <div className="col-lg-4">
                    <div className="stack-title mb-30">
                      <div className="section-subtitle wow fadeInRight">Choose your place</div>
                      <div className="section-title d-rotate wow"><span className="rotate-text">Discover dream <i>destinations</i></span></div>
                      <p className="wow fadeInRight" data-wow-delay=".3s">Turn your dream destinations into unforgettable experiences with guidance. From hidden gems to iconic landmarks, we craft personalized journeys for you.</p>
                      <a href="#" className="butn-arrow wow fadeInUp" data-wow-delay=".8s"> <span className="btn-text">Read more</span> <span className="arrow-wrap">
                          <span className="arrow-inner">
                            <i className="ti-arrow-right"></i>
                            <i className="ti-arrow-right"></i>
                          </span> </span>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-7 offset-lg-1 items">
                    <div className="item">
                      <div className="tour-media"> <img src="/images/01.jpg" alt="" className="height2" data-speed="0.8" data-lag="0" />
                        <div className="clicko"><a href="/tour-details"><span className="icon-wrap"><span className="icon"><i className="ti-arrow-top-right"></i></span></span></a></div>
                      </div>
                      <div className="tour-content">
                        <div className="tour-header">
                          <div className="tour-location"> <i className="ti-location-pin"></i> <span>Maldives, Asia</span> </div>
                          <h4 className="tour-title">Maldives Paradise Escape</h4>
                        </div>
                        <div className="tour-info">
                          <div className="tour-duration">
                            <div className="tour-icon"> <i className="fa-light fa-calendar"></i> </div>
                            <div className="tour-meta"> <small>Duration</small> <span>6 Days - 5 Nights</span> </div>
                          </div>
                        </div>
                        <div className="tour-price-wrap">
                          <div className="tour-rating"> <i className="fa-solid fa-star"></i> 4.9 </div>
                          <div className="tour-price"> $499 <span>/ Traveler</span> </div>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="tour-media"> <img src="/images/03.jpg" alt="" className="height2" data-speed="0.8" data-lag="0" />
                        <div className="clicko"><a href="/tour-details"><span className="icon-wrap"><span className="icon"><i className="ti-arrow-top-right"></i></span></span></a></div>
                      </div>
                      <div className="tour-content">
                        <div className="tour-header">
                          <div className="tour-location"> <i className="ti-location-pin"></i> <span>Dubai, UAE</span> </div>
                          <h4 className="tour-title">Dubai Luxury Journey</h4>
                        </div>
                        <div className="tour-info">
                          <div className="tour-duration">
                            <div className="tour-icon"> <i className="fa-light fa-calendar"></i> </div>
                            <div className="tour-meta"> <small>Duration</small> <span>5 Days - 4 Nights</span> </div>
                          </div>
                        </div>
                        <div className="tour-price-wrap">
                          <div className="tour-rating"> <i className="fa-solid fa-star"></i> 4.8 </div>
                          <div className="tour-price"> $699 <span>/ Traveler</span> </div>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="tour-media"> <img src="/images/02.jpg" alt="" className="height2" data-speed="0.8" data-lag="0" />
                        <div className="clicko"><a href="/tour-details"><span className="icon-wrap"><span className="icon"><i className="ti-arrow-top-right"></i></span></span></a></div>
                      </div>
                      <div className="tour-content">
                        <div className="tour-header">
                          <div className="tour-location"> <i className="ti-location-pin"></i> <span>Banff, Canada</span> </div>
                          <h4 className="tour-title">Canadian Nature Tour</h4>
                        </div>
                        <div className="tour-info">
                          <div className="tour-duration">
                            <div className="tour-icon"> <i className="fa-light fa-calendar"></i> </div>
                            <div className="tour-meta"> <small>Duration</small> <span>7 Days - 6 Nights</span> </div>
                          </div>
                        </div>
                        <div className="tour-price-wrap">
                          <div className="tour-rating"> <i className="fa-solid fa-star"></i> 4.9 </div>
                          <div className="tour-price"> $799 <span>/ Traveler</span> </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Services */}
            <section className="services pt-120">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-md-12 text-center">
                    <div className="section-title d-rotate wow"><span className="rotate-text text-white">Get ready to explore and discover your world.</span></div>
                  </div>
                  <div className="col-md-12 mb-30 text-center">
                    <a href="#" data-scroll-nav="4" className="hover-this circle-button-overlay">
                      <div className="circle-button in-bord hover-anim">
                        <div className="rotate-circle">
                          <svg className="textcircle safari-fix" viewBox="0 0 500 500">
                            <defs>
                              <path id="textcircle" d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"></path>
                            </defs>
                            <text>
                              <textPath xlinkHref="#textcircle" startOffset="0">Cultural Paths • Nature Escape •</textPath>
                            </text>
                          </svg>
                        </div>
                        <div className="in-circle text-center"><i className="fa-thin fa-arrow-down"></i></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="item mb-25 duru-slide-left"> <a href="/service-details"><span className="arrow fa-thin fa-arrow-up-right"></span></a>
                      <div className="icon"><i className="fa-thin fa-earth-americas"></i></div>
                      <h5>Hidden Places</h5>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="item mb-25 duru-slide-left"> <a href="/service-details"><span className="arrow fa-thin fa-arrow-up-right"></span></a>
                      <div className="icon"><i className="fa-thin fa-plane"></i></div>
                      <h5>Travel Adventures</h5>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="item mb-25 duru-slide-right"> <a href="/service-details"><span className="arrow fa-thin fa-arrow-up-right"></span></a>
                      <div className="icon"><i className="fa-thin fa-mountain-sun"></i></div>
                      <h5>Nature Culture</h5>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="item mb-25 duru-slide-right"> <a href="/service-details"><span className="arrow fa-thin fa-arrow-up-right"></span></a>
                      <div className="icon"><i className="fa-thin fa-camera-retro"></i></div>
                      <h5>Travel Stories</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="height1">
                  <div className="radius-mask">
                    <div className="bg-img height2" data-background="assets/img/5.jpg" data-speed="0.5" data-lag="0"></div>
                  </div>
                </div>
              </div>
            </section>
            {/* Scrolling */}
            <div className="scrolling scrolling-ticker" data-scroll-index="4">
              <div className="wrapper feather-shadow2">
                <div className="content">
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Flight Booking</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Hotel Reservations</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Holiday Packages</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Visa Assistance</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Airport Transfers</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Travel Insurance</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Cruise Tours</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>City Tours</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Adventure Trips</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Honeymoon Packages</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Group Travel</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Business Travel</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Car Rentals</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Custom Itineraries</span>
                </div>
                <div className="content">
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Flight Booking</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Hotel Reservations</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Holiday Packages</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Visa Assistance</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Airport Transfers</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Travel Insurance</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Cruise Tours</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>City Tours</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Adventure Trips</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Honeymoon Packages</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Group Travel</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Business Travel</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Car Rentals</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Custom Itineraries</span>
                </div>
              </div>
            </div>
            {/* Testimonials */}
            <div className="position-relative section-padding pt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 text-center mb-30">
                    <div className="section-subtitle wow fadeInRight">Testimonials</div>
                    <div className="section-title d-rotate wow"><span className="rotate-text">Our happy <i>traveller</i></span></div>
                  </div>
                </div>
                <div className="row justify-content-center g-0">
                  <div className="col-12 testimonials2">
                    <div className="item box-shadow-extra-large active">
                      <div className="img duru-image-parallax"> <img src="/images/01_1.jpg" className="img-fluid" alt="" /> </div>
                      <div className="flex-column cont">
                        <div className="cont-hover">
                          <h6>Africa Tour</h6>
                          <div className="rating"> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> </div>
                          <p>This tour was a truly memorable experience. Africa’s nature and shared memories were amazing.</p>
                          <div className="traveller">
                            <ul>
                              <li><img src="/images/tst1.jpg" alt="" /></li>
                              <li><img src="/images/tst2.jpg" alt="" /></li>
                              <li><img src="/images/tst3.jpg" alt="" /><span>3+</span></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item box-shadow-extra-large duru-slide-right">
                      <div className="img duru-image-parallax"> <img src="/images/02_1.jpg" className="img-fluid" alt="" /> </div>
                      <div className="flex-column cont">
                        <div className="cont-hover">
                          <h6>Canada Tour</h6>
                          <div className="rating"> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> </div>
                          <p>This tour was a memorable experience. Canada’s landscapes and shared moments were incredible.</p>
                          <div className="traveller">
                            <ul>
                              <li><img src="/images/tst1.jpg" alt="" /></li>
                              <li><img src="/images/tst2.jpg" alt="" /></li>
                              <li><img src="/images/tst3.jpg" alt="" /><span>3+</span></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item box-shadow-extra-large duru-slide-right">
                      <div className="img duru-image-parallax"> <img src="/images/03_1.jpg" className="img-fluid" alt="" /> </div>
                      <div className="flex-column cont">
                        <div className="cont-hover">
                          <h6>Cappadocia Tour</h6>
                          <div className="rating"> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> </div>
                          <p>This tour was a memorable experience. Cappadocia’s scenery and shared moments were magical.</p>
                          <div className="traveller">
                            <ul>
                              <li><img src="/images/tst1.jpg" alt="" /></li>
                              <li><img src="/images/tst2.jpg" alt="" /></li>
                              <li><img src="/images/tst3.jpg" alt="" /><span>3+</span></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* FAQS */}
            <section className="faqs section-padding bg-white">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-6">
                    <div className="item-img"><img src="/images/a2.jpg" className="duru-image-zoom" alt="" /></div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="item-img mt-120"><img src="/images/a3.jpg" className="duru-image-zoom" alt="" /></div>
                  </div>
                  <div className="col-lg-5 offset-lg-1 col-md-12 mb-30">
                    <div className="section-subtitle wow fadeInRight">Popular Questions</div>
                    <div className="section-title mb-25 d-rotate wow"><span className="rotate-text">Frequently asked <i>questions</i></span></div>
                    <ul className="accordion-box clearfix">
                      <li className="accordion block">
                        <div className="acc-btn">Travel Photography</div>
                        <div className="acc-content">
                          <div className="content">
                            <p>Capture beautiful and unforgettable travel moments while exploring new places and exciting destinations around the world.</p> <i className="fa-thin fa-camera-retro"></i>
                          </div>
                        </div>
                      </li>
                      <li className="accordion block">
                        <div className="acc-btn">Mountain Tours</div>
                        <div className="acc-content">
                          <div className="content">
                            <p>Discover breathtaking mountain landscapes and enjoy adventures with our professional travel guides.</p> <i className="fa-thin fa-mountain-sun"></i>
                          </div>
                        </div>
                      </li>
                      <li className="accordion block active-block">
                        <div className="acc-btn active">Flight Booking</div>
                        <div className="acc-content" style={{ display: 'block' }}>
                          <div className="content">
                            <p>Book your flights quickly and easily with the best travel options and comfortable journeys for every destination.</p> <i className="fa-thin fa-plane"></i>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-text-style4 duru-slide-right">Questions</div>
            </section>
            {/* Blog */}
            <section className="blog-home section-padding">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-12 text-center">
                    <div className="section-subtitle wow fadeInRight">Travel Blog</div>
                    <div className="section-title mb-30 d-rotate wow">
                    <span className="rotate-text">Travel <i>experience</i></span> </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 duru-slide-left">
                    <div className="item bg-img" data-background="assets/img/blog/1.jpg">
                      <div className="content">
                        <div className="info">
                          <a href="/blog"> <span><i className="ti-time"></i>28 Dec 2026</span> </a>
                        </div>
                        <a href="/post">
                          <h5>Exploring the hidden Maldives paradise</h5>
                        </a>
                        <p>Discover a world where turquoise waters meet endless white sands in the heart of the Indian Ocean.</p>
                        <div className="arrow"> <a href="/post"><i className="ti-arrow-top-right"></i></a> </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 duru-slide-up">
                    <div className="item bg-img active" data-background="assets/img/blog/2.jpg">
                      <div className="content">
                        <div className="info">
                          <a href="/blog"> <span><i className="ti-time"></i>26 Dec 2026</span> </a>
                        </div>
                        <a href="/post">
                          <h5>Journey through Canada’s wild beauty</h5>
                        </a>
                        <p>Discover vast landscapes of towering mountains, crystal-clear lakes, and endless forests across Canada.</p>
                        <div className="arrow"> <a href="/post"><i className="ti-arrow-top-right"></i></a> </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 duru-slide-right">
                    <div className="item bg-img" data-background="assets/img/blog/3.jpg">
                      <div className="content">
                        <div className="info">
                          <a href="/blog"> <span><i className="ti-time"></i>24 Dec 2026</span> </a>
                        </div>
                        <a href="/post">
                          <h5>Experience the luxury of modern Dubai</h5>
                        </a>
                        <p>Discover a city where futuristic skylines meet golden deserts, blending luxury and innovation.</p>
                        <div className="arrow"> <a href="/post"><i className="ti-arrow-top-right"></i></a> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          {/* Footer */}
          <footer className="footer">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-7 mb-45 text-center">
                  <div className="subscribe">
                    <div className="section-subtitle wow fadeInRight">Subscribe to travel</div>
                    <div className="section-title d-rotate wow mb-30"><span className="rotate-text text-white">Travel deals to your inbox<i>!</i></span></div>
                    <div className="newsletter">
                      <form action="#">
                        <input type="email" placeholder="Enter your email address" required />
                        <button type="submit"><i className="fa-light fa-arrow-right"></i></button>
                      </form>
                    </div>
                    <p>We are committed to protecting your <a href="#0" className="text-decoration-line-bottom">privacy policy.</a></p>
                  </div>
                </div>
              </div>
              {/* Instagram */}
              <div className="insta">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="item">
                        <div className="img">
                          <a href="#0"> <img src="/images/03_2.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/01_2.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/02_2.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/04.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/05.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/06.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="follow">
                          <a href="#0" className="text-bg"> <span><i className="fa-brands fa-instagram"></i> / Karnish Tourism</span></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom */}
            <div className="bottom">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-12">
                    <p>© All Rights Reserved <a href="https://lexonit.com" target="_blank">lexonit.com</a></p>
                  </div>
                  <div className="col-lg-7 col-md-12 text-center">
                    <div className="links">
                      <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/tours">Tours</a></li>
                        <li><a href="/destination">Destinations</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/contact">Contact</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-12">
                    <div className="social-icons text-end">
                      <ul className="list-inline">
                        <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-dribbble"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-text-style5">Karnish Tourism</div>
          </footer>
        </div>
      </div>

      <Script id="script-jquery" src="/js/jquery-3.6.0.min.js" strategy="afterInteractive" />
      <Script id="script-jquery-migrate" src="/js/jquery-migrate-3.4.0.min.js" strategy="afterInteractive" />
      <Script id="script-plugins" src="/js/plugins.js" strategy="afterInteractive" />
      <Script id="script-imagesloaded" src="/js/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
      <Script id="script-gsap" src="/js/gsap.min.js" strategy="afterInteractive" />
      <Script id="script-scrollsmoother" src="/js/ScrollSmoother.min.js" strategy="afterInteractive" />
      <Script id="script-scrolltrigger" src="/js/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script id="script-smoother-script" src="/js/smoother-script.js" strategy="afterInteractive" />
      <Script id="script-springer" src="/js/springer.min.js" strategy="afterInteractive" />
      <Script id="script-lenis" src="/js/lenis.min.js" strategy="afterInteractive" />
      <Script id="script-custom" src="/js/custom.js" strategy="afterInteractive" />
    </>
  );
}

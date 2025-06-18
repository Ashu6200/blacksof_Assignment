import { useEffect, useRef, useState } from 'react';
import { carVideoMain, footer } from './constant';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const App = () => {
  const [selectedIndex, setSelectIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState('');

  useEffect(() => {
    if (carVideoMain.length > 0) {
      setActiveVideo(carVideoMain[0].videoLink);
    }
  }, []);
  const handleVideoClick = (index, videoLink) => {
    setSelectIndex(index);
    setActiveVideo(videoLink);
  };

  const sectionRef = useRef(null);
  const passengerContentRef = useRef(null);
  const commercialContentRef = useRef(null);
  const passengerVehicleRef = useRef(null);
  const commercialVehicleRef = useRef(null);

  useEffect(() => {
    const loadGSAP = async () => {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress < 0.5) {
              if (passengerContentRef.current) {
                gsap.set(passengerContentRef.current, {
                  opacity: 1,
                  color: '#ffffff',
                });
              }
              if (passengerVehicleRef.current) {
                gsap.set(passengerVehicleRef.current, {
                  opacity: 1,
                });
              }
              if (commercialContentRef.current) {
                gsap.set(commercialContentRef.current, {
                  opacity: 0.4,
                  color: '#666666',
                });
              }
              if (commercialVehicleRef.current) {
                gsap.set(commercialVehicleRef.current, {
                  opacity: 0,
                });
              }
            } else {
              if (passengerContentRef.current) {
                gsap.set(passengerContentRef.current, {
                  opacity: 0.4,
                  color: '#666666',
                });
              }
              if (passengerVehicleRef.current) {
                gsap.set(passengerVehicleRef.current, {
                  opacity: 0,
                });
              }
              if (commercialContentRef.current) {
                gsap.set(commercialContentRef.current, {
                  opacity: 1,
                  color: '#ffffff',
                });
              }
              if (commercialVehicleRef.current) {
                gsap.set(commercialVehicleRef.current, {
                  opacity: 1,
                });
              }
            }
          },
        },
      });
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    };
    loadGSAP();
  }, []);

  return (
    <main className='min-h-screen'>
      <section className='relative h-[50vh] md:h-[70vh] lg:h-screen overflow-hidden'>
        <video
          className='absolute inset-0 object-cover w-full h-full'
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src='/assets/automotive.224e7418884105595114.mp4'
            type='video/mp4'
          />
        </video>
        <div className='absolute inset-0 bg-black/50 bg-opacity-60'></div>
        <header className='relative z-10 flex items-center justify-center px-6 md:px-16 py-2 bg-white'>
          <div className='container flex items-center justify-between'>
            <div>
              <div className='text-blue-500 font-bold text-lg'>Ashutosh</div>
              <div className='text-blue-400 text-xs'>GROUP</div>
            </div>
            <div className='flex items-center gap-4'>
              <button className='px-6 py-4 text-black'>Contact Us</button>
              <div>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4.98487 7.19704C6.19327 7.19704 7.17287 6.21744 7.17287 5.00904C7.17287 3.80065 6.19327 2.82104 4.98487 2.82104C3.77648 2.82104 2.79688 3.80065 2.79688 5.00904C2.79688 6.21744 3.77648 7.19704 4.98487 7.19704Z'
                    fill='black'
                  />
                  <path
                    d='M9.23575 8.85493V20.9939H13.0047V14.9909C13.0047 13.4069 13.3027 11.8729 15.2667 11.8729C17.2037 11.8729 17.2277 13.6839 17.2277 15.0909V20.9949H20.9988V14.3379C20.9988 11.0679 20.2948 8.55493 16.4728 8.55493C14.6378 8.55493 13.4078 9.56193 12.9047 10.5149H12.8537V8.85493H9.23575ZM3.09375 8.85493H6.86875V20.9939H3.09375V8.85493Z'
                    fill='black'
                  />
                </svg>
              </div>
              <div>
                <svg
                  width='52'
                  height='22'
                  viewBox='0 0 52 22'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g clipPath='url(#clip0_0_284)'>
                    <path
                      d='M19.6299 8.97451H11.3454C10.0384 8.97451 8.97506 10.0378 8.97506 11.3449V15.8459L6.82862 17.379C6.65926 17.4999 6.55872 17.6952 6.55872 17.9034C6.55872 18.1117 6.65926 18.3071 6.82862 18.4279L9.00091 19.9795C9.17061 21.1212 10.1574 21.9999 11.3454 21.9999H19.6299C20.937 21.9999 22.0003 20.9366 22.0003 19.6294V11.3449C22.0003 10.0378 20.937 8.97451 19.6299 8.97451ZM16.8443 18.0313C16.6924 18.0313 16.5751 17.9831 16.5407 17.8518L16.2782 16.9335H14.697L14.4348 17.8518C14.4003 17.9831 14.2829 18.0313 14.131 18.0313C13.8893 18.0313 13.5649 17.8795 13.5649 17.6587C13.5649 17.6447 13.5718 17.6172 13.5786 17.5895L14.9112 13.2469C14.9733 13.0398 15.2288 12.9429 15.4842 12.9429C15.7466 12.9429 16.002 13.0398 16.0641 13.2469L17.3967 17.5895C17.4036 17.6172 17.4105 17.6378 17.4105 17.6587C17.4105 17.8725 17.086 18.0313 16.8443 18.0313Z'
                      fill='black'
                    />
                    <path
                      d='M14.8828 16.2292H16.0843L15.4834 14.1097L14.8828 16.2292Z'
                      fill='black'
                    />
                    <path
                      d='M7.68595 11.3451C7.68595 10.4797 7.98858 9.68407 8.49263 9.05682C7.75729 9.05682 7.07498 8.8267 6.51252 8.43578C5.95006 8.82687 5.26776 9.05682 4.53225 9.05682C4.33167 9.05682 4.16885 8.894 4.16885 8.69326C4.16885 8.49251 4.33167 8.32987 4.53225 8.32987C5.04737 8.32987 5.52943 8.18719 5.94217 7.94012C5.44434 7.40284 5.11334 6.70912 5.03327 5.94138H4.53241C4.33167 5.94138 4.16885 5.77874 4.16885 5.57799C4.16885 5.37724 4.33167 5.21443 4.53241 5.21443H6.1493V4.33188C6.1493 4.13097 6.31194 3.96832 6.51269 3.96832C6.71344 3.96832 6.87608 4.13097 6.87608 4.33188V5.21443H8.49297C8.69372 5.21443 8.85653 5.37724 8.85653 5.57799C8.85653 5.77874 8.69372 5.94138 8.49297 5.94138H7.99211C7.91204 6.70912 7.58105 7.40284 7.08321 7.94012C7.49578 8.18753 7.97801 8.32987 8.49297 8.32987C8.68482 8.32987 8.84159 8.47858 8.85519 8.66707C9.50896 8.05879 10.3843 7.68566 11.3456 7.68566H13.0254V6.15388L15.1718 4.62075C15.341 4.4999 15.4416 4.30452 15.4416 4.09639C15.4416 3.88809 15.341 3.69271 15.1718 3.57186L12.9995 2.02027C12.8297 0.878565 11.8429 -0.00012207 10.6549 -0.00012207H2.37052C1.06332 -0.00012207 0 1.0632 0 2.37023V10.6549C0 11.9619 1.06332 13.0253 2.37052 13.0253H7.68595V11.3451Z'
                      fill='black'
                    />
                    <path
                      d='M6.51251 7.48597C6.91031 7.07323 7.18037 6.53729 7.25943 5.94159H5.76575C5.8448 6.53729 6.11504 7.07323 6.51251 7.48597Z'
                      fill='black'
                    />
                  </g>
                  <path
                    d='M27.8402 16V7.36H33.3602V8.542H29.0942V10.966H32.6402V12.148H29.0942V14.818H33.3602V16H27.8402ZM34.8012 16V7.36H36.0732L40.3272 13.78V7.36H41.5992V16H40.3272L36.0732 9.574V16H34.8012ZM46.8078 16.18C46.2278 16.18 45.6938 16.08 45.2058 15.88C44.7178 15.676 44.2938 15.38 43.9338 14.992C43.5738 14.604 43.2938 14.132 43.0938 13.576C42.8938 13.02 42.7938 12.388 42.7938 11.68C42.7938 10.748 42.9638 9.948 43.3038 9.28C43.6438 8.608 44.1158 8.092 44.7198 7.732C45.3238 7.368 46.0198 7.186 46.8078 7.186C47.8238 7.186 48.6338 7.422 49.2378 7.894C49.8458 8.366 50.2598 9.018 50.4798 9.85L49.2078 10.078C49.0318 9.562 48.7478 9.15 48.3558 8.842C47.9638 8.534 47.4718 8.378 46.8798 8.374C46.2678 8.37 45.7578 8.506 45.3498 8.782C44.9458 9.058 44.6418 9.446 44.4378 9.946C44.2338 10.442 44.1298 11.02 44.1258 11.68C44.1218 12.34 44.2218 12.918 44.4258 13.414C44.6298 13.906 44.9358 14.29 45.3438 14.566C45.7558 14.842 46.2678 14.982 46.8798 14.986C47.3718 14.994 47.7938 14.904 48.1458 14.716C48.5018 14.524 48.7838 14.244 48.9918 13.876C49.1998 13.508 49.3338 13.056 49.3938 12.52H47.7138V11.512H50.7258C50.7338 11.584 50.7398 11.68 50.7438 11.8C50.7478 11.916 50.7498 11.99 50.7498 12.022C50.7498 12.822 50.5958 13.536 50.2878 14.164C49.9798 14.792 49.5318 15.286 48.9438 15.646C48.3558 16.002 47.6438 16.18 46.8078 16.18Z'
                    fill='black'
                  />
                  <defs>
                    <clipPath id='clip0_0_284'>
                      <rect width='22.0002' height='22.0002' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </header>
        <div className='relative z-10 flex items-center justify-center h-full px-8'>
          <div className='text-center text-white'>
            <p className='text-lg mb-4 opacity-90'>Driven by performance</p>
            <h1 className='text-3xl md:text-4xl font-normal leading-tight'>
              Soft trims and{' '}
              <span className='text-blue-400 font-normal'>NVH solutions</span>
              <br className='lg:block hidden' />
              for seamless rides
            </h1>
          </div>
        </div>
      </section>
      <section
        ref={sectionRef}
        className='relative min-h-[100vh] overflow-hidden bg-black text-white p-4 sm:p-6 md:p-8 lg:p-12'
      >
        <div className='sticky top-0 min-h-screen flex items-center justify-center '>
          <div className='w-full max-w-7xl mx-auto relative'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-normal leading-tight'>
                Evolving the drive with{' '}
                <span className='text-white font-normal'>360-degree </span>
                <br className='lg:block hidden' />
                nonwoven solutions
              </h2>
            </div>

            <div className='grid grid-col-1 lg:grid-cols-3 gap-12 items-center'>
              <div className='relative order-2 lg:order-1 mt-10 lg:mt-0'>
                <div className='hidden lg:block absolute left-0 top-0 w-0.5 h-full bg-white'></div>
                <div className='pl-8 space-y-16 '>
                  <div
                    ref={passengerContentRef}
                    className='transition-all duration-500'
                  >
                    <h2 className='text-2xl font-medium mb-3'>
                      Passenger vehicles
                    </h2>
                    <p className='text-gray-300 text-base leading-relaxed'>
                      Revving up innovation from
                      <br />
                      interior to exterior.
                    </p>
                  </div>
                  <div
                    ref={commercialContentRef}
                    className='transition-all duration-500 opacity-40'
                  >
                    <h2 className='text-2xl font-medium mb-3'>
                      Commercial vehicles
                    </h2>
                    <p className='text-gray-300 text-base leading-relaxed'>
                      Advancing engineering
                      <br />
                      for heavy-duty vehicles.
                    </p>
                  </div>
                </div>
              </div>
              <div className='relative h-96 md:col-span-2 order-1 lg:order-2'>
                <div
                  ref={passengerVehicleRef}
                  className='absolute inset-0 transform-gpu'
                >
                  <div className='relative w-full h-full flex items-center justify-center'>
                    <div className='w-full h-full relative rounded-lg'>
                      <video
                        key={activeVideo}
                        className='w-full h-full object-cover'
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        {activeVideo ? (
                          <source src={activeVideo} type='video/mp4' />
                        ) : null}
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                  <div className='bottom-[-100px] absolute w-full'>
                    <div className='flex items-center gap-4 p-3 rounded-lg'>
                      {carVideoMain.map((item, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleVideoClick(index, item.videoLink)
                          }
                          className={`focus:outline-none transition-all duration-300 p-2 rounded cursor-pointer`}
                        >
                          <img
                            src={
                              selectedIndex === index
                                ? item.activeIcon
                                : item.inActiveIcon
                            }
                            alt={`Video icon ${index + 1}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  ref={commercialVehicleRef}
                  className='absolute inset-0 transform-gpu'
                >
                  <div className='relative w-full h-full flex items-center justify-center'>
                    <video
                      className='w-full h-full object-cover'
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source
                        src={
                          '/assets/Commercial Alpha.92c92d40f9116c837d1d.mp4'
                        }
                        type='video/mp4'
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-[#0067B1] p-16 md:px-32 lg:px-64'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-12 items-start'>
            <div className='text-white'>
              <h2 className='text-4xl font-light mb-2'>Get in touch</h2>
              <div className='w-16 h-0.5 bg-white mb-8'></div>

              <p className='text-lg mb-8 opacity-90'>For general enquiries</p>

              <div className='space-y-6'>
                <div>
                  <h3 className='text-xl font-medium mb-2'>Address :</h3>
                  <p className='opacity-90'>
                    110, 16th Road, Chembur, Mumbai - 400071
                  </p>
                </div>

                <div>
                  <h3 className='text-xl font-medium mb-2'>Phone :</h3>
                  <p className='opacity-90'>+91 22 25208822</p>
                </div>

                <div>
                  <h3 className='text-xl font-medium mb-2'>Email :</h3>
                  <p className='opacity-90'>info@supremegroup.co.in</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className='text-white'>
              <form className='space-y-6'>
                <div>
                  <input
                    type='text'
                    placeholder='Full name'
                    className='w-full bg-transparent border-b border-white border-opacity-50 pb-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:border-opacity-100 transition-colors'
                  />
                </div>

                <div>
                  <input
                    type='email'
                    placeholder='Email'
                    className='w-full bg-transparent border-b border-white border-opacity-50 pb-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:border-opacity-100 transition-colors'
                  />
                </div>

                <div>
                  <input
                    type='text'
                    placeholder='Company'
                    className='w-full bg-transparent border-b border-white border-opacity-50 pb-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:border-opacity-100 transition-colors'
                  />
                </div>

                <div>
                  <textarea
                    placeholder='Message'
                    rows={4}
                    className='w-full bg-transparent border-b border-white border-opacity-50 pb-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:border-opacity-100 transition-colors resize-none'
                  ></textarea>
                </div>

                <div className='pt-4'>
                  <button
                    type='submit'
                    className='px-8 py-3 border border-white border-opacity-50 rounded-full text-white hover:bg-white hover:text-blue-600 transition-colors duration-300'
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer className='bg-gray-100 p-12 md:px-32 lg:px-64'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center mb-12'>
            <div>
              <div className='text-blue-500 font-bold text-xl'>Ashutosh</div>
              <div className='text-blue-400 text-sm'>GROUP</div>
            </div>
          </div>

          {/* Footer Links */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
            {footer.map((item, index) => (
              <div key={index}>
                <h3 className='font-semibold text-gray-800 mb-4'>
                  {item.title}
                </h3>
                <ul className='space-y-3 text-gray-600'>
                  {item.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href='#'
                        className='hover:text-blue-500 transition-colors'
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Bottom */}
          <div className='flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 text-gray-600 text-sm'>
            <p>©2024. All Rights Reserved.</p>
            <p className='hidden md:block'>
              Supreme House, 110, 16th Road, Chembur, Mumbai - 400071.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default App;

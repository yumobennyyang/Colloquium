import { useState } from 'react'
import React from 'react'
import SplitText from './components/SplitText.jsx'
import FaultyTerminal from './components/FaultyTerminal.jsx'
import TiltedCard from './components/TiltedCard.jsx';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { useRef } from 'react';
import VariableProximity from './components/VariableProximity';
import FluidGlass from './components/FluidGlass'


import DecayCard from './components/DecayCard';



import './App.css'


function App() {

  const containerRef = useRef(null);

  useEffect(() => {
    const dot = document.getElementById('dot');
    const container = document.querySelector('.container');
    const secondPage = document.querySelector('.page:nth-child(2)');
    const thirdPage = document.querySelector('.page:nth-child(3)');
    const fourthPage = document.querySelector('.page:nth-child(4)');



    if (!dot || !container || !secondPage || !thirdPage || !fourthPage) return;

    // Set initial container background
    container.style.backgroundColor = '#cccccc';

    // Required for custom scroller containers
    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        if (arguments.length) {
          container.scrollTop = value;
        }
        return container.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType: container.style.transform ? "transform" : "fixed"
    });

    // Set default scroller to your container
    ScrollTrigger.defaults({ scroller: container });

    // Your existing dot animation
    gsap.to(dot, {
      y: '-150px',
      ease: 'none',
      scrollTrigger: {
        trigger: secondPage,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        markers: false,
      },
    });

    // Background color animation tied to third page
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: thirdPage,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        markers: true,
        scroller: container,
        onUpdate: (self) => {
          console.log('Background animation progress:', self.progress);
        },
        onToggle: (self) => {
          console.log('Background animation toggle:', self.isActive);
        }
      }
    });

    tl.to(container, { backgroundColor: '#000000', duration: 0.5 }) // from top bottom to top top
      .to(container, { backgroundColor: '#cccccc', duration: 0.5 }); // from top top to bottom top



    // Delay to ensure DOM renders before GSAP runs
    setTimeout(() => {
      const responsiveRect = document.querySelector('.responsive-rectangle');
      const parallaxImg = document.querySelector('.parallax-image');

      if (responsiveRect && parallaxImg) {
        gsap.to(parallaxImg, {
          y: '-80%', // Adjust parallax depth here
          ease: 'none',
          scrollTrigger: {
            trigger: responsiveRect,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            scroller: container, // custom scroll container
            markers: false,
          },
        });
      }

      ScrollTrigger.refresh(); // just in case
    }, 50);


    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="container">


      <div className="page">
        <img src="/dot.png" alt="dot" className="dot" id="dot" ></img>
        <h2 className="">
          <span className="bold-text title-screen" id="title-screen">towards an empathetic interface &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; serendipity as mapping systems</span>
        </h2>
      </div>

      <div className="page">
        <SplitText
          text="The history of HCI is a story of increasing intimacy — from visual feedback, to sound, touch, and now: contextual understanding."
          className="page-two"
          delay={60}
          duration={1}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          textAlign="left"
          onLetterAnimationComplete={() => {
            console.log("Animation complete");
          }}
        />
      </div>

      <div className="page">
        <div className="page-child page-with-videos">
          {/* <FaultyTerminal
            scale={1.8}
            gridMul={[1.8, 1]}
            digitSize={1.2}
            timeScale={1}
            pause={false}
            scanlineIntensity={1}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0}
            tint="#292E28"
            mouseReact={true}
            mouseStrength={1}
            pageLoadAnimation={false}
            brightness={1}
          /> */}

          <h2 className="video-text">
            With Sketchpad, Ivan Sutherland introduced constraint-based modeling, parametric logic, and graphical feedback — foundations of modern CAD and UI/UX systems.
          </h2>

          <div className="video-grid">
            <video src="./public/sketchpad1.mp4" autoPlay loop muted playsInline />
            <video src="./public/sketchpad2.mp4" autoPlay loop muted playsInline />
            <video src="./public/sketchpad3.mp4" autoPlay loop muted playsInline />
            <video src="./public/sketchpad4.mp4" autoPlay loop muted playsInline />
          </div>
        </div>
      </div>

      <div className="page">
        <div className="page-child framework-page">
          <h2 className="framework-title"> I am building a framework for contextual computing —<br></br>where the system knows:</h2>
          <div className="circle-container">
            <TiltedCard
              imageSrc="./public/rectangle-1.png"
              altText="where you are"
              captionText="where you are"
              containerHeight="260px"
              containerWidth="260px"
              imageHeight="260px"
              imageWidth="260px"
              rotateAmplitude={30}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text">
                  where you are
                </p>
              }
            />            <TiltedCard
              imageSrc="./public/rectangle-2.png"
              altText="where you are"
              captionText="where you are"
              containerHeight="260px"
              containerWidth="260px"
              imageHeight="260px"
              imageWidth="260px"
              rotateAmplitude={30}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text">
                  who you are
                </p>
              }
            />            <TiltedCard
              imageSrc="./public/rectangle-3.png"
              altText="where you are"
              captionText="where you are"
              containerHeight="260px"
              containerWidth="260px"
              imageHeight="260px"
              imageWidth="260px"
              rotateAmplitude={30}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text">
                  what you want
                </p>
              }
            />


          </div>
        </div>
      </div>

      <div className="page">
        <div style={{ height: '600px', position: 'relative' }}>


        </div>
        <div className="page-child simple-page">
          <FluidGlass
            mode="lens" // or "bar", "cube"
            lensProps={{
              scale: 0.25,
              ior: 1.15,
              thickness: 5,
              chromaticAberration: 0.1,
              anisotropy: 0.01
            }}
          />
          <div className="content-container">
            <h2 className="page-text">The Serendipity Map is a routing system designed for exploration rather than efficiency. It analyzes urban mood, understands your social preference, and computes a path that feels right.</h2>
            <img src="./public/mockup.png" alt="mockup" className="page-image" ></img>


          </div>
        </div>
      </div>

      <div className="page">
        <div className="questions">
          <h1>Can a system not only respond, but empathize? Not just compute, but suggest?
            <br></br><br></br>
            How do we reflect, critique, or offer alternatives to normative technologies of urban navigation?
            <br></br><br></br>
            How might we design interfaces that foster empathy between users and their environments?</h1>
        </div>
      </div>

      <div className="page">
        <div className="page-child map-page">
          <div className="map-container">
            <img src="./public/keywords.png" alt="Map Diagram" className="map-image" />
            <h2 className="label psychogeography">Psychogeography</h2>
            <h2 className="label urban-exploration">Urban Exploration</h2>
            <h2 className="label serendipity">Serendipity</h2>
            <h2 className="label cognitive-map">Cognitive Map</h2>
            <h2 className="label situationist-mapping">Situationist Mapping</h2>
            <h2 className="label algorithmic-imagination">Algorithmic Imagination</h2>



          </div>
        </div>




      </div>

      <div className="page">
        <div className="responsive-rectangle">

          <img src="./public/rectangle.png" className="parallax-image" />

          <div className="phrase-container">



            <div
              ref={containerRef}
              style={{ fontSize: '24px' }}
              className="phrase-box"
            >
              <VariableProximity
                label={'Critical Cartography'}
                className={'variable-proximity-demo phrase'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff='linear'
              />
            </div>

            <div
              ref={containerRef}
              style={{ fontSize: '24px' }}
              className="phrase-box"
            >
              <VariableProximity
                label={'Computational Aesthetics'}
                className={'variable-proximity-demo phrase'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff='linear'
              />
            </div>


            <div
              ref={containerRef}
              style={{ fontSize: '24px' }}
              className="phrase-box"
            >
              <VariableProximity
                label={'Speculative Design'}
                className={'variable-proximity-demo phrase'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff='linear'
              />
            </div>






          </div>
        </div>
      </div>

      <div className="page">
        <div className="precedent-page">
          <div className="precedent-container">
            <div className="precedent-item">
              <h2 className="precedent-label">Guy Debord's – Dérive</h2>
              <img src="./public/map1.png" alt="Dérive" />

            </div>
            <div className="precedent-item">
              <h2 className="precedent-label">Christian Nold – Emotional Cartography</h2>
              <img src="./public/map2.png" alt="Emotional Cartography" />
            </div>
            <div className="precedent-item">
              <h2 className="precedent-label">Dennis Wood – Narrative Atlas</h2>
              <img src="./public/map3.png" alt="Narrative Atlas" />
            </div>
            <div className="precedent-item">
              <h2 className="precedent-label">Kate McLean – Smellwalks</h2>
              <img src="./public/map4.png" alt="Smellwalks" />
            </div>
          </div>
        </div>
      </div>

      <div className="page">
        <h3>
          Software: Rhino, Grasshopper, Mapbox, OpenStreetMap
          <br></br><br></br>
          Data: Program types, street attributes, public space, pedestrian density
          <br></br><br></br>
          Processes:
          Serendipity scoring (street segments as mood data)
          Route computation with subjective tuning
          Speculative UI prototyping
          <br></br><br></br>
          Approach: A hybrid of quantitative metrics and qualitative affective modeling
          <br></br><br></br>
          Form: Computational, aesthetic, interactive
        </h3>
      </div>

      <div className="page">
        <h3>
          1. Social Attractions<br></br>
          Cafes, Stores, Galleries
          <br></br><br></br>
          2. Temporal Layers<br></br>
          Potential for events
          <br></br><br></br>
          3. Noise Level & Number of pedestrians<br></br>
          Lively or Serene
          <br></br><br></br>
          4. Openness of street / Field of view<br></br>
          How many buildings are you close to
          <br></br><br></br>
          5. Visibility of stores<br></br>
          From how many angles can each storefront be seen
        </h3>
      </div>

      <div className="page">
        {/* <div className="canvas-block" id="d3-container-2">
          <div id="time-slider-container">
            <input type="range" min="0" max="47" value="24" id="timeSlider" />
            <span id="timeLabel">12:00 PM</span>
          </div>
        </div> */}

        <img src="./public/noise.png" alt="Noise" className="noise-image" ></img>
      </div>

      <div className="page">
        <img src="./public/grasshopper.png" alt="Grasshopper" className="grasshopper-image" ></img>
      </div>
    </div>
  )
}

export default App
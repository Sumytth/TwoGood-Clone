// locomotive smooth scrool commented it cause i have to adjest scrool trigger
// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });
function locomotiveAnimations(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimations();


function navbarAnimation(){
    gsap.to("#nav-part1 svg", {
        transform: "translateY(-100%)",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            markers: false,
            start:"top 0",
            end:"top -5%",
            scrub:true
        }
    })
    
    gsap.to("#nav-part2 #links", {
        transform: "translateY(-100%)",
        opacity:0,
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            markers: false,
            start:"top 0",
            end:"top -5%",
            scrub:true
        }
    })
}
navbarAnimation();


// loader

function loadingAnimation(){
    gsap.from("#page1 h1",{
        opacity:0,
        y:100,
        delay:0.5,
        duration:0.8,
        stagger:0.2
    })
    gsap.from("#page1 #video-container",{
        opacity:0,
        scale:0.9,
        delay:1.3,
        duration:0.8,
    })
}
loadingAnimation()


// mouse Animation

function cursorEffect (){
    var videocon = document.querySelector("#video-container")
var playbtn = document.querySelector("#play")

videocon.addEventListener("mouseenter",function(){
    gsap.to(playbtn, {
        opacity:1,
        scale: 1
    })
})
videocon.addEventListener("mouseleave",function(){
    gsap.to(playbtn, {
        opacity:0,
        scale: 0
    })
})
videocon.addEventListener("mousemove",function(dets){
    gsap.to(playbtn, {
        left: dets.x -80,
        top: dets.y -80
    })
})

}
cursorEffect();

// all body cursor
document.addEventListener("mousemove", function(dets) {
    gsap.to("#cursor",{
        left:dets.x,
        top:dets.y
    })
})

// effect on page 3 .child nodes
function childEffect(){

var childElements = document.querySelectorAll(".child");

childElements.forEach(function(child) {
    // Add mouseenter event listener
    child.addEventListener("mouseenter", function() {
        gsap.to("#cursor", {
            transform: 'translate(-50%, -50%) scale(1)'
        });
    });

    // Add mouseleave event listener
    child.addEventListener("mouseleave", function() {
        gsap.to("#cursor", {
            transform: 'translate(-50%, -50%) scale(0)'
        });
    });
});

}
childEffect();




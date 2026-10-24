import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin)
gsap.config({ nullTargetWarn: false })

export { gsap, ScrollTrigger, SplitText }

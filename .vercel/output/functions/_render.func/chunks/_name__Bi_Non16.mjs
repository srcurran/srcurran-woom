import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { C as createAstro, _ as renderHead, a as renderComponent, f as renderTemplate, g as maybeRenderHead, l as renderSlot, n as renderScript, o as Fragment, t as spreadAttributes, v as addAttribute, w as createComponent, x as unescapeHTML } from "./server__dXqfeFU.mjs";
import "./compiler_DvRRMXx4.mjs";
//#region node_modules/@vercel/analytics/dist/astro/index.astro
createAstro("https://astro.build");
var $$Index$1 = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index$1;
	return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", {
		"data-props": JSON.stringify(Astro.props),
		"data-params": JSON.stringify(Astro.params),
		"data-pathname": Astro.url.pathname
	})}${renderScript($$result, "/Users/seancurran/dev/srcurran-woom/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/seancurran/dev/srcurran-woom/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);
//#endregion
//#region node_modules/@vercel/speed-insights/dist/astro/index.astro
createAstro("https://astro.build");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	return renderTemplate`${renderComponent($$result, "vercel-speed-insights", "vercel-speed-insights", {
		"data-props": JSON.stringify(Astro.props),
		"data-params": JSON.stringify(Astro.params),
		"data-pathname": Astro.url.pathname
	})}${renderScript($$result, "/Users/seancurran/dev/srcurran-woom/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/seancurran/dev/srcurran-woom/node_modules/@vercel/speed-insights/dist/astro/index.astro", void 0);
//#endregion
//#region src/data/meta.ts
var site = {
	name: "Sean Curran",
	role: "Product Design-Engineer",
	email: "srcurran@gmail.com"
};
var about = {
	heading: "Hi, I'm Sean.",
	headingFull: "Hello, I'm Sean.",
	/** Greeting for a visitor whose name is the URL path; `{name}` is replaced. */
	headingNamed: "Hey {name}!",
	/** Opens the first paragraph when greeting by name. */
	leadNamed: "I'm Sean.",
	paragraphs: ["Full-stack designer with twenty years of diverse experience. I solve ambiguous problems with strategy, design craft and agentic development.", "Agency hustle, startup grit. A designer's eye and developer's mind."],
	notes: [[
		{ text: "Currently: Staff Designer at " },
		{
			text: "Foyer",
			href: "https://foyersavings.com"
		},
		{ text: "." }
	], [
		{ text: "Projects: " },
		{
			text: "Ohsee QA",
			href: "https://www.npmjs.com/package/ohsee-qa"
		},
		{ text: " • " },
		{
			text: "Focal Point",
			href: "https://www.figma.com/community/plugin/1661755431369623402/focal-point-resize-dont-recrop"
		},
		{ text: " • " },
		{
			text: "MacThing",
			href: "https://github.com/srcurran/MacThing"
		},
		{ text: "." }
	]]
};
//#endregion
//#region src/data/navigation.ts
var navSections = [
	{
		id: "about",
		label: "About"
	},
	{
		id: "foyer",
		label: "Foyer"
	},
	{
		id: "side-projects",
		label: "Side Projects"
	},
	{
		id: "hawthorne",
		label: "Hawthorne"
	},
	{
		id: "app-omni",
		label: "App Omni"
	},
	{
		id: "neiman-marcus",
		label: "Neiman Marcus"
	},
	{
		id: "contact",
		label: "Contact"
	}
];
//#endregion
//#region src/data/logos.ts
var logos = [
	{
		src: "/work/logos/cuban-council.svg",
		alt: "Cuban Council"
	},
	{
		src: "/work/logos/huge.svg",
		alt: "Huge"
	},
	{
		src: "/work/logos/foyer.svg",
		alt: "Foyer"
	},
	{
		src: "/work/logos/akqa.svg",
		alt: "AKQA"
	},
	{
		src: "/work/logos/hawthorne.svg",
		alt: "Hawthorne"
	},
	{
		src: "/work/logos/rga.svg",
		alt: "R/GA"
	},
	{
		src: "/work/logos/publicis-sapient.svg",
		alt: "Publicis Sapient"
	},
	{
		src: "/work/logos/grow.svg",
		alt: "GROW"
	},
	{
		src: "/work/logos/said-differently.svg",
		alt: "Said Differently"
	},
	{
		src: "/work/logos/savage-bureau.svg",
		alt: "Savage Bureau"
	},
	{
		src: "/work/logos/vsa.svg",
		alt: "VSA"
	},
	{
		src: "/work/logos/ia-collaborative.svg",
		alt: "IA Collaborative"
	},
	{
		src: "/work/logos/greenstone.svg",
		alt: "Greenstone"
	}
];
//#endregion
//#region src/data/slides.ts
var slides = [
	{
		id: "index-latest",
		section: "latest",
		kind: "intro",
		theme: "dark",
		heading: "Latest work",
		paragraphs: ["A potpourri of recent work that I have designed, animated and developed (or at least helped develop).", "Full portfolio available upon request."],
		onIndex: 1,
		indexOnly: true
	},
	{
		id: "foyer-intro",
		section: "foyer",
		kind: "intro",
		theme: "dark",
		heading: "Foyer",
		meta: [{
			label: "Role",
			value: "Staff (Founding) Product Designer"
		}, {
			label: "Link",
			value: "foyersavings.com",
			href: "https://foyersavings.com"
		}],
		paragraphs: ["I joined Foyer, the 401(k) for homeownership, in mid-2023, when the company was pre-seed and pre-product.", "As the founding designer I brought the app to life. As a design-engineer I work in code and Figma. As the de facto product owner I prioritized features and drove outcomes. As the sole designer I have owned design end-to-end."]
	},
	{
		id: "foyer-device",
		section: "foyer",
		kind: "mockup",
		fit: "contain",
		onIndex: 2,
		heading: "Welcome screen",
		tasks: "Animation • design • development",
		background: "var(--gradient-linear-purple)",
		media: [{
			src: "/work/foyer-app.mp4",
			alt: "Foyer app",
			type: "video",
			phoneFrame: true
		}]
	},
	{
		id: "foyer-1",
		section: "foyer",
		kind: "mockup",
		heading: "Onboarding",
		background: "var(--gradient-linear-purple)",
		onIndex: 5,
		tasks: "User flow • performance optimization • design • interaction patterns • component development",
		media: [
			{
				src: "/work/foyer-1-a.png",
				alt: "Onboarding: choosing where you want to buy",
				phoneFrame: true
			},
			{
				src: "/work/foyer-1-c.png",
				alt: "Onboarding: setting a target home price and down payment",
				phoneFrame: true
			},
			{
				src: "/work/foyer-1-d.png",
				alt: "Onboarding: picking what you want the most help with",
				phoneFrame: true
			},
			{
				src: "/work/foyer-home-goal.mp4",
				alt: "Home goal animation",
				type: "video",
				phoneFrame: true
			}
		]
	},
	{
		id: "foyer-2",
		section: "foyer",
		kind: "mockup",
		heading: "Foyer × Zillow",
		background: "var(--gradient-linear-sand)",
		tasks: "Partnership concepting • design • hero animation • content",
		media: [{
			src: "/work/foyer-zillow-square.mp4",
			alt: "Foyer × Zillow landing",
			type: "video"
		}, {
			src: "/work/foyer-2-b.png",
			alt: "Foyer × Zillow on iPhone"
		}]
	},
	{
		id: "foyer-3",
		section: "foyer",
		kind: "mockup",
		heading: "Tools and calculators",
		background: "var(--gradient-linear-purple)",
		tasks: "Interaction patterns • design • content • development",
		media: [
			{
				src: "/work/foyer-3-a.png",
				alt: "Tools index with home goal summary",
				phoneFrame: true
			},
			{
				src: "/work/foyer-3-b.png",
				alt: "Affordability calculator: monthly debt input",
				phoneFrame: true
			},
			{
				src: "/work/foyer-3-c.png",
				alt: "Affordability calculator: result with DTI scale",
				phoneFrame: true
			},
			{
				src: "/work/foyer-3-d.png",
				alt: "Affordability calculator: mortgage inputs",
				phoneFrame: true
			}
		]
	},
	{
		id: "foyer-4",
		section: "foyer",
		kind: "mockup",
		heading: "Home advisor dashboard",
		tasks: "Design • development • animation",
		pin: "top",
		media: [{
			src: "/work/foyer-4-a.png",
			alt: "Home advisor dashboard showing a member's readiness, finances, and activity feed"
		}]
	},
	{
		id: "foyer-review",
		section: "foyer",
		kind: "quote",
		theme: "light",
		background: "var(--gradient-lavender-peach)",
		quotes: [
			{
				title: "Great app",
				attribution: "Ebeck8994",
				text: "Foyer is a great app to use for saving money toward your new home no matter how little or small. It's easy to use and there's a lot of tools available to help you with purchasing your new home."
			},
			{
				title: "User friendly interface",
				attribution: "justinsehunk",
				text: "It's a well designed product that also comes with ample yet not so overwhelming information on saving for home ownership. I recommend this especially for first-time home buyers."
			},
			{
				title: "The easiest way to save",
				attribution: "VanLee318",
				text: "The app is designed specifically for people like me, offering customized planning tools and resources that take the guesswork out of saving. \n\n It feels like having a financial coach in my pocket, guiding me every step of the way.",
				featured: true
			},
			{
				title: "Easy to use",
				attribution: "Munchie T",
				text: "App is very easy to use. Everything is available right from the app. The best part is the deposit match and the interest."
			}
		],
		media: [{
			src: "/work/foyer-review-stars.svg",
			alt: "Five out of five stars"
		}]
	},
	{
		id: "foyer-results",
		section: "foyer",
		kind: "results",
		theme: "light",
		heading: "Foyer results",
		items: [
			"Founding designer, ran successful __0-to-1 launch__",
			"__40pt increase__ in onboarding completion, by swapping the order of home goal and register",
			"Achieved __64% attach rate__ on paid product",
			"Helped __hundreds of members__ purchase a home"
		]
	},
	{
		id: "side-projects-intro",
		section: "side-projects",
		kind: "intro",
		theme: "dark",
		heading: "Side Projects",
		meta: [{
			label: "Role",
			value: "Personal Projects (Designed & Developed)"
		}, {
			label: "Links",
			links: [
				{
					label: "MacThing (Github)",
					href: "https://github.com/srcurran/MacThing"
				},
				{
					label: "Ohsee.app",
					href: "https://ohsee.app"
				},
				{
					label: "Focal-Point (Figma)",
					href: "https://www.figma.com/community/plugin/1661755431369623402/focal-point-resize-dont-recrop"
				}
			]
		}],
		paragraphs: [
			"Projects I have designed and developed through agentic tooling.",
			"**MacThing:** A desktop widget using the Spotify Car Thing hardware.",
			"**Ohsee:** A visual QA tool built code-first to catch agentic bugs.",
			"**Focal Point:** Easily reframe images with off-centered subjects."
		]
	},
	{
		id: "macthing-now-playing",
		section: "side-projects",
		kind: "mockup",
		heading: "MacThing",
		tasks: "Concept • design • development",
		media: [{
			src: "/work/macthing-now-playing.mp4",
			alt: "MacThing turning a Car Thing into a Mac display, cycling between now playing and a clock",
			type: "video"
		}]
	},
	{
		id: "ohsee-compare",
		section: "side-projects",
		kind: "mockup",
		heading: "Ohsee: CLI diff report",
		tasks: "Concept • design • development",
		media: [{
			src: "/work/ohsee-cli-compare.mp4",
			alt: "Ohsee's report highlighting diffs beside a list of detected changes",
			type: "video"
		}]
	},
	{
		id: "ohsee-app-overview",
		section: "side-projects",
		kind: "mockup",
		heading: "Ohsee: Desktop app showing captured pages",
		tasks: "Concept • design • development",
		media: [{
			src: "/work/ohsee-app-overview.mp4",
			alt: "Ohsee's desktop app showing every captured page in a test, then opening one",
			type: "video"
		}]
	},
	{
		id: "focal-point-resize",
		section: "side-projects",
		kind: "mockup",
		heading: "Focal Point",
		tasks: "Concept • design • development",
		media: [{
			src: "/work/focal-point-resize.mp4",
			alt: "Focal Point Figma plugin keeping a photo's subject in frame as the image is resized",
			type: "video"
		}]
	},
	{
		id: "hawthorne-intro",
		section: "hawthorne",
		kind: "intro",
		theme: "dark",
		heading: "Hawthorne",
		meta: [{
			label: "Role",
			value: "Product Designer"
		}],
		paragraphs: ["I joined Hawthorne, a D2C men's grooming startup, to work product-side after a decade+ at agencies and design firms.", "With a wealth of e-commerce experience, it was a natural fit that unlocked new ways of working: iterating on live design, managing internal bandwidth, and gleaning real-time insights from customers."]
	},
	{
		id: "hawthorne-1",
		section: "hawthorne",
		kind: "mockup",
		heading: "Concept sketches (quiz results)",
		tasks: "Exploration • user flows • interaction patterns",
		onIndex: 7,
		media: [{
			src: "/work/hawthorne-1.jpg",
			alt: "Quiz result concept sketches"
		}]
	},
	{
		id: "hawthorne-device",
		section: "hawthorne",
		kind: "mockup",
		theme: "dark",
		fit: "contain",
		onIndex: 4,
		heading: "Quiz results prototype",
		tasks: "Concept • design • interaction patterns",
		media: [{
			src: "/work/hawthorne-video.mp4",
			alt: "Hawthorne quiz result",
			type: "video",
			rounded: true
		}]
	},
	{
		id: "hawthorne-2",
		section: "hawthorne",
		kind: "mockup",
		heading: "Quiz results redesign",
		tasks: "User feedback • design optimization",
		media: [{
			src: "/work/hawthorne-2.jpg",
			alt: "Revised quiz results"
		}]
	},
	{
		id: "hawthorne-3",
		section: "hawthorne",
		kind: "mockup",
		heading: "Website and CMS design",
		tasks: "Project leadership • design",
		media: [{
			src: "/work/hawthorne-3.jpg",
			alt: "Website and CMS design"
		}]
	},
	{
		id: "hawthorne-4",
		section: "hawthorne",
		kind: "mockup",
		heading: "E-commerce design",
		tasks: "Site design • optimization",
		media: [{
			src: "/work/hawthorne-4.jpg",
			alt: "E-commerce design"
		}]
	},
	{
		id: "hawthorne-results",
		section: "hawthorne",
		kind: "results",
		theme: "light",
		heading: "Hawthorne results",
		items: [
			"0-to-1 launch of a __direct-buy channel__ for customers",
			"__Increased subscriptions 15%__ from quiz results redesign",
			"Led CMS redesign to update the site __faster and cheaper__",
			"Defined __average session value__ as the core metric to cleanly evaluate smaller-basket solutions"
		]
	},
	{
		id: "app-omni-intro",
		section: "app-omni",
		kind: "intro",
		theme: "dark",
		heading: "App Omni",
		meta: [{
			label: "Role",
			value: "Product Design Consultant"
		}, {
			label: "Agency",
			value: "Savage Bureau"
		}],
		paragraphs: ["Consulted with App Omni (via Savage Bureau) across several small projects, to provide product thinking and guidance.", "Projects included application-wide audits and single-feature deep dives."]
	},
	{
		id: "app-omni-1",
		section: "app-omni",
		kind: "mockup",
		heading: "Nested filtering pattern",
		tasks: "Prototype • interaction pattern exploration",
		media: [{
			src: "/work/app-omni-1-a.mp4",
			alt: "Filtering UI",
			type: "video"
		}]
	},
	{
		id: "app-omni-results",
		section: "app-omni",
		kind: "results",
		theme: "light",
		heading: "App Omni results",
		items: ["External consultant, providing __UX and product guidance__", "__Simplified__ complex concepts (e.g., nested filtering logic)"]
	},
	{
		id: "neiman-intro",
		section: "neiman-marcus",
		kind: "intro",
		theme: "dark",
		heading: "Neiman Marcus",
		meta: [{
			label: "Role",
			value: "Freelance Product/UX Designer"
		}, {
			label: "Agency",
			value: "Said Differently"
		}],
		paragraphs: ["As part of a larger partnership between Said Differently and Neiman Marcus, I was tapped to redesign the checkout flow and store finder."]
	},
	{
		id: "neiman-1",
		section: "neiman-marcus",
		kind: "mockup",
		heading: "Checkout design",
		tasks: "Research • user flow • design • interaction patterns",
		onIndex: 6,
		media: [{
			src: "/work/neiman-1.mp4",
			alt: "Neiman Marcus checkout design",
			type: "video"
		}]
	},
	{
		id: "neiman-2",
		section: "neiman-marcus",
		kind: "mockup",
		heading: "Store finder design",
		tasks: "Research • design",
		media: [{
			src: "/work/neiman-marcus-store.png",
			alt: "Neiman Marcus store details"
		}]
	},
	{
		id: "neiman-results",
		section: "neiman-marcus",
		kind: "results",
		theme: "light",
		heading: "Neiman Marcus results",
		items: ["Checkout launched after beating the existing flow in testing", "Store finder celebrates each location's character"]
	},
	{
		id: "salesforce-3",
		section: "salesforce",
		kind: "mockup",
		heading: "Event calendar index",
		tasks: "Search + filtering patterns • design",
		onIndex: 8,
		indexOnly: true,
		media: [{
			src: "/work/salesforce-3.png",
			alt: "Event calendar index"
		}]
	}
];
//#endregion
//#region src/data/contact.ts
var footerContent = {
	heading: "Reach out",
	location: "Based in Portland, Maine 🦞",
	tech: "Built with Astro + GSAP."
};
var contactLinks = [
	{
		label: "srcurran@gmail.com",
		href: `mailto:${site.email}`
	},
	{
		label: "207-572-0916",
		href: "tel:+12075720916"
	},
	{
		label: "linkedin.com/in/srcurran",
		href: "https://www.linkedin.com/in/srcurran",
		external: true
	},
	{
		label: "github.com/srcurran (personal)",
		href: "https://github.com/srcurran",
		external: true
	},
	{
		label: "are.na/sean-curran/channels",
		href: "https://www.are.na/sean-curran/channels",
		external: true
	}
];
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title = `${site.name} — ${site.role}`, description = `Portfolio of ${site.name}, ${site.role}.` } = Astro.props;
	return renderTemplate`<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro.generator, "content")}><meta name="description"${addAttribute(description, "content")}><title>${title}</title><link rel="preload" href="/fonts/merriweather-normal-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/poppins-700-latin.woff2" as="font" type="font/woff2" crossorigin><script>
      document.documentElement.classList.add("js");
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      try {
        if (!sessionStorage.getItem("intro-seen")) {
          document.documentElement.classList.add("play-intro");
          sessionStorage.setItem("intro-seen", "1");
        }
      } catch (_) {
        document.documentElement.classList.add("play-intro");
      }
    <\/script><script>
      (function (c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", "y0umn1yiav");
    <\/script><script defer src="https://cloud.umami.is/script.js" data-website-id="c8d029e1-295b-4f7c-bd3e-d93bb0608e14"><\/script>${renderComponent($$result, "Analytics", $$Index$1, {})}${renderComponent($$result, "SpeedInsights", $$Index, {})}${renderHead($$result)}</head><body>${renderSlot($$result, $$slots["default"])}${renderScript($$result, "/Users/seancurran/dev/srcurran-woom/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "/Users/seancurran/dev/srcurran-woom/src/layouts/Layout.astro", void 0);
//#endregion
//#region src/components/MenuGlyph.astro
var $$MenuGlyph = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<svg class="menu-glyph" viewBox="0 0 18 18" aria-hidden="true" focusable="false"><rect class="menu-glyph__bar" x="0" y="2" width="18" height="2" rx="1"></rect><rect class="menu-glyph__bar" x="0" y="8" width="18" height="2" rx="1"></rect><rect class="menu-glyph__bar" x="0" y="14" width="18" height="2" rx="1"></rect></svg>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/MenuGlyph.astro", void 0);
//#endregion
//#region src/components/TopNav.astro
var $$TopNav = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<header class="site-header"><div class="site-header__inner flex row"><a class="brand flex row" href="/"${addAttribute(site.name, "aria-label")}><span class="brand__name">${site.name}</span><span class="brand__role">${site.role}</span></a><div class="site-header__actions flex row items-center"><nav class="header-contact" aria-label="Contact"><button class="header-link" type="button" popovertarget="contact-menu" aria-haspopup="menu">Contact</button><div id="contact-menu" class="contact-menu" popover="auto" data-contact-menu><ul class="contact-menu__list">${contactLinks.map((link) => renderTemplate`<li><a class="contact-menu__link"${addAttribute(link.href, "href")}${spreadAttributes(link.external ? {
		target: "_blank",
		rel: "noopener noreferrer"
	} : {})}>${link.label}</a></li>`)}</ul></div></nav><nav class="flex row items-center" aria-label="Sections"><button class="header-link menu-toggle" type="button" popovertarget="section-menu" aria-label="Sections" aria-haspopup="menu">${renderComponent($$result, "MenuGlyph", $$MenuGlyph, {})}</button><div id="section-menu" class="section-menu" popover="auto"${addAttribute(`--menu-count: ${navSections.length}`, "style")}><div class="section-menu__inner"><div class="section-menu__bar"><button class="section-menu__close" type="button" popovertarget="section-menu" popovertargetaction="hide" aria-label="Close menu">${renderComponent($$result, "MenuGlyph", $$MenuGlyph, {})}</button></div><ul class="section-menu__list">${navSections.map((section, i) => renderTemplate`<li class="section-menu__item"${addAttribute(`--i: ${i}`, "style")}><a class="section-menu__link"${addAttribute(`#${section.id}`, "href")}${addAttribute(section.id, "data-nav-link")}>${section.label}</a></li>`)}</ul></div></div></nav></div></div></header>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/TopNav.astro", void 0);
//#endregion
//#region src/components/SideNav.astro
var $$SideNav = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<nav class="side-nav is-collapsed" aria-label="Sections" data-side-nav><ul class="side-nav__list stack gap-3xs">${navSections.map((section) => renderTemplate`<li><a class="nav-link"${addAttribute(`#${section.id}`, "href")}${addAttribute(section.id, "data-nav-link")}><span class="nav-link__dash" aria-hidden="true"></span><span class="nav-link__label">${section.label}</span></a></li>`)}</ul></nav>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/SideNav.astro", void 0);
//#endregion
//#region src/lib/visitor-name.ts
var NAME = /^[\p{L}\p{M}' ]{1,32}$/u;
function visitorName(segment) {
	if (!segment) return null;
	const name = segment.replace(/[-_+]+/g, " ").replace(/\s+/g, " ").trim();
	if (!NAME.test(name)) return null;
	return isMixedCase(name) ? name : titleCase(name);
}
var isMixedCase = (text) => text !== text.toLowerCase() && text !== text.toUpperCase();
var titleCase = (text) => text.toLowerCase().replace(/(^|\s)(\p{L})/gu, (_match, gap, letter) => gap + letter.toUpperCase());
var greet = (name) => about.headingNamed.replace("{name}", name);
function greeting() {
	const [before = "", after = ""] = about.headingNamed.split("{name}");
	return [before, after];
}
//#endregion
//#region src/components/Hero.astro
createAstro("https://astro.build");
var $$Hero = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Hero;
	const { full = false, name } = Astro.props;
	const heading = full ? about.headingFull : about.heading;
	const [greetBefore, greetAfter] = greeting();
	const paragraphs = name ? about.paragraphs.map((p, i) => i === 0 ? `${about.leadNamed} ${p}` : p) : about.paragraphs;
	return renderTemplate`${maybeRenderHead($$result)}<section class="hero" data-hero${addAttribute(name, "data-hero-named")} id="about"><div class="hero__inner"><div class="hero__content">${name ? renderTemplate`<h1 class="hero__headline">${greetBefore}<span class="hero__name" data-name-shader><span class="hero__name-text">${name}</span><canvas aria-hidden="true"></canvas></span>${greetAfter}</h1>` : renderTemplate`<h1 class="hero__headline">${heading}</h1>`}<div class="hero__bio">${paragraphs.map((p) => renderTemplate`<p>${p}</p>`)}${about.notes.map((note) => renderTemplate`<p class="body-sm">${note.map((segment) => segment.href ? renderTemplate`<a class="hero__link"${addAttribute(segment.href, "href")} target="_blank" rel="noopener noreferrer">${segment.text}</a>` : segment.text)}</p>`)}</div></div></div></section>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/Hero.astro", void 0);
//#endregion
//#region src/lib/emphasize.ts
var INLINE = /\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|(?<!\w)_([^_]+)_(?!\w)/g;
var COMPOUND = /(?<![A-Za-z0-9-])[A-Za-z0-9]+(?:-[A-Za-z0-9]+)+(?![A-Za-z0-9-])/g;
function emphasize(text) {
	return text.replace(COMPOUND, (word) => word.length > 16 ? word : `<span class="nobr">${word}</span>`).replace(INLINE, (_match, bold, highlight, starItalic, underItalic) => {
		if (bold !== void 0) return `<strong>${bold}</strong>`;
		if (highlight !== void 0) return `<mark class="slide__em">${highlight}</mark>`;
		return `<em>${starItalic ?? underItalic}</em>`;
	});
}
//#endregion
//#region src/components/cards/BioCard.astro
createAstro("https://astro.build");
var $$BioCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BioCard;
	const { slide } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="slide__inner"><h2 class="slide__heading">${slide.heading}</h2><div class="slide__prose">${slide.paragraphs?.map((p) => renderTemplate`<p>${unescapeHTML(emphasize(p))}</p>`)}</div></div>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/cards/BioCard.astro", void 0);
//#endregion
//#region src/components/cards/MetaLink.astro
createAstro("https://astro.build");
var $$MetaLink = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MetaLink;
	const { href } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<a class="slide__meta-link"${addAttribute(href, "href")} data-role-link target="_blank" rel="noopener noreferrer">${renderSlot($$result, $$slots["default"])}</a>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/cards/MetaLink.astro", void 0);
//#endregion
//#region src/components/cards/IntroCard.astro
createAstro("https://astro.build");
var $$IntroCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$IntroCard;
	const { slide } = Astro.props;
	const media = slide.media?.[0];
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([
		"slide__inner",
		"slide__inner--intro",
		!media && "is-text-only"
	], "class:list")}><div class="slide__text"><h2 class="slide__heading">${slide.heading}</h2><div class="slide__prose">${slide.paragraphs?.map((p) => renderTemplate`<p>${unescapeHTML(emphasize(p))}</p>`)}</div></div>${slide.meta && slide.meta.length > 0 && renderTemplate`<dl class="slide__meta">${slide.meta.map((row) => renderTemplate`<div class="slide__meta-row"><dt class="slide__meta-label">${row.label}</dt><dd${addAttribute(["slide__meta-value", row.links && "slide__meta-value--links"], "class:list")}>${row.links ? row.links.map((link) => renderTemplate`${renderComponent($$result, "MetaLink", $$MetaLink, { "href": link.href }, { "default": ($$result) => renderTemplate`${link.label}` })}`) : row.href ? renderTemplate`${renderComponent($$result, "MetaLink", $$MetaLink, { "href": row.href }, { "default": ($$result) => renderTemplate`${row.value}` })}` : row.value}</dd></div>`)}</dl>`}</div>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/cards/IntroCard.astro", void 0);
//#endregion
//#region src/components/cards/MockupCard.astro
createAstro("https://astro.build");
var $$MockupCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MockupCard;
	const { slide } = Astro.props;
	const media = slide.media?.[0];
	return renderTemplate`${media && renderTemplate`${maybeRenderHead($$result)}<div class="slide__frame"${addAttribute(slide.background ? `--slide-bg: ${slide.background}` : void 0, "style")}>${(slide.media?.length ?? 0) > 1 || slide.fit === "contain" ? renderTemplate`<div class="slide__aperture" data-aperture><div${addAttribute(["slide__shots", `count-${slide.media?.length}`], "class:list")} data-parallax>${(slide.media ?? []).map((m) => renderTemplate`<figure class="slide__shot">${m.phoneFrame ? renderTemplate`<div class="phone"><div class="phone__device">${m.type === "video" ? renderTemplate`<video${addAttribute(m.src, "src")} autoplay muted loop playsinline class="phone__screen"></video>` : renderTemplate`<img${addAttribute(m.src, "src")}${addAttribute(m.alt ?? "", "alt")} class="phone__screen">`}<img class="phone__frame" src="/work/phone-mask.png" alt="" aria-hidden="true"></div></div>` : m.type === "video" ? renderTemplate`<video${addAttribute(m.src, "src")} autoplay muted loop playsinline${addAttribute([m.rounded && "isRounded"], "class:list")}></video>` : renderTemplate`<img${addAttribute(m.src, "src")}${addAttribute(m.alt ?? "", "alt")}${addAttribute([m.rounded && "isRounded"], "class:list")}>`}</figure>`)}</div></div>` : renderTemplate`<div${addAttribute(["slide__cover", `pin-${slide.pin ?? "center"}`], "class:list")} data-aperture>${media.type === "video" ? renderTemplate`<video${addAttribute(media.src, "src")} autoplay muted loop playsinline></video>` : renderTemplate`<img${addAttribute(media.src, "src")}${addAttribute(media.alt ?? "", "alt")}>`}</div>`}</div>`}${(slide.heading || slide.tasks) && renderTemplate`<div class="slide__chin">${slide.heading && renderTemplate`<p class="slide__chin-title body">${slide.heading}</p>`}${slide.tasks && renderTemplate`<p class="slide__chin-tasks body">${slide.tasks}</p>`}</div>`}`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/cards/MockupCard.astro", void 0);
//#endregion
//#region src/components/cards/QuoteCard.astro
createAstro("https://astro.build");
var $$QuoteCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$QuoteCard;
	const { slide } = Astro.props;
	const stars = slide.media?.[0];
	const hasFeatured = slide.quotes?.some((quote) => quote.featured) ?? false;
	const paragraphs = (text) => text.split(/\n+/).map((part) => part.trim()).filter(Boolean);
	return renderTemplate`${maybeRenderHead($$result)}<div class="slide__inner slide__inner--quote"><div${addAttribute(["slide__quotes", hasFeatured && "slide__quotes--featured"], "class:list")}>${slide.quotes?.map((quote) => renderTemplate`<div${addAttribute(["slide__quote", quote.featured && "slide__quote--featured"], "class:list")}><h3 class="slide__quote-title">${quote.title}</h3><div class="slide__quote-head">${stars && renderTemplate`<img class="slide__quote-stars"${addAttribute(stars.src, "src")}${addAttribute(stars.alt ?? "", "alt")}>`}<p class="slide__quote-attribution">${quote.attribution}</p></div>${(quote.featured || !hasFeatured) && renderTemplate`<blockquote class="slide__quote-text">${paragraphs(quote.text).map((part) => renderTemplate`<p>${unescapeHTML(emphasize(part))}</p>`)}</blockquote>`}</div>`)}</div></div>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/cards/QuoteCard.astro", void 0);
//#endregion
//#region src/components/cards/ResultsCard.astro
createAstro("https://astro.build");
var $$ResultsCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ResultsCard;
	const { slide } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="slide__inner"><h2 class="slide__heading">${slide.heading}</h2><ul class="slide__results">${slide.items?.map((item) => renderTemplate`<li>${unescapeHTML(emphasize(item))}</li>`)}</ul></div>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/cards/ResultsCard.astro", void 0);
//#endregion
//#region src/components/Card.astro
createAstro("https://astro.build");
var $$Card = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Card;
	const { slide, index } = Astro.props;
	const theme = slide.theme ?? "light";
	const cardBackground = slide.background && slide.kind !== "mockup" ? `--slide-bg: ${slide.background}` : void 0;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["deck__slide", `deck__slide--${slide.kind}`], "class:list")}><article${addAttribute([
		"deck__card",
		"theme-reset",
		"slide",
		`slide--${slide.kind}`,
		`slide--${theme}`
	], "class:list")}${addAttribute(cardBackground, "style")} data-card${addAttribute(index, "data-index")}${addAttribute(slide.section, "data-section")}${addAttribute(slide.id, "data-slide")}${addAttribute(slide.kind, "data-kind")}>${slide.kind === "bio" && renderTemplate`${renderComponent($$result, "BioCard", $$BioCard, { "slide": slide })}`}${slide.kind === "intro" && renderTemplate`${renderComponent($$result, "IntroCard", $$IntroCard, { "slide": slide })}`}${slide.kind === "mockup" && renderTemplate`${renderComponent($$result, "MockupCard", $$MockupCard, { "slide": slide })}`}${slide.kind === "quote" && renderTemplate`${renderComponent($$result, "QuoteCard", $$QuoteCard, { "slide": slide })}`}${slide.kind === "results" && renderTemplate`${renderComponent($$result, "ResultsCard", $$ResultsCard, { "slide": slide })}`}</article></div>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/Card.astro", void 0);
//#endregion
//#region src/components/InfoGlyph.astro
var $$InfoGlyph = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<svg class="info-glyph" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle class="info-glyph__ring" cx="10" cy="10" r="9"></circle><circle class="info-glyph__dot" cx="10" cy="6" r="1.25"></circle><rect class="info-glyph__stem" x="9" y="8.5" width="2" height="6.5" rx="1"></rect></svg>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/InfoGlyph.astro", void 0);
//#endregion
//#region src/components/SectionTitle.astro
createAstro("https://astro.build");
var $$SectionTitle = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SectionTitle;
	const { label, details } = Astro.props;
	const popoverId = details && `role-details-${details.section}`;
	return renderTemplate`${maybeRenderHead($$result)}<div class="deck__section-title" data-section-title><h2 class="deck__section-name">${label}</h2>${details && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`
      <button class="deck__section-info" type="button"${addAttribute(popoverId, "popovertarget")}${addAttribute(`${label} role details`, "aria-label")} aria-haspopup="dialog">${renderComponent($$result, "InfoGlyph", $$InfoGlyph, {})}</button>
      <div${addAttribute(popoverId, "id")} class="role-details" popover="auto" role="dialog"${addAttribute(label, "aria-label")}${addAttribute(details.section, "data-role-details")}><article${addAttribute([
		"deck__card",
		"theme-reset",
		"slide",
		"slide--intro",
		`slide--${details.theme ?? "light"}`
	], "class:list")}>${renderComponent($$result, "IntroCard", $$IntroCard, { "slide": details })}</article></div>
    ` })}`}</div>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/SectionTitle.astro", void 0);
//#endregion
//#region src/components/Deck.astro
createAstro("https://astro.build");
var $$Deck = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Deck;
	const { results = false } = Astro.props;
	const shown = slides.filter((s) => !s.indexOnly && s.kind !== "intro" && (results || s.kind !== "results"));
	const sectionLabel = (id) => navSections.find((n) => n.id === id)?.label ?? id;
	const sectionIntro = (id) => slides.find((s) => s.section === id && s.kind === "intro");
	const opensSection = (i) => i === 0 || shown[i - 1].section !== shown[i].section;
	return renderTemplate`${maybeRenderHead($$result)}<section class="deck" data-deck aria-label="Selected work"><div class="deck__viewport" data-deck-viewport>${shown.map((slide, i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${opensSection(i) && renderTemplate`${renderComponent($$result, "SectionTitle", $$SectionTitle, {
		"label": sectionLabel(slide.section),
		"details": sectionIntro(slide.section)
	})}`}${renderComponent($$result, "Card", $$Card, {
		"slide": slide,
		"index": i
	})}
      ` })}`)}</div></section>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/Deck.astro", void 0);
//#endregion
//#region src/components/LogoStrip.astro
var $$LogoStrip = createComponent(($$result, $$props, $$slots) => {
	const COPIES = 4;
	const loop = Array.from({ length: COPIES }, () => logos).flat();
	return renderTemplate`${maybeRenderHead($$result)}<section class="logo-strip" aria-label="Where I've worked"${addAttribute(`--logo-count: ${logos.length}; --logo-strip-copies: ${COPIES}`, "style")}><div class="logo-strip__inner"><ul class="logo-strip__marks">${loop.map((logo, i) => renderTemplate`<li class="logo-strip__item"${addAttribute(logo.h ? `--mark-h: ${logo.h}` : void 0, "style")}${addAttribute(i >= logos.length ? "true" : void 0, "aria-hidden")}${addAttribute(logo.alt, "data-logo")}><img class="logo-strip__mark"${addAttribute(logo.src, "src")}${addAttribute(logo.alt, "alt")}></li>`)}</ul></div></section>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/LogoStrip.astro", void 0);
//#endregion
//#region src/components/Contact.astro
var $$Contact = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="hero hero--end" id="contact" aria-label="Contact"><div class="hero__inner"><div class="hero__content"><h2 class="hero__headline">${footerContent.heading}</h2><ul class="hero__bio contact-end__list">${contactLinks.map((link) => renderTemplate`<li><a class="contact-end__link"${addAttribute(link.href, "href")}${spreadAttributes(link.external ? {
		target: "_blank",
		rel: "noopener noreferrer"
	} : {})}>${link.label}</a></li>`)}</ul><p class="contact-end__copy">${footerContent.location}</p><p class="contact-end__copy caption">${footerContent.tech}</p></div><figure class="contact-end__peace" data-lenticular><img src="/work/peace-out.jpg" alt="Sean throwing up a peace sign in the snow" loading="lazy"><canvas aria-hidden="true"></canvas></figure></div></section>`;
}, "/Users/seancurran/dev/srcurran-woom/src/components/Contact.astro", void 0);
//#endregion
//#region src/layouts/PortfolioPage.astro
createAstro("https://astro.build");
var $$PortfolioPage = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PortfolioPage;
	const { title, full = false, name, results = false } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result) => renderTemplate`
  ${renderComponent($$result, "TopNav", $$TopNav, {})}
  ${renderComponent($$result, "SideNav", $$SideNav, {})}

  ${maybeRenderHead($$result)}<main><div class="opening">${renderComponent($$result, "Hero", $$Hero, {
		"full": full,
		"name": name
	})}${renderComponent($$result, "LogoStrip", $$LogoStrip, {})}</div>${renderComponent($$result, "Deck", $$Deck, { "results": results })}${renderComponent($$result, "Contact", $$Contact, {})}</main>
` })}`;
}, "/Users/seancurran/dev/srcurran-woom/src/layouts/PortfolioPage.astro", void 0);
//#endregion
//#region src/pages/[name].astro
var _name__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Name,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Name = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Name;
	const name = visitorName(Astro.params.name);
	if (!name) return Astro.redirect("/");
	return renderTemplate`${renderComponent($$result, "PortfolioPage", $$PortfolioPage, {
		"title": `${greet(name)} — ${site.name}`,
		"name": name,
		"results": true
	})}`;
}, "/Users/seancurran/dev/srcurran-woom/src/pages/[name].astro", void 0);
var $$file = "/Users/seancurran/dev/srcurran-woom/src/pages/[name].astro";
var $$url = "/[name]";
//#endregion
//#region \0virtual:astro:page:src/pages/[name]@_@astro
var page = () => _name__exports;
//#endregion
export { page };

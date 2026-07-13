/** Client entry — wires up the chrome, first-load intro, and the deck. */
import { initHeader } from "./header";
import { initIntro } from "./intro";
import { initDeck } from "./deck";
import { initLenticular } from "./lenticular";
import { initAnalytics } from "./analytics";

initHeader();
initIntro();
initDeck();
initLenticular();
initAnalytics();

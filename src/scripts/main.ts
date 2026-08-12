/** Client entry — wires up the chrome, first-load intro, and the deck. */
import { initHeader } from "./header";
import { initIntro } from "./intro";
import { initDeck } from "./deck";
import { initLenticular } from "./lenticular";
import { initAnalytics } from "./analytics";

// Analytics first: initDeck dispatches the view mode (and a card view, on a deep
// link) during its own init, so a listener wired up after it would miss them.
initAnalytics();
initHeader();
initIntro();
initDeck();
initLenticular();

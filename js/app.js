import { navigationListener } from "./components/navigation.js";
import { postCardListener } from "./components/postCard.js";
import { modalListener } from "./components/modal.js";
import init from "./init.js";

init();
navigationListener();
postCardListener();
modalListener();

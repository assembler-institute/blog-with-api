import { navigationListener } from "./component/navigation.js";
import { insertPostCards } from "./component/postCard.js";

sessionStorage.start = 0;
sessionStorage.limit = 12;
sessionStorage.url = "http://localhost:3000";

insertPostCards(sessionStorage.start, sessionStorage.limit);
navigationListener();

import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '00283cfc455cff97004973b574f45f33283f4cbc', queries,  });
export default client;
  
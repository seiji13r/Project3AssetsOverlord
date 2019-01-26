import axios from "axios";

export default {
  sanityCheck: function() {
    return axios.get("/api");
  }
};

import axios from "axios";

export default {
  sanityCheck: function() {
    return axios.get("/api");
  },
  getCategories: function() {
    return axios.get("/api/products/categories");
  }
};

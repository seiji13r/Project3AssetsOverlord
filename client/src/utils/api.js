import axios from "axios";

export default {
  getCategories: function() {
    return axios.get("/api/products/categories");
  },
  getDashboardInfo: function() {
    return axios.get("/api/tracking");
  }
};

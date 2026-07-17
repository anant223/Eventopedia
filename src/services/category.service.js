import ApiService from "./api.service";

export default class CategoryService extends ApiService {
    fetchCategories = async () => {
        const categories = await this.axiosInstance.get("/category");
        return categories.data;
    }

}
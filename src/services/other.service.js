import ApiService from "./api.service"

export class OtherService extends ApiService {
  otherLiveEventsPreview = async ({lat, lng, page = 0,
        size = 100,
        radius = 50,}) => {

    const res = await this.axiosInstance.get("/other/ticketmaster", {params: {lat, lng, radius, page, size}});

    return res?.data;
  };
}